# Deployment Instructions - CRITICAL READ THIS

## ⚠️ ROOT CAUSE: Your Hosting Platform is Serving OLD Build Files

**The published site shows a BLANK PAGE because the old JavaScript bundle no longer exists.**

### Evidence:
- **Old published site loads**: `index-D_5lelMz.js`
- **New build created**: `index-CHt7VZlV.js`
- **Result**: Browser tries to load non-existent old JS file → blank page

## What Was Fixed in This Update

1. ✅ **Fixed TypeScript errors** - Removed unused React import and fixed parameter warnings
2. ✅ **Added `vercel.json`** - Proper SPA routing for Vercel deployments
3. ✅ **Added `public/_redirects`** - SPA routing for Netlify (auto-copied to dist folder)
4. ✅ **Verified `netlify.toml`** - Already correctly configured
5. ✅ **Rebuilt the project** - Clean build with no errors
6. ✅ **All TypeScript checks pass** - `npm run typecheck` completes successfully

## 🚨 YOU MUST REDEPLOY - Here's How

### For Netlify (RECOMMENDED APPROACH):

#### Method 1: Complete Site Deletion and Recreation (Most Reliable)
```bash
# 1. In Netlify Dashboard:
#    - Go to Site Settings
#    - Scroll to bottom
#    - Click "Delete this site"
#    - Confirm deletion

# 2. Create NEW deployment:
#    - Open Netlify dashboard
#    - Click "Add new site" → "Deploy manually"
#    - Drag and drop the ENTIRE dist/ folder from this project
#    - Wait for deployment to complete
```

#### Method 2: Clear Deploy Cache and Redeploy
```bash
# If using Git integration:
# 1. Go to Site Settings → Build & Deploy → Post processing
# 2. Click "Clear cache and retry deploy"
# 3. Go to Deploys tab
# 4. Click "Trigger deploy" → "Clear cache and deploy site"
```

#### Method 3: Manual Drag-and-Drop Update
```bash
# 1. Go to Deploys tab in Netlify
# 2. Drag and drop the dist/ folder to the deploy area
# 3. This creates a new deployment with fresh files
```

### For Vercel:

#### Method 1: CLI Deployment
```bash
npm install -g vercel
vercel --prod --force
```

#### Method 2: Git Integration
```bash
# 1. Push all changes to your Git repository
# 2. Go to Vercel dashboard
# 3. Click on your project
# 4. Go to Settings → General → "Redeploy"
# 5. Check "Use existing Build Cache" should be OFF
# 6. Click "Redeploy"
```

### For Other Platforms:

1. **Delete the old deployment completely**
2. **Deploy the NEW `dist/` folder from this project**
3. **Ensure SPA routing is configured** (all routes serve index.html)

## 🧹 After Redeployment - Clear ALL Caches

### 1. Clear Browser Cache (REQUIRED)
- **Chrome/Edge**: Press `Ctrl+Shift+Delete` (Win) or `Cmd+Shift+Delete` (Mac)
  - Select "Cached images and files"
  - Select "All time"
  - Click "Clear data"

- **Or use Hard Refresh**: `Ctrl+Shift+R` (Win) or `Cmd+Shift+R` (Mac)

- **Or use DevTools**:
  - Press F12 to open DevTools
  - Right-click the refresh button
  - Select "Empty Cache and Hard Reload"

### 2. Clear CDN Cache (If Applicable)
- **Netlify**: Should auto-clear, but you can manually purge in dashboard
- **Vercel**: Automatically clears on new deployment
- **Cloudflare**: Purge cache in Cloudflare dashboard

### 3. Test in Incognito/Private Window
- This ensures you're not seeing cached content
- Press `Ctrl+Shift+N` (Chrome) or `Ctrl+Shift+P` (Firefox)

## ✅ Verification Checklist

After redeploying, verify these URLs all work:

- [ ] `/` - Should show the Gallery page with 3 version cards
- [ ] `/modal` - Should show the Modal version with header and hero
- [ ] `/inline` - Should show the Inline version with full content
- [ ] `/hybrid` - Should show the Hybrid version
- [ ] `/conditions` - Should show conditions index

### Expected Behavior:
1. ✅ All pages load with content (NOT blank)
2. ✅ You can refresh any page without 404 errors
3. ✅ Navigation between pages works smoothly
4. ✅ Browser console shows NO errors

### How to Check the HTML Source:
1. Visit your published site
2. Right-click → "View Page Source"
3. Look for the script tag with src="/assets/index-XXXXXXXX.js"
4. **It should say**: `index-CHt7VZlV.js` (the NEW file)
5. **If it still says**: `index-D_5lelMz.js` (the OLD file) → You haven't redeployed yet!

## 🔍 Debugging Steps if Still Blank

1. **Check the browser console** (F12 → Console tab)
   - Look for errors like "Failed to load resource" or "404 Not Found"
   - If you see 404 for `index-D_5lelMz.js`, the old files are still being served

2. **Check Network tab** (F12 → Network tab)
   - Reload the page
   - Look for the main JavaScript file
   - Check if it's loading successfully (status 200)
   - Check if it says `index-CHt7VZlV.js` or `index-D_5lelMz.js`

3. **Verify deployment logs**
   - Check your hosting platform's deployment logs
   - Ensure the build completed successfully
   - Look for any errors during deployment

## 📝 Build Command Reference

To rebuild locally anytime:
```bash
npm run build
```

The `dist/` folder will contain:
- `index.html` - Entry point
- `_redirects` - Netlify SPA routing rules
- `assets/` folder with JavaScript and CSS bundles

## 🎯 Summary

**The issue is NOT in your code** - the code is working perfectly.

**The issue is in your deployment** - you need to deploy the new build files to replace the old ones that no longer exist.

Follow the deployment steps above, clear all caches, and your site will work perfectly!
