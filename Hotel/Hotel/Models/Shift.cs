namespace Hotel.Models;

public class Shift
{
    public int Id { get; set; }
    private string day;
    public string Day
    {
        get => day;
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
            day = value;
        }
    }

    public TimeOnly StartTime{ get; set; }
    public TimeOnly EndTime{ get; set; }
}