namespace Hotel.Models;

public class Shift
{
    public int Id { get; set; }

    private string _day = null!;
    public string Day
    {
        get => _day;
        set
        {
            if (value != "Monday" &&
                value != "Tuesday" &&
                value != "Wednesday" &&
                value != "Thursday" &&
                value != "Friday" &&
                value != "Saturday" &&
                value != "Sunday")
            {
                throw new ArgumentException("Invalid day");
            }
            _day = value;
        }
    }

    public TimeOnly StartTime{ get; set; }
    public TimeOnly EndTime{ get; set; }
}