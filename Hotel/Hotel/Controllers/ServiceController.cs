using Hotel.Data;
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
        return Ok(await _context.GuestServiceUsages.Where(g => g.Guest.User.Username == userName).Include(g=>g.Service).ToListAsync());
    }
    
    //should have auth
    // [HttpGet("ServiceUsers/{serviceName}")]
    // public async Task<IActionResult> ServiceUsers(string serviceName)
    // {
    //     
    // }
}