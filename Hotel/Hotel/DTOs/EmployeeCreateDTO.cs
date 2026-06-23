namespace Hotel.DTOs;

public class EmployeeCreateDTO
{
    public string UserName { get; set; }
    public string Password { get; set; }
    public string Email { get; set; }
    public int RoleId { get; set; }
    public DateOnly BirthDate { get; set; }
    public double Salary { get; set; }
    public int DepartmentId { get; set; }
    public int PositionId { get; set; }
}