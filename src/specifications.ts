import {T_TamponSpecification} from "./types";
import {E_SpecificationTypes, E_TamponMaterials} from "./utilities/enumerations";

export const TamponSpecifications: T_TamponSpecification = {
    [E_SpecificationTypes.NAKED_REGULAR]: {
        [E_TamponMaterials.COTTON]: 100,
        [E_TamponMaterials.HEMP]: 50,
        [E_TamponMaterials.STRING]: 30,
        [E_TamponMaterials.WRAPPER]: 40,
    },
    [E_SpecificationTypes.NAKED_SUPER]: {
        [E_TamponMaterials.COTTON]: 200,
        [E_TamponMaterials.HEMP]: 10,
        [E_TamponMaterials.STRING]: 30,
        [E_TamponMaterials.WRAPPER]: 50
    },
};