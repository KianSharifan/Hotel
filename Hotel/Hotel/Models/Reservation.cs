namespace Hotel.Models;
using Data;

public class Reservation
{
    public int Id { get; set; }
    public int GuestId { get; set; }
    public Guest Guest { get; set; }
    public int RoomId { get; set; }
    public Room Room { get; set; }
    public DateTime CheckInDate { get; set; }
    public DateTime CheckOutDate { get; set; }
    public int NumberOfGuests { get; set; }
    public string? Status{ get; set; }
    public string? SpecialRequest { get; set; }
}