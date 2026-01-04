// Canonical tag auditor
const logger = require('../utils/logger');

class CanonicalAuditor {
    constructor(scanner, metadata) {
        this.scanner = scanner;
        this.metadata = metadata;
    }

    async audit() {
        const results = {
            status: 'pass',
            issues: []
        };

        try {
            // Read index.tsx
            const indexPath = require('path').join(this.scanner.componentPath, 'index.tsx');
            const content = await this.scanner.readFile(indexPath);

            if (!content) {
                results.status = 'error';
                results.issues.push('index.tsx not found');
                logger.error('Canonical check failed: index.tsx not found');
                return results;
            }

            // Check for canonical tag
            const hasCanonical = /<link\s+rel=["']canonical["']/i.test(content);

            if (!hasCanonical) {
                results.status = 'warning';
                results.issues.push('No canonical tag found');
                logger.warning('No canonical tag found in index.tsx');
            } else {
                // Extract canonical URL
                const canonicalMatch = content.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);

                if (canonicalMatch) {
                    const canonicalUrl = canonicalMatch[1];
                    const expectedDomain = this.metadata?.site?.domain;

                    if (expectedDomain && !canonicalUrl.includes(expectedDomain)) {
                        results.status = 'warning';
                        results.issues.push(`Canonical URL doesn't match domain: ${canonicalUrl}`);
                        logger.warning(`Canonical URL mismatch: ${canonicalUrl} (expected: ${expectedDomain})`);
                    } else {
                        logger.success('Canonical tag present and correct');
                    }
                } else {
                    logger.success('Canonical tag found');
                }
            }

        } catch (error) {
            results.status = 'error';
            results.issues.push(error.message);
            logger.error(`Canonical check error: ${error.message}`);
        }

        return results;
    }
}

module.exports = CanonicalAuditor;
