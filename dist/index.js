'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = require("mongoose");
const RawMaterial_1 = __importDefault(require("./models/RawMaterial"));
const config_1 = __importDefault(require("./utilities/config"));
const tampons_1 = __importDefault(require("./controllers/tampons"));
const logger_1 = __importDefault(require("./utilities/logger"));
const tampon_1 = __importDefault(require("./routes/tampon"));
const node_crypto_1 = require("node:crypto");
const swagger_ui_express_1 = require("swagger-ui-express");
const swagger_1 = require("./swagger");
void function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const logger = new logger_1.default(config_1.default.LOG_LEVEL);
        //* Setup Database
        const mongoose = yield (0, mongoose_1.connect)(config_1.default.DB_CONNECTION_URI);
        const connection = mongoose.connection;
        connection.on('error', (error) => {
            logger.error('MongoDB connection error', error);
        });
        connection.once('open', () => {
            logger.info('Connected to MongoDB database');
        });
        //* Setup Server
        const server = (0, express_1.default)();
        const tamponController = new tampons_1.default(logger);
        const tamponRouter = new tampon_1.default(tamponController).getRouter();
        server.use(body_parser_1.default.json());
        server.use('/api/v1/tampons', tamponRouter);
        server.use('/api-docs', swagger_ui_express_1.serve, (0, swagger_ui_express_1.setup)(swagger_1.specs));
        //* Clear Existing Materials
        yield RawMaterial_1.default.deleteMany({});
        //* Populate Materials
        yield new RawMaterial_1.default({
            cotton: (0, node_crypto_1.randomInt)(10000, 20001),
            hemp: (0, node_crypto_1.randomInt)(4000, 8001),
            string: (0, node_crypto_1.randomInt)(4000, 8001),
            wrapper: (0, node_crypto_1.randomInt)(3000, 6001)
        }).save();
        server.listen(config_1.default.PORT, () => {
            logger.info(`Server is running on port ${config_1.default.PORT}`);
        });
    });
}();
