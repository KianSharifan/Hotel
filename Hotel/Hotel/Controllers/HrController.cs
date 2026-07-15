using Microsoft.AspNetCore.Mvc;
using Hotel.Data;
using Hotel.DTOs;
using Microsoft.EntityFrameworkCore;
using Hotel.Models;

namespace Hotel.Controllers;

[Route("API/HR")]
[ApiController]
public class HrController : Controller
{
    private readonly AppDbContext  _context;
    public HrController(AppDbContext context)
    {
        _context = context;
    }
    
    //should have auth
    [HttpGet("EmployeeStats/{id}")]
    public async Task<IActionResult> EmployeeStats(int id)
    {
        try
        {
            var e = await _context.Employees.FirstOrDefaultAsync(e => e.Id == id);
            if (e == null)
                return NotFound();
            return Ok(e);
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    }
    
    //should have auth
    [HttpPost("EmployeeSalaryPosition/{id}")]
    public async Task<IActionResult> EmployeeSalaryPosition(int id,[FromBody]PositionSalaryChangeDto dto)
    {
        try
        {
            var e = await _context.Employees.Include(employee => employee.Position).FirstOrDefaultAsync(e => e.Id == id);
            if (e == null)
                return NotFound("No such employee");
            if(dto.Position ==  null && dto.Salary == null)
                return BadRequest("Invalid Inputs!");
            if (dto.Salary != null && dto.Position != null)
            {
                var p = await _context.Positions.FirstOrDefaultAsync(p => p.Title!.ToLower() == dto.Position.ToLower());
                if (p == null)
                    return NotFound("No such position!");
                if (p.BaseSalary > dto.Salary)
                    return BadRequest("Salary is less than base salary!");
                e.Salary = dto.Salary.Value;
                e.Position = p;
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(EmployeeStats), new { id = e.Id }, e);
            }
            if (dto.Salary != null)
            {
                if(dto.Salary < e.Position!.BaseSalary)
                    return BadRequest("Salary is less than base salary!");
                e.Salary = dto.Salary.Value;
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(EmployeeStats), new { id = e.Id }, e);
            }
            var pos = await _context.Positions.FirstOrDefaultAsync(p => p.Title!.ToLower() == dto.Position!.ToLower());
            if (pos == null)
                return NotFound("No such position!");
            if(e.Salary < pos.BaseSalary)
                return BadRequest("Salary is less than base salary of new position!");
            e.Position = pos;
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(EmployeeStats), new { id = e.Id }, e);
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    }
           
    //should have auth
    [HttpGet("Roles")]
    public async Task<IActionResult> AllRoles()
    {
        try
        {
            return Ok(await _context.Roles.ToListAsync());
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    } 
    
    //should have auth
    [HttpPost("Roles")]
    public async Task<IActionResult> CreateRole([FromBody] RoleDto role)
    {
        try
        {
            if (role.Name == null)
                return BadRequest();
            if ( await _context.Roles.AnyAsync(x => x.Name == role.Name))
                return BadRequest("Role with the same name already exists");
            var r = new Role()
            {
                Name = role.Name
            };
            await _context.Roles.AddAsync(r);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetRole),new {id = r.RoleId},r);
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    }
    
    //should have auth
    [HttpGet("Roles/{id}")]
    public async Task<IActionResult> GetRole(int id)
    {
        try
        {
            var r = await _context.Roles.FirstOrDefaultAsync(r => r.RoleId == id);
            if (r == null)
                return NotFound();
            return Ok(r);
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    }
    
    //should have auth
    [HttpPut("Roles/{id}")]
    public async Task<IActionResult> UpdateRole(int id, [FromBody] RoleDto role)
    {
        try
        {
            var r = await _context.Roles.FirstOrDefaultAsync(x => x.RoleId == id);
            if (r == null)
                return NotFound();
            r.Name = role.Name;
            await _context.SaveChangesAsync();
            return Ok();
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    }
    
    //should have auth
    [HttpDelete("Roles/{id}")]
    public async Task<IActionResult> DeleteRole(int id)
    {
        try
        {
            var r = await _context.Roles.FirstOrDefaultAsync(x => x.RoleId == id);
            if (r == null)
                return NotFound();
            _context.Roles.Remove(r);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    }
    
    //shifts should be added
    //should have auth
    [HttpGet("AllShifts")]
    public async Task<IActionResult> AllShifts()
    {
        try
        {
            return Ok(await _context.Shifts.ToListAsync());

        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    }
    
    //should have auth
    [HttpGet("Shifts/{id}")]
    public async Task<IActionResult> GetShift(int id)
    {
        try
        {
            var s = await _context.Shifts.FirstOrDefaultAsync(s => s.Id == id);
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
    [HttpPost("Shifts")]
    public async Task<IActionResult> AddShift(ShiftDto dto)
    {
        try
        {
            if (dto.Day != null && dto.Start != null && dto.End != null)
            {
                var shift = new Shift()
                {
                    Day = dto.Day,
                    StartTime = dto.Start.Value,
                    EndTime = dto.End.Value
                };
                if(await _context.Shifts.AnyAsync(s => s.Day == shift.Day && s.StartTime == shift.StartTime && s.EndTime == shift.EndTime))
                    return BadRequest("Shift already exists");
                await _context.Shifts.AddAsync(shift);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetShift),new { id = shift.Id }, shift);
            }
            return BadRequest("Invalid Inputs!");
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    }
    
    //should have auth
    [HttpGet("Employee/{id}/Shifts")]
    public async Task<IActionResult> GetEmployeeShifts(int id)
    {
        try
        {
            var shifts = await _context.ShiftAssignments.Where(s => s.EmployeeId == id).ToListAsync();
            return Ok(shifts);
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    }
    
    //should have auth
    [HttpDelete("Shifts/{id}")]
    public async Task<IActionResult> DeleteShift(int id)
    {
        try
        {
            var s = await _context.Shifts.FirstOrDefaultAsync(x => x.Id == id);
            if (s == null)
                return NotFound();
            _context.Shifts.Remove(s);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    }
    
    //should have auth
    [HttpGet("ShiftsAssignments")]
    public async Task<IActionResult> AllShiftsAssignments()
    {
        try
        {
            return Ok(await _context.ShiftAssignments.ToListAsync());

        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    }
    
    //should have auth
    [HttpPost("ShiftsAssignments")]
    public async Task<IActionResult> AddShiftAssignment([FromBody]ShiftAssignmentDto dto)
    {
        try
        {
            var e = await _context.Employees.FirstOrDefaultAsync(x => x.Id == dto.EmployeeId);
            if (e == null)
                return NotFound("No such employee!");
            var shift = await _context.Shifts.FirstOrDefaultAsync(s => s.Id == dto.ShiftId);
            if (shift == null)
                return NotFound("No such shift!");
            var empShifts = await _context.ShiftAssignments
                .Include(s => s.Shift)
                .Where(x => x.EmployeeId == dto.EmployeeId)
                .ToListAsync();
            if (empShifts.Any(s => s.Shift!.StartTime <= shift.EndTime && s.Shift!.EndTime >= shift.StartTime))
                return BadRequest("Employee is on another shift that overlaps with this time!");
            var s = new ShiftAssignment()
            {
                ShiftId = dto.ShiftId!.Value,
                EmployeeId = dto.EmployeeId!.Value
            };
            await _context.ShiftAssignments.AddAsync(s);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetEmployeeShifts), new { id = e.Id }, s);
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    }
    
    //should have auth
    [HttpDelete("ShiftsAssignments")]
    public async Task<IActionResult> DeleteShiftAssignment([FromQuery]ShiftAssignmentDto dto)
    {
        try
        {
            var sa = await _context.ShiftAssignments.FirstOrDefaultAsync(s => s.EmployeeId == dto.EmployeeId && s.ShiftId == dto.ShiftId);
            if (sa == null)
                return NotFound();
            _context.ShiftAssignments.Remove(sa);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    }
}