'use strict';

import {Router} from 'express';
import TamponController from "../controllers/tampons";

export default class TamponRouter {
    protected router: Router = Router();

    constructor(controller: TamponController) {
        this.initialize(controller);
    }

    private initialize(controller: TamponController) {
        this.router.post('/produce', controller.produceTampons.bind(controller));
    }

    public getRouter(): Router {
        return this.router;
    }
}

