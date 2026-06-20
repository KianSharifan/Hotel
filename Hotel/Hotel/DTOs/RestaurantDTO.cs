namespace Hotel.DTOs;

public class RestaurantDTO
{
    public string Name { get; set; }
    public string Address { get; set; }
    public TimeOnly OpenTime { get; set; }
    public TimeOnly CloseTime { get; set; }
}