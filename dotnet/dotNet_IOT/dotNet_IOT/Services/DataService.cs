using System.Globalization;
using System.Threading.Tasks;
using dotNet_IOT.Aggregations;
using dotNet_IOT.Repository;
using Grpc.Core;
using GrpcServer;
using dotNet_IOT.Models;
using Microsoft.Extensions.Logging;

namespace dotNet_IOT.Services
{
    public class DataService : Data.DataBase  
    {
        private readonly ILogger<DataService> _logger;
        private readonly ISolarDataRepository _solarDataRepository;

        public DataService(ILogger<DataService> logger, ISolarDataRepository solarDataRepository)
        {
            _logger = logger;
            _solarDataRepository = solarDataRepository ?? throw new ArgumentNullException(nameof(solarDataRepository));

        }

        public override Task<SolarDataResponse> GetSolarData(SolarDataRequest request, ServerCallContext context)
        {
            _logger.LogInformation("Received request for GetDataInfo");

            var response = new SolarDataResponse
            {
            };

            return Task.FromResult(response);
        }

        public override async Task<GetAcDataResponse> GetData(GetAcDataRequest request, ServerCallContext context)
        {
            if (!DateTime.TryParseExact(request.From, "yyyy-MM-ddTHH:mm:ss", CultureInfo.InvariantCulture, DateTimeStyles.None, out var fromDateTime) ||
                !DateTime.TryParseExact(request.Until, "yyyy-MM-ddTHH:mm:ss", CultureInfo.InvariantCulture, DateTimeStyles.None, out var untilDateTime)){
                throw new RpcException(new Status(StatusCode.InvalidArgument, "Invalid date format"));
            }

            var acDataList = await _solarDataRepository.GetAcListAsync(fromDateTime, untilDateTime);
            
            var response = new GetAcDataResponse();
            foreach (var acData in acDataList)
            {
                response.Entries.Add(new SolarDataEntry
                {
                    DateTime = acData.DATE_TIME,
                    Ac = acData.AC_POWER,
                    TotalYield = acData.TOTAL_YIELD,
                    Dc = acData.DC_POWER
                }) ;
            }

            return response;
        }

        public override async Task<AddDataResponse> AddData(AddDataRequest request, ServerCallContext context)
        {
            _logger.LogInformation("Adding new data entry");
            try
            {
                var solarData = new Models.SolarData
                {
                    DATE_TIME = request.Data.DateTime,
                    AC_POWER = request.Data.AcPower,
                    DC_POWER = request.Data.DcPower,
                    TOTAL_YIELD = request.Data.TotalYield
                };

                await _solarDataRepository.AddDataAsync(solarData);
                return new AddDataResponse { Message = "Data added successfully." };
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to add data: {ex.Message}");
                throw new RpcException(new Status(StatusCode.Internal, "Failed to add data."));
            }
        }


        public override async Task<UpdateDataResponse> UpdateData(UpdateDataRequest request, ServerCallContext context)
        {
            _logger.LogInformation($"Attempting to update data entry for {request.DateTime}");

            if (request == null || request.Data == null)
            {
                _logger.LogError("Request or request data is null");
                throw new RpcException(new Status(StatusCode.InvalidArgument, "Request data is missing."));
            }

            try
            {
                var updatedData = new Models.SolarData
                {
                    DATE_TIME = request.Data.DateTime,
                    AC_POWER = request.Data.AcPower,
                    DC_POWER = request.Data.DcPower,
                    TOTAL_YIELD = request.Data.TotalYield
                };

                if (string.IsNullOrEmpty(updatedData.DATE_TIME))
                {
                    _logger.LogError("DateTime is null or empty");
                    throw new RpcException(new Status(StatusCode.InvalidArgument, "DateTime is required."));
                }

                await _solarDataRepository.UpdateDataAsync(updatedData);
                return new UpdateDataResponse { Message = "Data updated successfully." };
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to update data: {ex.Message}");
                throw new RpcException(new Status(StatusCode.Internal, "Failed to update data."));
            }
        }



        public override async Task<DeleteDataResponse> DeleteData(DeleteDataRequest request, ServerCallContext context)
        {
            _logger.LogInformation($"Deleting data entry for {request.DateTime}");
            try
            {
                await _solarDataRepository.DeleteDataAsync(request.DateTime);
                return new DeleteDataResponse { Message = "Data deleted successfully." };
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to delete data: {ex.Message}");
                throw new RpcException(new Status(StatusCode.Internal, "Failed to delete data."));
            }
        }


