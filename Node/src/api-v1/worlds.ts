import { Operation } from 'express-openapi';

export const GET: Operation = (req, res, next) => {
  // Your logic to handle the GET request
  
  res.status(200).json({ message: 'Worlds fetched successfully.' });
};

GET.apiDoc = {
  description: 'Get worlds',
  operationId: 'getWorlds',
  tags: ['worlds'],
  responses: {
    200: {
      description: 'Successful response',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/World',
            },
          },
        },
      },
    },
  },
};
