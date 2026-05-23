namespace Hotel.Models;

public class Position
{
    public int Id { get; set; }
    public string? Title { get; set; }
    private double baseSalary;
    public double BaseSalary
    {
        get => baseSalary;
        set
        {
            if (value < 0)
                throw new Exception();
            baseSalary = value;
        }
    }
}