namespace Hotel.Models;

public class Reservation
{
    public int Id { get; set; }
    public int GuestId { get; set; }
    public int RoomId { get; set; }
    public DateTime CheckInDate { get; set; }
    public DateTime CheckOutDate { get; set; }
    public int NumberOfGuests { get; set; }
    public string? Status{ get; set; }
    public string? SpecialRequest { get; set; }
}