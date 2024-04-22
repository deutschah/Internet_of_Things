import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';

const PROTO_PATH = './src/Protos/Data.proto';  

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);

const DataClient = (protoDescriptor.GrpcServer as any).Data;

const grpcClient = new DataClient('dotnet-service:8080', grpc.credentials.createInsecure()); 

export default grpcClient;



