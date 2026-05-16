namespace Hotel.Models;

public class Table
{
    public int Id { get; set; }
    public int RestaurantId { get; set; }
    public string? Status { get; set; }
    public bool Reserved { get; set; }
}