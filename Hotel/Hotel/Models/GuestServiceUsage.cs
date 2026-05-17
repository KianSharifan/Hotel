namespace Hotel.Models;

public class GuestServiceUsage
{
    public int Id { get; set; }
    public int GuestId { get; set; }
    public int ServiceId { get; set; }
    public int ReservationId { get; set; }
    public int Quantity { get; set; }
    public Double Price { get; set; }
    public DateTime UseDate { get; set; }
}