# Quick Reference Guide

## Your 5 Landing Pages

1. **Achilles Rupture**: `/achilles-rupture`
   - File: `src/pages/AchillesRupturePage.tsx`

2. **Foot/Ankle Fractures**: `/foot-ankle-fractures`
   - File: `src/pages/FootAnkleFracturePage.tsx`

3. **Knee Surgery**: `/knee-surgery`
   - File: `src/pages/KneeSurgeryPage.tsx`

4. **Lower Leg Fracture**: `/lower-leg-fracture`
   - File: `src/pages/LowerLegFracturePage.tsx`

5. **Foot Surgery**: `/foot-surgery`
   - File: `src/pages/FootSurgeryPage.tsx`

## Common Tasks

### Edit Homepage SEO Tags
**File**: `index.html`
- Change title, description, keywords
- Update Open Graph tags
- Modify structured data

### Edit a Landing Page
**Files**: `src/pages/*Page.tsx`
1. Open the specific page file
2. Edit text content directly
3. Update SEO component at top if needed
4. Push to GitHub

### Edit Quiz Categories
**File**: `src/data/injuries.ts`
- Modify the `QUIZ_INJURIES` array
- Currently has 6 simple categories

### Update Sitemap
**File**: `public/sitemap.xml`
- Add/remove URLs manually
- Update lastmod date
- Change priority/changefreq if needed

## Build & Deploy

**Build Command**: `npm run build`
**Deploy**: Push to GitHub → Cloudflare auto-deploys

## Key URLs

- Homepage: `https://freedomleg.com/`
- Sitemap: `https://freedomleg.com/sitemap.xml`
- Robots: `https://freedomleg.com/robots.txt`
- Landing Pages: `https://freedomleg.com/achilles-rupture` (etc.)

## What's in the HTML Source

✅ Complete meta tags (title, description, keywords)
✅ Open Graph tags (Facebook sharing)
✅ Twitter Card tags (Twitter sharing)
✅ Structured data (JSON-LD for Google)
✅ Canonical URLs
✅ All visible before JavaScript loads

## No Database Needed!

Everything is hardcoded in the files. No environment variables, no Supabase connection, no complex build scripts.

**Just edit, push, deploy. Done!**
