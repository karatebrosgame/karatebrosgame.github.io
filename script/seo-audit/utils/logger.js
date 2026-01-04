// Logger utility with colored output using ANSI codes
// ANSI color codes
const colors = {
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    red: '\x1b[31m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m',
    bold: '\x1b[1m',
    reset: '\x1b[0m'
};

class Logger {
    constructor() {
        this.results = {
            passed: [],
            warnings: [],
            errors: []
        };
    }

    success(message) {
        console.log(`${colors.green}✓${colors.reset}`, message);
        this.results.passed.push(message);
    }

    warning(message) {
        console.log(`${colors.yellow}!${colors.reset}`, message);
        this.results.warnings.push(message);
    }

    error(message) {
        console.log(`${colors.red}✗${colors.reset}`, message);
        this.results.errors.push(message);
    }

    info(message) {
        console.log(`${colors.blue}ℹ${colors.reset}`, message);
    }

    header(message) {
        console.log('\n' + `${colors.bold}${colors.cyan}${message}${colors.reset}`);
    }

    section(title) {
        console.log('\n' + `${colors.bold}${title}${colors.reset}`);
    }

    summary() {
        console.log('\n' + `${colors.bold}📊 Summary:${colors.reset}`);
        console.log(`${colors.green}✅ PASSED: ${this.results.passed.length}${colors.reset}`);
        console.log(`${colors.yellow}⚠️  WARNINGS: ${this.results.warnings.length}${colors.reset}`);
        console.log(`${colors.red}❌ ERRORS: ${this.results.errors.length}${colors.reset}`);
    }

    getResults() {
        return this.results;
    }

    reset() {
        this.results = {
            passed: [],
            warnings: [],
            errors: []
        };
    }
}

module.exports = new Logger();
