#!/usr/bin/env node

// SEO Audit for Next.js App Router
const fs = require('fs-extra');
const path = require('path');
const { glob } = require('glob');

class NextJSSEOAuditor {
    constructor(options = {}) {
        this.basePath = process.cwd();
        this.options = options;
        this.results = {
            canonical: { status: 'pass', issues: [] },
            metaTags: { status: 'pass', issues: [] },
            robots: { status: 'pass', issues: [] },
            sitemap: { status: 'pass', issues: [] },
            localhost: { status: 'pass', issues: [] },
            schema: { status: 'pass', issues: [] },
            ogImage: { status: 'pass', issues: [] },
            favicon: { status: 'pass', issues: [] },
            images: { status: 'pass', issues: [] },
            videos: { status: 'pass', issues: [] },
            fonts: { status: 'pass', issues: [] },
            hardcodedDates: { status: 'pass', issues: [] }
        };
    }

    async run() {
        console.log('\n🔍 Running SEO Audit for Next.js App Router...\n');

        await this.checkCanonical();
        await this.checkMetaTags();
        await this.checkRobots();
        await this.checkSitemap();
        await this.checkLocalhost();
        await this.checkSchema();
        await this.checkOGImage();
        await this.checkFavicon();
        await this.checkImages();
        await this.checkVideos();
        await this.checkFonts();
        await this.checkHardcodedDates();

        this.generateReport();
    }

    async checkCanonical() {
        console.log('📍 Checking Canonical Tags...');
        const layoutPath = path.join(this.basePath, 'app', 'layout.tsx');
        
        if (await fs.pathExists(layoutPath)) {
            const content = await fs.readFile(layoutPath, 'utf-8');
            const hasCanonical = /alternates:\s*\{[^}]*canonical/i.test(content);
            
            if (!hasCanonical) {
                this.results.canonical.status = 'warning';
                this.results.canonical.issues.push('No canonical URL found in layout.tsx');
                console.log('  ⚠️  No canonical tag found');
            } else {
                console.log('  ✅ Canonical tag found');
            }
        }
    }

    async checkMetaTags() {
        console.log('\n🏷️  Checking Meta Tags...');
        const layoutPath = path.join(this.basePath, 'app', 'layout.tsx');
        
        if (await fs.pathExists(layoutPath)) {
            const content = await fs.readFile(layoutPath, 'utf-8');
            
            const checks = {
                title: /title:/i.test(content),
                description: /description:/i.test(content),
                keywords: /keywords:/i.test(content),
                openGraph: /openGraph:/i.test(content),
                twitter: /twitter:/i.test(content)
            };

            for (const [tag, found] of Object.entries(checks)) {
                if (!found) {
                    this.results.metaTags.status = 'warning';
                    this.results.metaTags.issues.push(`Missing ${tag}`);
                    console.log(`  ⚠️  Missing ${tag}`);
                } else {
                    console.log(`  ✅ ${tag} found`);
                }
            }
        }
    }

    async checkRobots() {
        console.log('\n🤖 Checking robots.txt...');
        const robotsPath = path.join(this.basePath, 'app', 'robots.ts');
        const robotsPublicPath = path.join(this.basePath, 'public', 'robots.txt');
        
        const hasRobotsTS = await fs.pathExists(robotsPath);
        const hasRobotsTXT = await fs.pathExists(robotsPublicPath);
        
        if (!hasRobotsTS && !hasRobotsTXT) {
            this.results.robots.status = 'warning';
            this.results.robots.issues.push('No robots.txt found');
            console.log('  ⚠️  No robots.txt found');
        } else {
            console.log('  ✅ robots.txt found');
        }
    }

    async checkSitemap() {
        console.log('\n🗺️  Checking sitemap.xml...');
        const sitemapPath = path.join(this.basePath, 'app', 'sitemap.ts');
        const sitemapPublicPath = path.join(this.basePath, 'public', 'sitemap.xml');
        
        const hasSitemapTS = await fs.pathExists(sitemapPath);
        const hasSitemapXML = await fs.pathExists(sitemapPublicPath);
        
        if (!hasSitemapTS && !hasSitemapXML) {
            this.results.sitemap.status = 'warning';
            this.results.sitemap.issues.push('No sitemap found');
            console.log('  ⚠️  No sitemap found');
        } else {
            console.log('  ✅ sitemap found');
        }
    }

