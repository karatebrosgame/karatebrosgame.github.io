// Audit all sites
const fs = require('fs-extra');
const path = require('path');
const SEOAuditor = require('./index');

async function auditAllSites() {
    const sitesDir = path.join(process.cwd(), 'components', 'sites');
    const sites = await fs.readdir(sitesDir);

    console.log(`Found ${sites.length} sites to audit\n`);

    for (const site of sites) {
        const auditor = new SEOAuditor(site, { report: true });
        await auditor.run();
        console.log('\n' + '='.repeat(60) + '\n');
    }

    console.log('✅ All sites audited!');
}

auditAllSites().catch(console.error);
