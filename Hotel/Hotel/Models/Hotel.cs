namespace Hotel.Models;

public class Hotel
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public string? Address { get; set; }
    public string? City { get; set; }
    public string? Country { get; set; }
    public string? Phone { get; set; }
    public string? Email { get; set; }

    private double _starRating;
    public double StarRating
    {
        get => _starRating;
        set
        {
            if (value > 5 || value < 0)
                throw new Exception();
            _starRating = value;
        }
    }

    public TimeOnly CheckInTime { get; set; }
    public TimeOnly CheckOutTime { get; set; }
}