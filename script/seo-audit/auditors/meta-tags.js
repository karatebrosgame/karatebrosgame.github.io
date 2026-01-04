// Meta tags auditor
const logger = require('../utils/logger');
const config = require('../config');

class MetaTagsAuditor {
    constructor(scanner, metadata) {
        this.scanner = scanner;
        this.metadata = metadata;
        this.rules = config.rules.metaTags;
    }

    async audit() {
        const results = {
            status: 'pass',
            issues: [],
            tags: {}
        };

        try {
            // Check meta.json first
            if (!this.metadata?.site) {
                results.status = 'error';
                results.issues.push('meta.json not found or invalid');
                logger.error('Meta tags check failed: meta.json not found');
                return results;
            }

            const site = this.metadata.site;

            // Check required tags
            for (const tag of this.rules.required) {
                if (!site[tag]) {
                    results.status = 'error';
                    results.issues.push(`Missing required tag: ${tag}`);
                    logger.error(`Missing required meta tag: ${tag}`);
                } else {
                    results.tags[tag] = site[tag];
                }
            }

            // Check title length
            if (site.title) {
                const titleLength = site.title.length;
                if (titleLength < this.rules.titleLength.min || titleLength > this.rules.titleLength.max) {
                    results.status = results.status === 'error' ? 'error' : 'warning';
                    results.issues.push(`Title length: ${titleLength} chars (recommended: ${this.rules.titleLength.min}-${this.rules.titleLength.max})`);
                    logger.warning(`Title length: ${titleLength} chars (recommended: ${this.rules.titleLength.min}-${this.rules.titleLength.max})`);
                }
            }

            // Check description length
            if (site.description) {
                const descLength = site.description.length;
                if (descLength < this.rules.descriptionLength.min || descLength > this.rules.descriptionLength.max) {
                    results.status = results.status === 'error' ? 'error' : 'warning';
                    results.issues.push(`Description length: ${descLength} chars (recommended: ${this.rules.descriptionLength.min}-${this.rules.descriptionLength.max})`);
                    logger.warning(`Description length: ${descLength} chars (recommended: ${this.rules.descriptionLength.min}-${this.rules.descriptionLength.max})`);
                }
            }

            // Check for recommended OG tags
            const indexPath = require('path').join(this.scanner.componentPath, 'index.tsx');
            const content = await this.scanner.readFile(indexPath);

            if (content) {
                for (const ogTag of this.rules.recommended) {
                    const hasTag = new RegExp(`property=["']${ogTag}["']`, 'i').test(content);
                    if (!hasTag) {
                        results.status = results.status === 'error' ? 'error' : 'warning';
                        results.issues.push(`Missing recommended tag: ${ogTag}`);
                        logger.warning(`Missing recommended meta tag: ${ogTag}`);
                    }
                }
            }

            if (results.status === 'pass') {
                logger.success('All meta tags present and valid');
            }

        } catch (error) {
            results.status = 'error';
            results.issues.push(error.message);
            logger.error(`Meta tags check error: ${error.message}`);
        }

        return results;
    }
}

module.exports = MetaTagsAuditor;
