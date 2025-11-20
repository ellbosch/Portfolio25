# Turnstile Verification Lambda Function

This Lambda function validates Cloudflare Turnstile tokens and provides secure access to the resume PDF stored in S3.

## Architecture

**Flow:**
1. Frontend sends Turnstile token to this Lambda function
2. Lambda validates token with Cloudflare API using secret key
3. If valid, Lambda generates a signed S3 URL (expires in 5 minutes)
4. Frontend receives URL and allows user to download resume

## Environment Variables

Set these in AWS Amplify Console (or Lambda Configuration):

| Variable | Description | Example |
|----------|-------------|---------|
| `TURNSTILE_SECRET_KEY` | Cloudflare secret key (from dashboard) | `0x4AAA...` |
| `S3_BUCKET_NAME` | S3 bucket containing resume | `portfolio-resume` |
| `AWS_REGION` | AWS region for S3 bucket | `us-east-1` |
| `RESUME_S3_KEY` | S3 object key for resume file | `resume.pdf` |
| `ALLOWED_ORIGIN` | CORS allowed origin | `https://elliotboschwitz.com` |

## Security Features

- **Rate Limiting**: 5 requests per IP per 15 minutes (prevents abuse)
- **Token Validation**: Every token verified with Cloudflare's API
- **Signed URLs**: S3 URLs expire after 5 minutes
- **Private S3**: Resume file never publicly accessible
- **CORS Protection**: API restricted to your domain

## Deployment

### Automatic (via Amplify)

When you push to GitHub, Amplify will automatically:
1. Install dependencies (`npm ci`)
2. Build TypeScript (`npm run build`)
3. Deploy Lambda function

### Manual Testing Locally

```bash
# Install dependencies
npm install

# Build TypeScript
npm run build

# Test with AWS SAM (optional)
sam local invoke verifyTurnstile -e test-event.json
```

## IAM Permissions Required

The Lambda execution role needs:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject"
      ],
      "Resource": "arn:aws:s3:::your-portfolio-resume/*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "arn:aws:logs:*:*:*"
    }
  ]
}
```

## API Interface

### Request

**Method**: POST
**Content-Type**: `application/json`

```json
{
  "token": "turnstile-token-from-frontend"
}
```

### Response (Success)

**Status**: 200

```json
{
  "success": true,
  "resumeUrl": "https://s3.amazonaws.com/bucket/resume.pdf?X-Amz-...",
  "expiresIn": 300
}
```

### Response (Error)

**Status**: 403 / 400 / 429 / 500

```json
{
  "error": "Error message"
}
```

## Rate Limiting

Built-in rate limiting to prevent abuse:
- **Limit**: 5 requests per IP
- **Window**: 15 minutes
- **Storage**: In-memory (per Lambda instance)

To adjust, modify `RATE_LIMIT_REQUESTS` and `RATE_LIMIT_WINDOW` in [index.ts:17-18](index.ts).

## Monitoring

**CloudWatch Logs**: Lambda automatically logs to CloudWatch
- Log Group: `/aws/lambda/verifyTurnstile`
- Useful for debugging Turnstile verification failures

**Metrics to Watch**:
- Invocation count
- Error rate
- Duration (should be <500ms typically)

## Troubleshooting

**"TURNSTILE_SECRET_KEY not configured"**
- Set environment variable in Amplify Console

**"S3_BUCKET_NAME not configured"**
- Set environment variable in Amplify Console

**Token verification always fails**
- Check secret key is correct
- Verify Cloudflare Turnstile is configured for your domain
- Check CloudWatch logs for error details

**CORS errors in browser**
- Verify `ALLOWED_ORIGIN` matches your frontend domain
- Check Lambda response includes CORS headers

**Too many requests (429)**
- User exceeded rate limit (5 requests per 15 min)
- Wait 15 minutes or adjust rate limit in code

## Cost Estimate

**AWS Lambda**:
- Free tier: 1M requests/month
- After free tier: $0.20 per 1M requests
- Typical cost: $0/month (well within free tier)

**S3 GetObject**:
- Free tier: 2000 requests/month
- After free tier: $0.0004 per 1000 requests
- Typical cost: $0/month

**Cloudflare Turnstile**:
- Always free, unlimited requests
