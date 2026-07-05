using System.ComponentModel.DataAnnotations;

namespace Hotel.Models;

public class Order
{
    public int Id { get; set; }
    public int? TableId { get; set; }
    public Table? Table { get; set; }
    [MaxLength(100)]
    public string? Status { get; set; }
    public TimeOnly CreatedAt {get; set;}
    private double _totalPrice;
    public double TotalPrice
    {
        get => _totalPrice;
        set
        {
            if (value < 0)
                throw new Exception();
            _totalPrice = value;
        }
    }
}