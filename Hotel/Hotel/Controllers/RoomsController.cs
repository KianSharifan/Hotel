using Hotel.Data;
using Microsoft.AspNetCore.Mvc;
using Hotel.Services;
using Hotel.Models;

namespace Hotel.Controllers;


[Route("Rooms")]
[ApiController]
public class RoomsController : Controller
{
    private readonly AppDBContext  _context;

    public RoomsController(AppDBContext context)
    {
        _context = context;
    }
    [HttpGet]
    public async Task<IActionResult> GetRoomTypes()
    {
        RoomServices roomServices = new RoomServices(_context);
        return Ok(roomServices.AllRoomTypes());
    }
}