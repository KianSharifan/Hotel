namespace Hotel.Models;

public class  GuestServiceUsage
{
    public int Id { get; set; }
    public int GuestId { get; set; }
    public Guest? Guest { get; set; }
    public int ServiceId { get; set; }
    public Service? Service { get; set; }
    public int ReservationId { get; set; }
    public Reservation? Reservation { get; set; } 

    private uint _quantity;
    public uint Quantity
    {
        get => _quantity;
        set
        {
            if (value <= 0)
                throw new Exception();
            _quantity = value;
        }
    }

    private double _price;
    public double Price
    {
        get => _price;
        set
        {
            if (value <= 0)
                throw new Exception();
            _price = value;
        }
    }
    
    public DateTime UseDate { get; set; }
}