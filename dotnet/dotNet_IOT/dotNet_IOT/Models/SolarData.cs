namespace dotNet_IOT.Models
{
    public class SolarData
    {
            public string DATE_TIME { get; set; }
            public double DC_POWER { get; set; }
            public double AC_POWER { get; set; }
            public double TOTAL_YIELD { get; set; }
            public object Id { get; internal set; }
            public int? PLANT_ID { get; set; }

            public double DAILY_YIELD { get; set; } 
            public string? SOURCE_KEY { get; set; }
      



    }
}
