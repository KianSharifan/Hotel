namespace Hotel.Interfaces;
using Hotel.DTOs;

public interface IValidationServices
{
    bool GuestExists(PaymentDto paymentDto);
    bool AddGuest(PaymentDto paymentDto);
}