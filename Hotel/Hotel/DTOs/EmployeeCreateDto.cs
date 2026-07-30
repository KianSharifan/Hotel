namespace Hotel.DTOs;

public class EmployeeCreateDto
{
    public required string UserName { get; set; }
    public required string Password { get; set; }
    public required string Email { get; set; }
    public int RoleId { get; set; }
    public DateOnly BirthDate { get; set; }
    public double Salary { get; set; }
    public required string DepartmentName { get; set; }
    public string? Position { get; set; }
}