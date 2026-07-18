using Microsoft.AspNetCore.Mvc;
using Hotel.Data;
using Hotel.Models;
using Microsoft.EntityFrameworkCore;
using Hotel.DTOs;
using Hotel.Mappers;

namespace Hotel.Controllers;

[Route("API/Maintenance")]
[ApiController]
public class MaintenanceController : Controller
{
    private readonly AppDbContext  _context;

    public MaintenanceController(AppDbContext context)
    {
        _context = context;
    }
    
    //should have auth
    [HttpGet]
    public async Task<IActionResult> GetMaintenance()
    {
        try
        {
            return Ok(await _context.MaintenanceRequests.ToListAsync());
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    }
    
    //should have auth
    [HttpGet("{userName}")]
    public async Task<IActionResult> GetEmployeeMaintenances(string userName)
    {
        try
        {
            var engineer = await _context.Employees.Include(employee => employee.User)
                .FirstOrDefaultAsync(e => e.User!.Role!.Name == "Engineer" && e.User.Username == userName);
            if (engineer == null)
                return NotFound();
            var maintenances = await _context.MaintenanceRequests.Where(m => m.ReportedEmployeeId == engineer.Id).ToListAsync();
            var output = maintenances.Select(m => m.ToDto()).ToList();
            return Ok(output);
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    }
    
    //should have auth
    [HttpPost]
    public async Task<IActionResult> CreateMaintenance([FromBody] MaintenanceRequestDto dto)
    {
        try
        {
            if (dto.RoomId != null)
            {
                Employee? emp;
                if(dto.ReportedEmployeeId != null)
                    emp = await _context.Employees.FirstOrDefaultAsync(e => e.Id == dto.ReportedEmployeeId);
                else
                {
                    emp = await _context.Employees
                        .Include(employee => employee.User)
                        .ThenInclude(employee => employee!.Role)
                        .Where(e => e.User!.Role!.Name == "Engineer")
                        .OrderBy(u => _context.MaintenanceRequests
                            .Count(m => m.ReportedEmployeeId == u.Id))
                        .FirstOrDefaultAsync();
                }
                if (emp == null)
                    return BadRequest("No Engineer available");
                var req = new MaintenanceRequest()
                {
                    RoomId = dto.RoomId.Value,
                    ReportedEmployeeId = emp.Id,
                    Description = dto.Description,
                    Status = dto.Status,
                    Priority = dto.Priority,
                    CreatedDate = DateTime.UtcNow
                };
                emp.User = await _context.Users.FirstOrDefaultAsync(u => u.Id == emp.Id);
                await _context.MaintenanceRequests.AddAsync(req);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetEmployeeMaintenances), new { userName = emp.User!.Username }, req);
            }
            return BadRequest("Not valid input");
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    }

    //should have auth
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteMaintenance(int id)
    {
        try
        {
            var req = await _context.MaintenanceRequests.FirstOrDefaultAsync(m => m.Id == id);
            if (req == null)
                return NotFound();
            _context.MaintenanceRequests.Remove(req);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    }
    
    //should have auth
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateMaintenance(int id, [FromBody] MaintenanceRequestDto dto)
    {
        try
        {
            var m =  await _context.MaintenanceRequests.FirstOrDefaultAsync(m => m.Id == id);
            if (m == null)
                return NotFound();
            if (dto.RoomId != null)
                m.RoomId = dto.RoomId.Value;
            if (dto.ReportedEmployeeId != null)
                m.ReportedEmployeeId = dto.ReportedEmployeeId.Value;
            if (dto.Description != null)
                m.Description = dto.Description;
            if (dto.Status != null)
                m.Status = dto.Status;
            if (dto.Priority != null)
                m.Priority = dto.Priority;
            if(dto.Status == "Done")
                m.ModifiedDate = DateTime.UtcNow;
            await _context.SaveChangesAsync();
            return Ok(m);
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    }
}