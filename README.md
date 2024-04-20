# Solar Power IoT Project

## Overview
This IoT project utilizes solar power data to provide various functionalities through REST endpoints. The project consists of services implemented in Node.js and .NET Core, communicating with each other via gRPC. MongoDB is used as the database to store solar power data.

## Functionalities
- **GET Data**: Retrieve solar power data from the database.
- **POST Data**: Add new solar power data to the database.
- **PUT Data**: Update existing solar power data in the database.
- **DELETE Data**: Remove solar power data from the database.

## Database Schema
The MongoDB database schema includes the following properties:
- `DATE_TIME`: Timestamp of the data entry.
- `AC_POWER`: AC power generated.
- `DC_POWER`: DC power generated.
- `TOTAL_YIELD`: Total yield of solar power.
- `DAILY_YIELD`: Daily yield of solar power.

## Services
### Node.js Service
- Accepts REST requests from clients.
- Communicates with the .NET service via gRPC.
- Provides endpoints for CRUD operations on solar power data.

### .NET Service
- Communicates with the MongoDB database.
- Handles gRPC requests from the Node.js service.
- Implements business logic for solar power data manipulation.

## Running the Project
To run the project, follow these steps:
1. Make sure Docker is installed on your machine.
2. Clone the repository.
3. Navigate to the project directory.
4. Run `docker-compose up -d` to start the services.
5. Access the REST endpoints provided by the Node.js service.

## Dependencies
- Docker
- Node.js
- .NET Core
- MongoDB