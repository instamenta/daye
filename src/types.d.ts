import {Document} from "mongoose";
import {E_SpecificationTypes, E_TamponMaterials} from "./utilities/enumerations";

export type T_TamponsMaterials = Record<E_TamponMaterials, number>;

export interface I_RawMaterial extends Document {
    cotton: number
    hemp: number
    string: number
    wrapper: number
}

export type T_TamponSpecification = Record<E_SpecificationTypes, T_TamponsMaterials>;