// File scanner utility
const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');

class FileScanner {
    constructor(siteName) {
        this.siteName = siteName;
        this.basePath = path.join(process.cwd());
        this.componentPath = path.join(this.basePath, 'components', 'sites', siteName);
        this.dataPath = path.join(this.basePath, 'data', 'sites', siteName);
    }

    /**
     * Scan all files in the site directory
     */
    async scanAll() {
        const files = {
            components: await this.scanComponents(),
            data: await this.scanData(),
            public: await this.scanPublic()
        };
        return files;
    }

    /**
     * Scan component files
     */
    async scanComponents() {
        const pattern = path.join(this.componentPath, '**', '*.{tsx,ts,jsx,js}');
        return this.globFiles(pattern);
    }

    /**
     * Scan data files
     */
    async scanData() {
        const pattern = path.join(this.dataPath, '**', '*.json');
        return this.globFiles(pattern);
    }

    /**
     * Scan public files
     */
    async scanPublic() {
        const publicPath = path.join(this.basePath, 'public');
        const patterns = [
            path.join(publicPath, 'robots.txt'),
            path.join(publicPath, 'sitemap.xml')
        ];

        const files = [];
        for (const pattern of patterns) {
            if (await fs.pathExists(pattern)) {
                files.push(pattern);
            }
        }
        return files;
    }

    /**
     * Read file content
     */
    async readFile(filePath) {
        try {
            return await fs.readFile(filePath, 'utf-8');
        } catch (error) {
            return null;
        }
    }

    /**
     * Check if file exists
     */
    async fileExists(filePath) {
        return await fs.pathExists(filePath);
    }

    /**
     * Get meta.json content
     */
    async getMetadata() {
        const metaPath = path.join(this.dataPath, 'meta.json');
        try {
            return await fs.readJson(metaPath);
        } catch (error) {
            return null;
        }
    }

    /**
     * Helper to glob files
     */
    globFiles(pattern) {
        return new Promise((resolve, reject) => {
            glob(pattern, { nodir: true }, (err, files) => {
                if (err) reject(err);
                else resolve(files);
            });
        });
    }
}

module.exports = FileScanner;