    async checkLocalhost() {
        console.log('\n🌐 Checking for Localhost References...');
        const appFiles = await this.globFiles('app/**/*.{ts,tsx,js,jsx}');
        const componentFiles = await this.globFiles('components/**/*.{ts,tsx,js,jsx}');
        const allFiles = [...appFiles, ...componentFiles].map(f => path.join(this.basePath, f));
        
        const localhostPatterns = [
            /localhost/gi,
            /127\.0\.0\.1/g,
            /0\.0\.0\.0/g
        ];

        for (const file of allFiles) {
            const content = await fs.readFile(file, 'utf-8');
            const lines = content.split('\n');
            
            for (let i = 0; i < lines.length; i++) {
                const line = lines[i];
                // Skip comments
                if (line.trim().startsWith('//') || line.trim().startsWith('/*')) continue;
                
                for (const pattern of localhostPatterns) {
                    if (pattern.test(line) && !line.includes('localhost:4400')) {
                        this.results.localhost.status = 'warning';
                        this.results.localhost.issues.push(`${path.relative(this.basePath, file)}:${i + 1}`);
                        console.log(`  ⚠️  Localhost reference in ${path.relative(this.basePath, file)}:${i + 1}`);
                    }
                }
            }
        }

        if (this.results.localhost.issues.length === 0) {
            console.log('  ✅ No localhost references found');
        }
    }

    async checkSchema() {
        console.log('\n📋 Checking Schema.org Markup...');
        const structuredDataPath = path.join(this.basePath, 'app', 'structured-data.tsx');
        const layoutPath = path.join(this.basePath, 'app', 'layout.tsx');
        
        let hasSchema = false;
        
        if (await fs.pathExists(structuredDataPath)) {
            const content = await fs.readFile(structuredDataPath, 'utf-8');
            if (/@context.*schema\.org/i.test(content) || /@type/i.test(content)) {
                hasSchema = true;
            }
        }
        
        if (await fs.pathExists(layoutPath)) {
            const content = await fs.readFile(layoutPath, 'utf-8');
            if (/StructuredData/i.test(content) || /application\/ld\+json/i.test(content)) {
                hasSchema = true;
            }
        }
        
        if (!hasSchema) {
            this.results.schema.status = 'warning';
            this.results.schema.issues.push('No Schema.org structured data found');
            console.log('  ⚠️  No Schema.org markup found');
        } else {
            console.log('  ✅ Schema.org markup found');
        }
    }

    async checkOGImage() {
        console.log('\n🖼️  Checking OG Image...');
        const layoutPath = path.join(this.basePath, 'app', 'layout.tsx');
        
        if (await fs.pathExists(layoutPath)) {
            const content = await fs.readFile(layoutPath, 'utf-8');
            const hasOGImage = /og-image|openGraph.*images/i.test(content);
            
            if (!hasOGImage) {
                this.results.ogImage.status = 'warning';
                this.results.ogImage.issues.push('No OG image configured');
                console.log('  ⚠️  No OG image found');
            } else {
                console.log('  ✅ OG image configured');
            }
        }
    }

    async checkFavicon() {
        console.log('\n🎨 Checking Favicon...');
        const faviconPath = path.join(this.basePath, 'public', 'favicon-32x32.png');
        const layoutPath = path.join(this.basePath, 'app', 'layout.tsx');
        
        const hasFavicon = await fs.pathExists(faviconPath);
        const hasFaviconConfig = layoutPath && await fs.pathExists(layoutPath) 
            ? (await fs.readFile(layoutPath, 'utf-8')).includes('icons:')
            : false;
        
        if (!hasFavicon && !hasFaviconConfig) {
            this.results.favicon.status = 'warning';
            this.results.favicon.issues.push('No favicon found');
            console.log('  ⚠️  No favicon found');
        } else {
            if (hasFavicon) {
                const stats = await fs.stat(faviconPath);
                const sizeKB = (stats.size / 1024).toFixed(1);
                console.log(`  ✅ Favicon found (${sizeKB} KB)`);
                if (stats.size > 50 * 1024) {
                    this.results.favicon.issues.push(`Favicon is large: ${sizeKB} KB`);
                }
            }
            if (hasFaviconConfig) {
                console.log('  ✅ Favicon configured in layout.tsx');
            }
        }
    }

