namespace Hotel.DTOs;

public class HotelDto
{
    public string? Name { get; set; }
    public string? Address { get; set; }
    public string? City { get; set; }
    public string? Country { get; set; }
    public string? Phone { get; set; }
    public string? Email { get; set; }
    public double? StarRating { get; set; }
    public TimeOnly? CheckinTime { get; set; }
    public TimeOnly? CheckoutTime { get; set; }
}