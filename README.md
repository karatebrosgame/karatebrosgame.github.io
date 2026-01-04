# Karate Bros - Official Online Game

A Next.js-based SEO-friendly website for playing Karate Bros online.

## Features

- ✅ Server-side rendering for better search engine indexing
- ✅ Automatic sitemap and robots.txt generation
- ✅ Open Graph and Twitter Card metadata
- ✅ Responsive design with Tailwind CSS
- ✅ Fast performance with Next.js optimizations

## Getting Started

**Prerequisites:** Node.js 18+ and npm

1. Install dependencies:
   ```bash
   npm install
   ```

2. (Optional) Set environment variables in `.env.local`:
   ```env
   NEXT_PUBLIC_SITE_URL=https://karatebros.github.io
   GEMINI_API_KEY=your-api-key-here
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build for Production

```bash
npm run build
npm start
```

## SEO Features

- Comprehensive metadata in `app/layout.tsx`
- Automatic sitemap generation (`app/sitemap.ts`)
- Robots.txt configuration (`app/robots.ts`)
- Semantic HTML structure
- Open Graph tags for social sharing
- Twitter Card support

## Project Structure

```
├── app/              # Next.js App Router
│   ├── layout.tsx    # Root layout with SEO metadata
│   ├── page.tsx      # Home page
│   ├── globals.css   # Global styles
│   ├── sitemap.ts    # Sitemap generation
│   └── robots.ts     # Robots.txt generation
├── components/       # React components
│   ├── Navbar.tsx
│   ├── GameFrame.tsx
│   ├── ContentSection.tsx
│   └── Footer.tsx


## Deployment

This project can be deployed to:
- Vercel (recommended for Next.js)
- GitHub Pages (with static export)
- Any Node.js hosting platform

For GitHub Pages, you may need to configure `next.config.js` with `output: 'export'` for static export.
