namespace Hotel.DTOs;

public class RoomSearchDto
{
    public int NumberOfAdults { get; set; }
    public int NumberOfKids { get; set; }
    public DateOnly CheckIn { get; set; }
    public DateOnly CheckOut { get; set; }
}