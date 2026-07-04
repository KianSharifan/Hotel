namespace Hotel.Models;

public class OrderItem
{
    public int Id { get; set; }
    public int ItemId { get; set; }
    public MenuItem? MenuItem { get; set; }
    public int OrderId { get; set; }
    public Order? Order { get; set; }
    public uint Quantity { get; set; }
}