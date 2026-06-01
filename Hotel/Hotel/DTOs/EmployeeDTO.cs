using Hotel.Models;

namespace Hotel.DTOs;

public class EmployeeDTO
{
    public string Username { get; set; }
    public string PositionTitle { get; set; }
    public string DepartmentTitle { get; set; }
    public double Salary { get; set; }
    public List<Shift>  Shifts { get; set; }
}