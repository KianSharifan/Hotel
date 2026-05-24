namespace Hotel.Models;

public class Employee
{
    public int Id { get; set; }
    public int PositionId { get; set; }
    public int DepartmentId { get; set; }
    public DateTime HireDate { get; set; }

    private double salary;
    public double Salary
    {
        get => salary;
        set
        {
            if (value < 0)
                throw new Exception();
            salary = value;
        }
    }

    public DateTime BirthDate { get; set; }
}