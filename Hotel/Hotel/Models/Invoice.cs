namespace Hotel.Models;

public class Invoice
{
    public int Id { get; set; }
    public int GuestId { get; set; }
    public Guest? Guest { get; set; }
    public int ReservationId { get; set; }
    public Reservation? Reservation { get; set; }
    public DateTime IssueDate { get; set; }
    
    private double _subTotal;
    public double SubTotal
    {
        get => _subTotal;
        set
        {
            if (value < 0)
                throw new Exception();
            _subTotal = value;
        }
    }

    private double _discount;
    public double Discount
    {
        get => _discount;
        set
        {
            if (value < 0)
                throw new Exception();
            _discount = value;
        }
    }

    private double _tax;
    public double Tax
    {
        get => _tax;
        set
        {
            if (value < 0)
                throw new Exception();
            _tax = value;
        }
    }

    private double _total;
    public double Total
    {
        get => _total;
        set
        {
            if (value < 0)
                throw new Exception();
            _total = value;
        }
    }

    public string? Status { get; set; }
}