using MongoDB.Bson;
using MongoDB.Driver;
using System.Text.Json;
using dotNet_IOT.Models;
using System.Threading.Tasks;

namespace dotNet_IOT.Repository
{
    public class SolarDataRepository : ISolarDataRepository
    {
        private readonly IMongoCollection<Models.SolarData> _collection;

        public SolarDataRepository(IMongoClient mongoClient, string databaseName, string collectionName)
        {
            _collection = mongoClient.GetDatabase(databaseName).GetCollection<Models.SolarData>(collectionName);
        }

        public async Task<List<Models.SolarData>> GetAllAsync()
        {
            return await _collection.Find(new BsonDocument()).ToListAsync();
        }


        Task<List<Models.SolarData>> ISolarDataRepository.GetAllAsync()
        {
            throw new NotImplementedException();
        }



        public async Task<Models.SolarData> GetByDateTimeAsync(string dateTime)
        {
            var filter = Builders<Models.SolarData>.Filter.Eq("DateTime", dateTime);
            return await _collection.Find(filter).FirstOrDefaultAsync();
        }

        public async Task<List<Models.SolarData>> GetAcListAsync(DateTime from, DateTime until)
        {
            string fromString = from.ToString("dd-MM-yyyy HH:mm:ss");
            string untilString = until.ToString("dd-MM-yyyy HH:mm:ss");

            var filter = Builders<Models.SolarData>.Filter.Gte(data => data.DATE_TIME, fromString) &
             Builders<Models.SolarData>.Filter.Lte(data => data.DATE_TIME, untilString);

            var projection = Builders<Models.SolarData>.Projection.Exclude("_id"); // Exclude the _id field

            return await _collection.Find(filter).Project<Models.SolarData>(projection).ToListAsync();
        }

        public async Task AddDataAsync(Models.SolarData data)
        {
            await _collection.InsertOneAsync(data);
        }

        public async Task UpdateDataAsync(Models.SolarData updatedData)
        {
            var filter = Builders<Models.SolarData>.Filter.Eq("DateTime", updatedData.DATE_TIME);
            var update = Builders<Models.SolarData>.Update
                .Set("AcPower", updatedData.AC_POWER) //CHECK
                .Set("DcPower", updatedData.DC_POWER) //CHECK
                .Set("TotalYield", updatedData.TOTAL_YIELD); //CHECK
            await _collection.UpdateOneAsync(filter, update);
        }

        public async Task DeleteDataAsync(string dateTime)
        {
            var filter = Builders<Models.SolarData>.Filter.Eq("DateTime", dateTime);
            await _collection.DeleteOneAsync(filter);
        }

    }

}