        public override async Task<AggregationDataResponse> GetMaxData(GetAggregationDataRequest request, ServerCallContext context)
        {
            try
            {
                if (!DateTime.TryParseExact(request.From, "yyyy-MM-ddTHH:mm:ss", CultureInfo.InvariantCulture, DateTimeStyles.None, out var fromDateTime) ||
                    !DateTime.TryParseExact(request.Until, "yyyy-MM-ddTHH:mm:ss", CultureInfo.InvariantCulture, DateTimeStyles.None, out var untilDateTime))
                {
                    throw new RpcException(new Status(StatusCode.InvalidArgument, "Invalid date format"));
                }

                var acDataList = await _solarDataRepository.GetAcListAsync(fromDateTime, untilDateTime);

                if (acDataList == null || acDataList.Count == 0)
                {
                    throw new RpcException(new Status(StatusCode.NotFound, "No data found within the specified time range."));
                }

                var property = request.Property.ToString();

                double maxValue;

                switch (property)
                {
                    case "AC_POWER":
                        maxValue = DataAggregator.GetMax(acDataList, acData => acData.AC_POWER);
                        break;
                    case "DC_POWER":
                        maxValue = DataAggregator.GetMax(acDataList, acData => acData.DC_POWER);
                        break;
                    case "TOTAL_YIELD":
                        maxValue = DataAggregator.GetMax(acDataList, acData => acData.TOTAL_YIELD);
                        break;
                    default:
                        throw new ArgumentException("Invalid property value", nameof(property));
                }

                var response = new AggregationDataResponse
                {
                    Value = maxValue
                };

                return response;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error occurred: {ex.Message}");
                throw; // Re-throw the exception to ensure it's propagated correctly
            }
        }



        public override async Task<AggregationDataResponse> GetMinData(GetAggregationDataRequest request, ServerCallContext context)
        {
            if (!DateTime.TryParseExact(request.From, "yyyy-MM-ddTHH:mm:ss", CultureInfo.InvariantCulture, DateTimeStyles.None, out var fromDateTime) ||
                !DateTime.TryParseExact(request.Until, "yyyy-MM-ddTHH:mm:ss", CultureInfo.InvariantCulture, DateTimeStyles.None, out var untilDateTime))
            {
                throw new RpcException(new Status(StatusCode.InvalidArgument, "Invalid date format"));
            }

            var acDataList = await _solarDataRepository.GetAcListAsync(fromDateTime, untilDateTime);

            var property = request.Property.ToString();

            double maxPropertyValue;

            switch (property)
            {
                case "AC_POWER":
                    maxPropertyValue = DataAggregator.GetMin(acDataList, acData => acData.AC_POWER);
                    break;
                case "DC_POWER":
                    maxPropertyValue = DataAggregator.GetMin(acDataList, acData => acData.DC_POWER);
                    break;
                case "TOTAL_YIELD":
                    maxPropertyValue = DataAggregator.GetMin(acDataList, acData => acData.TOTAL_YIELD);
                    break;
                default:
                    throw new ArgumentException("Invalid property value", nameof(property));
            }

            var response = new AggregationDataResponse
            {
                Value = maxPropertyValue
            };

            return response;
        }

        public override async Task<AggregationDataResponse> GetAverageData(GetAggregationDataRequest request, ServerCallContext context)
        {
            if (!DateTime.TryParseExact(request.From, "yyyy-MM-ddTHH:mm:ss", CultureInfo.InvariantCulture, DateTimeStyles.None, out var fromDateTime) ||
                !DateTime.TryParseExact(request.Until, "yyyy-MM-ddTHH:mm:ss", CultureInfo.InvariantCulture, DateTimeStyles.None, out var untilDateTime))
            {
                throw new RpcException(new Status(StatusCode.InvalidArgument, "Invalid date format"));
            }

            var acDataList = await _solarDataRepository.GetAcListAsync(fromDateTime, untilDateTime);

            var property = request.Property.ToString();

            double maxPropertyValue;

            switch (property)
            {
                case "AC_POWER":
                    maxPropertyValue = DataAggregator.GetAverage(acDataList, acData => acData.AC_POWER);
                    break;
                case "DC_POWER":
                    maxPropertyValue = DataAggregator.GetAverage(acDataList, acData => acData.DC_POWER);
                    break;
                case "TOTAL_YIELD":
                    maxPropertyValue = DataAggregator.GetAverage(acDataList, acData => acData.TOTAL_YIELD);
                    break;
                default:
                    throw new ArgumentException("Invalid property value", nameof(property));
            }

            var response = new AggregationDataResponse
            {
                Value = maxPropertyValue
            };

            return response;
        }



    }
}
