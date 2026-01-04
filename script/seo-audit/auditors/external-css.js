// External CSS checker auditor
const logger = require('../utils/logger');

class ExternalCSSAuditor {
    constructor(scanner) {
        this.scanner = scanner;
    }

    async audit() {
        const results = {
            status: 'pass',
            externalCSS: [],
            issues: []
        };

        try {
            const indexPath = require('path').join(this.scanner.componentPath, 'index.tsx');
            const content = await this.scanner.readFile(indexPath);

            if (!content) {
                results.status = 'error';
                results.issues.push('index.tsx not found');
                logger.error('External CSS check failed: index.tsx not found');
                return results;
            }

            // Check for external CSS links
            const externalLinks = this.findExternalCSS(content);

            if (externalLinks.length === 0) {
                logger.success('No external CSS dependencies found');
            } else {
                // Check if using China-friendly CDN
                const hasChinaCDN = externalLinks.some(link =>
                    link.includes('fonts.font.im') ||
                    link.includes('fonts.loli.net') ||
                    link.includes('fonts.geekzu.org')
                );

                const hasGoogleFonts = externalLinks.some(link =>
                    link.includes('fonts.googleapis.com')
                );

                if (hasGoogleFonts) {
                    results.status = 'warning';
                    results.issues.push('Using Google Fonts (slow in China)');
                    logger.warning('Google Fonts detected (consider using China CDN: fonts.font.im)');
                } else if (hasChinaCDN) {
                    logger.success('Using China-friendly CDN for fonts');
                }

                results.externalCSS = externalLinks;
                externalLinks.forEach(link => {
                    logger.info(`  External CSS: ${link}`);
                });
            }

        } catch (error) {
            results.status = 'error';
            results.issues.push(error.message);
            logger.error(`External CSS check error: ${error.message}`);
        }

        return results;
    }

    findExternalCSS(content) {
        const links = [];
        const linkRegex = /<link[^>]+href=["']([^"']+)["'][^>]*>/gi;
        let match;

        while ((match = linkRegex.exec(content)) !== null) {
            const href = match[1];
            // Check if it's external (starts with http/https)
            if (href.startsWith('http://') || href.startsWith('https://')) {
                // Check if it's CSS
                if (href.includes('.css') || href.includes('fonts')) {
                    links.push(href);
                }
            }
        }

        return links;
    }
}

module.exports = ExternalCSSAuditor;
