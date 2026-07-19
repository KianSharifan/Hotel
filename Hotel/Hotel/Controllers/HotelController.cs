using Hotel.Models;
using Hotel.Data;
using Microsoft.AspNetCore.Mvc;
using Hotel.DTOs;
using Hotel.Mappers;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace Hotel.Controllers;

[Route("API")]
[ApiController]
public class HotelController : Controller
{
    private readonly AppDbContext _context;
    public HotelController(AppDbContext context)
    {
        _context = context;
    }
    
    [HttpGet]
    [AllowAnonymous]
    public async Task<IActionResult> GetHotels()
    {
        try
        {
            var hotel = await _context.Hotels.FirstOrDefaultAsync();
            if (hotel == null)
                return NotFound();
            var output = hotel.ToDto();
            return Ok(output);
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    }

    [HttpPut]
    [Authorize(Roles = "HotelManager")]
    public async Task<IActionResult> UpdateHotels([FromBody]HotelDto dto)
    {
        try
        {
            var h =  await _context.Hotels.FirstOrDefaultAsync();
            if(await _context.Departments.AnyAsync(x => x.Name == dto.Name))
                return BadRequest("Department with the same name already exists"); 
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
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    }

    [HttpGet("Departments")]
    [Authorize(Roles = "HotelManager")]
    public async Task<IActionResult> GetDepartments()
    {
        try
        {
            return Ok(await _context.Departments.ToListAsync());

        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    }
    
    [HttpPost("Departments")]
    [Authorize(Roles = "HotelManager")]
    public async Task<IActionResult> CreateDepartment([FromBody]DepartmentDto department)
    {
        try
        {
            if (department.Name == null)
                return BadRequest();
            if(await _context.Departments.AnyAsync(x => x.Name == department.Name))
                return BadRequest("Department with the same name already exists");
            var d = new Department()
            {
                Name = department.Name
            };
            await _context.Departments.AddAsync(d);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetDepartments), new { id = d.Id }, d);
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    }

    [HttpPut("Departments/{id}")]
    [Authorize(Roles = "HotelManager")]
    public async Task<IActionResult> UpdateDepartment(int id,[FromBody]DepartmentDto department)
    {
        try
        {
            var d = await _context.Departments.FirstOrDefaultAsync(x => x.Id == id);
            if (d == null)
                return NotFound();
            d.Name = department.Name;
            await _context.SaveChangesAsync();
            return Ok();
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    }
    
    [HttpDelete("Departments/{id}")]
    [Authorize(Roles = "HotelManager")]
    public async Task<IActionResult> DeleteDepartment(int id)
    {
        try
        {
            var d = await _context.Departments.FirstOrDefaultAsync(x => x.Id == id);
            if (d == null)
                return NotFound();
            _context.Departments.Remove(d);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    }
}