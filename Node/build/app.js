"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apiDoc_1 = __importDefault(require("./api-v1/apiDoc"));
const express_openapi_1 = require("express-openapi");
const dcService_1 = __importDefault(require("./services/dcService"));
const path_1 = __importDefault(require("path"));
const dataRoutes_1 = __importDefault(require("./routes/dataRoutes"));
const aggregationRoutes_1 = __importDefault(require("./routes/aggregationRoutes"));
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const port = 3000;
const app = (0, express_1.default)();
const routesPath = path_1.default.resolve(__dirname, 'routes');
(0, express_openapi_1.initialize)({
    app,
    apiDoc: apiDoc_1.default,
    paths: routesPath,
    dependencies: {
        dcService: dcService_1.default
    },
});
app.use(express_1.default.json());
app.use('/data', dataRoutes_1.default);
app.use('/Aggregation', aggregationRoutes_1.default);
app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${port}`);
});
