// Sitemap.xml auditor
const logger = require('../utils/logger');
const path = require('path');

class SitemapAuditor {
    constructor(scanner) {
        this.scanner = scanner;
    }

    async audit() {
        const results = {
            status: 'pass',
            exists: false,
            content: null,
            lastModified: null
        };

        try {
            const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
            const exists = await this.scanner.fileExists(sitemapPath);

            if (!exists) {
                results.status = 'warning';
                results.exists = false;
                logger.warning('sitemap.xml not found');
            } else {
                results.exists = true;
                results.content = await this.scanner.readFile(sitemapPath);

                // Check if sitemap has current date
                const today = new Date().toISOString().split('T')[0];
                if (results.content && results.content.includes(today)) {
                    logger.success('sitemap.xml exists and is up to date');
                } else {
                    results.status = 'warning';
                    logger.warning('sitemap.xml exists but may be outdated');
                }
            }

        } catch (error) {
            results.status = 'error';
            logger.error(`Sitemap check error: ${error.message}`);
        }

        return results;
    }
}

module.exports = SitemapAuditor;
