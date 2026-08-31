# 🚀 BUILD: Cephleau Consulting with 21st.dev Magic

**Open this task in Claude Code and follow the instructions.**

---

## QUICK START

1. **In Claude Code**, load gstack: `/office-hours`
2. Copy the task below into Claude Code
3. Run `/autoplan` to create implementation plan
4. Run `/ship` to build & deploy

---

## 🎯 TASK: Build Cephleau Consulting Website

### Overview
Build a stunning, production-grade Next.js website for Cephleau Consulting using **21st.dev Magic components** throughout.

**API Key is configured:** The MCP server has access to 100+ components.

---

### 📋 BUSINESS DETAILS

**Company:** Cephleau Consulting
**Positioning:** Industrial operations optimization for aerospace, manufacturing, logistics
**Founder:** Senior Project Manager at Boeing (MSCS, pursuing MBA)
**Location:** Denver, Colorado
**Email:** hello@cephleau.com

### 🎨 DESIGN REQUIREMENTS

- **Theme:** Dark, professional, modern
- **Primary Colors:** Navy/Black backgrounds, teal/green accents (#00d97e preferred)
- **Typography:** Bold, distinctive (NOT generic Roboto/Inter)
- **Animations:** Smooth, purposeful (not overdone)
- **Components:** Use 21st.dev Magic for ALL UI elements

---

### 📑 PAGE SECTIONS

#### 1. HERO
- Animated octopus logo (floating, rotating)
- Bold headline: "Transform Your Operations"
- Subheadline: "Industrial-grade process optimization for aerospace, manufacturing, and logistics."
- Two CTA buttons: "Book Discovery Call" (primary), "Learn More" (outline)
- 4 stat boxes: 50+ Transformations, 38% Avg Cost Reduction, 95% Satisfaction, 6mo Avg Implementation
- Use 21st.dev Hero, Button, Card components

#### 2. SERVICES (Section: "Core Services")
- 6 service cards in responsive grid:
  1. Operational Diagnostics — KPI analysis, root cause identification, efficiency benchmarking, process audits
  2. Process Optimization — Workflow mapping, bottleneck elimination, lean improvement, SOP design
  3. Systems Engineering — Cross-functional design, systems integration, digital alignment, automation mapping
  4. Data Governance — Data ownership frameworks, KPI standardization, quality assessment, governance design
  5. Implementation Support — Execution tracking, change management, KPI monitoring, adoption support
  6. Executive Advisory — Strategic alignment, organizational design, transformation leadership, performance strategy
- Hover effects: glow, lift, color shift
- Icons for each (emoji is fine)
- Use 21st.dev CardGrid, Card components

#### 3. PROCESS (Section: "How We Transform")
- 4-step methodology with visual flow
- Steps: 1) Discovery, 2) Audit, 3) Design, 4) Execute
- Numbered circles (1, 2, 3, 4) with descriptions
- Use 21st.dev Timeline or StepIndicator component if available
- Animated connectors between steps

#### 4. PRICING (Section: "Investment")
- 3 pricing tiers:
  - **Diagnostics:** $2.5K–$7.5K (Initial assessment & quick-win identification)
    - Process audit
    - KPI analysis
    - Bottleneck identification
    - Recommendations report
  
  - **Optimization (FEATURED):** $10K–$50K (End-to-end redesign with execution support)
    - Workflow redesign
    - Implementation support
    - Team training
    - KPI monitoring (3–6 mo)
  
  - **Enterprise:** $75K–$250K+ (Multi-function transformation & strategic overhaul)
    - Full organizational assessment
    - Systems integration
    - Change management
    - 6–12 month engagement
- Highlight "Optimization" tier (scaled up, different color)
- Use 21st.dev PricingCard component
- Feature list with checkmarks

#### 5. INDUSTRIES (Section: "Industries We Serve")
- 4 industry cards:
  - ✈️ Aerospace & Defense — Mission-critical systems and supply chain optimization
  - 🏭 Manufacturing — Production efficiency and lean operations
  - 📦 Logistics & Supply Chain — Distribution networks and inventory optimization
  - 🏢 Enterprise Operations — Large-scale transformation and systems integration
- Use 21st.dev Card or Feature component

