namespace Hotel.DTOs;

public class MaintenanceRequestDTO
{
    public int? Id { get; set; }
    public int? RoomId { get; set; }
    public int? ReportedEmployeeId { get; set; }
    public string? Description { get; set; }
    public string? Priority{ get; set; }
    public string? Status { get; set; }
    public DateTime? CreateDate { get; set; }
    public DateTime? ModifyDate { get; set; }
}