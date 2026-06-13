namespace Hotel.DTOs;

public class PaymentDTO
{
    public string Email { get; set; }
    public string? Username { get; set; }
    public string Password { get; set; }
    public string? NameOnCard { get; set; }
    public string? CardNumber { get; set; }
    public DateOnly? ExpirationDate { get; set; }
}