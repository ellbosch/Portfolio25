import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

interface TurnstileVerifyResponse {
  success: boolean;
  'error-codes'?: string[];
  challenge_ts?: string;
  hostname?: string;
}

interface LambdaEvent {
  body: string;
  headers: Record<string, string>;
}

interface LambdaResponse {
  statusCode: number;
  headers: Record<string, string>;
  body: string;
}

// Rate limiting storage (in-memory for this Lambda instance)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_REQUESTS = 5; // 5 requests per window
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes

// Clean up old rate limit entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of rateLimitStore.entries()) {
    if (now > data.resetTime) {
      rateLimitStore.delete(ip);
    }
  }
}, 60 * 1000); // Clean up every minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  if (!record || now > record.resetTime) {
    // Create new record
    rateLimitStore.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    });
    return true;
  }

  if (record.count >= RATE_LIMIT_REQUESTS) {
    return false; // Rate limit exceeded
  }

  // Increment count
  record.count++;
  return true;
}

async function verifyTurnstileToken(token: string, remoteIp: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  if (!secretKey) {
    throw new Error('TURNSTILE_SECRET_KEY not configured');
  }

  const formData = new URLSearchParams();
  formData.append('secret', secretKey);
  formData.append('response', token);
  formData.append('remoteip', remoteIp);

  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });

    const data = (await response.json()) as TurnstileVerifyResponse;

    if (!data.success) {
      console.error('Turnstile verification failed:', data['error-codes']);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error verifying Turnstile token:', error);
    return false;
  }
}

async function generateSignedResumeUrl(): Promise<string> {
  const bucketName = process.env.S3_BUCKET_NAME;
  const region = process.env.AWS_REGION || 'us-east-1';
  const resumeKey = process.env.RESUME_S3_KEY || 'resume.pdf';

  if (!bucketName) {
    throw new Error('S3_BUCKET_NAME not configured');
  }

  const s3Client = new S3Client({ region });

  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: resumeKey,
  });

  // Generate signed URL that expires in 5 minutes
  const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 300 });

  return signedUrl;
}

export async function handler(event: LambdaEvent): Promise<LambdaResponse> {
  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGIN || '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle preflight request
  if (event.headers['http-method'] === 'OPTIONS' || event.headers['x-forwarded-method'] === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: '',
    };
  }

  try {
    // Get client IP for rate limiting
    const clientIp = event.headers['x-forwarded-for']?.split(',')[0] ||
                     event.headers['x-real-ip'] ||
                     'unknown';

    // Check rate limit
    if (!checkRateLimit(clientIp)) {
      return {
        statusCode: 429,
        headers: corsHeaders,
        body: JSON.stringify({
          error: 'Too many requests. Please try again later.',
        }),
      };
    }

    // Parse request body
    const body = JSON.parse(event.body || '{}');
    const { token } = body;

    if (!token || typeof token !== 'string') {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({
          error: 'Invalid request. Token is required.',
        }),
      };
    }

    // Verify Turnstile token
    const isValid = await verifyTurnstileToken(token, clientIp);

    if (!isValid) {
      return {
        statusCode: 403,
        headers: corsHeaders,
        body: JSON.stringify({
          error: 'Verification failed. Please try again.',
        }),
      };
    }

    // Generate signed URL for resume
    const resumeUrl = await generateSignedResumeUrl();

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({
        success: true,
        resumeUrl,
        expiresIn: 300, // 5 minutes
      }),
    };
  } catch (error) {
    console.error('Lambda handler error:', error);

    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({
        error: 'Internal server error. Please try again later.',
      }),
    };
  }
}
