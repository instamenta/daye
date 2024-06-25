"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enumerations_1 = require("./enumerations");
class Logger {
    constructor(logLevel = enumerations_1.E_LogLevels.WARN) {
        this.logLevel = logLevel;
    }
    error(...args) {
        console.error(...args);
    }
    warn(...args) {
        if (this.logLevel === enumerations_1.E_LogLevels.WARN || this.logLevel === enumerations_1.E_LogLevels.DEBUG) {
            console.warn(...args);
        }
    }
    debug(...args) {
        if (this.logLevel === enumerations_1.E_LogLevels.DEBUG) {
            console.log(...args);
        }
    }
    info(...args) {
        console.log(...args);
    }
}
exports.default = Logger;
