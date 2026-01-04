/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Enable static export for GitHub Pages
  output: 'export',
  // Base path for GitHub Pages (empty if using karatebros.github.io)
  // If your repo is named differently, set basePath: '/repo-name'
  basePath: '',
  // Trailing slash for GitHub Pages compatibility
  trailingSlash: true,
  images: {
    unoptimized: true, // Required for static export
  },
  // Environment variables
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
}

module.exports = nextConfig

