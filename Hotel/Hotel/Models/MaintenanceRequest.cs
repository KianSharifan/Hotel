namespace Hotel.Models;

public class MaintenanceRequest
{
    public int Id { get; set; }
    public int RoomId { get; set; }
    public int ReportedEmployeeId { get; set; }
    public string? Description { get; set; }
    public string? Priority { get; set; }
    public string? Status { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime ModifiedDate { get; set; }
}