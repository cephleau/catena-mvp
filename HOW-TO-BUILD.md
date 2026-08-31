# How to Build Cephleau Site in Claude Code

## Step 1: Open Claude Code

Start Claude Code (the IDE, not this terminal session).

---

## Step 2: Create the Next.js Project

In Claude Code terminal:

```bash
npx create-next-app@latest cephleau-site \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --no-src-dir

cd cephleau-site
```

---

## Step 3: Load the Build Task

Copy the entire content of:
```
/Users/cephleau/.openclaw/workspace/CLAUDE-CODE-TASK.md
```

Paste it into Claude Code chat.

---

## Step 4: Let Claude Code Build It

In Claude Code, use gstack commands:

### First: Brainstorm Design
```
/office-hours

"I'm building a website for Cephleau Consulting using 21st.dev Magic components. 
Let's brainstorm the design direction before I start coding."
```

Claude will help you plan the visual approach.

---

### Then: Create Implementation Plan
```
/autoplan

"Build the Cephleau Consulting website as described above, using 21st.dev Magic 
components throughout. Create a detailed implementation plan."
```

gstack will break down the work into steps.

---

### Finally: Build & Deploy
```
/ship

"Implement the complete Cephleau website using the plan above. 
Use 21st.dev Magic for all UI components. 
Output: Production-ready Next.js app ready for Netlify deployment."
```

Claude Code will build everything and create a PR.

---

## Step 5: Deploy

Once code is built:

```bash
npm run build
npm run dev  # Test locally first
```

Then:
1. Push to GitHub
2. Go to netlify.com
3. Connect your repo
4. Auto-deploys on every push
5. Point cephleau.com DNS to Netlify

---

## What You'll Get

✅ Production-grade Next.js site
✅ 21st.dev Magic components throughout
✅ Dark theme with teal accents
✅ Animated hero, floating logo
✅ 6 services, 4-step process, 3 pricing tiers
✅ Contact form with validation
✅ Mobile responsive
✅ Deploy-ready
✅ Professional, not generic

---

## Key Files

- `CLAUDE-CODE-TASK.md` — Complete build specification (read in Claude Code)
- `cephleau-uiux-pro.html` — High-quality HTML fallback (already built, ready to deploy)

---

## Timeline

- **Design brainstorm:** 5 minutes (`/office-hours`)
- **Implementation planning:** 5 minutes (`/autoplan`)
- **Build & code:** 15-20 minutes (`/ship`)
- **Testing locally:** 5 minutes (`npm run dev`)
- **Deploy to Netlify:** 2 minutes
- **Total:** ~30-40 minutes

---

## Need Help?

If Claude Code gets stuck:
1. Paste this task directly: `CLAUDE-CODE-TASK.md`
2. Ask it to "continue building" 
3. Use `/careful` for more deliberate approach
4. Use `/review` to QA the code

---

## Quick Fallback

If Claude Code doesn't work out, you have `cephleau-uiux-pro.html` ready to deploy immediately to Netlify. It's already high-quality and production-ready.

```
file:///Users/cephleau/.openclaw/workspace/cephleau-uiux-pro.html
```

---

**Go build it! 🚀**
