namespace Hotel.DTOs;

public class OrderDTO
{
    public int? GuestId { get; set; }
    public int? TableId { get; set; }
    public string? OrderType { get; set; }
    public string? Status { get; set; }
}