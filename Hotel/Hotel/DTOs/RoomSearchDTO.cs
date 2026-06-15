namespace Hotel.DTOs;

public class RoomSearchDTO
{
    public int NumberOfAdults { get; set; }
    public int NumberOfKids { get; set; }
    public DateOnly CheckIn { get; set; }
    public DateOnly CheckOut { get; set; }
}