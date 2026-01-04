// Report generator utility
const fs = require('fs-extra');
const path = require('path');

class Reporter {
    constructor(siteName) {
        this.siteName = siteName;
        this.reportDir = path.join(process.cwd(), 'reports', 'seo-audit');
    }

    /**
     * Generate JSON report
     */
    async generateJSON(results) {
        await fs.ensureDir(this.reportDir);

        const report = {
            site: this.siteName,
            timestamp: new Date().toISOString(),
            score: this.calculateScore(results),
            summary: {
                passed: results.passed?.length || 0,
                warnings: results.warnings?.length || 0,
                errors: results.errors?.length || 0
            },
            checks: results.checks || {},
            details: results
        };

        const filename = `${this.siteName}-${Date.now()}.json`;
        const filepath = path.join(this.reportDir, filename);

        await fs.writeJson(filepath, report, { spaces: 2 });
        return filepath;
    }

    /**
     * Calculate SEO score
     */
    calculateScore(results) {
        const total = (results.passed?.length || 0) +
            (results.warnings?.length || 0) +
            (results.errors?.length || 0);

        if (total === 0) return 0;

        const passed = results.passed?.length || 0;
        const warnings = results.warnings?.length || 0;

        // Passed = 100%, Warnings = 50%, Errors = 0%
        const score = Math.round(((passed + warnings * 0.5) / total) * 100);
        return score;
    }

    /**
     * Generate console summary
     */
    generateConsoleSummary(results) {
        const score = this.calculateScore(results);

        console.log('\n' + '='.repeat(50));
        console.log(`📊 SEO Audit Report for ${this.siteName}`);
        console.log(`Generated: ${new Date().toLocaleString()}`);
        console.log('='.repeat(50));
        console.log(`\n🎯 SEO Score: ${score}/100\n`);

        return score;
    }
}

module.exports = Reporter;
