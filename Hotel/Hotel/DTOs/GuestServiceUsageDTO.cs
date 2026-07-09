namespace Hotel.DTOs;

public class GuestServiceUsageDTO
{
    public string? UserName { get; set; }
    public string? ServiceName { get; set; }
    public int? RoomNumber { get; set; }
    public uint? Quantity { get; set; }
    public DateTime? UseDate { get; set; }
}