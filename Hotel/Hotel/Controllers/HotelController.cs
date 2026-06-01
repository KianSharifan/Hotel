using Hotel.Models;
using Hotel.Data;
using Microsoft.AspNetCore.Mvc;
using BCrypt.Net;
using Hotel.Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;


namespace Hotel.Controllers;

// [Authorize]
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
            var hotel = new Models.Hotel()
            {
                Name = "Htel",
                Address = "addess",
                City = "ity",
                Country = "country",
                Phone = "091245678",
                Email = "emal@h.c",
                CheckInTime = TimeOnly.MaxValue,
                CheckOutTime = TimeOnly.MaxValue,
                StarRating = 2.3
            };
            _context.Hotels.Add(hotel);
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