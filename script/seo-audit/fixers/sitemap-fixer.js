// Sitemap.xml generator/fixer
const fs = require('fs-extra');
const path = require('path');
const logger = require('../utils/logger');
const config = require('../config');

class SitemapFixer {
    constructor(metadata) {
        this.metadata = metadata;
        this.config = config.rules.sitemap;
    }

    async fix() {
        try {
            const domain = this.metadata?.site?.domain || 'example.com';
            const sitemapContent = this.generateSitemap(domain);

            const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
            await fs.writeFile(sitemapPath, sitemapContent, 'utf-8');

            logger.success(`Generated sitemap.xml for ${domain}`);
            return { success: true, path: sitemapPath };
        } catch (error) {
            logger.error(`Failed to generate sitemap.xml: ${error.message}`);
            return { success: false, error: error.message };
        }
    }

    generateSitemap(domain) {
        const today = new Date().toISOString().split('T')[0];
        const changefreq = this.config.changefreq;
        const priority = this.config.priority;

        return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://${domain}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>
  <!-- Add more URLs as needed -->
</urlset>
`;
    }
}

module.exports = SitemapFixer;
