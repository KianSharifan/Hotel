namespace Hotel.DTOs;

public class RoomDto
{
    public int? HotelId { get; set; }
    public uint? RoomNumber { get; set; }
    public int? Floor { get; set; }
    public int? RoomTypeId { get; set; }
    public string? Status { get; set; }
    public string? Note {get; set;}
}