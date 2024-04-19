import express, { Request, Response } from 'express';
import openapi from 'express-openapi'
import apiDoc from './api-v1/apiDoc';
import { initialize } from 'express-openapi';
import dcService from './services/dcService';
import path from 'path';
import data from './routes/dataRoutes'
import aggregation from './routes/aggregationRoutes'
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const port = 3000;
const app = express();
const routesPath = path.resolve(__dirname, 'routes');

initialize({
  app,
  apiDoc,
  paths: routesPath,
  dependencies: {
    dcService
  },
});


app.use(express.json());
app.use('/data', data); 
app.use('/Aggregation',aggregation);





app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

