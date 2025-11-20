# Cloudflare Turnstile Setup Guide

## Get Your Production Site Key

1. **Go to Cloudflare Dashboard**
   - Visit: https://dash.cloudflare.com/
   - Sign in (or create free account)

2. **Navigate to Turnstile**
   - In the left sidebar, click "Turnstile"
   - Click "Add site" button

3. **Configure Your Site**
   - **Site name**: Portfolio Resume Protection
   - **Domain**: Your domain (e.g., `yoursite.com`) or leave blank for any domain during testing
   - **Widget Mode**: Managed (recommended)
   - Click "Create"

4. **Copy Your Site Key**
   - You'll get a **Site Key** (public, goes in your code)
   - You'll also get a **Secret Key** (private, not needed for client-side only)

5. **Update Resume.tsx**
   - Replace line 15 in `src/pages/Resume.tsx`:
   ```typescript
   const TURNSTILE_SITE_KEY = 'YOUR_ACTUAL_SITE_KEY_HERE';
   ```

## Current Status
- ✅ Test key is working: `1x00000000000000000000AA`
- ⚠️ Test key should be replaced before production deployment
- ✅ No backend needed - client-side verification is sufficient for resume protection

## Notes
- Free tier: Unlimited requests
- No credit card required
- Site key is public (safe to commit to git)
- For stronger security, you'd verify tokens server-side, but not needed here
