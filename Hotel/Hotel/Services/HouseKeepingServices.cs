using Microsoft.AspNetCore.Mvc;

namespace Hotel.Services;
using Microsoft.EntityFrameworkCore;
using Hotel.DTOs;
using Hotel.Interfaces;
using Hotel.Models;
using Hotel.Data;

public class HouseKeepingServices : IHouseKeepingServices
{
    private readonly AppDbContext  _context;
    
    public HouseKeepingServices(AppDbContext context)
    {
        _context = context;
    }

    public async Task<HouseKeeping?> AssignHouseKeeping(HouseKeepingDto houseKeeping)
    {
        var employee = await _context.Users
            .Include(user => user.Role)
            .Where(u => u.Role!.Name == "Housekeeper")
            .OrderBy(u => _context.HouseKeepings.Count(h =>
                h.EmployeeId == u.Id &&
                h.ScheduledDate == houseKeeping.ScheduledDate))
            .FirstOrDefaultAsync();
        if (employee == null)
            return null;
        var hk = new HouseKeeping
        {
            Notes = houseKeeping.Notes,
            RoomId = houseKeeping.RoomId!.Value,
            ScheduledDate = houseKeeping.ScheduledDate!.Value,
            Status = false,
            EmployeeId = employee.Id,
        };
        hk.Employee =  await _context.Employees.FirstOrDefaultAsync(e => e.Id == employee.Id);
        hk.Employee!.User = await _context.Users.FirstOrDefaultAsync(u => u.Id == employee.Id);
        await _context.HouseKeepings.AddAsync(hk);
        await _context.SaveChangesAsync();
        return hk;
    }
}