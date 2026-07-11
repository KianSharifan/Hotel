using Hotel.Models;

namespace Hotel.DTOs;

public class OrderDto
{
    public int TableId { get; set; }
    public string? Status { get; set; }
    public List<OrderItemDto>?  OrderItems { get; set; }
}