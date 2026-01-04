// Hardcoded dates detector
const logger = require('../utils/logger');
const config = require('../config');

class HardcodedDatesAuditor {
    constructor(scanner) {
        this.scanner = scanner;
        this.rules = config.rules.hardcodedDates;
    }

    async audit() {
        const results = {
            status: 'pass',
            findings: []
        };

        try {
            const files = await this.scanner.scanComponents();

            for (const file of files) {
                const content = await this.scanner.readFile(file);
                if (!content) continue;

                const findings = this.findHardcodedDates(content, file);
                if (findings.length > 0) {
                    results.findings.push(...findings);
                    results.status = 'error';
                }
            }

            if (results.findings.length === 0) {
                logger.success('No hardcoded dates found');
            } else {
                results.findings.forEach(finding => {
                    logger.error(`Hardcoded date found: ${finding.value} in ${finding.file}:${finding.line}`);
                });
            }

        } catch (error) {
            results.status = 'error';
            results.findings.push({ error: error.message });
            logger.error(`Hardcoded dates check error: ${error.message}`);
        }

        return results;
    }

    findHardcodedDates(content, filePath) {
        const findings = [];
        const lines = content.split('\n');
        const fileName = require('path').basename(filePath);

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];

            // Skip if line matches exclude patterns
            if (this.shouldExclude(line)) {
                continue;
            }

            // Check each pattern
            for (const pattern of this.rules.patterns) {
                const matches = line.match(pattern);
                if (matches) {
                    findings.push({
                        file: fileName,
                        line: i + 1,
                        value: matches[0],
                        context: line.trim()
                    });
                }
            }
        }

        return findings;
    }

    shouldExclude(line) {
        for (const pattern of this.rules.excludePatterns) {
            if (pattern.test(line)) {
                return true;
            }
        }
        return false;
    }
}

module.exports = HardcodedDatesAuditor;