    async checkImages() {
        console.log('\n🖼️  Checking Image Optimization...');
        const componentFiles = await this.globFiles('components/**/*.{ts,tsx}');
        const appFiles = await this.globFiles('app/**/*.{ts,tsx}');
        const allFiles = [...componentFiles, ...appFiles].map(f => path.join(this.basePath, f));
        
        let unoptimizedCount = 0;
        let optimizedCount = 0;
        let imgTagCount = 0;
        
        for (const file of allFiles) {
            const content = await fs.readFile(file, 'utf-8');
            if (content.includes('next/image') || content.includes('Image from')) {
                optimizedCount++;
                if (content.includes('unoptimized')) {
                    unoptimizedCount++;
                    this.results.images.issues.push(`Image marked as unoptimized in ${path.relative(this.basePath, file)}`);
                }
            }
            if (content.includes('<img') && !content.includes('next/image')) {
                imgTagCount++;
                this.results.images.issues.push(`Using <img> instead of Next.js Image in ${path.relative(this.basePath, file)}`);
            }
        }
        
        if (optimizedCount > 0) {
            console.log(`  ✅ Using Next.js Image component: ${optimizedCount} file(s)`);
        } else {
            console.log(`  ℹ️  No Next.js Image components found`);
        }
        
        if (unoptimizedCount > 0) {
            this.results.images.status = 'warning';
            console.log(`  ⚠️  ${unoptimizedCount} image(s) marked as unoptimized`);
        }
        
        if (imgTagCount > 0) {
            this.results.images.status = 'warning';
            console.log(`  ⚠️  ${imgTagCount} <img> tag(s) found (should use Next.js Image)`);
        }
    }

    async checkVideos() {
        console.log('\n🎥 Checking Video Optimization...');
        const componentFiles = await this.globFiles('components/**/*.{ts,tsx}');
        const componentFilesFull = componentFiles.map(f => path.join(this.basePath, f));
        
        let videoCount = 0;
        let optimizedCount = 0;
        
        for (const file of componentFilesFull) {
            const content = await fs.readFile(file, 'utf-8');
            if (content.includes('<video') || content.includes('youtubeEmbed')) {
                videoCount++;
                if (content.includes('preload="metadata"') || content.includes('youtubeEmbed')) {
                    optimizedCount++;
                }
            }
        }
        
        if (videoCount > 0) {
            console.log(`  ✅ Found ${videoCount} video(s), ${optimizedCount} optimized`);
            if (optimizedCount < videoCount) {
                this.results.videos.status = 'warning';
                this.results.videos.issues.push('Some videos not optimized (missing preload="metadata")');
            }
        } else {
            console.log('  ℹ️  No videos found');
        }
    }