#### 6. CONTACT (Section: "Ready to Transform?")
- Split layout (left: info, right: form)
- **Left Side:**
  - Headline: "Start Your Transformation"
  - Description: "Schedule a free 30-minute discovery call..."
  - Contact details:
    - 📧 Email: hello@cephleau.com
    - 📍 Location: Denver, Colorado
    - ⏱️ Response: Within one business day
- **Right Side (Form):**
  - Full Name (required)
  - Company (required)
  - Email (required)
  - Operational Challenge (textarea, required)
  - Submit button: "Send Request"
  - Success message on submit
- Use 21st.dev Form, Input, Button, TextArea components

#### 7. NAVIGATION
- Fixed header with logo + nav links
- Logo on left (with octopus icon if possible)
- Nav links: Services, Process, Pricing, Contact
- Smooth scroll to sections
- Mobile-responsive menu

#### 8. FOOTER
- Simple footer with copyright + tagline
- Links to social (optional)

---

### 🛠️ TECHNICAL REQUIREMENTS

**Framework:** Next.js 14+ with App Router
**Styling:** Tailwind CSS (21st.dev uses Tailwind)
**Components:** 21st.dev Magic (MCP Server)
**Deployment:** Netlify or Vercel
**Package Structure:**
```
cephleau-site/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── Hero.tsx
│   ├── Services.tsx
│   ├── Process.tsx
│   ├── Pricing.tsx
│   ├── Industries.tsx
│   ├── Contact.tsx
│   ├── Navigation.tsx
│   └── Footer.tsx
├── public/
│   └── logo.png
├── package.json
├── next.config.js
├── tailwind.config.js
└── tsconfig.json
```

---

### 🎯 KEY DESIGN PRINCIPLES

✅ **Use 21st.dev components for EVERYTHING**
- Don't build custom components (use library)
- Every UI element should be from 21st.dev Magic
- Compose them together for sections

✅ **Animations & Interactions**
- Logo floats and rotates smoothly
- Cards lift/glow on hover
- Form inputs have focus states with color
- Smooth scroll navigation
- Button ripple effects

✅ **Color Palette**
- Primary: Dark navy/black (#0a0f1f, #0f1a2e)
- Accent: Teal/green (#00d97e, #00f0b5)
- Secondary accent: Orange/red (#ff6b35) optional
- Text: White/light gray

✅ **Typography**
- Headlines: Bold, distinctive (Syne or similar)
- Body: Clean, readable (Outfit or similar)
- Mono: Code/labels (IBM Plex Mono or similar)

✅ **Not Generic AI Output**
- No purple gradients everywhere
- No generic color schemes
- Intentional spacing and hierarchy
- Professional but distinctive
- Actually polished, not "slapped together"

---

### 📦 DEPLOYMENT

After building:
1. `npm run build`
2. Push to GitHub
3. Connect repo to Netlify
4. Deploy automatically

Or use Vercel for auto-deploy on push.

**Domain:** Point cephleau.com to Netlify/Vercel

---

### 🎬 WHAT TO DO NEXT

**In Claude Code:**

1. Create Next.js project
   ```bash
   npx create-next-app@latest cephleau-site --typescript --tailwind --app
   cd cephleau-site
   ```

2. Load gstack and 21st.dev Magic
   - Type: `/office-hours`
   - Ask Claude Code to brainstorm design direction

3. Build components using 21st.dev Magic
   - Run: `/autoplan` (gstack creates implementation plan)
   - Run: `/ship` (builds and creates PR)

4. Test locally
   ```bash
   npm run dev
   ```

5. Deploy
   - Push to GitHub
   - Connect to Netlify/Vercel
   - Done

---

### 🚀 SUCCESS CRITERIA

✅ Stunning, professional website
✅ Uses 21st.dev Magic components throughout
✅ Dark theme with distinctive green accents
✅ Animated hero section
✅ All 6 services with descriptions
✅ 4-step process visualization
✅ 3 pricing tiers (Optimization tier highlighted)
✅ Contact form with validation
✅ Responsive on all devices
✅ Ready to deploy to cephleau.com
✅ No generic AI slop (intentional design choices)

---

## GO BUILD IT 🚀

Good luck! This will be **stunning**.
