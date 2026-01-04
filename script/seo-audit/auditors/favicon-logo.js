// Favicon and logo optimization auditor
const logger = require('../utils/logger');
const path = require('path');
const fs = require('fs-extra');

class FaviconLogoAuditor {
    constructor(scanner) {
        this.scanner = scanner;
    }

    async audit() {
        const results = {
            status: 'pass',
            favicon: null,
            logos: [],
            issues: []
        };

        try {
            // Check favicon
            await this.checkFavicon(results);

            // Check logos in components
            await this.checkLogos(results);

            // Set final status
            if (results.issues.length > 0) {
                results.status = 'warning';
            }

        } catch (error) {
            results.status = 'error';
            results.issues.push(error.message);
            logger.error(`Favicon/Logo audit error: ${error.message}`);
        }

        return results;
    }

    async checkFavicon(results) {
        const faviconPath = path.join(this.scanner.siteDir, '../../public/favicon.ico');

        if (await fs.pathExists(faviconPath)) {
            const stats = await fs.stat(faviconPath);
            const sizeKB = (stats.size / 1024).toFixed(1);

            results.favicon = {
                exists: true,
                size: stats.size,
                sizeKB: sizeKB
            };

            logger.success(`✓ Favicon found: ${sizeKB} KB`);

            // Check if favicon is too large
            if (stats.size > 50 * 1024) { // 50KB
                results.issues.push(`Favicon is too large (${sizeKB} KB). Recommended: < 50 KB`);
                logger.warning(`⚠ Favicon is ${sizeKB} KB (recommended < 50 KB)`);
            }

            // Recommend modern formats
            logger.info('💡 Consider adding favicon.png, favicon.svg, or apple-touch-icon.png');
        } else {
            results.favicon = { exists: false };
            results.issues.push('Favicon not found at /public/favicon.ico');
            logger.error('❌ Favicon not found');
        }
    }

    async checkLogos(results) {
        const files = await this.scanner.scanComponents();
        const logoPattern = /\/(images|assets)\/[^"']*(?:logo|avatar|icon)[^"']*/gi;
        const foundLogos = new Set();

        for (const file of files) {
            const content = await this.scanner.readFile(file);
            if (!content) continue;

            const matches = content.match(logoPattern);
            if (matches) {
                matches.forEach(match => foundLogos.add(match));
            }
        }

        if (foundLogos.size > 0) {
            logger.info(`\n🖼️  Found ${foundLogos.size} logo/icon reference(s):`);

            for (const logoPath of foundLogos) {
                // Try to find the actual file
                const fullPath = path.join(this.scanner.siteDir, '../../public', logoPath);

                if (await fs.pathExists(fullPath)) {
                    const stats = await fs.stat(fullPath);
                    const sizeKB = (stats.size / 1024).toFixed(1);

                    results.logos.push({
                        path: logoPath,
                        size: stats.size,
                        sizeKB: sizeKB
                    });

                    logger.info(`  - ${logoPath}: ${sizeKB} KB`);

                    // Check if logo is too large
                    if (stats.size > 200 * 1024) { // 200KB
                        results.issues.push(`Logo ${logoPath} is too large (${sizeKB} KB). Recommended: < 200 KB`);
                        logger.warning(`    ⚠ Too large (recommended < 200 KB)`);
                    }

                    // Check if it's PNG and suggest WebP
                    if (logoPath.endsWith('.png') && stats.size > 50 * 1024) {
                        results.issues.push(`Consider converting ${logoPath} to WebP format`);
                        logger.info(`    💡 Consider converting to WebP (could save ~${(sizeKB * 0.7).toFixed(1)} KB)`);
                    }

                    // Check avatar size (should be small)
                    if (logoPath.includes('avatar') && stats.size > 100 * 1024) {
                        results.issues.push(`Avatar ${logoPath} is too large (${sizeKB} KB). Recommended: < 100 KB`);
                        logger.warning(`    ⚠ Avatar should be < 100 KB`);
                    }
                } else {
                    logger.warning(`  - ${logoPath}: File not found`);
                }
            }
        } else {
            logger.info('No logo/icon references found in components');
        }
    }
}

module.exports = FaviconLogoAuditor;
