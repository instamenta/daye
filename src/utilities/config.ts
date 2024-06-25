import {E_LogLevels} from "./enumerations";

const config = {
    PORT: process.env.PORT ?? 4002,
    LOG_LEVEL: process.env.LOG_LEVEL ?? E_LogLevels.WARN,
    DB_CONNECTION_URI: process.env.DB_CONNECTION_URI ?? '',
}

export default config;