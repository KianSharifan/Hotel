using System.Security.Cryptography;
using Hotel.Data;
using Hotel.DTOs;
using Hotel.Mappers;
using Hotel.Models;
using Microsoft.AspNetCore.Mvc;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Hotel.Services;
using Microsoft.AspNetCore.Authorization;

namespace Hotel.Controllers;

[Route("API/Users")]
[ApiController]
public class UsersController : Controller
{
    private readonly AppDbContext _context;
    private readonly JwtService _jwtService;
    public UsersController(AppDbContext context, JwtService jwtService)
    {
        _context = context;
        _jwtService = jwtService;

    }
    
    [HttpGet]
    [Authorize(Roles = "HotelManager,FrontOfficeManager")]
    public async Task<IActionResult> GetAllUsers()
    {
        try
        {
            var users = await _context.Users.ToListAsync();
            var output = users.Select(u => u.ToAdminDto()).ToList();
            return Ok(output);
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    }
    
    [HttpGet("{userName}")]
    [Authorize(Roles = "HotelManager,FrontOfficeManager")]
    public async Task<IActionResult> GetUser(string userName)
    {
        try
        {
            var u = await _context.Users.FirstOrDefaultAsync(u => u.Username == userName);
            if (u == null)
                return NotFound();
            return Ok(u.ToAdminDto());
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    }
    
    [HttpPost("Guests")]
    [AllowAnonymous]
    public async Task<IActionResult> CreateGuest([FromBody] GuestCreateDto guest)
    {
        try
        {
            var role = await _context.Roles.FirstOrDefaultAsync(x => x.Name == "Guest");
            if(role == null)
                return BadRequest("Role Guest not found");
            var bytes = Encoding.UTF8.GetBytes(guest.Password);
            var u = new User()
            {
                Username = guest.Username,
                Email = guest.Email,
                IsActive = false,
                CreatedAt = DateTime.UtcNow,
                RoleId = role.RoleId,
                PasswordHash = Convert.ToHexString(SHA256.HashData(bytes))
            };
            await _context.Users.AddAsync(u);
            await _context.SaveChangesAsync();
            var g = new Guest()
            {
                GuestId = u.Id
            };
            u.Role = await _context.Roles.FirstOrDefaultAsync(x => x.Name == "Guest");
            var token = _jwtService.GenerateToken(u);
            await _context.Guests.AddAsync(g);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetUser) ,new {userName = u.Username},token);
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    }
    
    [HttpDelete("{userName}")]
    [Authorize(Roles = "HotelManager,FrontOfficeManager")]
    public async Task<IActionResult> DeleteUser(String userName)
    {
        try
        {
            var user = await _context.Users.Where(x => x.Username == userName)
                .Include(x => x.Role).FirstOrDefaultAsync();
            if (user == null)
                return NotFound();
            if (user.Role == null)
                return BadRequest("Role Not found");
            if (user.Role.Name == "Guest")
            {
                var g = await _context.Guests.FirstOrDefaultAsync(g => g.GuestId == user.Id);
                if (g == null) 
                    return NotFound();
                _context.Guests.Remove(g);
            }
            else
            {
                var e = await _context.Employees.FirstOrDefaultAsync(e => e.Id == user.Id);
                if (e == null) 
                    return NotFound();
                _context.Employees.Remove(e);
            }
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    }
    
    [HttpPost("Employees")]
    // [Authorize(Roles = "HotelManager,DirectorOfHR")]
    public async Task<IActionResult> CreateEmployee(EmployeeCreateDto employee)
    {
        try
        {
            if (await _context.Users.AnyAsync(u => u.Email == employee.Email))
            {
                return BadRequest("Email already exists.");
            }
            if (employee.Position == null)
                return BadRequest("Position null");
            var position = await _context.Positions.FirstOrDefaultAsync(p => p.Title!.ToLower() == employee.Position.ToLower());
            if(position == null)
                return BadRequest("Position not found");
            if (employee.Salary < position.BaseSalary)
                return BadRequest("Salary is too low");
            byte[] bytes = Encoding.UTF8.GetBytes(employee.Password);
            var u = new User()
            {
                Username = employee.UserName,
                Email = employee.Email,
                IsActive = true,
                CreatedAt = DateTime.UtcNow,
                PasswordHash = Convert.ToHexString(SHA256.HashData(bytes)),
                RoleId = employee.RoleId
            };
            await _context.Users.AddAsync(u);
            await _context.SaveChangesAsync();
            var e = new Employee()
            {
                Id = u.Id,
                BirthDate = employee.BirthDate.ToDateTime(new TimeOnly(0, 0, 0)).ToUniversalTime(),
                Salary = employee.Salary,
                HireDate = DateTime.UtcNow,
                DepartmentId = employee.DepartmentId,
                PositionId = position.Id
            };
            await _context.Employees.AddAsync(e);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetUser), new { userName = employee.UserName }, e);
        }
        catch (Exception e)
        {
            // return StatusCode(500, "An unexpected error occurred");
            return BadRequest(e.ToString());
        }
    }
}