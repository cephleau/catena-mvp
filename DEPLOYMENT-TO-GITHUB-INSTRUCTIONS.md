# Manual Deployment - Push to GitHub & Netlify

**Current Status:** Code redesigned, built, and ready — needs manual GitHub push  
**Target Repo:** https://github.com/cephleau/catena-language-solutions  
**Branch:** main  

---

## 📝 What You Need To Do

### Step 1: Open Terminal & Navigate to Project
```bash
cd /Users/cephleau/.openclaw/workspace/catena-mvp
```

### Step 2: Verify Git Remote is Correct
```bash
git remote -v
```

**Should show:**
```
origin  https://github.com/cephleau/catena-language-solutions.git (fetch)
origin  https://github.com/cephleau/catena-language-solutions.git (push)
```

### Step 3: Push to GitHub

**Using your GitHub token (in one command):**
```bash
git push https://cephleau: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@github.com/cephleau/catena-language-solutions.git main --force
```

**OR (if prompted for password, use the token):**
```bash
git push origin main --force
# When asked for password, paste: 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
```

---

## 📦 What Gets Pushed

**Your redesign changes (Commit: 61ac53f):**
- ✅ `components/ui/catena-logo-symbol.tsx` (NEW)
- ✅ `components/ui/clean-hero.tsx` (NEW)
- ✅ `app/page.tsx` (REDESIGNED)
- ✅ All other project files
- ✅ package.json with Next.js config
- ✅ netlify.toml with Next.js build settings

**This REPLACES the old static HTML site with the new Next.js redesign.**

---

## ⚠️ Important Notes

### This is a Complete Replacement
The production repo (catena-language-solutions) currently has static HTML. We're replacing it with:
- Next.js 14 app
- New Catena logo component
- Light theme redesigned homepage
- All modern tooling

### After Push
1. GitHub will show the new code
2. Netlify will auto-detect the push
3. Netlify will run: `npm run build`
4. Publish directory: `.next`
5. Site will redeploy in 2-5 minutes

---

## 🔐 Your Credentials

**GitHub Token:** 
```
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
```

**Netlify Token:** 
```
nfp_JsnuyGEARo6SBo7bHR2Bq1iQTmnes1vLcfc4
```

---

## ✅ Verification After Push

### Check GitHub
1. Go to: https://github.com/cephleau/catena-language-solutions
2. Look for your new files in the repo
3. See the redesign commits in history

### Check Netlify
1. Go to: https://app.netlify.com
2. Find the deployment
3. Wait for build to complete (shows green when done)
4. Visit: https://catenalanguagepartners.com
5. See the new design live

---

## 🚀 Local Verification (Before Pushing)

If you want to verify locally first:

```bash
cd /Users/cephleau/.openclaw/workspace/catena-mvp

# Check what will be pushed
git log --oneline origin/main..main

# Expected output: should show our redesign commit
# 61ac53f 🎨 Redesign homepage with new Catena logo symbol and light theme

# Check git status
git status
# Should be: "nothing to commit, working tree clean"
```

---

## 🆘 If Push Fails

### Network/Connection Issues
Try these commands in sequence:

```bash
# 1. Increase buffer size
git config http.postBuffer 524288000

# 2. Try push again
git push origin main --force

# 3. If still fails, try with full credential URL
git push https://cephleau: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@github.com/cephleau/catena-language-solutions.git main --force
```

### If You Want to Check Status Without Pushing

```bash
# See what's different between local and remote
git diff origin/main...main

# See commits not yet pushed
git log origin/main..main

# Check remote connection
git remote -v
```

---

## 📊 Current Repository Status

```
Local Branch (catena-mvp):
  - Has: Complete Next.js redesign
  - Latest commit: 61ac53f (redesign with logo + hero)
  - Status: Ready to push

Remote (catena-language-solutions on GitHub):
  - Has: Old static HTML site
  - Latest commit: 06264c3
  - Status: Will be replaced by push
```

---

## 🎯 Final Deployment Flow

```
1. You run: git push origin main --force
   ↓
2. Code goes to: https://github.com/cephleau/catena-language-solutions
   ↓
3. Netlify detects the push (auto-deploy enabled)
   ↓
4. Netlify runs: npm run build
   ↓
5. Netlify publishes: .next directory
   ↓
6. Live at: https://catenalanguagepartners.com (2-5 min)
```

---

## 📝 Summary

**What to do:**
1. Open terminal
2. Navigate to `/Users/cephleau/.openclaw/workspace/catena-mvp`
3. Run: `git push origin main --force` (or use full URL with token)
4. Verify at: https://github.com/cephleau/catena-language-solutions
5. Wait 2-5 minutes for Netlify to redeploy
6. Check: https://catenalanguagepartners.com

**Your redesign will be live!** 🚀

---

*Instructions created: Saturday, April 18, 2026*  
*Ready to push: YES ✅*  
*Netlify auto-deploy: ENABLED ✅*
