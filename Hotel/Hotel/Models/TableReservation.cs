using System.ComponentModel.DataAnnotations;

namespace Hotel.Models;

public class TableReservation
{
    public int Id { get; set; }
    public int TableId { get; set; }
    public Table? Table { get; set; }
    [MaxLength(100)]
    public required string Email { get; set; }
    public DateTime Time { get; set; }
    public string? Description { get; set; }
}