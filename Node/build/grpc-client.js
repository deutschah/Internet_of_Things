"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGrpcClient = void 0;
const grpc_js_1 = __importDefault(require("@grpc/grpc-js"));
const proto_loader_1 = __importDefault(require("@grpc/proto-loader"));
const PROTO_PATH = './src/Protos/greeter.proto'; // Make sure this is the correct path
// Load the protobuf
const packageDefinition = proto_loader_1.default.loadSync(PROTO_PATH, { keepCase: true, longs: String, enums: String, defaults: true, oneofs: true });
const greeterProto = grpc_js_1.default.loadPackageDefinition(packageDefinition);
function createGrpcClient() {
    if (!greeterProto || !greeterProto.greeter || !greeterProto.greeter.Greeter) {
        console.error('Failed to load Greeter service. Check the package name and structure of the .proto file.');
        throw new Error('Failed to load Greeter service.');
    }
    return new greeterProto.greeter.Greeter('localhost:5039', grpc_js_1.default.credentials.createInsecure());
}
exports.createGrpcClient = createGrpcClient;
