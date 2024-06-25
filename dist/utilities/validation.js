"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMaterialsSufficiency = validateMaterialsSufficiency;
exports.validateTamponTypeExists = validateTamponTypeExists;
exports.validateTamponProduceQuantity = validateTamponProduceQuantity;
const specifications_1 = require("../specifications");
const enumerations_1 = require("./enumerations");
function validateMaterialsSufficiency(rawMaterials, requiredMaterials) {
    let result = true;
    const insufficientMaterials = [];
    for (const material of Object.values(enumerations_1.E_TamponMaterials)) {
        if (rawMaterials[material] >= requiredMaterials[material])
            continue;
        result = false;
        insufficientMaterials.push({
            material,
            required: requiredMaterials[material],
            available: rawMaterials[material]
        });
    }
    return {
        result: result,
        insufficientMaterials: insufficientMaterials
    };
}
function validateTamponTypeExists(type) {
    return type in specifications_1.TamponSpecifications;
}
function validateTamponProduceQuantity(quantity) {
    return (typeof quantity !== 'number' ||
        quantity <= 0 ||
        quantity.toFixed() !== quantity.toString());
}
