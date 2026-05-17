namespace Hotel.Models;

public class Room
{
    public int RoomId { get; set; }
    public int HotelId { get; set; }
    public int RoomNumber { get; set; }
    public int Floor { get; set; }
    public int RoomTypeId { get; set; }
    public string? Status { get; set; }
    public Double PricePerNight { get; set; }
    public string? Notes { get; set; }
}