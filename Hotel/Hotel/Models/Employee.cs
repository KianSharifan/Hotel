namespace Hotel.Models;

public class Employee
{
    public int Id { get; set; }
    public int PositionId { get; set; }
    public int DepartmentId { get; set; }
    public DateTime HireDate { get; set; }
    public Double Salary { get; set; }
    public DateTime BirthDate { get; set; }
}