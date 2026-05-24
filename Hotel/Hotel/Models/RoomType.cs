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

    public string? Description { get; set; }
}