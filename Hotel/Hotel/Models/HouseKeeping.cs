namespace Hotel.Models;

public class HouseKeeping
{
    public int Id { get; set; }
    public int RoomId  { get; set; }
    public int EmployeeId { get; set; }
    public bool Status { get; set; }
    public DateTime ScheduledDate { get; set; }
    public string? Notes { get; set; }
}