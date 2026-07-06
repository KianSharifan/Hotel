namespace Hotel.Models;

public class ShiftAssignment
{
    public int EmployeeId { get; set; }
    public Employee? Employee { get; set; }
    public int ShiftId { get; set; }
    public Shift? Shift { get; set; }
}