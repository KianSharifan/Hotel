using Microsoft.AspNetCore.Mvc;
using Hotel.Data;
using Hotel.DTOs;
using Hotel.Mappers;
using Hotel.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace Hotel.Controllers;

[Route("API/HouseKeeping")]
[ApiController]
public class HouseKeepingController : Controller
{
    private readonly AppDbContext  _context;
    private readonly HouseKeepingServices _houseKeepingServices;
    public HouseKeepingController(AppDbContext context, HouseKeepingServices houseKeepingServices)
    {
        _context = context;
        _houseKeepingServices = houseKeepingServices;
    }

    [HttpGet]
    [Authorize(Roles = "HotelManager,FrontOfficeManager,Housekeeper")]
    public async Task<IActionResult> GetAll()
    {
        try
        {
            return Ok(await _context.HouseKeepings.ToListAsync());
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    }
    
    [HttpGet("Employee/{userName}")]
    [Authorize(Roles = "HotelManager,FrontOfficeManager,Housekeeper")]
    public async Task<IActionResult> GetEmployee(string userName)
    {
        try
        {
            
            var houseKeeper = await _context.Employees
                .Include(employee => employee.User)
                .ThenInclude(employee => employee!.Role)
                .FirstOrDefaultAsync(e => e.User!.Role!.Name == "Housekeeper" && e.User.Username == userName);
            if (houseKeeper == null)
                return NotFound("No housekeeper with this UserName was found");
            var keeping = await _context.HouseKeepings.Where(h => h.EmployeeId == houseKeeper.Id).ToListAsync();
            var output = new List<HouseKeepingDto>();
            foreach (var k in keeping)
            {
                output.Add(k.ToDto());
            }
            return Ok(output);
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    }

    [HttpPost]
    [Authorize(Roles = "HotelManager,FrontOfficeManager,Housekeeper")]
    public async Task<IActionResult> Create([FromBody]HouseKeepingDto houseKeeping)
    {
        try
        {
            if (houseKeeping.RoomId == null || houseKeeping.ScheduledDate == null)
                return BadRequest("Not valid inputs");
            var output = await _houseKeepingServices.AssignHouseKeeping(houseKeeping);
            if (output == null)
                return BadRequest("No HouseKeeper Exists");
            return CreatedAtAction(nameof(GetEmployee), new { userName = output.Employee!.User!.Username }, null);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    }
    
    [HttpPut("{id}")]
    [Authorize(Roles = "HotelManager,FrontOfficeManager,Housekeeper")]
    public async Task<IActionResult> Update(int id,[FromBody] HouseKeepingDto houseKeeping)
    {
        try
        {
            var h = await _context.HouseKeepings.FirstOrDefaultAsync(h => h.Id == id);
            if (h == null)
                return NotFound();
            if (houseKeeping.RoomId != null)
                h.RoomId = houseKeeping.RoomId.Value;
            if (houseKeeping.ScheduledDate != null)
                h.ScheduledDate = houseKeeping.ScheduledDate.Value;
            if (houseKeeping.EmployeeId != null)
                h.EmployeeId = houseKeeping.EmployeeId.Value;
            if(houseKeeping.Notes != null)
                h.Notes = houseKeeping.Notes;
            if(houseKeeping.Status != null)
                h.Status = houseKeeping.Status.Value;
            await _context.SaveChangesAsync();
            return Ok();
        }
        catch (Exception ex)
        {
            // return StatusCode(500, "An unexpected error occurred");
            return StatusCode(500, ex.ToString());
        }
    }
    
    [HttpDelete("{id}")]
    [Authorize(Roles = "HotelManager,FrontOfficeManager,Housekeeper")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            var hk = await _context.HouseKeepings.FirstOrDefaultAsync(h => h.Id == id);
            if (hk == null)
                return NotFound();
            _context.HouseKeepings.Remove(hk);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    }
}