namespace Hotel.Models;

public class Invoice
{
    public int Id { get; set; }
    public int GuestId { get; set; }
    public Guest Guest { get; set; }
    public int ReservationId { get; set; }
    public Reservation Reservation { get; set; }
    public DateTime IssueDate { get; set; }
    
    private double subTotal;
    public double SubTotal
    {
        get => subTotal;
        set
        {
            if (value < 0)
                throw new Exception();
            subTotal = value;
        }
    }

    private double discount;
    public double Discount
    {
        get => discount;
        set
        {
            if (value < 0)
                throw new Exception();
            discount = value;
        }
    }

    private double tax;
    public double Tax
    {
        get => tax;
        set
        {
            if (value < 0)
                throw new Exception();
            tax = value;
        }
    }

    private double total;
    public double Total
    {
        get => total;
        set
        {
            if (value < 0)
                throw new Exception();
            total = value;
        }
    }

    public string? Status { get; set; }
}