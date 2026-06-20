namespace Hotel.Models;

public class TableReservation
{
    public int TableId { get; set; }
    public Table Table { get; set; }
    public string Email { get; set; }
    public DateTime Time { get; set; }
    public string? Description { get; set; }
}