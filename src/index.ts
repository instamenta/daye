'use strict';

import express from 'express';
import bodyParser from 'body-parser';
import {connect} from 'mongoose';
import RawMaterial from './models/RawMaterial';
import config from './utilities/config';
import TamponController from "./controllers/tampons";
import Logger from "./utilities/logger";
import TamponRouter from "./routes/tampon";
import {E_LogLevels} from "./utilities/enumerations";
import {randomInt} from "node:crypto";
import {serve, setup} from 'swagger-ui-express';
import {specs} from "./swagger";

void async function startServer() {
    const logger = new Logger(config.LOG_LEVEL as E_LogLevels);

    //* Setup Database
    const mongoose = await connect(config.DB_CONNECTION_URI);

    const connection = mongoose.connection;

    connection.on('error', (error) => {
        logger.error('MongoDB connection error', error);
    });

    connection.once('open', () => {
        logger.info('Connected to MongoDB database');
    });

    //* Setup Server
    const server = express();

    const tamponController = new TamponController(logger);
    const tamponRouter = new TamponRouter(tamponController).getRouter();

    server.use(bodyParser.json());
    server.use('/api/v1/tampons', tamponRouter);
    server.use('/api-docs', serve, setup(specs));

    //* Clear Existing Materials
    await RawMaterial.deleteMany({});

    //* Populate Materials
    await new RawMaterial({
        cotton: randomInt(10000, 20001),
        hemp: randomInt(4000, 8001),
        string: randomInt(4000, 8001),
        wrapper: randomInt(3000, 6001)
    }).save();

    server.listen(config.PORT, () => {
        logger.info(`Server is running on port ${config.PORT}`);
    });
}();