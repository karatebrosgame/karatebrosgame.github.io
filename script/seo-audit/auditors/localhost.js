// Localhost reference checker
const logger = require('../utils/logger');
const config = require('../config');

class LocalhostAuditor {
    constructor(scanner, metadata) {
        this.scanner = scanner;
        this.metadata = metadata;
        this.rules = config.rules.localhost;
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

                const findings = this.findLocalhostReferences(content, file);
                if (findings.length > 0) {
                    results.findings.push(...findings);
                    results.status = 'error';
                }
            }

            if (results.findings.length === 0) {
                logger.success('No localhost references found');
            } else {
                const domain = this.metadata?.site?.domain || 'your-domain.com';
                results.findings.forEach(finding => {
                    logger.error(`Localhost reference found in ${finding.file}:${finding.line}`);
                    logger.info(`  Suggestion: Replace with https://${domain}`);
                });
            }

        } catch (error) {
            results.status = 'error';
            results.findings.push({ error: error.message });
            logger.error(`Localhost check error: ${error.message}`);
        }

        return results;
    }

    findLocalhostReferences(content, filePath) {
        const findings = [];
        const lines = content.split('\n');
        const fileName = require('path').basename(filePath);

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];

            // Skip comments
            if (line.trim().startsWith('//') || line.trim().startsWith('/*')) {
                continue;
            }

            // Check each pattern
            for (const pattern of this.rules.patterns) {
                if (pattern.test(line)) {
                    findings.push({
                        file: fileName,
                        line: i + 1,
                        context: line.trim()
                    });
                    break; // Only report once per line
                }
            }
        }

        return findings;
    }
}

module.exports = LocalhostAuditor;
