namespace Hotel.Models;

public class Invoice
{
    public int Id { get; set; }
    public int GuestId { get; set; }
    public int ReservationId { get; set; }
    public DateTime IssueDate { get; set; }
    public Double SubTotal { get; set; }
    public Double Discount { get; set; }
    public Double Tax { get; set; }
    public Double Total { get; set; }
    public string? Status { get; set; }
}