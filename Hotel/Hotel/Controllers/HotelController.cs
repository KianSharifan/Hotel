using Hotel.Models;
using Hotel.Data;
using Microsoft.AspNetCore.Mvc;
using BCrypt.Net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;


namespace Hotel.Controllers;

[Authorize]
[Route("Home")]
[ApiController]
public class HotelController : Controller
{
    private readonly AppDBContext _context;
    public HotelController(AppDBContext context)
    {
        _context = context;
    }
    [HttpGet]
    public async Task<IActionResult> GetHotels()
    {
        try
        {
            var mc = new MaintenanceRequest()
            {
                Id = 1,
                Description = "",
                CreatedDate = DateTime.UtcNow,
                ModifiedDate = DateTime.UtcNow,
                Priority = "",
                ReportedEmployeeId = 1,
                RoomId = 1,
                Status = ""
            };
            _context.MaintenanceRequests.Add(mc);
            await _context.SaveChangesAsync();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
        var hotels = await _context.Hotels.ToListAsync();
        return Ok(hotels);
    }
}