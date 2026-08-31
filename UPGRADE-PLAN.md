# Catena Landing Page Upgrade Plan

## Current State Analysis
✅ Next.js 14 + React 18 + TypeScript configured
✅ Tailwind CSS installed
✅ Navigation component exists (but using text logo "✦ Catena")
✅ Page structure exists with CleanHero
✅ CatenaCTASection exists (already implemented)
✅ Light theme already applied

## Requested Upgrades

### 1. Add Branded Logo to Navigation
- Replace text "✦ Catena" with actual logo image
- Add /public/logo.png asset
- Scale: h-10 md:h-12
- Keep professional appearance

### 2. Replace First Hero Section Image  
- Current: CleanHero (text-only, minimal)
- New: Add medical interpretation visual
- Add /public/hero-medical.jpg
- Integrate into hero section

### 3. Replace Bottom CTA Section
- Current: CatenaCTASection (already has soft animated background)
- Option: Upgrade to full Warp shader OR keep current (already premium)
- Current CTA already matches requirements

## Implementation Order
1. Check if shader library needed (might already have animation)
2. Add logo asset → Update Navigation
3. Add hero image asset → Update CleanHero or Hero section
4. Enhance CTA section if needed (Warp shader optional)

## Notes
- @paper-design/shaders-react optional (we have Framer Motion already)
- CatenaCTASection already implements soft animated background
- May not need full Warp shader - current animations sufficient
- Focus on visual assets (logo, hero image) over new dependencies
