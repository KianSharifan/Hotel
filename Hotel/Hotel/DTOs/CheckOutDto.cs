namespace Hotel.DTOs;

public class CheckOutDto
{
    public int? RoomNumber { get; set; }
    public DateOnly? ReservationDate { get; set; }
    public double? Discount { get; set; }
    public double? Tax { get; set; }
}