"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TamponSpecifications = void 0;
const enumerations_1 = require("./utilities/enumerations");
exports.TamponSpecifications = {
    [enumerations_1.E_SpecificationTypes.NAKED_REGULAR]: {
        [enumerations_1.E_TamponMaterials.COTTON]: 100,
        [enumerations_1.E_TamponMaterials.HEMP]: 50,
        [enumerations_1.E_TamponMaterials.STRING]: 30,
        [enumerations_1.E_TamponMaterials.WRAPPER]: 40,
    },
    [enumerations_1.E_SpecificationTypes.NAKED_SUPER]: {
        [enumerations_1.E_TamponMaterials.COTTON]: 200,
        [enumerations_1.E_TamponMaterials.HEMP]: 10,
        [enumerations_1.E_TamponMaterials.STRING]: 30,
        [enumerations_1.E_TamponMaterials.WRAPPER]: 50
    },
};
