'use strict';

import {Schema, model as MongooseModel} from 'mongoose';
import {I_RawMaterial} from "../types";

const rawMaterialSchema = new Schema({
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

const RawMaterial = MongooseModel<I_RawMaterial>('RawMaterial', rawMaterialSchema);

export default RawMaterial;
