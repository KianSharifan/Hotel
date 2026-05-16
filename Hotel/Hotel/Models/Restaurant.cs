namespace Hotel.Models;

public class Restaurant
{
    public int Id { get; set; }
    public int HotelId { get; set; }
    public string? Name { get; set; }
    public string? Address { get; set; }
    public TimeOnly OpeningTime { get; set; }
    public TimeOnly ClosingTime { get; set; }
}