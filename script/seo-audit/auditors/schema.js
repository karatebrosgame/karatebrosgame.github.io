// Schema.org structured data auditor
const logger = require('../utils/logger');
const path = require('path');

class SchemaAuditor {
    constructor(scanner) {
        this.scanner = scanner;
    }

    async audit() {
        const results = {
            status: 'pass',
            schemas: [],
            issues: []
        };

        try {
            // Check index.tsx for JSON-LD structured data
            const indexPath = path.join(this.scanner.siteDir, 'index.tsx');
            const content = await this.scanner.readFile(indexPath);

            if (!content) {
                results.status = 'fail';
                results.issues.push('index.tsx not found');
                logger.error('index.tsx not found');
                return results;
            }

            // Find JSON-LD script tags
            const jsonLdMatches = content.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi);

            if (!jsonLdMatches || jsonLdMatches.length === 0) {
                results.status = 'fail';
                results.issues.push('No Schema.org JSON-LD found in index.tsx');
                logger.error('❌ No Schema.org structured data found');
                logger.info('💡 Add JSON-LD script in <Head> with @type: WebSite, Organization, Article');
                return results;
            }

            // Parse and validate each JSON-LD block
            for (const match of jsonLdMatches) {
                try {
                    // Extract JSON content
                    const jsonContent = match.match(/dangerouslySetInnerHTML=\{\{[\s\S]*?__html:\s*JSON\.stringify\(([\s\S]*?)\)/);

                    if (jsonContent) {
                        // Try to evaluate the schema structure
                        const schemaText = jsonContent[1];

                        // Check for required schema types
                        const hasWebSite = schemaText.includes('"@type": "WebSite"') || schemaText.includes("'@type': 'WebSite'");
                        const hasOrganization = schemaText.includes('"@type": "Organization"') || schemaText.includes("'@type': 'Organization'");
                        const hasArticle = schemaText.includes('"@type": "Article"') || schemaText.includes("'@type': 'Article'");

                        if (hasWebSite) {
                            results.schemas.push({ type: 'WebSite', found: true });
                            logger.success('✓ WebSite schema found');
                        }

                        if (hasOrganization) {
                            results.schemas.push({ type: 'Organization', found: true });
                            logger.success('✓ Organization schema found');
                        }

                        if (hasArticle) {
                            results.schemas.push({ type: 'Article', found: true });
                            logger.success('✓ Article schema found');

                            // Check for important Article properties
                            const hasHeadline = schemaText.includes('headline');
                            const hasAuthor = schemaText.includes('author');
                            const hasPublisher = schemaText.includes('publisher');
                            const hasDatePublished = schemaText.includes('datePublished');
                            const hasDateModified = schemaText.includes('dateModified');
                            const hasImage = schemaText.includes('image');

                            if (!hasHeadline) results.issues.push('Article schema missing "headline"');
                            if (!hasAuthor) results.issues.push('Article schema missing "author"');
                            if (!hasPublisher) results.issues.push('Article schema missing "publisher"');
                            if (!hasDatePublished) results.issues.push('Article schema missing "datePublished"');
                            if (!hasDateModified) results.issues.push('Article schema missing "dateModified"');
                            if (!hasImage) results.issues.push('Article schema missing "image"');
                        }

                        // Recommendations for missing schemas
                        if (!hasWebSite) {
                            results.issues.push('Missing WebSite schema');
                            logger.warning('⚠ WebSite schema not found');
                        }

                        if (!hasOrganization) {
                            results.issues.push('Missing Organization schema');
                            logger.warning('⚠ Organization schema not found');
                        }

                        if (!hasArticle) {
                            results.issues.push('Missing Article schema');
                            logger.warning('⚠ Article schema not found');
                        }

                    }
                } catch (parseError) {
                    results.issues.push(`Failed to parse JSON-LD: ${parseError.message}`);
                    logger.error(`Error parsing JSON-LD: ${parseError.message}`);
                }
            }

            // Set final status
            if (results.schemas.length === 0) {
                results.status = 'fail';
            } else if (results.issues.length > 0) {
                results.status = 'warning';
            }

            // Summary
            if (results.schemas.length > 0) {
                logger.info(`\n📊 Found ${results.schemas.length} schema type(s)`);
            }

            if (results.issues.length > 0) {
                logger.warning(`\n⚠ ${results.issues.length} issue(s) found:`);
                results.issues.forEach(issue => logger.warning(`  - ${issue}`));
            }

        } catch (error) {
            results.status = 'error';
            results.issues.push(error.message);
            logger.error(`Schema audit error: ${error.message}`);
        }

        return results;
    }
}

module.exports = SchemaAuditor;
