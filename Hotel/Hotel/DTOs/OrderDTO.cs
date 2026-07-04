using Hotel.Models;

namespace Hotel.DTOs;

public class OrderDTO
{
    public int TableId { get; set; }
    public string? Status { get; set; }
    public List<OrderItemDTO>?  OrderItems { get; set; }
}