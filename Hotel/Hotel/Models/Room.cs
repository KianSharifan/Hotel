namespace Hotel.Models;

public class Room
{
    public int RoomId { get; set; }
    public int HotelId { get; set; }
    public Models.Hotel Hotel { get; set; }
    public uint RoomNumber { get; set; }
    public int Floor { get; set; }
    public int RoomTypeId { get; set; }
    public RoomType RoomType { get; set; }
    public string? Status { get; set; }

    private double pricePerNight;
    public double PricePerNight
    {
        get => pricePerNight;
        set
        {
            if (value < 0)
                throw new Exception();
            pricePerNight = value;
        }
    }
    
    public string? Notes { get; set; }
}