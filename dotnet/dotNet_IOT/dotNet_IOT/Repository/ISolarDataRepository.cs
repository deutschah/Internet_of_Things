using dotNet_IOT.Models;

namespace dotNet_IOT.Repository
{
    public interface ISolarDataRepository
    {
        public Task<List<SolarData>> GetAllAsync();
        Task<SolarData> GetByDateTimeAsync(string dateTime);
        Task<List<SolarData>> GetAcListAsync(DateTime from, DateTime until);

        Task AddDataAsync(SolarData data);
        Task UpdateDataAsync(SolarData data);
        Task DeleteDataAsync(string dateTime);


    }
}
