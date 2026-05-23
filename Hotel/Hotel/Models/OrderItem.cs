namespace Hotel.Models;

public class OrderItem
{
    public int Id { get; set; }
    public int OrderId { get; set; }
    public uint Quantity { get; set; }
}