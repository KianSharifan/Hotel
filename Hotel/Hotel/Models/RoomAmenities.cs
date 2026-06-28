namespace Hotel.Models;

public class RoomAmenities
{
    public int RoomTypeId { get; set; }
    public RoomType RoomType { get; set; }
    public int AmenityId { get; set; }
    public Amenity Amenity { get; set; }
}