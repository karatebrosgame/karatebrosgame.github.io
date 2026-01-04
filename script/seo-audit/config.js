// SEO Audit Configuration
module.exports = {
    rules: {
        canonical: {
            enabled: true,
            autoFix: true
        },
        metaTags: {
            required: ['title', 'description', 'keywords'],
            recommended: ['og:title', 'og:description', 'og:image'],
            titleLength: { min: 30, max: 60 },
            descriptionLength: { min: 120, max: 160 }
        },
        robots: {
            enabled: true,
            autoGenerate: true
        },
        sitemap: {
            enabled: true,
            autoGenerate: true,
            changefreq: 'weekly',
            priority: 0.8
        },
        hardcodedDates: {
            enabled: true,
            patterns: [
                /\b202[0-9]\b/g,  // Years 2020-2029
                /\b2025\b/g,
                /\b2026\b/g
            ],
            excludePatterns: [
                /new Date\(\)/,
                /getFullYear\(\)/,
                /\/\/.*/,  // Comments
                /\/\*[\s\S]*?\*\//  // Block comments
            ]
        },
        localhost: {
            enabled: true,
            patterns: [
                /localhost/gi,
                /127\.0\.0\.1/g,
                /0\.0\.0\.0/g
            ]
        }
    },

    scoring: {
        weights: {
            canonical: 15,
            metaTags: 25,
            robots: 10,
            sitemap: 15,
            hardcodedDates: 20,
            localhost: 15
        }
    },

    output: {
        console: true,
        json: true,
        html: false
    }
};
