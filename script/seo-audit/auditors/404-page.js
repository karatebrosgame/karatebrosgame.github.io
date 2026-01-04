// 404 Page auditor
const logger = require('../utils/logger');
const path = require('path');

class NotFoundPageAuditor {
    constructor(scanner) {
        this.scanner = scanner;
    }

    async audit() {
        const results = {
            status: 'pass',
            exists: false,
            hasNoIndex: false,
            hasFollow: false,
            issues: []
        };

        try {
            // Check if 404.tsx exists
            const notFoundPath = path.join(process.cwd(), 'pages', '404.tsx');
            const exists = await this.scanner.fileExists(notFoundPath);

            if (!exists) {
                results.status = 'warning';
                results.exists = false;
                results.issues.push('404.tsx not found');
                logger.warning('404.tsx not found (recommended for better UX)');
                return results;
            }

            results.exists = true;
            const content = await this.scanner.readFile(notFoundPath);

            if (!content) {
                results.status = 'warning';
                results.issues.push('Cannot read 404.tsx');
                logger.warning('Cannot read 404.tsx');
                return results;
            }

            // Check for noindex meta tag
            if (/name=["']robots["']\s+content=["'][^"']*noindex[^"']*["']/i.test(content)) {
                results.hasNoIndex = true;
            } else {
                results.status = 'warning';
                results.issues.push('404 page missing noindex meta tag');
                logger.warning('404 page should have noindex meta tag');
            }

            // Check for follow directive
            if (/name=["']robots["']\s+content=["'][^"']*follow[^"']*["']/i.test(content)) {
                results.hasFollow = true;
            } else {
                logger.info('404 page could include follow directive (optional)');
            }

            if (results.hasNoIndex) {
                logger.success('404 page has proper SEO meta tags');
            }

        } catch (error) {
            results.status = 'error';
            results.issues.push(error.message);
            logger.error(`404 page check error: ${error.message}`);
        }

        return results;
    }
}

module.exports = NotFoundPageAuditor;
