using System.Runtime.InteropServices.JavaScript;
using System.Text;
using Hotel.Data;
using Hotel.DTOs;
using Hotel.Models;

namespace Hotel.Services;

public class CardService
{
    private readonly AppDBContext _context;
    
    public CardService(AppDBContext context)
    {
    _context = context;
    }

    public bool GuestExists(PaymentDTO paymentDto)
    {
        if (_context.Guests.Any(g => g.User.Username == paymentDto.Username))
        {
            return true;
        }
        return false;
    }

    public bool AddGuest(PaymentDTO paymentDto)
    {
        if (GuestExists(paymentDto))
        {
            return false;
        }
        else
        {
            User user = new User()
            {
                Username = paymentDto.Username,
                PasswordHash = Encoding.UTF8.GetBytes(paymentDto.Password).ToString(),
                CreatedAt = DateTime.Now,
                RoleId = 5
            };
            _context.Users.Add(user);
            _context.SaveChanges();
            Guest guest = new Guest()
            {
                GuestId = user.Id
            };
            _context.Guests.Add(guest);
            _context.SaveChanges();
        }
        return true;
    }
}