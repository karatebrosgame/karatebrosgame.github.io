// Canonical URL generator/fixer
const fs = require('fs-extra');
const path = require('path');
const logger = require('../utils/logger');

class CanonicalFixer {
    constructor(scanner, metadata) {
        this.scanner = scanner;
        this.metadata = metadata;
    }

    async fix() {
        try {
            const domain = this.metadata?.site?.domain;
            if (!domain) {
                logger.error('Cannot generate canonical: domain not found in meta.json');
                return { success: false, error: 'Domain not found' };
            }

            const indexPath = path.join(this.scanner.componentPath, 'index.tsx');
            let content = await this.scanner.readFile(indexPath);

            if (!content) {
                logger.error('Cannot read index.tsx');
                return { success: false, error: 'Cannot read index.tsx' };
            }

            // Check if canonical already exists
            if (/<link\s+rel=["']canonical["']/i.test(content)) {
                logger.info('Canonical tag already exists, skipping');
                return { success: true, skipped: true };
            }

            // Find the <Head> component and insert canonical tag
            const canonicalTag = `<link rel="canonical" href="https://${domain}/" />`;

            // Insert after <title> tag
            if (/<title>/i.test(content)) {
                content = content.replace(
                    /(<title>.*?<\/title>)/i,
                    `$1\n                    ${canonicalTag}`
                );
            } else {
                // Insert at the beginning of <Head>
                content = content.replace(
                    /(<Head>)/i,
                    `$1\n                    ${canonicalTag}`
                );
            }

            // Write back to file
            await fs.writeFile(indexPath, content, 'utf-8');

            logger.success(`Generated canonical tag for https://${domain}/`);
            return { success: true, path: indexPath, domain };
        } catch (error) {
            logger.error(`Failed to generate canonical tag: ${error.message}`);
            return { success: false, error: error.message };
        }
    }
}

module.exports = CanonicalFixer;
