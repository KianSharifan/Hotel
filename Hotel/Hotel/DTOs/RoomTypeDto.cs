namespace Hotel.DTOs;

public class RoomTypeDto
{
    public string? Name { get; set; }
    public uint? MaxGuests { get; set; }
    public int? NumberOfDoubles { get; set; }
    public int? NumberOfSofa { get; set; }
    public int? NumberOfSingles { get; set; }
    public string? Image { get; set; }
    public double? Price { get; set; }
    public string? Description { get; set; }
}