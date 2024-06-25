'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const rawMaterialSchema = new mongoose_1.Schema({
    cotton: {
        type: Number,
        required: true,
        min: 0,
    },
    hemp: {
        type: Number,
        required: true,
        min: 0,
    },
    string: {
        type: Number,
        required: true,
        min: 0,
    },
    wrapper: {
        type: Number,
        required: true,
        min: 0,
    },
});
const RawMaterial = (0, mongoose_1.model)('RawMaterial', rawMaterialSchema);
exports.default = RawMaterial;
