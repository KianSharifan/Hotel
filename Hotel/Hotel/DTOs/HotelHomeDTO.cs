namespace Hotel.DTOs;

public class HotelHomeDTO
{
    public string Name { get; set; }
    public string Address { get; set; }
    public string City { get; set; }
    public string Country { get; set; }
    public string Phone { get; set; }
    public string Email { get; set; }
    public double starRating { get; set; }
    public TimeOnly checkinTime { get; set; }
    public TimeOnly checkoutTime { get; set; }
}