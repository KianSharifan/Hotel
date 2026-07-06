namespace Hotel.DTOs;

public class CheckInDTO
{
    public string? UserName { get; set; }
    public DateOnly? ReservationDate { get; set; }
    public string? PassportNumber { get; set; }
    public string? Nationality { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
}