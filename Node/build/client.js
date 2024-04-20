"use strict";
// const grpc = require('@grpc/grpc-js');
// const protoLoader = require('@grpc/proto-loader');
// const PROTO_PATH = './src/Protos/Data.proto'; // Adjust this path as necessary
// const packageDefinition = protoLoader.loadSync(
//   PROTO_PATH,
//   {
//     keepCase: true,
//     longs: String,
//     enums: String,
//     defaults: true,
//     oneofs: true
//   }
// );
// const dataProto = grpc.loadPackageDefinition(packageDefinition).GrpcServer;
// const client = new dataProto.Data('localhost:5039', grpc.credentials.createInsecure()); // Adjust the port to match your server's configuration
// export default function getDataInfo() {
//   client.getDataInfo({ first: 'Hello' }, (error:any, response:any) => {
//     if (error) {
//       console.error('Error:', error);
//     } else {
//       console.log('Data Response:', response.first);
//     }
//   });
// }
// // getDataInfo();
