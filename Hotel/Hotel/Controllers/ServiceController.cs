using Hotel.Data;
using Hotel.DTOs;
using Hotel.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Hotel.Controllers;


[Route("API/Services")]
[ApiController]
public class ServiceController : Controller
{
    private readonly AppDbContext _context;

    public ServiceController(AppDbContext context)
    {
        _context = context;
    }
    
    //should have auth
    [HttpGet]
    public async Task<IActionResult> AllServices()
    {
        try
        {
            return Ok(await _context.Services.ToListAsync());
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    }
    
    //should have auth
    [HttpGet("{id}")]
    public async Task<IActionResult> GetService(int id)
    {
        try
        {
            var s =  await _context.Services.FirstOrDefaultAsync(s  => s.Id == id);
            if (s == null) 
                return NotFound();
            return Ok(s);
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    }
    
    //should have auth
    [HttpGet("GuestUsed/{userName}")]
    public async Task<IActionResult> GuestUsed(string userName)
    {
        try
        {
            if (!await _context.Users.AnyAsync(u => u.Username == userName))
                return NotFound();
            return Ok(await _context.GuestServiceUsages
                .Include(usage => usage.Guest)
                .ThenInclude(usage => usage!.User)
                .Where(g => g.Guest!.User!.Username == userName)
                .Include(g=>g.Service)
                .Select(s => new
                {
                    s.Quantity,
                    s.Price,
                    s.Service!.Name,
                }).ToListAsync());
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    }
    
    //should have auth
    [HttpGet("Users/{serviceName}")]
    public async Task<IActionResult> ServiceUsers(string serviceName)
    {
        try
        {
            if (!await _context.Services.AnyAsync(s => s.Name!.ToLower() == serviceName))
                return NotFound("No such service");
            return Ok(await _context.GuestServiceUsages
                .Where(g => g.Service!.Name!.ToLower() == serviceName)
                .Include(g => g.Guest)
                .Select(s => new
                {
                    s.Quantity,
                    s.Price,
                    s.Guest!.User!.Username,
                    s.Guest.User.FirstName
                }).ToListAsync());
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    }
    
    //should have auth
    [HttpPost]
    public async Task<IActionResult> CreateService([FromBody]ServiceDto dto)
    {
        try
        {
            if (dto.Name != null && dto.Price != null)
            {
                var s = new Service()
                {
                    Name = dto.Name,
                    Price = dto.Price.Value,
                    Description = dto.Description
                };
                await _context.Services.AddAsync(s);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetService), new { id = s.Id }, s);
            }
            return BadRequest("Not valid inputs!");
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    }
    
    //should have auth
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateService(int id, [FromBody] ServiceDto dto)
    {
        try
        {
            var s = await _context.Services.FirstOrDefaultAsync(s => s.Id == id);
            if (s == null)
                return NotFound();
            if(dto.Name != null)
                s.Name = dto.Name;
            if (dto.Price != null)
                s.Price = dto.Price.Value;
            if (dto.Description != null)
                s.Description = dto.Description;
            await _context.SaveChangesAsync();
            return Ok(s);
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    }
    
    //should have auth
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteService(int id)
    {
        try
        {
            var s = await _context.Services.FirstOrDefaultAsync(s => s.Id == id);
            if (s == null)
                return NotFound();
            _context.Services.Remove(s);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    }
    
    //should have auth
    [HttpGet("Usages")]
    public async Task<IActionResult> AllServiceUsages()
    {
        try
        {
            return Ok(await _context.GuestServiceUsages.ToListAsync());
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    }
    
    //should have auth
    [HttpDelete("Usages/{id}")]
    public async Task<IActionResult> DeleteServiceUsage(int id)
    {
        try
        {
            var sg = await _context.GuestServiceUsages.FirstOrDefaultAsync(s => s.Id == id);
            if (sg == null)
                return NotFound();
            _context.GuestServiceUsages.Remove(sg);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    }
    
    //should have auth
    [HttpPost("Usages")]
    public async Task<IActionResult> GuestServiceCreate([FromBody] GuestServiceUsageDto dto)
    {
        try
        {
            var g = await _context.Users.FirstOrDefaultAsync(u => u.Username == dto.UserName);
            if (g == null)
                return NotFound("No Such Guest!");
            if (dto.ServiceName == null)
                return BadRequest("No Service Name!");
            var s = await _context.Services.FirstOrDefaultAsync(s => s.Name!.ToLower() == dto.ServiceName.ToLower());
            if (s == null)
                return NotFound("No Such Service");
            if (dto.UseDate == null)
                return BadRequest("No Service Use Date!");
            var r = await _context.Reservations
                .Include(r=> r.Room)
                .FirstOrDefaultAsync(r => r.GuestId == g.Id 
                                     && r.CheckInDate.DayNumber <= DateOnly.FromDateTime(dto.UseDate.Value).DayNumber 
                                     && r.CheckOutDate.DayNumber >= DateOnly.FromDateTime(dto.UseDate.Value).DayNumber
                                     && r.Room!.RoomNumber == dto.RoomNumber);
            if (r == null)
                return NotFound();
            if (dto.Quantity == null)
                return BadRequest("Quantity is required");
            double price = s.Price * dto.Quantity.Value;
            var gus = new GuestServiceUsage()
            {
                GuestId = g.Id,
                ServiceId = s.Id,
                ReservationId = r.Id,
                Quantity = dto.Quantity.Value,
                Price = price,
                UseDate = dto.UseDate.Value
            };
            await _context.GuestServiceUsages.AddAsync(gus);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(ServiceUsers), new { serviceName = s.Name }, gus);
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    }
    
    //should have auth
    [HttpPut("Usages/{id}")]
    public async Task<IActionResult> GuestServiceUpdate(int id, [FromBody] GuestServiceUsageDto dto)
    {
        try
        {
            var gu = await _context.GuestServiceUsages.FirstOrDefaultAsync(s => s.Id == id);
            if (gu == null)
                return NotFound();
            if (dto.Quantity != null)
            {
                gu.Price = gu.Price/gu.Quantity*dto.Quantity.Value;
                gu.Quantity = dto.Quantity.Value;
            }
            if(dto.UseDate != null)
                gu.UseDate = dto.UseDate.Value;
            await _context.SaveChangesAsync();
            return Ok(gu);
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    }
}