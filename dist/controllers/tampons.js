'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = __importDefault(require("@instamenta/http-status-codes"));
const RawMaterial_1 = __importDefault(require("../models/RawMaterial"));
const validation_1 = require("../utilities/validation");
const specifications_1 = require("../specifications");
const enumerations_1 = require("../utilities/enumerations");
class TamponController {
    constructor(logger) {
        this.logger = logger;
    }
    produceTampons(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const methodPrefix = `${this.constructor.name}.produceTampons():`;
            const { type: tamponType, quantity } = request.body;
            if (!(0, validation_1.validateTamponTypeExists)(tamponType)) {
                this.logger.debug(`${methodPrefix} Invalid tampon type specified`, tamponType);
                return response
                    .status(http_status_codes_1.default.BAD_REQUEST)
                    .send({
                    message: 'Invalid tampon type specified.',
                    details: `Accepted tampon types: ${Object.keys(enumerations_1.E_SpecificationTypes)}`
                });
            }
            if ((0, validation_1.validateTamponProduceQuantity)(quantity)) {
                this.logger.debug(`${methodPrefix} Invalid tampon type specified`, tamponType);
                return response
                    .status(http_status_codes_1.default.BAD_REQUEST)
                    .send({
                    message: 'Invalid tampon quantity specified.',
                    details: 'Quantity must be a whole number greater than 0'
                });
            }
            const specification = specifications_1.TamponSpecifications[tamponType];
            try {
                const rawMaterial = yield RawMaterial_1.default.findOne();
                if (!rawMaterial) {
                    this.logger.warn(`${methodPrefix} Raw materials data not found`);
                    return response
                        .status(http_status_codes_1.default.INTERNAL_SERVER_ERROR)
                        .send({ message: 'Raw materials data not found.' });
                }
                const required = {
                    cotton: specification.cotton * quantity,
                    hemp: specification.hemp * quantity,
                    string: specification.string * quantity,
                    wrapper: specification.wrapper * quantity,
                };
                const validation = (0, validation_1.validateMaterialsSufficiency)(rawMaterial, required);
                if (!validation.result) {
                    this.logger.debug(`${methodPrefix} Insufficient raw materials`, validation.insufficientMaterials);
                    return response
                        .status(http_status_codes_1.default.BAD_REQUEST)
                        .send({ message: 'Insufficient raw materials.', details: validation.insufficientMaterials });
                }
                rawMaterial.cotton -= required.cotton;
                rawMaterial.hemp -= required.hemp;
                rawMaterial.string -= required.string;
                rawMaterial.wrapper -= required.wrapper;
                yield rawMaterial.save();
                const { cotton, hemp, string, wrapper } = rawMaterial;
                response
                    .status(http_status_codes_1.default.OK)
                    .send({ remainingMaterials: { cotton, hemp, string, wrapper } });
                this.logger.info(`${methodPrefix} Produced ${quantity} tampons of type: ${tamponType}`);
            }
            catch (error) {
                this.logger.error(`${methodPrefix} Error`, error);
                response.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).end();
            }
        });
    }
}
exports.default = TamponController;
