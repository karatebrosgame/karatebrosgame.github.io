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


## Deployment to GitHub Pages

This project is configured for automatic deployment to GitHub Pages at `https://karatebros.github.io`.

### Automatic Deployment (Recommended)

The project includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically builds and deploys your site when you push to the `master` or `main` branch.

**Setup Steps:**

1. **Enable GitHub Pages:**
   - Go to your repository settings on GitHub
   - Navigate to "Pages" in the left sidebar
   - Under "Source", select "GitHub Actions"
   - Save the settings

2. **Push your code:**
   ```bash
   git push -u origin master
   ```

3. **Monitor deployment:**
   - Go to the "Actions" tab in your GitHub repository
   - Watch the workflow run and deploy your site
   - Once complete, your site will be available at `https://karatebros.github.io`

### Manual Deployment

If you prefer to deploy manually:

1. **Build the static site:**
   ```bash
   npm run build
   ```

2. **The static files will be in the `out/` directory**

3. **Push the `out/` directory to the `gh-pages` branch:**
   ```bash
   git subtree push --prefix out origin gh-pages
   ```

### Other Deployment Options

- **Vercel** (recommended for Next.js with full features)
- **Netlify**
- **Any static hosting service**

## Configuration

The site URL is configured in:
- `next.config.js` - Base path and export settings
- `app/layout.tsx` - Metadata base URL
- `app/sitemap.ts` - Sitemap base URL
- `app/robots.ts` - Robots.txt base URL

All use the environment variable `NEXT_PUBLIC_SITE_URL` (defaults to `https://karatebros.github.io`).
