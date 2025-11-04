# Netlify Deployment Setup Guide

## Issue: Blank Site After Deployment

Your site is deploying successfully but appears blank because **environment variables are missing** in Netlify.

## Required Environment Variables

Add these two environment variables to your Netlify site:

### 1. VITE_SUPABASE_URL
```
https://kxrpuytakwcbsauxqser.supabase.co
```

### 2. VITE_SUPABASE_ANON_KEY
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4cnB1eXRha3djYnNhdXhxc2VyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3ODExMzksImV4cCI6MjA3NzM1NzEzOX0.JbkjHZ86eoQv_bBq1awAdPxNcgsR2356uLJs1-XZQsI
```

---

## Step-by-Step Instructions

### Step 1: Open Netlify Dashboard
1. Go to https://app.netlify.com
2. Log in to your account
3. Click on your **freedom-leg-test** site

### Step 2: Navigate to Environment Variables
1. Click **Site settings** in the top navigation
2. In the left sidebar, click **Environment variables** (under "Build & deploy" section)
3. Click the **Add a variable** button (or **Add environment variables**)

### Step 3: Add First Variable
1. Click **Add a single variable**
2. In the **Key** field, enter: `VITE_SUPABASE_URL`
3. In the **Value** field, enter: `https://kxrpuytakwcbsauxqser.supabase.co`
4. Keep all scopes selected (production, deploy previews, branch deploys)
5. Click **Create variable** or **Save**

### Step 4: Add Second Variable
1. Click **Add a variable** again
2. Click **Add a single variable**
3. In the **Key** field, enter: `VITE_SUPABASE_ANON_KEY`
4. In the **Value** field, enter the full key:
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4cnB1eXRha3djYnNhdXhxc2VyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3ODExMzksImV4cCI6MjA3NzM1NzEzOX0.JbkjHZ86eoQv_bBq1awAdPxNcgsR2356uLJs1-XZQsI
   ```
5. Keep all scopes selected
6. Click **Create variable** or **Save**

### Step 5: Clear Cache and Redeploy
1. Go back to your site overview (click site name at top)
2. Click the **Deploys** tab
3. Click the **Trigger deploy** dropdown button (top right)
4. Select **Clear cache and deploy site**
5. Wait 1-2 minutes for the deployment to complete
6. Look for the green "Published" status

### Step 6: Test Your Site
1. Click on the live site URL (should be something like `your-site-name.netlify.app`)
2. You should now see the **Website Version Gallery** page
3. The page should show three version cards: Modal Version, Inline Version, and Hybrid Version
4. Click on any card to test navigation

---

## What to Check If Still Blank

### Check 1: Browser Console
1. Press **F12** (or right-click → Inspect)
2. Click the **Console** tab
3. Look for any red error messages
4. Take a screenshot and share with the developer

### Check 2: Verify Environment Variables
1. In Netlify, go to Site settings → Environment variables
2. Confirm both variables are listed:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Check that the values are correct (no extra spaces or characters)

### Check 3: Verify Build Output
1. Go to Deploys tab
2. Click on the latest deploy
3. Scroll through the logs
4. Look for this line: `✓ built in X.XXs` (should show successful build)
5. Check for: `X new file(s) to upload` (should be more than 0)

### Check 4: Test Asset URLs
Try visiting these URLs directly in your browser:
- `https://your-site.netlify.app/index.html` (should load)
- `https://your-site.netlify.app/assets/` (may show 404 but assets should load in app)

---

## Why Environment Variables Are Needed

Your React application uses **Vite** which requires environment variables to be prefixed with `VITE_`. These variables are:

- **Used at build time** - Vite replaces `import.meta.env.VITE_*` with actual values during build
- **Needed for Supabase** - Your app connects to the Supabase database using these credentials
- **Missing = Blank page** - Without them, the app fails to initialize properly

---

## Automatic Deploys Going Forward

Once environment variables are set up correctly:

1. **Push to GitHub** - Any code changes pushed to the main branch
2. **Netlify detects changes** - Automatically starts a new build
3. **Build runs** - Uses your environment variables
4. **Site updates** - Live site reflects your changes within 1-2 minutes

No need to manually deploy again! Just push to GitHub and Netlify handles the rest.

---

## Common Issues

### Issue: Variables Not Taking Effect
**Solution**: After adding variables, you MUST trigger a new deploy. Use "Clear cache and deploy site" to ensure fresh build.

### Issue: Still Blank After Adding Variables
**Solution**:
1. Check browser console for errors
2. Verify variable names are EXACT (case-sensitive)
3. Ensure no extra spaces in values
4. Try hard refresh: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)

### Issue: "Failed to fetch" errors
**Solution**: This usually means Supabase variables are incorrect. Double-check the URL and key values.

---

## Need More Help?

If the site is still blank after following all steps:

1. Take a screenshot of your Netlify environment variables page
2. Take a screenshot of the browser console (F12 → Console tab)
3. Share the latest deploy log (Deploys tab → click latest deploy → copy logs)
4. Share your live site URL

This will help diagnose the exact issue.
