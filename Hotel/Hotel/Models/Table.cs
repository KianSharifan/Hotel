namespace Hotel.Models;

public class Table
{
    public int Id { get; set; }
    public int RestaurantId { get; set; }
    public Restaurant? Restaurant { get; set; }
    public string? Status { get; set; }
    public uint Capacity { get; set; }
}