using dotNet_IOT.Models;
using dotNet_IOT.Repository;
using dotNet_IOT.Services;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Driver;
using MongoDB.Bson;
using System.Collections;

var builder = WebApplication.CreateBuilder(args);

const string connectionString = "mongodb://mongodb:27017/";


var databaseName = "SolarPower";
var collectionName = "SolarData"; if (string.IsNullOrEmpty(connectionString))
{
    throw new InvalidOperationException("MongoDB connection string is not set in the environment variables or appsettings.");
}

var settings = MongoClientSettings.FromConnectionString(connectionString);
settings.ServerApi = new ServerApi(ServerApiVersion.V1);

builder.Services.AddGrpc();

builder.Services.AddSingleton<IMongoClient>(new MongoClient(settings));

builder.Services.AddScoped<ISolarDataRepository, SolarDataRepository>(sp =>
{
    var client = sp.GetRequiredService<IMongoClient>();
    var database = client.GetDatabase(databaseName);
    var collection = database.GetCollection<SolarData>(collectionName);
    return new SolarDataRepository(client, databaseName, collectionName);
});

var app = builder.Build();

app.MapGrpcService<GreeterService>();
app.MapGrpcService<DataService>();
app.MapGet("/", () => "Communication with gRPC endpoints must be made through a gRPC client. To learn how to create a client, visit: https://go.microsoft.com/fwlink/?linkid=2086909");

app.Run();
