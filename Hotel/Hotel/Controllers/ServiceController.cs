using Hotel.Data;
using Hotel.DTOs;
using Hotel.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Hotel.Controllers;


[Route("API/Service")]
[ApiController]
public class ServiceController : Controller
{
    private readonly AppDBContext _context;

    public ServiceController(AppDBContext context)
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
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
    //should have auth
    [HttpGet("GuestUsed/{userName}")]
    public async Task<IActionResult> GuestUsed(string userName)
    {
        try
        {
            return Ok(await _context.GuestServiceUsages.Where(g => g.Guest.User.Username == userName)
                .Include(g=>g.Service)
                .Select(s => new
                {
                    s.Quantity,
                    s.Price,
                    s.Service.Name,
                }).ToListAsync());
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
    //should have auth
    [HttpGet("ServiceUsers/{serviceName}")]
    public async Task<IActionResult> ServiceUsers(string serviceName)
    {
        try
        {
            return Ok(await _context.GuestServiceUsages.Where(g => g.Service.Name.ToLower() == serviceName)
                .Include(g => g.Guest)
                .Select(s => new
                {
                    s.Quantity,
                    s.Price,
                    s.Guest.User.Username,
                    s.Guest.User.FirstName
                }).ToListAsync());
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
    //should have auth
    [HttpPost]
    public async Task<IActionResult> CreateService([FromBody]ServiceDTO dto)
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
                return Ok();
            }
            return BadRequest("Not valid inputs!");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
    //should have auth
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateService(int id, [FromBody] ServiceDTO dto)
    {
        try
        {
            var s = _context.Services.FirstOrDefault(s => s.Id == id);
            if (s == null)
                return NotFound();
            if(dto.Name != null)
                s.Name = dto.Name;
            if (dto.Price != null)
                s.Price = dto.Price.Value;
            if (dto.Description != null)
                s.Description = dto.Description;
            await _context.SaveChangesAsync();
            return Ok();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
    //should have auth
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteService(int id)
    {
        try
        {
            var s = _context.Services.FirstOrDefault(s => s.Id == id);
            if (s == null)
                return NotFound();
            _context.Services.Remove(s);
            await _context.SaveChangesAsync();
            return Ok();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
    //should have auth
    [HttpGet("AllServiceUsages")]
    public async Task<IActionResult> AllServiceUsages()
    {
        try
        {
            return Ok(await _context.GuestServiceUsages.ToListAsync());
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
    //should have auth
    [HttpDelete("GuestUseService/{id}")]
    public async Task<IActionResult> DeleteServiceUsage(int id)
    {
        try
        {
            var sg = await _context.GuestServiceUsages.FirstOrDefaultAsync(s => s.Id == id);
            if (sg == null)
                return NotFound();
            _context.GuestServiceUsages.Remove(sg);
            await _context.SaveChangesAsync();
            return Ok();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
    //should have auth
    [HttpPost("GuestUseService")]
    public async Task<IActionResult> GuestServiceCreate([FromBody] GuestServiceUsageDTO dto)
    {
        var g = await _context.Users.FirstOrDefaultAsync(u => u.Username == dto.UserName);
        if (g == null)
            return NotFound("No Such Guest!");
        var s = await _context.Services.FirstOrDefaultAsync(s => s.Name.ToLower() == dto.ServiceName.ToLower());
        if (s == null)
            return NotFound("No Such Service");
        var r = _context.Reservations
            .Include(r=> r.Room)
            .FirstOrDefault(r => r.GuestId == g.Id 
                                 && r.CheckInDate.DayNumber <= DateOnly.FromDateTime(dto.UseDate.Value).DayNumber 
                                 && r.CheckOutDate.DayNumber >= DateOnly.FromDateTime(dto.UseDate.Value).DayNumber
                                 && r.Room.RoomNumber == dto.RoomNumber);
        if (r == null)
            return NotFound();
        if(dto.UseDate == null)
            return BadRequest("UseDate is null");
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
        return Ok();
    }
    
    //should have auth
    [HttpPut("GuestUseService/{id}")]
    public async Task<IActionResult> GuestServiceUpdate(int id, [FromBody] GuestServiceUsageDTO dto)
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
            return Ok();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}