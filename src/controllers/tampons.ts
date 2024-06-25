'use strict';

import {Request, Response} from "express";
import {I_RawMaterial, T_TamponsMaterials} from "../types";
import Logger from "../utilities/logger";
import StatusCode from "@instamenta/http-status-codes";
import RawMaterial from "../models/RawMaterial";
import {
    validateMaterialsSufficiency,
    validateTamponProduceQuantity,
    validateTamponTypeExists
} from "../utilities/validation";
import {TamponSpecifications} from "../specifications";
import {E_SpecificationTypes} from "../utilities/enumerations";

export default class TamponController {
    constructor(private readonly logger: Logger) {
    }

    public async produceTampons(
        request: Request<{}, {}, { type: E_SpecificationTypes, quantity: number }>,
        response: Response<{ message?: string, details?: any, remainingMaterials?: T_TamponsMaterials }>
    ) {
        const methodPrefix = `${this.constructor.name}.produceTampons():`;

        const {type: tamponType, quantity} = request.body;

        if (!validateTamponTypeExists(tamponType)) {
            this.logger.debug(`${methodPrefix} Invalid tampon type specified`, tamponType);

            return response
                .status(StatusCode.BAD_REQUEST)
                .send({
                    message: 'Invalid tampon type specified.',
                    details: `Accepted tampon types: ${Object.keys(E_SpecificationTypes)}`
                });
        }

        if (validateTamponProduceQuantity(quantity)) {
            this.logger.debug(`${methodPrefix} Invalid tampon type specified`, tamponType);

            return response
                .status(StatusCode.BAD_REQUEST)
                .send({
                    message: 'Invalid tampon quantity specified.',
                    details: 'Quantity must be a whole number greater than 0'
                });
        }

        const specification = TamponSpecifications[tamponType as E_SpecificationTypes];

        try {
            const rawMaterial: I_RawMaterial | null = await RawMaterial.findOne();

            if (!rawMaterial) {
                this.logger.warn(`${methodPrefix} Raw materials data not found`)

                return response
                    .status(StatusCode.INTERNAL_SERVER_ERROR)
                    .send({message: 'Raw materials data not found.'});
            }

            const required: T_TamponsMaterials = {
                cotton: specification.cotton * quantity,
                hemp: specification.hemp * quantity,
                string: specification.string * quantity,
                wrapper: specification.wrapper * quantity,
            };

            const validation = validateMaterialsSufficiency(rawMaterial, required);

            if (!validation.result) {
                this.logger.debug(`${methodPrefix} Insufficient raw materials`, validation.insufficientMaterials);

                return response
                    .status(StatusCode.BAD_REQUEST)
                    .send({message: 'Insufficient raw materials.', details: validation.insufficientMaterials});
            }

            rawMaterial.cotton -= required.cotton;
            rawMaterial.hemp -= required.hemp;
            rawMaterial.string -= required.string;
            rawMaterial.wrapper -= required.wrapper;

            await rawMaterial.save();

            const {cotton, hemp, string, wrapper} = rawMaterial;

            response
                .status(StatusCode.OK)
                .send({remainingMaterials: {cotton, hemp, string, wrapper}});

            this.logger.info(`${methodPrefix} Produced ${quantity} tampons of type: ${tamponType}`);

        } catch (error: Error | unknown) {
            this.logger.error(`${methodPrefix} Error`, error);

            response.status(StatusCode.INTERNAL_SERVER_ERROR).end();
        }
    }
}