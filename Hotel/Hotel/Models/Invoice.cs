namespace Hotel.Models;

public class Invoice
{
    public int Id { get; set; }
    public int GuestId { get; set; }
    public int ReservationId { get; set; }
    public DateTime IssueDate { get; set; }
    public float SubTotal { get; set; }
    public float Discount { get; set; }
    public float Tax { get; set; }
    public float Total { get; set; }
    public string? Status { get; set; }
}