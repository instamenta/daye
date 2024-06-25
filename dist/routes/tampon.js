'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class TamponRouter {
    constructor(controller) {
        this.router = (0, express_1.Router)();
        this.initialize(controller);
    }
    initialize(controller) {
        this.router.post('/produce', controller.produceTampons.bind(controller));
    }
    getRouter() {
        return this.router;
    }
}
exports.default = TamponRouter;
