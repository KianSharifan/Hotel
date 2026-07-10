using System.Security.Cryptography;
using System.Text;
using Hotel.Data;
using Microsoft.AspNetCore.Mvc;
using Hotel.DTOs;
using Microsoft.EntityFrameworkCore;

namespace Hotel.Controllers;

[ApiController]
[Route("API/Login")]
public class AuthController : ControllerBase
{
    private readonly AppDBContext _context;
    private readonly JwtService _jwtService;

    public AuthController(AppDBContext context, JwtService jwtService)
    {
        _context = context;
        _jwtService = jwtService;
    }

    [HttpPost]
    public IActionResult Login(LoginDto dto)
    {
        var user = _context.Users
            .Include(u => u.Role)
            .FirstOrDefault(x => x.Username == dto.Username);

        if (user == null)
            return Unauthorized();

        var bytes = Encoding.UTF8.GetBytes(dto.Password);
        if (user.PasswordHash != Convert.ToHexString(SHA256.HashData(bytes)))
            return Unauthorized();

        var token = _jwtService.GenerateToken(user);

        return Ok(new {Token = token});
    }
}