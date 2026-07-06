namespace Hotel.Models;

public class Position
{
    public int Id { get; set; }
    public string? Title { get; set; }
    private double _baseSalary;
    public double BaseSalary
    {
        get => _baseSalary;
        set
        {
            if (value < 0)
                throw new Exception();
            _baseSalary = value;
        }
    }
}