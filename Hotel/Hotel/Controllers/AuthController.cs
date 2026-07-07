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

    public AuthController(
        AppDBContext context,
        JwtService jwtService)
    {
        _context = context;
        _jwtService = jwtService;
    }

    [HttpPost]
    public IActionResult Login(LoginDto dto)
    {
        var user = _context.Users
            .Include(u => u.Role.Name)
            .FirstOrDefault(x => x.Username == dto.Username);

        if (user == null)
            return Unauthorized();

        if (user.PasswordHash != Encoding.UTF8.GetBytes(dto.Password).ToString())
            return Unauthorized();

        var token =
            _jwtService.GenerateToken(user);

        return Ok(new
        {
            Token = token
        });
    }
}