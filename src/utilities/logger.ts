import {E_LogLevels} from "./enumerations";

export default class Logger {
    private readonly logLevel: string;

    constructor(logLevel: E_LogLevels = E_LogLevels.WARN) {
        this.logLevel = logLevel;
    }

    public error(...args: any[]) {
        console.error(...args);
    }

    public warn(...args: any[]) {
        if (this.logLevel === E_LogLevels.WARN || this.logLevel === E_LogLevels.DEBUG) {
            console.warn(...args);
        }
    }

    public debug(...args: any[]) {
        if (this.logLevel === E_LogLevels.DEBUG) {
            console.log(...args);
        }
    }

    public info(...args: any[]) {
        console.log(...args);
    }
}