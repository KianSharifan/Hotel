using Microsoft.AspNetCore.Mvc;
using Hotel.Data;
using Hotel.DTOs;
using Hotel.Mappers;
using Hotel.Models;
using Microsoft.EntityFrameworkCore;


namespace Hotel.Controllers;

[Route("API/HouseKeeping")]
[ApiController]
public class HouseKeepingController : Controller
{
    private readonly AppDbContext  _context;

    public HouseKeepingController(AppDbContext context)
    {
        _context = context;
    }

    //should have auth
    [HttpGet]
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
    
    //should have auth
    [HttpGet("Employee/{userName}")]
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

    //should have auth
    [HttpPost]
    public async Task<IActionResult> Create([FromBody]HouseKeepingDto houseKeeping)
    {
        try
        {
            if (houseKeeping.RoomId == null || houseKeeping.ScheduledDate == null)
                return BadRequest("Not valid inputs");
            var employee = await _context.Users
                .Include(user => user.Role)
                .Where(u => u.Role!.Name == "Housekeeper")
                .OrderBy(u => _context.HouseKeepings.Count(h =>
                    h.EmployeeId == u.Id &&
                    h.ScheduledDate == houseKeeping.ScheduledDate))
                .FirstOrDefaultAsync();
            if (employee == null)
                return BadRequest("No HouseKeeper Exists");
            var hk = new HouseKeeping()
            {
                Notes = houseKeeping.Notes,
                RoomId = houseKeeping.RoomId.Value,
                ScheduledDate = houseKeeping.ScheduledDate.Value,
                Status = false,
                EmployeeId = employee.Id,
            };
            await _context.HouseKeepings.AddAsync(hk);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetEmployee),new { id = hk.Id });

        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    }
    
    //should have auth
    [HttpPut("{id}")]
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
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    }
    
    //should have auth
    [HttpDelete("{id}")]
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