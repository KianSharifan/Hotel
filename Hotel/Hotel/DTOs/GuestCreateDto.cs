namespace Hotel.DTOs;

public class GuestCreateDto
{
    public required string Username { get; set; }
    public required string Email { get; set; }
    public required string Password {get; set;}
    
}