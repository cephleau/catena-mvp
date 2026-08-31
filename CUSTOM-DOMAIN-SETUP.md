# Connect Custom Domain - catenalanguagepartners.com

**Current Status:**
- ✅ Code deployed to GitHub
- ⚠️ Build failed (but previous version is published)
- ❌ Custom domain NOT connected yet

---

## 🎯 What You Need to Do

### Step 1: Connect the Custom Domain in Netlify

1. Go to Netlify dashboard:
   https://app.netlify.com/sites/catena-language-solutions

2. Click **"Domain management"** in left sidebar

3. Under **"Custom domains"**, click **"Add domain"**

4. Enter: **catenalanguagepartners.com**

5. Click **"Verify"**

6. Netlify will give you DNS settings. Follow the instructions to:
   - Go to your domain registrar (GoDaddy, Namecheap, etc.)
   - Update DNS records to point to Netlify
   - Common settings:
     ```
     Type: CNAME or A record
     Name: catenalanguagepartners.com
     Value: catena-language-solutions.netlify.app (or Netlify's provided value)
     ```

7. DNS propagation takes 5-48 hours (usually 5-30 min)

---

## 📋 DNS Configuration

Once you have Netlify set up, you'll need to update DNS at your domain registrar.

**Netlify will show you the exact values.** Common setup:

```
Type: CNAME
Name: catenalanguagepartners.com
Value: catena-language-solutions.netlify.app
TTL: 3600 (or auto)
```

---

## 🔧 Build Failure Fix

The latest build failed, but we can rebuild:

1. Go to Netlify deploys
2. Find the failed build
3. Click **"Retry deploy"**
4. Netlify will rebuild from GitHub

**OR** trigger from command line:
```bash
# If you have Netlify CLI installed
netlify deploy --prod
```

---

## ✅ Once Domain is Connected

Once DNS points to Netlify:
1. Site will be live at catenalanguagepartners.com
2. Netlify auto-renews SSL certificate
3. HTTPS will work automatically
4. All redesign features will be visible

---

## 📞 Where to Find Settings

**In Netlify dashboard:**
- Domain management: Left sidebar → "Domain management"
- DNS settings: Domain management page shows what to configure
- Build triggers: "Deploys" section, click "Retry" on failed build

---

## ⏱️ Timeline

- **DNS update:** 5 min - 48 hours for propagation
- **After propagation:** catenalanguagepartners.com will show your site
- **SSL cert:** Automatic (5-15 min after DNS propagates)

---

## 🎯 Quick Checklist

- [ ] Go to Netlify dashboard
- [ ] Click "Domain management"
- [ ] Add custom domain: catenalanguagepartners.com
- [ ] Get DNS settings from Netlify
- [ ] Update DNS at your registrar
- [ ] Wait for DNS to propagate (5 min - 48 hours)
- [ ] Visit catenalanguagepartners.com - LIVE! ✅

---

**Once you do this, your redesigned site will be live at the custom domain!**

Need help with any of these steps?