    async checkFonts() {
        console.log('\n🔤 Checking Font Localization...');
        const layoutPath = path.join(this.basePath, 'app', 'layout.tsx');
        const globalsCssPath = path.join(this.basePath, 'app', 'globals.css');
        
        let hasNextFont = false;
        let hasExternalFonts = false;
        let hasGoogleFontsImport = false;

        // Check layout.tsx for Next.js Font Optimization
        if (await fs.pathExists(layoutPath)) {
            const layoutContent = await fs.readFile(layoutPath, 'utf-8');
            hasNextFont = /from ['"]next\/font\/google['"]/i.test(layoutContent) || 
                         /next\/font/i.test(layoutContent);
        }

        // Check globals.css for external font imports
        if (await fs.pathExists(globalsCssPath)) {
            const cssContent = await fs.readFile(globalsCssPath, 'utf-8');
            hasGoogleFontsImport = /fonts\.googleapis\.com/i.test(cssContent) ||
                                  /@import.*fonts/i.test(cssContent);
            hasExternalFonts = /@import\s+url\(['"]?https?:/i.test(cssContent);
        }

        if (hasNextFont && !hasGoogleFontsImport) {
            console.log('  ✅ Using Next.js Font Optimization (fonts are localized)');
        } else if (hasNextFont && hasGoogleFontsImport) {
            this.results.fonts.status = 'warning';
            this.results.fonts.issues.push('Using Next.js Font Optimization but also has external font imports in CSS');
            console.log('  ⚠️  Mixed font loading (Next.js Font + external imports)');
        } else if (hasGoogleFontsImport || hasExternalFonts) {
            this.results.fonts.status = 'warning';
            this.results.fonts.issues.push('Using external font imports (fonts.googleapis.com). Consider using Next.js Font Optimization for better performance.');
            console.log('  ⚠️  External font imports detected (not localized)');
        } else {
            console.log('  ℹ️  No font configuration found');
        }
    }

    async checkHardcodedDates() {
        console.log('\n📅 Checking for Hardcoded Dates...');
        const appFiles = await this.globFiles('app/**/*.{ts,tsx,js,jsx}');
        const componentFiles = await this.globFiles('components/**/*.{ts,tsx,js,jsx}');
        const allFiles = [...appFiles, ...componentFiles].map(f => path.join(this.basePath, f));
        
        const currentYear = new Date().getFullYear();
        const nextYear = currentYear + 1;
        const yearPatterns = [
            new RegExp(`\\b20[2-9][0-9]\\b`, 'g'), // Years 2020-2099
        ];
        
        // Patterns to exclude (dynamic date generation)
        const excludePatterns = [
            /new Date\(\)/,
            /getFullYear\(\)/,
            /getYear\(\)/,
            /currentYear/,
            /copyrightYear/,
            /startYear/,
            /\/\/.*/,  // Comments
            /\/\*[\s\S]*?\*\//,  // Block comments
            /@type/,  // TypeScript type annotations
            /@param/,  // JSDoc comments
        ];

        for (const file of allFiles) {
            const content = await fs.readFile(file, 'utf-8');
            const lines = content.split('\n');
            
            for (let i = 0; i < lines.length; i++) {
                const line = lines[i];
                
                // Skip excluded patterns
                if (excludePatterns.some(pattern => pattern.test(line))) {
                    continue;
                }
                
                // Check for hardcoded years
                for (const pattern of yearPatterns) {
                    const matches = line.match(pattern);
                    if (matches) {
                        for (const match of matches) {
                            const year = parseInt(match, 10);
                            // Only flag future years or years that should be dynamic
                            if (year >= currentYear && year <= nextYear + 5) {
                                // Check if it's in a string that looks like it should be dynamic
                                if (/unblocked|copyright|©|&copy;|reserved/i.test(line) && 
                                    !/currentYear|copyrightYear|getFullYear/i.test(line)) {
                                    this.results.hardcodedDates.status = 'warning';
                                    const relativePath = path.relative(this.basePath, file);
                                    this.results.hardcodedDates.issues.push(
                                        `${relativePath}:${i + 1} - Hardcoded year "${match}" found. Consider using dynamic date (new Date().getFullYear())`
                                    );
                                    console.log(`  ⚠️  Hardcoded year "${match}" in ${relativePath}:${i + 1}`);
                                }
                            }
                        }
                    }
                }
            }
        }

        if (this.results.hardcodedDates.issues.length === 0) {
            console.log('  ✅ No hardcoded dates found (using dynamic dates)');
        }
    }

    generateReport() {
        console.log('\n' + '='.repeat(60));
        console.log('📊 SEO Audit Summary\n');
        
        const checks = [
            { name: 'Canonical Tags', result: this.results.canonical },
            { name: 'Meta Tags', result: this.results.metaTags },
            { name: 'Robots.txt', result: this.results.robots },
            { name: 'Sitemap', result: this.results.sitemap },
            { name: 'Localhost References', result: this.results.localhost },
            { name: 'Schema.org', result: this.results.schema },
            { name: 'OG Image', result: this.results.ogImage },
            { name: 'Favicon', result: this.results.favicon },
            { name: 'Image Optimization', result: this.results.images },
            { name: 'Video Optimization', result: this.results.videos },
            { name: 'Font Localization', result: this.results.fonts },
            { name: 'Hardcoded Dates', result: this.results.hardcodedDates }
        ];

        let passCount = 0;
        let warningCount = 0;
        let errorCount = 0;

        checks.forEach(check => {
            const status = check.result.status;
            const icon = status === 'pass' ? '✅' : status === 'warning' ? '⚠️' : '❌';
            console.log(`${icon} ${check.name}: ${status.toUpperCase()}`);
            
            if (status === 'pass') passCount++;
            else if (status === 'warning') warningCount++;
            else errorCount++;

            if (check.result.issues.length > 0) {
                check.result.issues.forEach(issue => {
                    console.log(`   - ${issue}`);
                });
            }
        });

        console.log('\n' + '='.repeat(60));
        console.log(`\nTotal: ${checks.length} checks`);
        console.log(`✅ Pass: ${passCount}`);
        console.log(`⚠️  Warnings: ${warningCount}`);
        console.log(`❌ Errors: ${errorCount}`);
        
        const score = Math.round((passCount / checks.length) * 100);
        console.log(`\n📈 SEO Score: ${score}/100\n`);
    }

    async globFiles(pattern) {
        try {
            const files = await glob(pattern, { 
                cwd: this.basePath,
                nodir: true 
            });
            return files;
        } catch (error) {
            console.error(`Error globbing ${pattern}:`, error);
            return [];
        }
    }
}

// CLI
if (require.main === module) {
    const auditor = new NextJSSEOAuditor();
    auditor.run().catch(console.error);
}

module.exports = NextJSSEOAuditor;

