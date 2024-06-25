"use strict";
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
const enumerations_1 = require("./enumerations");
const config = {
    PORT: (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 4002,
    LOG_LEVEL: (_b = process.env.LOG_LEVEL) !== null && _b !== void 0 ? _b : enumerations_1.E_LogLevels.WARN,
    DB_CONNECTION_URI: (_c = process.env.DB_CONNECTION_URI) !== null && _c !== void 0 ? _c : '',
};
exports.default = config;
