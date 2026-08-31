# Netlify Connection Issue - Why Site Isn't Updating

**Problem:**
- ✅ Code pushed to GitHub (`cephleau-site.git`)
- ❌ Netlify NOT connected to `cephleau-site`
- ❌ Netlify still building from **old repo** (catena-language-solutions?)
- ❌ Live site still shows dark theme (old version)

---

## 🔍 Evidence

**What we pushed:**
```
Repository: https://github.com/cephleau/cephleau-site
Commit: 5d4b458 (light theme redesign)
Status: ✅ On GitHub
```

**What Netlify is building:**
```
Site: catenalanguagepartners.com
Project: stellular-crisp-cb1d6a
Status: ❌ OLD DEPLOYS (Apr 18)
Source: Not cephleau-site.git
```

**Why site is dark:**
- Netlify is building from old source
- Old source = dark theme
- Our new source = light theme
- Netlify hasn't picked up the new repo

---

## ✅ Solution

We need to **reconnect Netlify to the correct GitHub repo**.

**Steps:**

1. **Go to Netlify dashboard:**
   https://app.netlify.com/sites/stellular-crisp-cb1d6a/settings/general

2. **Find "Build & deploy" section:**
   Look for "Repository" or "GitHub integration"

3. **Disconnect current repo:**
   Click "Disconnect" or remove the old connection

4. **Reconnect to new repo:**
   - Click "Connect to GitHub"
   - Search for: `cephleau/cephleau-site`
   - Select it
   - Authorize access
   - Configure build settings:
     - Build command: `npm run build`
     - Publish directory: `.next`

5. **Trigger deploy:**
   Once connected, Netlify will auto-build and deploy

---

## 🎯 Alternative: Faster Solution

If you have Netlify admin access, you can manually trigger a rebuild:

1. Go to: https://app.netlify.com/sites/stellular-crisp-cb1d6a/deploys
2. Click: "Trigger deploy" → "Deploy site"
3. Netlify will rebuild (but might still be from old repo)

**This only works if repo is already connected.**

---

## 🚀 What Happens Once Connected

Once Netlify is connected to `cephleau-site.git`:

1. Netlify detects the push (5d4b458)
2. Netlify clones the repo
3. Netlify runs: `npm run build`
4. Netlify publishes `.next` directory
5. Site updates to light theme (2-5 minutes)

---

## 📋 Summary

**Current state:**
- ✅ Code: On GitHub (cephleau-site)
- ❌ Netlify: Connected to wrong repo
- ❌ Site: Still dark theme (old)

**Action needed:**
- Reconnect Netlify to `cephleau-site.git`
- OR manually push to the repo Netlify is currently watching

**Once done:**
- Light theme goes live
- New logo appears
- All new sections render
- Site is updated ✅

---

## 💡 Quick Check

**To confirm:**
1. Visit Netlify dashboard
2. Find site settings
3. Look for GitHub repo name
4. If it says `catena-language-solutions` or something else, that's the problem
5. If it says `cephleau-site`, then something else is wrong

**Let me know what repo Netlify shows, and I can help fix it.**
