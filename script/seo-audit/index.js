#!/usr/bin/env node

// SEO Audit - Main Entry Point
const FileScanner = require('./utils/file-scanner');
const logger = require('./utils/logger');
const Reporter = require('./utils/reporter');

// Auditors
const CanonicalAuditor = require('./auditors/canonical');
const MetaTagsAuditor = require('./auditors/meta-tags');
const RobotsAuditor = require('./auditors/robots');
const SitemapAuditor = require('./auditors/sitemap');
const HardcodedDatesAuditor = require('./auditors/hardcoded-dates');
const LocalhostAuditor = require('./auditors/localhost');
const SchemaAuditor = require('./auditors/schema');
const OGImageAuditor = require('./auditors/og-image');
const NotFoundPageAuditor = require('./auditors/404-page');
const ExternalCSSAuditor = require('./auditors/external-css');
const ExternalImagesAuditor = require('./auditors/external-images');
const FaviconLogoAuditor = require('./auditors/favicon-logo');

// Fixers
const RobotsFixer = require('./fixers/robots-fixer');
const SitemapFixer = require('./fixers/sitemap-fixer');
const CanonicalFixer = require('./fixers/canonical-fixer');

class SEOAuditor {
    constructor(siteName, options = {}) {
        this.siteName = siteName;
        this.options = options;
        this.scanner = new FileScanner(siteName);
        this.reporter = new Reporter(siteName);
        this.metadata = null;
    }

    async run() {
        logger.header(`🔍 Running SEO Audit for ${this.siteName}...`);
        logger.reset();

        try {
            // Load metadata
            this.metadata = await this.scanner.getMetadata();
            if (!this.metadata) {
                logger.error('Failed to load meta.json');
                return;
            }

            // Run all audits
            const results = {
                canonical: await this.runCanonicalAudit(),
                metaTags: await this.runMetaTagsAudit(),
                robots: await this.runRobotsAudit(),
                sitemap: await this.runSitemapAudit(),
                hardcodedDates: await this.runHardcodedDatesAudit(),
                localhost: await this.runLocalhostAudit(),
                schema: await this.runSchemaAudit(),
                ogImage: await this.runOGImageAudit(),
                notFoundPage: await this.run404PageAudit(),
                externalCSS: await this.runExternalCSSAudit(),
                externalImages: await this.runExternalImagesAudit(),
                faviconLogo: await this.runFaviconLogoAudit()
            };

            // Auto-fix if requested
            if (this.options.fix) {
                await this.autoFix(results);
            }

            // Generate reports
            const loggerResults = logger.getResults();
            const score = this.reporter.generateConsoleSummary(loggerResults);

            logger.summary();

            if (this.options.report) {
                const reportPath = await this.reporter.generateJSON({
                    ...loggerResults,
                    checks: results,
                    score
                });
                logger.info(`📄 Detailed report saved to: ${reportPath}`);
            }

            if (this.options.fix) {
                logger.info('\n💡 Tip: Review the generated files and commit them to your repository');
            } else {
                logger.info('\n💡 Tip: Run with --fix to auto-generate missing files');
            }

        } catch (error) {
            logger.error(`Audit failed: ${error.message}`);
            console.error(error);
        }
    }

    async runCanonicalAudit() {
        logger.section('\n📍 Checking Canonical Tags...');
        const auditor = new CanonicalAuditor(this.scanner, this.metadata);
        return await auditor.audit();
    }

    async runMetaTagsAudit() {
        logger.section('\n🏷️  Checking Meta Tags...');
        const auditor = new MetaTagsAuditor(this.scanner, this.metadata);
        return await auditor.audit();
    }

    async runRobotsAudit() {
        logger.section('\n🤖 Checking robots.txt...');
        const auditor = new RobotsAuditor(this.scanner);
        return await auditor.audit();
    }

    async runSitemapAudit() {
        logger.section('\n🗺️  Checking sitemap.xml...');
        const auditor = new SitemapAuditor(this.scanner);
        return await auditor.audit();
    }

    async runHardcodedDatesAudit() {
        logger.section('\n📅 Checking for Hardcoded Dates...');
        const auditor = new HardcodedDatesAuditor(this.scanner);
        return await auditor.audit();
    }

    async runLocalhostAudit() {
        logger.section('\n🌐 Checking for Localhost References...');
        const auditor = new LocalhostAuditor(this.scanner, this.metadata);
        return await auditor.audit();
    }

    async runSchemaAudit() {
        logger.section('\n📋 Checking Schema.org Markup...');
        const auditor = new SchemaAuditor(this.scanner, this.metadata);
        return await auditor.audit();
    }

    async runOGImageAudit() {
        logger.section('\n🖼️  Checking OG Image...');
        const auditor = new OGImageAuditor(this.scanner, this.metadata);
        return await auditor.audit();
    }

    async run404PageAudit() {
        logger.section('\n🚫 Checking 404 Page...');
        const auditor = new NotFoundPageAuditor(this.scanner);
        return await auditor.audit();
    }

    async runExternalCSSAudit() {
        logger.section('\n🌐 Checking External CSS...');
        const auditor = new ExternalCSSAuditor(this.scanner);
        return await auditor.audit();
    }

    async runExternalImagesAudit() {
        logger.section('\n🖼️  Checking External Images...');
        const auditor = new ExternalImagesAuditor(this.scanner);
        return await auditor.audit();
    }

    async runFaviconLogoAudit() {
        logger.section('\n🎨 Checking Favicon & Logo Optimization...');
        const auditor = new FaviconLogoAuditor(this.scanner);
        return await auditor.audit();
    }

    async autoFix(results) {
        logger.section('\n🔧 Auto-fixing issues...');

        // Fix canonical tag
        if (results.canonical?.status !== 'pass') {
            const fixer = new CanonicalFixer(this.scanner, this.metadata);
            await fixer.fix();
        }

        // Fix robots.txt
        if (results.robots.status !== 'pass' || !results.robots.exists) {
            const fixer = new RobotsFixer(this.metadata);
            await fixer.fix();
        }

        // Fix sitemap.xml
        if (results.sitemap.status !== 'pass' || !results.sitemap.exists) {
            const fixer = new SitemapFixer(this.metadata);
            await fixer.fix();
        }
    }
}

// CLI
if (require.main === module) {
    const args = process.argv.slice(2);
    const siteName = args[0];

    if (!siteName) {
        console.log('Usage: node index.js <siteName> [--fix] [--report]');
        console.log('Example: node index.js oyizhuce.com --fix --report');
        process.exit(1);
    }

    const options = {
        fix: args.includes('--fix'),
        report: args.includes('--report')
    };

    const auditor = new SEOAuditor(siteName, options);
    auditor.run().catch(console.error);
}

module.exports = SEOAuditor;
