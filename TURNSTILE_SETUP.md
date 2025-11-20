# Cloudflare Turnstile Setup Guide

## Architecture Overview

This portfolio uses **Cloudflare Turnstile** with **backend verification** to protect resume access. The resume file is stored privately in S3 and can only be accessed through a verified Turnstile challenge.

### Security Flow
1. User navigates to `/resume`
2. Turnstile widget challenges user to verify they're human
3. On success, Turnstile provides a token to the frontend
4. Frontend sends token to AWS Lambda function
5. Lambda validates token with Cloudflare API using secret key
6. If valid, Lambda returns a signed S3 URL (expires in 5 minutes)
7. User can view/download resume from the signed URL

**Important**: Client-side only verification (without backend) provides NO real security, as tokens can be spoofed. This implementation uses proper server-side validation.

---

## Setup Instructions

### Part 1: Get Cloudflare Turnstile Keys

1. **Go to Cloudflare Dashboard**
   - Visit: https://dash.cloudflare.com/
   - Sign in (or create free account)

2. **Navigate to Turnstile**
   - In the left sidebar, click "Turnstile"
   - Click "Add site" button

3. **Configure Your Site**
   - **Site name**: Portfolio Resume Protection
   - **Domain**: `elliotboschwitz.com` (or your domain)
   - **Widget Mode**: Managed (recommended)
   - Click "Create"

4. **Copy Your Keys**
   - **Site Key** (public) - Used in frontend React app
   - **Secret Key** (private) - Used in Lambda function for verification
   - ⚠️ **NEVER commit the secret key to git**

---

### Part 2: Set Up S3 Bucket for Resume

1. **Create Private S3 Bucket** (or use existing Amplify bucket)
   ```bash
   aws s3 mb s3://your-portfolio-resume --region us-east-1
   ```

2. **Upload Resume with Private ACL**
   ```bash
   aws s3 cp src/assets/resume.pdf s3://your-portfolio-resume/resume.pdf --acl private
   ```

3. **Configure Bucket Policy** (Lambda needs access)
   - Attach policy allowing Lambda execution role to `s3:GetObject`

---

### Part 3: Configure AWS Amplify Environment Variables

Go to AWS Amplify Console → Your App → Environment variables:

**Backend (Lambda) Variables:**
- `TURNSTILE_SECRET_KEY` = Your Cloudflare secret key
- `S3_BUCKET_NAME` = `your-portfolio-resume`
- `AWS_REGION` = `us-east-1` (or your region)
- `RESUME_S3_KEY` = `resume.pdf`
- `ALLOWED_ORIGIN` = `https://elliotboschwitz.com` (for CORS)

**Frontend Variables:**
- `VITE_TURNSTILE_SITE_KEY` = Your Cloudflare site key (production key: `0x4AAAAAACB5wZZBEC-BEapo`)
- `VITE_API_ENDPOINT` = Your Lambda function URL (see Part 4)

---

### Part 4: Deploy Lambda Function

After pushing to GitHub, Amplify will automatically build your Lambda function.

**Get Lambda Function URL:**
1. Go to AWS Console → Lambda
2. Find function: `verifyTurnstile`
3. Go to Configuration → Function URL → Create function URL
4. **Auth type**: NONE (using CORS + Turnstile for security)
5. Copy the function URL

**Update Environment Variable:**
- Add `VITE_API_ENDPOINT` in Amplify Console with your function URL

---

### Part 5: Local Development

1. **Create `.env.local`** (not committed to git):
   ```bash
   cp .env.example .env.local
   ```

2. **Add your keys**:
   ```env
   VITE_TURNSTILE_SITE_KEY=1x00000000000000000000AA  # Test key for localhost
   VITE_API_ENDPOINT=http://localhost:3001/verify     # Local Lambda endpoint
   ```

3. **Test locally**:
   - Use test key `1x00000000000000000000AA` (always passes)
   - For backend testing, run Lambda locally with AWS SAM or LocalStack

---

## Current Keys

**Testing (localhost):**
- Site Key: `1x00000000000000000000AA` (built-in Cloudflare test key)

**Production (elliotboschwitz.com):**
- Site Key: `0x4AAAAAACB5wZZBEC-BEapo`
- Secret Key: ⚠️ **Set in Amplify Console only** (never commit)

---

## Verification Checklist

Before deploying to production:

- [ ] S3 bucket created with private access
- [ ] Resume uploaded to S3
- [ ] Lambda function deployed and accessible
- [ ] Function URL created with CORS configured
- [ ] `TURNSTILE_SECRET_KEY` set in Amplify (backend)
- [ ] `S3_BUCKET_NAME` set in Amplify (backend)
- [ ] `VITE_TURNSTILE_SITE_KEY` set in Amplify (frontend)
- [ ] `VITE_API_ENDPOINT` set in Amplify (frontend)
- [ ] Test Turnstile widget loads on `/resume`
- [ ] Test verification flow end-to-end
- [ ] Confirm direct S3 URL access is blocked
- [ ] Confirm signed URLs expire after 5 minutes

---

## Troubleshooting

**Turnstile widget doesn't appear:**
- Check site key is correct
- Check domain matches Cloudflare configuration
- Open browser console for errors

**Verification fails:**
- Check Lambda function logs in CloudWatch
- Verify secret key is correct in environment variables
- Check CORS headers in Lambda response

**Can't download resume:**
- Check S3 bucket permissions
- Verify Lambda has IAM role with S3 access
- Check signed URL hasn't expired (5 min limit)

**Rate limiting:**
- Lambda has built-in rate limiting (5 requests per 15 minutes per IP)
- Adjust in `amplify/backend/function/verifyTurnstile/index.ts`

---

## Security Notes

- ✅ Resume file never publicly accessible
- ✅ Backend validates all Turnstile tokens with Cloudflare
- ✅ Signed URLs expire after 5 minutes
- ✅ Rate limiting prevents abuse
- ✅ CORS restricts API calls to your domain
- ✅ No client-side bypass possible

Free tier limits:
- **Turnstile**: Unlimited requests
- **Lambda**: 1M requests/month free
- **S3**: 2000 GET requests/month free
