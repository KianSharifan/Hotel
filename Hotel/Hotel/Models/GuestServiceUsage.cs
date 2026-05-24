namespace Hotel.Models;

public class GuestServiceUsage
{
    public int Id { get; set; }
    public int GuestId { get; set; }
    public int ServiceId { get; set; }
    public int ReservationId { get; set; }

    private uint quantity;
    public uint Quantity
    {
        get => quantity;
        set
        {
            if (value <= 0)
                throw new Exception();
            quantity = value;
        }
    }

    private double price;
    public double Price
    {
        get => price;
        set
        {
            if (value <= 0)
                throw new Exception();
            price = value;
        }
    }

    public DateTime UseDate { get; set; }
}