// Robots.txt auditor
const logger = require('../utils/logger');
const path = require('path');

class RobotsAuditor {
    constructor(scanner) {
        this.scanner = scanner;
    }

    async audit() {
        const results = {
            status: 'pass',
            exists: false,
            content: null
        };

        try {
            const robotsPath = path.join(process.cwd(), 'public', 'robots.txt');
            const exists = await this.scanner.fileExists(robotsPath);

            if (!exists) {
                results.status = 'warning';
                results.exists = false;
                logger.warning('robots.txt not found');
            } else {
                results.exists = true;
                results.content = await this.scanner.readFile(robotsPath);
                logger.success('robots.txt exists');
            }

        } catch (error) {
            results.status = 'error';
            logger.error(`Robots.txt check error: ${error.message}`);
        }

        return results;
    }
}

module.exports = RobotsAuditor;
