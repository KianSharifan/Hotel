using Hotel.Models;
using Hotel.Data;
using Microsoft.AspNetCore.Mvc;
using Hotel.DTOs;
using Hotel.Mappers;
using Microsoft.EntityFrameworkCore;


namespace Hotel.Controllers;

[Route("API/")]
[ApiController]
public class HotelController : Controller
{
    private readonly AppDbContext _context;
    public HotelController(AppDbContext context)
    {
        _context = context;
    }
    
    [HttpGet]
    public async Task<IActionResult> GetHotels()
    {
        var hotel = await _context.Hotels.FirstOrDefaultAsync();
        if (hotel == null)
            return NotFound();
        var output = hotel.ToDto();
        return Ok(output);
    }

    //should have auth
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateHotels(int id, [FromBody]HotelDto dto)
    {
        var h =  await _context.Hotels.FirstOrDefaultAsync(x => x.Id == id);
        if (h == null)
            return NotFound();
        if(dto.Name != null)
            h.Name = dto.Name;
        if (dto.StarRating != null)
            h.StarRating = dto.StarRating.Value;
        if (dto.CheckinTime != null)
            h.CheckInTime = dto.CheckinTime.Value;
        if (dto.CheckoutTime != null)
            h.CheckOutTime = dto.CheckoutTime.Value;
        if(dto.Email != null)
            h.Email = dto.Email;
        if(dto.Phone != null)
            h.Phone = dto.Phone;
        if(dto.Country != null)
            h.Country = dto.Country;
        if(dto.City != null)
            h.City = dto.City;
        if(dto.Address != null)
            h.Address = dto.Address;
        await _context.SaveChangesAsync();
        return Ok();
    }

    //should have auth
    [HttpGet("Departments")]
    public async Task<IActionResult> GetDepartments()
    {
        return Ok(await _context.Departments.ToListAsync());
    }
    
    //should have auth
    [HttpPost("Departments")]
    public async Task<IActionResult> CreateDepartment([FromBody]DepartmentDto department)
    {
        if (department.Name == null)
            return BadRequest();
        if(_context.Departments.Any(x => x.Name == department.Name))
            return BadRequest("Department with the same name already exists");
        var d = new Department()
        {
            Name = department.Name
        };
        await _context.Departments.AddAsync(d);
        await _context.SaveChangesAsync();
        return Ok();
    }

    //should have auth
    [HttpPut("Departments/{id}")]
    public async Task<IActionResult> DeleteDepartment(int id,[FromBody]DepartmentDto department)
    {
        var d = await _context.Departments.FirstOrDefaultAsync(x => x.Id == id);
        if (d == null)
            return NotFound();
        d.Name = department.Name;
        await _context.SaveChangesAsync();
        return Ok();
    }
    
    //should have auth
    [HttpDelete("Departments/{id}")]
    public async Task<IActionResult> DeleteDepartment(int id)
    {
        var d = await _context.Departments.FirstOrDefaultAsync(x => x.Id == id);
        if (d == null)
            return NotFound();
        _context.Departments.Remove(d);
        await _context.SaveChangesAsync();
        return Ok();
    }
    
    //should have auth
    [HttpGet("Roles")]
    public async Task<IActionResult> AllRoles()
    {
        return Ok(await _context.Roles.ToListAsync());
    }
    
    //should have auth
    [HttpPost("Roles")]
    public async Task<IActionResult> CreateRole([FromBody] RoleDto role)
    {
        if (role.Name == null)
            return BadRequest();
        if (_context.Roles.Any(x => x.Name == role.Name))
            return BadRequest("Role with the same name already exists");
        var r = new Role()
        {
            Name = role.Name
        };
        await _context.Roles.AddAsync(r);
        await _context.SaveChangesAsync();
        return Ok();
    }
    
    //should have auth
    [HttpPut("Roles/{id}")]
    public async Task<IActionResult> UpdateRole(int id, [FromBody] RoleDto role)
    {
        var r = _context.Roles.FirstOrDefault(x => x.RoleId == id);
        if (r == null)
            return NotFound();
        r.Name = role.Name;
        await _context.SaveChangesAsync();
        return Ok();
    }
    
    //should have auth
    [HttpDelete("Roles/{id}")]
    public async Task<IActionResult> DeleteRole(int id)
    {
        var r = _context.Roles.FirstOrDefault(x => x.RoleId == id);
        if (r == null)
            return NotFound();
        _context.Roles.Remove(r);
        await _context.SaveChangesAsync();
        return Ok();
    }
}