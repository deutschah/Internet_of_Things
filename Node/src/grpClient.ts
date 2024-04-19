import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';

const PROTO_PATH = './src/Protos/Data.proto';  // Make sure this path correctly points to your .proto file

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

// Load the package definition into a usable object
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);

// Ensure the package name matches what is in your .proto file
const DataClient = (protoDescriptor.GrpcServer as any).Data;

// Create the client instance
const grpcClient = new DataClient('localhost:5039', grpc.credentials.createInsecure()); // Adjust the host and port if necessary

export default grpcClient;
