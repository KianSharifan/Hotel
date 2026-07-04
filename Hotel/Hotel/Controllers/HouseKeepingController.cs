using Microsoft.AspNetCore.Mvc;
using Hotel.Data;
using Microsoft.EntityFrameworkCore;


namespace Hotel.Controllers;

[Route("API/HouseKeeping")]
[ApiController]
public class HouseKeepingController : Controller
{
    private readonly AppDBContext  _context;

    public HouseKeepingController(AppDBContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        try
        {
            return Ok(await _context.HouseKeepings.ToListAsync());
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    // [HttpPost]
    // public async Task<IActionResult> Create()
    // {
    //     
    // }
}