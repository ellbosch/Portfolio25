# Resume Protection Deployment Guide

This guide walks you through deploying the complete Turnstile + Lambda + S3 backend for secure resume access.

## Prerequisites

- AWS account with Amplify app already deployed
- Cloudflare account (free)
- AWS CLI installed and configured
- Resume PDF file ready to upload

## Quick Start

### Step 1: Get Cloudflare Turnstile Keys

1. Visit https://dash.cloudflare.com/
2. Go to **Turnstile** in left sidebar
3. Click **Add site**
4. Configure:
   - **Site name**: Portfolio Resume Protection
   - **Domain**: `elliotboschwitz.com` (or leave blank for testing)
   - **Widget Mode**: Managed
5. Save both keys:
   - **Site Key** (public) - e.g., `0x4AAAAAACB5wZZBEC-BEapo`
   - **Secret Key** (private) - NEVER commit to git

### Step 2: Create S3 Bucket and Upload Resume

```bash
# Create private S3 bucket
aws s3 mb s3://elliotboschwitz-portfolio-resume --region us-east-1

# Upload resume with private ACL (replace with your resume path)
aws s3 cp /path/to/your/resume.pdf s3://elliotboschwitz-portfolio-resume/resume.pdf --acl private

# Verify it was uploaded (should show resume.pdf)
aws s3 ls s3://elliotboschwitz-portfolio-resume/
```

### Step 3: Deploy Lambda Function

The Lambda function will be automatically deployed by Amplify when you push to GitHub.

```bash
# Commit and push your changes
git add .
git commit -m "Add Turnstile backend verification for resume access"
git push origin main
```

Amplify will:
1. Build the frontend (React app)
2. Build the Lambda function (`amplify/backend/function/verifyTurnstile`)
3. Deploy both

**Monitor deployment:**
- Go to AWS Amplify Console
- Watch the build logs
- Wait for "Deploy" stage to complete

### Step 4: Create Lambda Function URL

After Amplify deploys your Lambda:

1. Go to **AWS Console** → **Lambda**
2. Find function: `verifyTurnstile` (or similar name)
3. Go to **Configuration** → **Function URL**
4. Click **Create function URL**
5. Settings:
   - **Auth type**: NONE
   - **Configure cross-origin resource sharing (CORS)**: ✅ Enable
   - **Allow origin**: `https://elliotboschwitz.com`
   - **Allow methods**: `POST, OPTIONS`
   - **Allow headers**: `Content-Type`
6. Click **Save**
7. **Copy the function URL** (e.g., `https://abc123.lambda-url.us-east-1.on.aws/`)

### Step 5: Configure IAM Permissions

Your Lambda needs permission to access S3:

