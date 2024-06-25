import {T_TamponsMaterials} from '../types';
import {TamponSpecifications} from "../specifications";
import {E_TamponMaterials} from "./enumerations";

export function validateMaterialsSufficiency(rawMaterials: T_TamponsMaterials, requiredMaterials: T_TamponsMaterials) {
    let result = true;
    const insufficientMaterials: Array<{ material: string; required: number; available: number }> = [];

    for (const material of Object.values(E_TamponMaterials)) {
        if (rawMaterials[material] >= requiredMaterials[material]) continue;

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

export function validateTamponTypeExists(type: string) {
    return type in TamponSpecifications;
}

export function validateTamponProduceQuantity(quantity: any | number) {
    return (
        typeof quantity !== 'number' ||
        quantity <= 0 ||
        quantity.toFixed() !== quantity.toString()
    );
}