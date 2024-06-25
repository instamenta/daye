'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.specs = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const fs_1 = __importDefault(require("fs"));
const enumerations_1 = require("./utilities/enumerations");
const getRemainingMaterialsProperties = () => {
    return Object.fromEntries(Object.values(enumerations_1.E_TamponMaterials).map((material) => [material, { type: 'number' }]));
};
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Tampon Production API',
            version: '1.0.0',
            description: 'API documentation for Tampon Production',
        },
        servers: [{ url: 'http://localhost:5005' }],
        paths: {
            '/api/v1/tampons/produce': {
                post: {
                    summary: 'Produce tampons',
                    description: 'Produce tampons based on the specified type and quantity.',
                    tags: ['Tampons'],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        type: {
                                            type: 'string',
                                            enum: Object.values(enumerations_1.E_SpecificationTypes),
                                        },
                                        quantity: {
                                            type: 'integer',
                                            minimum: 1,
                                        },
                                    },
                                },
                            },
                        },
                    },
                    responses: {
                        200: {
                            description: 'Tampons produced successfully',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            remainingMaterials: {
                                                type: 'object',
                                                properties: getRemainingMaterialsProperties(),
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        400: {
                            description: 'Invalid request',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            message: { type: 'string' },
                                            details: {
                                                oneOf: [
                                                    { type: 'string' },
                                                    {
                                                        type: 'array',
                                                        items: {
                                                            type: 'object',
                                                            properties: {
                                                                material: {
                                                                    type: 'string',
                                                                    enum: Object.values(enumerations_1.E_TamponMaterials),
                                                                },
                                                                required: { type: 'number' },
                                                                available: { type: 'number' },
                                                            },
                                                        },
                                                    },
                                                ],
                                            },
                                        },
                                    },
                                    examples: {
                                        invalidType: {
                                            value: {
                                                message: 'Invalid tampon type specified.',
                                                details: `Accepted tampon types: ${Object.values(enumerations_1.E_SpecificationTypes).join(', ')}`
                                            }
                                        },
                                        invalidQuantity: {
                                            value: {
                                                message: 'Invalid tampon quantity specified.',
                                                details: 'Quantity must be a whole number greater than 0'
                                            }
                                        },
                                        insufficientMaterials: {
                                            value: {
                                                message: 'Insufficient raw materials.',
                                                details: [
                                                    {
                                                        material: 'cotton',
                                                        required: 100,
                                                        available: 50
                                                    },
                                                    {
                                                        material: 'hemp',
                                                        required: 50,
                                                        available: 20
                                                    }
                                                ]
                                            }
                                        }
                                    }
                                },
                            },
                        },
                        500: { description: 'Internal server error.' },
                    },
                },
            },
        },
    },
    apis: [],
};
exports.specs = (0, swagger_jsdoc_1.default)(options);
fs_1.default.writeFileSync('./swagger.json', JSON.stringify(exports.specs, null, 2), 'utf-8');
