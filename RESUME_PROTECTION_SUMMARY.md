# Resume Protection Implementation Summary

## What Was Built

A complete backend-verified Turnstile protection system for your resume. The resume can **ONLY** be accessed after completing a Cloudflare Turnstile challenge, with server-side token verification preventing any client-side bypass.

## Architecture

```
User clicks "Resume"
    ↓
/resume page loads
    ↓
Turnstile widget appears
    ↓
User completes challenge → Token generated
    ↓
Frontend sends token to Lambda
    ↓
Lambda validates with Cloudflare API
    ↓
If valid: Lambda generates signed S3 URL (5 min expiry)
    ↓
User downloads resume from signed URL
```

## What Changed

### Frontend Changes

1. **New Route Added**: `/resume` route in [src/App.tsx](src/App.tsx)
2. **Resume Page Rewritten**: [src/pages/Resume.tsx](src/pages/Resume.tsx)
   - Integrated Turnstile widget
   - Added verification states (idle, verifying, verified, error)
   - Implemented API call to Lambda function
   - Auto-opens resume in new tab after verification
3. **Navigation Updated**:
   - [src/components/Header.tsx](src/components/Header.tsx) - Changed to React Router Link
   - [src/pages/Home.tsx](src/pages/Home.tsx) - Changed to React Router Link
4. **Resume Removed**: Deleted `src/assets/resume.pdf` (no longer bundled with app)

### Backend Changes

1. **Lambda Function Created**: [amplify/backend/function/verifyTurnstile/](amplify/backend/function/verifyTurnstile/)
   - TypeScript Lambda function
   - Validates Turnstile tokens with Cloudflare
   - Generates signed S3 URLs
   - Rate limiting (5 requests per IP per 15 min)
   - CORS support

2. **Build Configuration**: [amplify.yml](amplify.yml)
   - Added backend build phase
   - Automatically builds and deploys Lambda on push

### Configuration Files

1. **Environment Variables**: [.env.example](.env.example)
   - `VITE_TURNSTILE_SITE_KEY` - Cloudflare site key (public)
   - `VITE_API_ENDPOINT` - Lambda function URL

2. **Documentation**:
   - [TURNSTILE_SETUP.md](TURNSTILE_SETUP.md) - Complete Turnstile setup guide
   - [DEPLOYMENT.md](DEPLOYMENT.md) - Step-by-step deployment instructions
   - [amplify/backend/function/verifyTurnstile/README.md](amplify/backend/function/verifyTurnstile/README.md) - Lambda function docs

3. **Helper Script**: [scripts/setup-s3.sh](scripts/setup-s3.sh)
   - Interactive script to create S3 bucket and upload resume

## Security Features

