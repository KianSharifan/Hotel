namespace Hotel.Models;

public class HouseKeeping
{
    public int Id { get; set; }
    public int RoomId  { get; set; }
    public Room Room { get; set; }
    public int EmployeeId { get; set; }
    public Employee Employee { get; set; }
    public bool Status { get; set; }
    public DateTime ScheduledDate { get; set; }
    public string? Notes { get; set; }
}