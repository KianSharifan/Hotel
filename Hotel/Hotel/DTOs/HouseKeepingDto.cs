namespace Hotel.DTOs;

public class HouseKeepingDto
{
    public int? HouseKeepingId { get; set; }
    public int? RoomId { get; set; }
    public int? EmployeeId { get; set; }
    public bool? Status { get; set; }
    public DateTime? ScheduledDate { get; set; }
    public string? Notes { get; set; }
}