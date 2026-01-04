// External images checker auditor
const logger = require('../utils/logger');

class ExternalImagesAuditor {
    constructor(scanner) {
        this.scanner = scanner;
    }

    async audit() {
        const results = {
            status: 'pass',
            externalImages: [],
            issues: []
        };

        try {
            const files = await this.scanner.scanComponents();

            for (const file of files) {
                const content = await this.scanner.readFile(file);
                if (!content) continue;

                const findings = this.findExternalImages(content, file);
                if (findings.length > 0) {
                    results.externalImages.push(...findings);
                }
            }

            if (results.externalImages.length === 0) {
                logger.success('No external image dependencies found');
            } else {
                results.status = 'warning';
                results.issues.push(`Found ${results.externalImages.length} external image(s)`);

                logger.warning(`Found ${results.externalImages.length} external image dependencies:`);

                // Group by domain
                const byDomain = {};
                results.externalImages.forEach(img => {
                    const domain = this.extractDomain(img.url);
                    if (!byDomain[domain]) byDomain[domain] = [];
                    byDomain[domain].push(img);
                });

                // Display grouped results
                Object.keys(byDomain).forEach(domain => {
                    logger.warning(`  ${domain}: ${byDomain[domain].length} image(s)`);
                    byDomain[domain].forEach(img => {
                        logger.info(`    - ${img.file}:${img.line}`);
                        logger.info(`      ${img.url}`);
                    });
                });

                logger.info('\n💡 Recommendation: Download external images to /public/images/ for:');
                logger.info('   - Faster loading (no external requests)');
                logger.info('   - Better reliability (no dependency on external services)');
                logger.info('   - Improved SEO (all resources self-hosted)');
            }

        } catch (error) {
            results.status = 'error';
            results.issues.push(error.message);
            logger.error(`External images check error: ${error.message}`);
        }

        return results;
    }

    findExternalImages(content, filePath) {
        const findings = [];
        const lines = content.split('\n');
        const fileName = require('path').basename(filePath);

        // Patterns for external images
        const patterns = [
            // src="https://..."
            /src=["']https?:\/\/[^"']+\.(jpg|jpeg|png|gif|webp|svg|ico)[^"']*["']/gi,
            // src={`https://...`}
            /src=\{`https?:\/\/[^`]+\.(jpg|jpeg|png|gif|webp|svg|ico)[^`]*`\}/gi,
            // picsum.photos and other image services
            /https?:\/\/(picsum\.photos|unsplash\.com|placeholder\.com|via\.placeholder\.com|placehold\.it|lorempixel\.com)[^\s"'`<>]*/gi,
        ];

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];

            patterns.forEach(pattern => {
                const matches = line.matchAll(pattern);
                for (const match of matches) {
                    let url = match[0];

                    // Extract URL from src attribute
                    if (url.includes('src=')) {
                        url = url.match(/https?:\/\/[^\s"'`]+/)?.[0] || url;
                    }

                    findings.push({
                        file: fileName,
                        line: i + 1,
                        url: url,
                        context: line.trim()
                    });
                }
            });
        }

        return findings;
    }

    extractDomain(url) {
        try {
            const urlObj = new URL(url);
            return urlObj.hostname;
        } catch {
            return 'unknown';
        }
    }
}

module.exports = ExternalImagesAuditor;
