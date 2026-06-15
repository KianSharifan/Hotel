namespace Hotel.Models;

public class RoomType
{
    public int RoomTypeId { get; set; }
    public string? Name { get; set; }

    private uint maxGuests;
    public uint MaxGuests
    {
        get => maxGuests;
        set
        {
            if (value > 15)
                throw new Exception();
            maxGuests = value;
        }
    }
    public int NumberDoubleBed { get; set; }
    public int NumberSofaBed { get; set; }
    public int NumberSingleBed { get; set; }
    public string? Description { get; set; }
    public string? URL { get; set; }
    private double price;
    public double Price
    {
        get => price;
        set
        {
            if (value < 0)
                throw new Exception();
            price = value;
        }
    }
}