# Freedom Leg - Next.js Version

This is a Next.js 14 implementation of the Freedom Leg website with full SEO optimization and server-side rendering.

## Features

- **Two Homepage Versions**:
  - **Modal Version** (`/modal`): Content in interactive modals with sticky footer
  - **Hybrid Version** (`/hybrid`): Inline content with modal interactions

- **Gallery Hub** (`/`): Testing page to access both versions

- **Full SEO Optimization**:
  - Server-side rendering for instant search engine visibility
  - Comprehensive meta tags and Open Graph data
  - Twitter Card support
  - All content visible in page source

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
cd nextjs-version
npm install
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url-here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key-here
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the Gallery hub.

- Modal Version: [http://localhost:3000/modal](http://localhost:3000/modal)
- Hybrid Version: [http://localhost:3000/hybrid](http://localhost:3000/hybrid)

### Build

Build for production:

```bash
npm run build
```

Start production server:

```bash
npm start
```

## Deployment to Vercel

### Option 1: One-Click Deploy

1. Push this code to a GitHub repository
2. Go to [vercel.com](https://vercel.com)
3. Click "Add New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Next.js
6. Add environment variables in the Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
7. Click "Deploy"

### Option 2: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Environment Variables in Vercel

1. Go to your project dashboard on Vercel
2. Navigate to Settings → Environment Variables
3. Add:
   - `NEXT_PUBLIC_SUPABASE_URL` = Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = Your Supabase anonymous key

## Project Structure

```
nextjs-version/
├── app/
│   ├── layout.tsx          # Root layout with global metadata
│   ├── page.tsx            # Gallery hub homepage
│   ├── globals.css         # Global styles
│   ├── modal/
│   │   ├── layout.tsx      # Modal version metadata
│   │   └── page.tsx        # Modal version page
│   └── hybrid/
│       ├── layout.tsx      # Hybrid version metadata
│       └── page.tsx        # Hybrid version page
├── components/
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── ReviewSection.tsx
│   ├── CTASection.tsx
│   ├── StickyFooter.tsx
│   ├── PricingBadge.tsx
│   ├── inline/             # Inline content sections
│   │   ├── VideoSection.tsx
│   │   ├── ComparisonSection.tsx
│   │   ├── HowItWorksSection.tsx
│   │   └── OrderSection.tsx
│   └── modals/             # Modal components
│       ├── Modal.tsx
│       ├── QuizModal.tsx
│       ├── VideoModal.tsx
│       ├── ComparisonModal.tsx
│       ├── HowItWorksModal.tsx
│       ├── QuickAnswersModal.tsx
│       ├── OrderModal.tsx
│       └── SizingGuideModal.tsx
├── lib/
│   └── supabase.ts         # Supabase client configuration
└── package.json
```

## SEO Features

- All content visible to search engines without JavaScript
- Optimized meta tags for social media sharing
- Fast initial page load with server-side rendering
- Mobile-first responsive design
- Proper semantic HTML structure

## Testing

### What to Test:

1. **Interactive Elements**:
   - All buttons and modals
   - Smooth scrolling
   - Form submissions

2. **Responsive Design**:
   - Mobile (320px+)
   - Tablet (768px+)
   - Desktop (1024px+)

3. **SEO Verification**:
   - View page source (Ctrl+U or Cmd+U)
   - Verify all content is in HTML
   - Check meta tags are present
   - Test with Google Rich Results Test

### Browser Testing:

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

### Build Errors

If you encounter build errors:

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Try building again
npm run build
```

### Environment Variables Not Working

- Ensure variables start with `NEXT_PUBLIC_` for client-side access
- Restart the development server after adding new variables
- Check `.env.local` is in the project root

## Support

For issues or questions, refer to:
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
