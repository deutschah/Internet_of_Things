"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDCDoc = void 0;
exports.getDCDoc = {
    description: 'Retrieve DC data',
    operationId: 'getDCData',
    parameters: [
        {
            in: 'query',
            name: 'worldName',
            required: true,
            schema: {
                type: 'string'
            }
        }
    ],
    tags: ['DC'],
    responses: {
        200: {
            description: 'Success',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string'
                            }
                        }
                    }
                }
            }
        }
    }
};
