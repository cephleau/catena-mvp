# Cephleau Consulting — 21st.dev Magic Ready

## Quick Start (Next.js + 21st.dev Magic)

### Step 1: Create Next.js Project
```bash
npx create-next-app@latest cephleau-site \
  --typescript \
  --tailwind \
  --eslint \
  --app
cd cephleau-site
```

### Step 2: Install 21st.dev Magic
The MCP server is already configured in `~/.claude.json` with your API key.

In **Claude Code**, the 21st.dev Magic components are automatically available via the MCP server.

### Step 3: Use Claude Code to Build

Open Claude Code and paste this:

```
Load gstack and 21st.dev Magic (via MCP).

Build a Next.js website for Cephleau Consulting with these 21st.dev Magic components:

**Hero Section:**
- Use Hero component from 21st.dev
- Animated octopus logo (embed SVG or image)
- CTA buttons with 21st.dev Button component
- Stats cards with 21st.dev Card component

**Services Section:**
- ServiceGrid or CardGrid component
- 6 service cards: Diagnostics, Optimization, Systems, Data Governance, Implementation, Advisory
- Hover effects, smooth transitions

**Process Section:**
- Timeline or StepIndicator component
- 4-step methodology: Discovery → Audit → Design → Execute
- Visual flow indicators

**Pricing Section:**
- PricingCard component (use 3 variants)
- Feature comparison table
- CTA buttons for each tier
- Highlight the "Optimization" tier as featured

**Contact Section:**
- Form component from 21st.dev with validation
- Fields: Name, Company, Email, Operational Challenge
- Success state

**Navigation:**
- Header with logo + nav links
- Sticky navbar with smooth scroll behavior
- Mobile menu

**Design System:**
- Dark theme (navy/black background)
- Green/teal accents (#00d97e)
- Professional typography
- Smooth animations
- Responsive grid layouts

**Data:**
- Services: Operational Diagnostics, Process Optimization, Systems Engineering, Data Governance, Implementation Support, Executive Advisory
- Pricing: $2.5K-$7.5K, $10K-$50K, $75K-$250K+
- Contact: hello@cephleau.com, Denver Colorado
- Industries: Aerospace, Manufacturing, Logistics, Enterprise

Deploy to: Netlify (or Vercel)

Output: Production-ready Next.js app using 21st.dev Magic components throughout.
```

Then run: `/autoplan` (gstack will create implementation plan)
Then run: `/ship` (to create PR with complete site)

### Step 4: Deploy to Netlify

```bash
npm run build
# Connect repo to Netlify
# Auto-deploys on push
```

---

## Files You Already Have

1. **`cephleau-interactive.html`** — Standalone HTML (ready to deploy)
2. **`cephleau-uiux-pro.html`** — Standalone HTML with UI/UX Pro Max design
3. **`cephleau-landing.html`** — Initial MVP

All three are **production-ready** and can deploy to cephleau.com today.

---

## Why Use Claude Code + 21st.dev Magic?

- ✅ 100+ pre-built, production-grade components
- ✅ Consistent design system
- ✅ MCP integration handles component discovery
- ✅ Faster development
- ✅ Professional polish
- ✅ React/Next.js framework (more scalable)
- ✅ Tailwind CSS integration

---

## Summary

**Option A (Use Now):** Deploy `cephleau-uiux-pro.html` to Netlify today (5 minutes)
- Fully functional
- Professional design
- No build process needed

**Option B (Polish with Claude Code):** Build in Claude Code with 21st.dev Magic (30-45 minutes)
- Full component library integration
- React/Next.js foundation
- More scalable long-term
- Easier to customize/extend

---

## Your API Key (Already Configured)
```
API Key: e60fbdd91a6ccdd5935412096c98279d2c61a9cf7283a709e9d293d65f2b6921
Endpoint: npx @21st-dev/magic@latest
Configured in: ~/.claude.json
```

Ready to use in Claude Code anytime.

