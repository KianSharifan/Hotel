using System.ComponentModel.DataAnnotations;

namespace Hotel.Models;

public class MaintenanceRequest
{
    public int Id { get; set; }
    public int RoomId { get; set; }
    public Room? Room { get; set; }
    public int ReportedEmployeeId { get; set; }
    public Employee? ReportedEmployee { get; set; }
    [MaxLength(500)]
    public string? Description { get; set; }
    [MaxLength(100)]
    public string? Priority { get; set; }
    [MaxLength(100)]
    public string? Status { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
}