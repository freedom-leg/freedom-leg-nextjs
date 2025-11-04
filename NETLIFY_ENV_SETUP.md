# Netlify Environment Variables Setup

## Critical Fix Applied

The blank page issue has been resolved by fixing the Supabase initialization error in `src/services/injuryService.ts`. The service now uses lazy initialization and gracefully handles missing environment variables.

## Required Environment Variables

To enable Supabase features (injury pages, condition index), configure these environment variables in your Netlify dashboard:

### Step 1: Access Netlify Environment Variables

1. Log in to your Netlify account
2. Select your site
3. Go to **Site Settings** → **Environment Variables**
4. Click **Add a variable**

### Step 2: Add Variables

Add the following two environment variables:

**Variable 1:**
- Key: `VITE_SUPABASE_URL`
- Value: `https://kxrpuytakwcbsauxqser.supabase.co`
- Scope: All deploys

**Variable 2:**
- Key: `VITE_SUPABASE_ANON_KEY`
- Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4cnB1eXRha3djYnNhdXhxc2VyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3ODExMzksImV4cCI6MjA3NzM1NzEzOX0.JbkjHZ86eoQv_bBq1awAdPxNcgsR2356uLJs1-XZQsI`
- Scope: All deploys

### Step 3: Trigger New Deploy

After adding the environment variables:
1. Click **Save**
2. Go to **Deploys** tab
3. Click **Trigger deploy** → **Clear cache and deploy site**

## What This Fixes

### Without Environment Variables (Current State - Will Work Now)
- Gallery page will load successfully
- Modal, Inline, and Hybrid versions will work
- Pages that use Supabase (Conditions Index, Injury Landing Page) will show empty data
- Console warnings will appear about missing Supabase configuration
- **No more blank page crashes**

### With Environment Variables (Full Functionality)
- All pages work including injury-related features
- Database queries succeed
- No console warnings

## Testing After Deployment

1. Visit your Netlify site URL
2. Confirm the Gallery page loads (not blank)
3. Test navigation to Modal, Inline, and Hybrid versions
4. Check browser console for any errors
5. If you configured environment variables, test injury-related pages

## Important Notes

- The anon key shown above is safe to expose publicly (it's the public API key)
- Environment variables are injected at build time for Vite apps
- Changes to environment variables require a new deployment to take effect
- The app will now work even without these variables configured
