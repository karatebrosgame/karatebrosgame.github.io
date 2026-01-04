#!/usr/bin/env node

/**
 * Convert images to WebP format
 * Usage: node script/convert-to-webp.js [options]
 * Options:
 *   --quality <number>  WebP quality (0-100, default: 85)
 *   --overwrite         Overwrite existing WebP files
 *   --dir <path>        Directory to process (default: public)
 */

const fs = require('fs-extra');
const path = require('path');
const { glob } = require('glob');

// Check if sharp is installed
let sharp;
try {
  sharp = require('sharp');
} catch (error) {
  console.error('❌ Error: sharp package is not installed.');
  console.error('   Please install it by running: npm install --save-dev sharp');
  process.exit(1);
}

class WebPConverter {
  constructor(options = {}) {
    this.basePath = process.cwd();
    this.targetDir = options.dir || path.join(this.basePath, 'public');
    this.quality = options.quality || 85;
    this.overwrite = options.overwrite || false;
    this.stats = {
      converted: 0,
      skipped: 0,
      failed: 0,
      totalSize: 0,
      savedSize: 0
    };
  }

  async run() {
    console.log('\n🖼️  Converting images to WebP format...\n');
    console.log(`📁 Target directory: ${this.targetDir}`);
    console.log(`🎨 Quality: ${this.quality}`);
    console.log(`📝 Overwrite existing: ${this.overwrite}\n`);

    // Find all PNG and JPG files
    const relativeDir = path.relative(this.basePath, this.targetDir);
    const patterns = [
      `${relativeDir}/**/*.png`,
      `${relativeDir}/**/*.jpg`,
      `${relativeDir}/**/*.jpeg`
    ];

    const files = [];
    for (const pattern of patterns) {
      const matches = await glob(pattern, { 
        cwd: this.basePath,
        nodir: true 
      });
      files.push(...matches.map(f => path.join(this.basePath, f)));
    }

    if (files.length === 0) {
      console.log('ℹ️  No images found to convert.');
      return;
    }

    console.log(`📋 Found ${files.length} image(s) to process:\n`);

    // Process each file
    for (const file of files) {
      await this.convertFile(file);
    }

    // Print summary
    this.printSummary();
  }

  async convertFile(filePath) {
    try {
      const ext = path.extname(filePath).toLowerCase();
      const basename = path.basename(filePath, ext);
      const dir = path.dirname(filePath);
      const webpPath = path.join(dir, `${basename}.webp`);

      // Skip if WebP already exists and not overwriting
      if (!this.overwrite && await fs.pathExists(webpPath)) {
        console.log(`⏭️  Skipped: ${path.relative(this.basePath, filePath)} (WebP already exists)`);
        this.stats.skipped++;
        return;
      }

      // Get original file size
      const originalStats = await fs.stat(filePath);
      const originalSize = originalStats.size;

      // Convert to WebP
      await sharp(filePath)
        .webp({ quality: this.quality })
        .toFile(webpPath);

      // Get WebP file size
      const webpStats = await fs.stat(webpPath);
      const webpSize = webpStats.size;
      const saved = originalSize - webpSize;
      const savedPercent = ((saved / originalSize) * 100).toFixed(1);

      this.stats.converted++;
      this.stats.totalSize += originalSize;
      this.stats.savedSize += saved;

      const relativePath = path.relative(this.basePath, filePath);
      const relativeWebpPath = path.relative(this.basePath, webpPath);
      
      console.log(`✅ Converted: ${relativePath}`);
      console.log(`   → ${relativeWebpPath}`);
      console.log(`   📊 ${this.formatBytes(originalSize)} → ${this.formatBytes(webpSize)} (saved ${this.formatBytes(saved)}, ${savedPercent}%)`);
      console.log('');

    } catch (error) {
      console.error(`❌ Failed: ${path.relative(this.basePath, filePath)}`);
      console.error(`   Error: ${error.message}\n`);
      this.stats.failed++;
    }
  }

  formatBytes(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  }

  printSummary() {
    console.log('='.repeat(60));
    console.log('📊 Conversion Summary\n');
    console.log(`✅ Converted: ${this.stats.converted}`);
    console.log(`⏭️  Skipped: ${this.stats.skipped}`);
    console.log(`❌ Failed: ${this.stats.failed}`);
    
    if (this.stats.converted > 0) {
      const totalSavedPercent = ((this.stats.savedSize / this.stats.totalSize) * 100).toFixed(1);
      console.log(`\n💾 Total size: ${this.formatBytes(this.stats.totalSize)}`);
      console.log(`💾 Saved: ${this.formatBytes(this.stats.savedSize)} (${totalSavedPercent}%)`);
    }
    
    console.log('\n' + '='.repeat(60));
    console.log('\n💡 Tip: Update your code to use .webp files instead of .png/.jpg');
    console.log('   Example: src="/image.webp" instead of src="/image.png"\n');
  }
}

// Parse command line arguments
const args = process.argv.slice(2);
const options = {
  quality: 85,
  overwrite: false,
  dir: path.join(process.cwd(), 'public')
};

for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (arg === '--quality' && args[i + 1]) {
    options.quality = parseInt(args[i + 1], 10);
    if (isNaN(options.quality) || options.quality < 0 || options.quality > 100) {
      console.error('❌ Error: Quality must be a number between 0 and 100');
      process.exit(1);
    }
    i++;
  } else if (arg === '--overwrite') {
    options.overwrite = true;
  } else if (arg === '--dir' && args[i + 1]) {
    options.dir = path.resolve(args[i + 1]);
    i++;
  } else if (arg === '--help' || arg === '-h') {
    console.log(`
Usage: node script/convert-to-webp.js [options]

Options:
  --quality <number>   WebP quality (0-100, default: 85)
  --overwrite          Overwrite existing WebP files
  --dir <path>         Directory to process (default: public)
  --help, -h           Show this help message

Examples:
  node script/convert-to-webp.js
  node script/convert-to-webp.js --quality 90
  node script/convert-to-webp.js --overwrite
  node script/convert-to-webp.js --dir public/images
`);
    process.exit(0);
  }
}

// Run converter
if (require.main === module) {
  const converter = new WebPConverter(options);
  converter.run().catch(console.error);
}

module.exports = WebPConverter;

