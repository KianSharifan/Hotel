namespace Hotel.Models;

public class Payment
{
    public int Id { get; set; }
    // each one of this two will determine that the money was for food or for room
    public int? InvoiceId { get; set; }
    public int? OrderId { get; set; }

    private double _amount;
    public double Amount
    {
        get => _amount; 
        set
        {
            if (value < 0)
                throw new ArgumentException("Amount cannot be negative.");
            _amount = value; 
        }
    }
    public string? Status { get; set; }
    public DateTime PaymentDate { get; set; }
    public string? TransactionId { get; set; }
    public string? PaymentMethod { get; set; }
}