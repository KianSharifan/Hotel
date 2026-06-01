using Hotel.Models;

namespace Hotel.DTOs;

public class GuestDTO
{
    public string Username { get; set; }
    public string PassportNumber { get; set; }
    public string Nationality { get; set; }
    public string? PhoneNumber { get; set; }
    public string? Email { get; set; }
}