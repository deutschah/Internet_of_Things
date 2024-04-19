namespace dotNet_IOT.Aggregations
{
    public static class DataAggregator
    {
        public static double GetMax<T>(List<T> dataList, Func<T, double> selector)
        {
            if (dataList == null || !dataList.Any())
                throw new ArgumentException("Data list is null or empty");

            return dataList.Max(selector);
        }

        public static double GetMin<T>(List<T> dataList, Func<T, double> selector)
        {
            if (dataList == null || !dataList.Any())
                throw new ArgumentException("Data list is null or empty");

            return dataList.Min(selector);
        }
        public static double GetAverage<T>(List<T> dataList, Func<T, double> selector)
        {
            if (dataList == null || !dataList.Any())
                throw new ArgumentException("Data list is null or empty");

            return dataList.Average(selector);
        }

    }
}
