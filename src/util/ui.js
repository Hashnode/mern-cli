import chalk from 'chalk';
import { EOL } from 'os';

const DEFAULT_WRITE_LEVEL = 'INFO';

/**
 * Helper class to write debug output to console
 */
class UI {
    constructor(options) {
        this.inputStream = options.inputStream || process.stdin;
        this.outputStream = options.outputStream || process.stdout;
        this.errorStream = options.errorStream || process.stderr;
        this.WRITE_LEVELS = {
            DEBUG: 1,
            INFO: 2,
            WARNING: 3,
            ERROR: 4,
        };
        this.writeLevel = 'INFO';
    }

    write(data, writeLevel) {
        if (writeLevel === 'ERROR') {
            this.errorStream.write(data + EOL);
        } else if (this.writeLevelVisible(writeLevel)) {
            this.outputStream.write(data);
        }
    }

    writeError(error) {
        this.write(chalk.red(error), 'ERROR');
    }

    writeDebugLine(data) {
        this.writeLine(chalk.gray(data), 'DEBUG');
    }

    writeInfoLine(data) {
        this.writeLine(chalk.cyan(data), 'INFO');
    }

    writeLevelVisible(writeLevel) {
        const levels = this.WRITE_LEVELS;
        return levels[writeLevel || DEFAULT_WRITE_LEVEL] >= levels[this.writeLevel];
    }

    writeLine(data, writeLevel) {
        this.write(data + EOL, writeLevel);
    }
}

export default UI;
