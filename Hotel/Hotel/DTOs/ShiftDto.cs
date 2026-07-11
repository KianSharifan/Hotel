namespace Hotel.DTOs;

public class ShiftDto
{
    public string? Day { get; set; }
    public TimeOnly? Start { get; set; }
    public TimeOnly? End { get; set; }
}