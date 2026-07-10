using System.ComponentModel.DataAnnotations;

namespace Hotel.Models;

public class Room
{
    public int RoomId { get; set; }
    public int HotelId { get; set; }
    public Hotel? Hotel { get; set; }
    public uint RoomNumber { get; set; }
    public int Floor { get; set; }
    public int RoomTypeId { get; set; }
    public RoomType? RoomType { get; set; }
    [MaxLength(500)]
    public string? Status { get; set; }
    [MaxLength(500)]
    public string? Notes { get; set; }
}