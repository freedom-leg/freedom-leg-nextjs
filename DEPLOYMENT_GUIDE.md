# Freedom Leg Next.js - Deployment Guide

## Quick Deploy to Vercel (Recommended)

Vercel is the fastest and easiest way to deploy your Next.js application. It's made by the creators of Next.js and offers:

- Automatic deployments on every git push
- Free SSL certificates
- Global CDN
- Automatic scaling
- Zero configuration needed

### Step 1: Push to GitHub

1. Create a new repository on GitHub
2. Push your `nextjs-version` folder to GitHub:

```bash
cd nextjs-version
git init
git add .
git commit -m "Initial Next.js version"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up or log in with GitHub
3. Click "Add New Project"
4. Import your GitHub repository
5. Vercel will automatically detect Next.js
6. Configure environment variables:
   - Click "Environment Variables"
   - Add `NEXT_PUBLIC_SUPABASE_URL` with your Supabase URL
   - Add `NEXT_PUBLIC_SUPABASE_ANON_KEY` with your Supabase anon key
7. Click "Deploy"

That's it! Your site will be live in ~2 minutes at `https://your-project.vercel.app`

### Step 3: Custom Domain (Optional)

1. In Vercel dashboard, go to Settings → Domains
2. Add your custom domain (e.g., freedomleg.com)
3. Follow the DNS instructions provided
4. SSL certificate is automatically provisioned

## Alternative: Deploy via CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (first time will ask questions)
vercel

# Deploy to production
vercel --prod
```

## Environment Variables Reference

Your `.env.local` should contain:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## Post-Deployment Checklist

After deployment, verify:

1. **Homepage Gallery** loads at your domain
2. **Modal Version** accessible at `/modal`
3. **Hybrid Version** accessible at `/hybrid`
4. **View Page Source** (Ctrl+U) shows all content in HTML
5. **Mobile responsive** on phone/tablet
6. **All modals work** correctly
7. **Forms function** properly
8. **Images load** correctly

## Testing SEO

### View Page Source
- Go to your deployed URL
- Press `Ctrl+U` (Windows) or `Cmd+Option+U` (Mac)
- Verify all content is visible in the HTML

### Google Rich Results Test
1. Go to https://search.google.com/test/rich-results
2. Enter your URL
3. Verify no errors

### Social Media Preview
- Test on [metatags.io](https://metatags.io)
- Check how your site appears on Facebook, Twitter, LinkedIn

## Continuous Deployment

Once set up, every time you push to GitHub:

1. Vercel automatically detects the push
2. Builds your Next.js application
3. Deploys to a preview URL
4. Main branch deploys to production

## Troubleshooting

### Build Fails

Check the build logs in Vercel dashboard. Common issues:

- Missing environment variables
- TypeScript errors
- Missing dependencies

### Environment Variables Not Working

- Ensure they start with `NEXT_PUBLIC_` for client access
- Redeploy after adding/changing environment variables
- Check they're set in the correct environment (Production/Preview)

### Images Not Loading

- Verify image URLs are correct
- Check if external domains need to be added to `next.config.mjs`

## Rolling Back

If a deployment has issues:

1. Go to Vercel dashboard
2. Click on "Deployments"
3. Find a previous working deployment
4. Click the three dots → "Promote to Production"

## Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Vercel Support](https://vercel.com/support)

## Cost

Vercel Free Tier includes:
- Unlimited deployments
- 100GB bandwidth/month
- Automatic SSL
- Perfect for this project!

Upgrade only if you need more bandwidth or team features.
