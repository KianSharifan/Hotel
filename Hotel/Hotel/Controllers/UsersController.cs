using System.Security.Cryptography;
using Hotel.Data;
using Hotel.DTOs;
using Hotel.Mappers;
using Hotel.Models;
using Microsoft.AspNetCore.Mvc;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Hotel.Services;

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
    
    //should have auth
    [HttpGet]
    public IActionResult GetAllUsers()
    {
        try
        {
            var output = new List<AdminUserDto>();
            foreach (var user in _context.Users)
            {
                output.Add(user.ToAdminDto());
            }
            return Ok(output);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
    //should have auth
    [HttpPost("CreateGuest")]
    public async Task<IActionResult> CreateGuest([FromBody] GuestCreateDto guest)
    {
        try
        {
            var role = _context.Roles.FirstOrDefault(x => x.Name == "Guest");
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
            return Ok(new {Token = token});
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
    //should have auth
    [HttpDelete("Delete/{userName}")]
    public async Task<IActionResult> DeleteUser(String userName)
    {
        try
        {
            var user = _context.Users.Where(x => x.Username == userName)
                .Include(x => x.Role).FirstOrDefault();
            if (user == null)
                return NotFound();
            _context.Users.Remove(user);
            if(user.Role == null)
                return BadRequest("Role Not found");
            if (user.Role.Name == "Guest")
            {
                var g = _context.Guests.Find(user.Id);
                if (g == null)
                    return NotFound();
                _context.Guests.Remove(g);
                await _context.SaveChangesAsync();
                return Ok();
            }
            var e = _context.Employees.Find(user.Id);
            if (e == null)
                return NotFound();
            _context.Employees.Remove(e);
            await _context.SaveChangesAsync();
            return Ok();
        }
        catch (Exception exception)
        {
            return BadRequest(exception.Message);
        }
    }
    
    // should have auth
    [HttpPost("CreateEmployee")]
    public async Task<IActionResult> CreateEmployee(EmployeeCreateDto employee)
    {
        try
        {
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
            var e = new Employee()
            {
                BirthDate = employee.BirthDate.ToDateTime(new TimeOnly(0, 0, 0)),
                Salary = employee.Salary,
                HireDate = DateTime.Today,
                DepartmentId = employee.DepartmentId,
                PositionId = position.Id
            };
            _context.Users.Add(u);
            _context.Employees.Add(e);
            await _context.SaveChangesAsync();
            return Ok();
        }
        catch (Exception exception)
        {
            return BadRequest(exception.Message);
        }
    }
}