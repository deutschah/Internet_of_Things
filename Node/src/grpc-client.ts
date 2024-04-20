import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';

const PROTO_PATH = './src/Protos/greeter.proto'; // Make sure this is the correct path

// Load the protobuf
const packageDefinition = protoLoader.loadSync(
  PROTO_PATH,
  {keepCase: true, longs: String, enums: String, defaults: true, oneofs: true}
);

interface GreeterClient extends grpc.Client {
  sayHello: (request: { name: string }, callback: (error: grpc.ServiceError | null, response: { message: string }) => void) => void;
}

const greeterProto = grpc.loadPackageDefinition(packageDefinition) as unknown as { greeter: { Greeter: grpc.ServiceClientConstructor } };

export function createGrpcClient(): GreeterClient {
  if (!greeterProto || !greeterProto.greeter || !greeterProto.greeter.Greeter) {
    console.error('Failed to load Greeter service. Check the package name and structure of the .proto file.');
    throw new Error('Failed to load Greeter service.');
  }
  return new greeterProto.greeter.Greeter('localhost:8080', grpc.credentials.createInsecure()) as unknown as GreeterClient;
}