✅ **What's Protected:**
- Resume file stored in **private S3 bucket** (not publicly accessible)
- All Turnstile tokens **validated server-side** with Cloudflare API
- No client-side bypass possible (tokens can't be spoofed)
- Signed URLs **expire after 5 minutes**
- **Rate limiting** prevents abuse (5 requests per IP per 15 min)
- **CORS protection** restricts API to your domain

✅ **Attack Prevention:**
- ❌ Direct URL access to resume → Blocked (private S3)
- ❌ Bypassing Turnstile in browser → Blocked (backend validates)
- ❌ Token replay attacks → Mitigated (each token single-use)
- ❌ Abuse/scraping → Rate limited (5 per 15 min per IP)

## What You Need to Deploy

### Required Services (All Free Tier):
1. **Cloudflare Turnstile** - Get keys from https://dash.cloudflare.com/
   - Site Key (public): `0x4AAAAAACB5wZZBEC-BEapo` ✅ (already have)
   - Secret Key (private): ❌ Need to get from Cloudflare dashboard

2. **AWS S3 Bucket** - Store resume privately
   - Run: `./scripts/setup-s3.sh` (automated setup)
   - Or manually: See [DEPLOYMENT.md](DEPLOYMENT.md) Step 2

3. **AWS Lambda** - Validates tokens
   - Automatically deployed by Amplify when you push to GitHub
   - Need to create Function URL after deployment

### Environment Variables to Set

**In AWS Amplify Console** (after deployment):

**Backend (Lambda):**
```
TURNSTILE_SECRET_KEY = <from-cloudflare-dashboard>
S3_BUCKET_NAME = elliotboschwitz-portfolio-resume
AWS_REGION = us-east-1
RESUME_S3_KEY = resume.pdf
ALLOWED_ORIGIN = https://elliotboschwitz.com
```

**Frontend:**
```
VITE_TURNSTILE_SITE_KEY = 0x4AAAAAACB5wZZBEC-BEapo
VITE_API_ENDPOINT = <lambda-function-url>
```

## Deployment Checklist

Follow these in order:

- [ ] **Get Cloudflare Secret Key**
  - Dashboard → Turnstile → Your site → Copy secret key

- [ ] **Set Up S3 Bucket**
  - Option A: Run `./scripts/setup-s3.sh` (automated)
  - Option B: Follow [DEPLOYMENT.md](DEPLOYMENT.md) Step 2 (manual)

- [ ] **Deploy to GitHub**
  ```bash
  git add .
  git commit -m "Add Turnstile backend verification for resume"
  git push origin main
  ```

- [ ] **Wait for Amplify Build**
  - Check AWS Amplify Console
  - Ensure both frontend and backend build successfully

- [ ] **Create Lambda Function URL**
  - AWS Console → Lambda → verifyTurnstile
  - Configuration → Function URL → Create
  - Auth: NONE, CORS: Enabled
  - Copy the URL

- [ ] **Configure Lambda IAM Permissions**
  - Lambda → Configuration → Permissions
  - Attach `AmazonS3ReadOnlyAccess` policy

- [ ] **Set Environment Variables in Amplify**
  - Amplify Console → Environment variables
  - Add all backend + frontend variables (see above)

- [ ] **Redeploy App**
  - After setting env vars: Redeploy in Amplify Console

- [ ] **Test Everything**
  - Visit `/resume` page
  - Complete Turnstile challenge
  - Verify resume downloads
  - Test direct S3 access is blocked

## Files Created

```
amplify/
  backend/
    function/
      verifyTurnstile/
        index.ts          # Lambda handler (NEW)
        package.json      # Lambda dependencies (NEW)
        tsconfig.json     # TypeScript config (NEW)
        README.md         # Lambda docs (NEW)

scripts/
  setup-s3.sh            # S3 setup script (NEW)

src/
  pages/
    Resume.tsx           # Complete rewrite with Turnstile (MODIFIED)
  components/
    Header.tsx           # Changed to React Router Link (MODIFIED)
  App.tsx                # Added /resume route (MODIFIED)

amplify.yml              # Added backend build phase (MODIFIED)
.env.example             # Added Turnstile env vars (MODIFIED)
TURNSTILE_SETUP.md       # Complete setup guide (MODIFIED)
DEPLOYMENT.md            # Deployment walkthrough (NEW)
RESUME_PROTECTION_SUMMARY.md  # This file (NEW)
```

## Files Deleted

```
src/assets/resume.pdf    # Removed from public bundle (DELETED)
```

## How to Update Resume

When you need to update your resume:

```bash
# Upload new version to S3
aws s3 cp /path/to/new-resume.pdf \
  s3://elliotboschwitz-portfolio-resume/resume.pdf \
  --acl private

# That's it! No code changes needed.
```

## Cost Estimate

**Monthly cost for typical traffic (<1000 resume views/month):**

| Service | Cost |
|---------|------|
| Cloudflare Turnstile | $0 (always free) |
| AWS Lambda | $0 (within free tier) |
| AWS S3 | $0 (within free tier) |
| **Total** | **$0/month** |

## Testing Locally

1. Create `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Use test key (always passes):
   ```env
   VITE_TURNSTILE_SITE_KEY=1x00000000000000000000AA
   VITE_API_ENDPOINT=http://localhost:3001/verify
   ```

3. Run dev server:
   ```bash
   npm run dev
   ```

4. Visit: http://localhost:5173/resume

## Next Steps

1. **Deploy**: Follow [DEPLOYMENT.md](DEPLOYMENT.md) step-by-step
2. **Test**: Verify everything works end-to-end
3. **Monitor**: Check CloudWatch logs for first few days
4. **Optional**: Add analytics to track resume page visits

## Documentation

- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Complete deployment walkthrough
- **[TURNSTILE_SETUP.md](TURNSTILE_SETUP.md)** - Cloudflare Turnstile configuration
- **[amplify/backend/function/verifyTurnstile/README.md](amplify/backend/function/verifyTurnstile/README.md)** - Lambda function details

## Support

If you encounter issues:

1. **Check CloudWatch Logs** - Lambda → Monitor → View logs
2. **Verify Environment Variables** - Amplify Console → Environment variables
3. **Test Turnstile Keys** - Cloudflare Dashboard → Turnstile
4. **Check IAM Permissions** - Lambda needs S3 read access

Common issues documented in [DEPLOYMENT.md](DEPLOYMENT.md) Troubleshooting section.

---

**Status**: ✅ Implementation complete, ready for deployment

**Note**: The one remaining task is setting up the S3 bucket and uploading your resume. Everything else is code-complete and ready to deploy.
