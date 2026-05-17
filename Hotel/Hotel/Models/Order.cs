namespace Hotel.Models;

public class Order
{
    public int Id { get; set; }
    public int? GuestId { get; set; }
    public int? TableId { get; set; }
    public string? OrderType { get; set; }
    public string? Status { get; set; }
    public TimeOnly CreatedAt {get; set;}
    public Double TotalPrice {get; set;}
}