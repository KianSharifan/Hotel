using System.Security.Cryptography;
using System.Text;
using Hotel.Data;
using Hotel.DTOs;
using Hotel.Interfaces;
using Hotel.Models;

namespace Hotel.Services;

public class ValidationService : IValidationServices
{
    private readonly AppDbContext _context;
    
    public ValidationService(AppDbContext context)
    {
    _context = context;
    }

    public bool GuestExists(PaymentDto paymentDto)
    {
        var u = _context.Users.FirstOrDefault(u => u.Username == paymentDto.Username);
        if (u == null)
            return false;
        var rId = _context.Roles.FirstOrDefault(r => r.Name == "Guest");
        if (rId == null)
            return false;
        if (u.RoleId != rId.RoleId)
            return false;
        return true;
    }

    public bool AddGuest(PaymentDto paymentDto)
    {
        if (GuestExists(paymentDto))
            return false;
        var r = _context.Roles.FirstOrDefault(u => u.Name == "Guest");
        if (r == null)
            throw new Exception("Guest Role Doesn't Exist");
        if (paymentDto.Password == null || paymentDto.Username == null)
            throw new Exception("Password and Username are required");
        byte[] bytes = Encoding.UTF8.GetBytes(paymentDto.Password);
        User user = new User()
        {
            Username = paymentDto.Username,
            PasswordHash = Convert.ToHexString(SHA256.HashData(bytes)),
            CreatedAt = DateTime.UtcNow,
            RoleId = r.RoleId
        };
        _context.Users.Add(user);
        _context.SaveChanges();
        Guest guest = new Guest()
        {
            GuestId = user.Id
        };
        _context.Guests.Add(guest);
        _context.SaveChanges();
        return true;
    }
}