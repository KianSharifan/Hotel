namespace Hotel.Models;

public class RoomType
{
    public int RoomTypeId { get; set; }
    public string? Name { get; set; }

    private uint _maxGuests;
    public uint MaxGuests
    {
        get => _maxGuests;
        set
        {
            if (value > 15)
                throw new Exception();
            _maxGuests = value;
        }
    }
    public int NumberDoubleBed { get; set; }
    public int NumberSofaBed { get; set; }
    public int NumberSingleBed { get; set; }
    public string? Description { get; set; }
    public string? PicUrl { get; set; }
    private double _price;
    public double Price
    {
        get => _price;
        set
        {
            if (value < 0)
                throw new Exception();
            _price = value;
        }
    }
}