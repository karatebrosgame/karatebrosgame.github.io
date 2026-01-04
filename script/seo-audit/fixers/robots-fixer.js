// Robots.txt generator/fixer
const fs = require('fs-extra');
const path = require('path');
const logger = require('../utils/logger');

class RobotsFixer {
    constructor(metadata) {
        this.metadata = metadata;
    }

    async fix() {
        try {
            const domain = this.metadata?.site?.domain || 'example.com';
            const robotsContent = this.generateRobotsTxt(domain);

            const robotsPath = path.join(process.cwd(), 'public', 'robots.txt');
            await fs.writeFile(robotsPath, robotsContent, 'utf-8');

            logger.success(`Generated robots.txt for ${domain}`);
            return { success: true, path: robotsPath };
        } catch (error) {
            logger.error(`Failed to generate robots.txt: ${error.message}`);
            return { success: false, error: error.message };
        }
    }

    generateRobotsTxt(domain) {
        return `# robots.txt for ${domain}
# Generated on ${new Date().toISOString()}

User-agent: *
Allow: /

# Sitemap
Sitemap: https://${domain}/sitemap.xml

# Disallow admin and private paths
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /static/

# Allow search engines to crawl images
User-agent: Googlebot-Image
Allow: /images/

# Crawl delay (optional)
# Crawl-delay: 1
`;
    }
}

module.exports = RobotsFixer;
