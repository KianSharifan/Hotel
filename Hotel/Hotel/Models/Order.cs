namespace Hotel.Models;

public class Order
{
    public int Id { get; set; }
    public int? GuestId { get; set; }
    public int? TableId { get; set; }
    public string? OrderType { get; set; }
    public string? Status { get; set; }
    public TimeOnly CreatedAt {get; set;}
    private double totalPrice;
    public double TotalPrice
    {
        get => totalPrice;
        set
        {
            if (value < 0)
                throw new Exception();
            totalPrice = value;
        }
    }
}