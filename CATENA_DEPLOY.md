# Catena Website Deployment

## Current Status
✅ **Landing page ready** at `/Users/cephleau/.openclaw/workspace/catena-mvp/public/index.html`

## Deployment Options

### Option 1: Netlify (Recommended)
You have a Netlify site already configured (`siteId: 248ecbdf-990e-4730-9bea-17e0f2db22a8`).

**To deploy:**
```bash
cd /Users/cephleau/.openclaw/workspace/catena-mvp
netlify login  # First time only
netlify deploy --prod --dir=public
```

### Option 2: Manual Netlify Deploy
1. Go to https://app.netlify.com
2. Drag & drop the `/public` folder
3. Update your domain settings to point to `catenalanguagepartners.com`

### Option 3: GitHub + Netlify Auto-Deploy
1. Push repo to GitHub
2. Connect GitHub repo to Netlify
3. Set build command: `npm run build` or `true` (for static)
4. Set publish directory: `public`

## Domain Setup
- **Domain:** catenalanguagepartners.com (needs to be purchased/configured)
- **Current site ID:** 248ecbdf-990e-4730-9bea-17e0f2db22a8
- **Netlify subdomain:** Will be assigned after first deploy

## Assets Included
- ✅ Logo (Catena visual identity)
- ✅ Medical interpretation hero section
- ✅ Healthcare provider imagery
- ✅ Responsive design (mobile-first)
- ✅ HIPAA messaging
- ✅ Pricing tiers
- ✅ CTA buttons

## Next Steps
1. Authenticate with Netlify
2. Deploy to production
3. Configure domain (catenalanguagepartners.com)
4. Set up contact forms (if needed)
5. Add real images to replace placeholders

---
Ready to deploy? Run: `netlify login && netlify deploy --prod --dir=public`
