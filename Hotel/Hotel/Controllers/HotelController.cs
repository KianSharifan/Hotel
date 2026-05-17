using Hotel.Models;
using Hotel.Data;
using Microsoft.AspNetCore.Mvc;

namespace Hotel.Controllers;


[Route("")]
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
        var hotels = _context.Hotels.ToList();
        return Ok(hotels);
    }
}