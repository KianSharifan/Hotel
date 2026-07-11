using Hotel.Models;

namespace Hotel.DTOs;

public class RoomReservationDto
{
    public int NAdults { get; set; }
    public int NKids { get; set; }
    public DateOnly CheckIn  { get; set; }
    public DateOnly CheckOut { get; set; }
    public int RoomTypeId { get; set; }
    //0 for nothing 1 for just breakfast 2 for everything
    public int Meals { get; set; }
    public double TotalPrice { get; set; }
    public PaymentDto? PaymentDTO { get; set; }
    public int GuestId { get; set; }
    public string? SpecialRequest { get; set; }
}