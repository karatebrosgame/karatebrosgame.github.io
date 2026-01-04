// OG Image auditor
const logger = require('../utils/logger');
const path = require('path');

class OGImageAuditor {
    constructor(scanner, metadata) {
        this.scanner = scanner;
        this.metadata = metadata;
    }

    async audit() {
        const results = {
            status: 'pass',
            ogImageTag: false,
            imageExists: false,
            imagePath: null,
            issues: []
        };

        try {
            const indexPath = path.join(this.scanner.componentPath, 'index.tsx');
            const content = await this.scanner.readFile(indexPath);

            if (!content) {
                results.status = 'error';
                results.issues.push('index.tsx not found');
                logger.error('OG image check failed: index.tsx not found');
                return results;
            }

            // Check for og:image meta tag
            const ogImageMatch = content.match(/property=["']og:image["']\s+content=["']([^"']+)["']/i) ||
                content.match(/content=["']([^"']+)["']\s+property=["']og:image["']/i);

            if (ogImageMatch) {
                results.ogImageTag = true;
                results.imagePath = ogImageMatch[1];

                // Check if image file exists
                const imagePath = path.join(process.cwd(), 'public', results.imagePath.replace(/^\//, ''));
                const exists = await this.scanner.fileExists(imagePath);

                if (exists) {
                    results.imageExists = true;
                    logger.success(`OG image found: ${results.imagePath}`);
                } else {
                    results.status = 'warning';
                    results.issues.push(`OG image file not found: ${results.imagePath}`);
                    logger.warning(`OG image tag exists but file not found: ${results.imagePath}`);
                }
            } else {
                results.status = 'warning';
                results.issues.push('Missing og:image meta tag');
                logger.warning('Missing og:image meta tag (recommended for social sharing)');
            }

        } catch (error) {
            results.status = 'error';
            results.issues.push(error.message);
            logger.error(`OG image check error: ${error.message}`);
        }

        return results;
    }
}

module.exports = OGImageAuditor;
