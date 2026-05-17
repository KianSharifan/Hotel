namespace Hotel.Models;

public class Payment
{
    public int Id { get; set; }
    public int? InvoiceId { get; set; }
    public int? OrderId { get; set; }
    public Double Amount { get; set; }
    public string? Status { get; set; }
    public DateTime PaymentDate { get; set; }
    public string? TransactionId { get; set; }
    public String? PaymentMethod { get; set; }
}