1. Go to **Lambda** → **verifyTurnstile** → **Configuration** → **Permissions**
2. Click on the **Execution role** (opens IAM)
3. Click **Add permissions** → **Attach policies**
4. Search for and attach: `AmazonS3ReadOnlyAccess`

   OR create a custom policy (more secure):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::elliotboschwitz-portfolio-resume/*"
    }
  ]
}
```

### Step 6: Set Environment Variables in Amplify

Go to **Amplify Console** → Your App → **Environment variables**:

**Backend Variables (for Lambda):**
```
TURNSTILE_SECRET_KEY = <your-cloudflare-secret-key>
S3_BUCKET_NAME = elliotboschwitz-portfolio-resume
AWS_REGION = us-east-1
RESUME_S3_KEY = resume.pdf
ALLOWED_ORIGIN = https://elliotboschwitz.com
```

**Frontend Variables:**
```
VITE_TURNSTILE_SITE_KEY = 0x4AAAAAACB5wZZBEC-BEapo
VITE_API_ENDPOINT = <your-lambda-function-url-from-step-4>
```

After adding variables:
1. Click **Save**
2. **Redeploy** your app (Amplify Console → Redeploy this version)

### Step 7: Test the Flow

1. Visit your site: `https://elliotboschwitz.com/resume`
2. You should see the Turnstile widget
3. Complete the challenge
4. Resume should open in new tab
5. Verify the URL is a signed S3 URL (contains `X-Amz-...` parameters)
6. Test that direct S3 access is blocked:
   ```bash
   curl https://elliotboschwitz-portfolio-resume.s3.amazonaws.com/resume.pdf
   # Should return Access Denied
   ```

## Verification Checklist

- [ ] S3 bucket created with private access
- [ ] Resume uploaded to S3 (verify with `aws s3 ls`)
- [ ] Lambda function deployed (check Amplify build logs)
- [ ] Lambda Function URL created
- [ ] Lambda has IAM permissions for S3
- [ ] All environment variables set in Amplify
- [ ] Redeployed after setting environment variables
- [ ] Turnstile widget appears on `/resume` page
- [ ] Can complete Turnstile challenge
- [ ] Resume downloads successfully after verification
- [ ] Direct S3 access is blocked
- [ ] Signed URL expires after 5 minutes

## Troubleshooting

### "API endpoint not configured"
- Set `VITE_API_ENDPOINT` in Amplify Console (frontend variables)
- Redeploy app after setting

### Turnstile widget doesn't load
- Check `VITE_TURNSTILE_SITE_KEY` is correct
- Verify domain in Cloudflare Turnstile matches your site
- Check browser console for errors

### "Verification failed"
- Check CloudWatch logs for Lambda function
- Verify `TURNSTILE_SECRET_KEY` is correct
- Ensure Lambda can reach Cloudflare API (check VPC settings if any)

### "Internal server error"
- Check CloudWatch logs: Lambda → Monitor → View logs in CloudWatch
- Common issues:
  - Missing S3 permissions
  - Wrong bucket name
  - Missing environment variables

### CORS errors
- Verify `ALLOWED_ORIGIN` matches your domain exactly
- Check Lambda Function URL has CORS configured
- Ensure `OPTIONS` method is allowed

### Resume won't download
- Check Lambda has S3 read permissions
- Verify bucket name and key are correct
- Check CloudWatch logs for S3 errors

## Updating the Resume

To update your resume PDF:

```bash
# Upload new version
aws s3 cp /path/to/new/resume.pdf s3://elliotboschwitz-portfolio-resume/resume.pdf --acl private

# No code changes needed - Lambda will serve the new file immediately
```

## Local Development

For local testing:

1. Create `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Add test keys:
   ```env
   VITE_TURNSTILE_SITE_KEY=1x00000000000000000000AA
   VITE_API_ENDPOINT=http://localhost:3001/verify
   ```

3. Run Lambda locally (optional, requires AWS SAM):
   ```bash
   cd amplify/backend/function/verifyTurnstile
   npm install
   npm run build
   sam local start-api
   ```

## Monitoring

**CloudWatch Logs:**
- Lambda function logs: `/aws/lambda/verifyTurnstile`
- View in AWS Console → CloudWatch → Log groups

**Key Metrics:**
- Lambda invocations (should match resume page visits)
- Error rate (should be near 0%)
- Duration (typically <500ms)

**Cloudflare Dashboard:**
- View Turnstile analytics
- See verification success rate
- Monitor for abuse

## Cost Estimate

**Monthly costs for typical portfolio traffic (<1000 resume views/month):**

| Service | Free Tier | Typical Cost |
|---------|-----------|--------------|
| Lambda | 1M requests/month | $0 |
| S3 Storage | First 5 GB | $0 |
| S3 Requests | 2000 GET/month | $0 |
| Turnstile | Unlimited | $0 |
| **Total** | | **$0/month** |

## Security Notes

✅ **What's Protected:**
- Resume cannot be accessed without Turnstile verification
- All tokens validated server-side (no client bypass possible)
- S3 bucket is private (direct access blocked)
- Signed URLs expire after 5 minutes
- Rate limiting prevents abuse (5 requests per IP per 15 min)

❌ **Limitations:**
- Once someone gets a signed URL, they can share it for 5 minutes
- Rate limiting is per Lambda instance (cold starts reset counter)
- No logging of who downloaded resume (add CloudTrail for that)

## Next Steps

After deployment:
1. Monitor CloudWatch logs for first few days
2. Check Cloudflare Turnstile analytics
3. Consider adding Google Analytics to track resume page visits
4. Optionally: Add email notification when resume is accessed (SNS)

## Support

For issues:
- Lambda problems: Check CloudWatch logs first
- Turnstile problems: Check Cloudflare dashboard
- S3 problems: Verify IAM permissions

See also:
- [TURNSTILE_SETUP.md](TURNSTILE_SETUP.md) - Detailed Turnstile configuration
- [amplify/backend/function/verifyTurnstile/README.md](amplify/backend/function/verifyTurnstile/README.md) - Lambda function details
