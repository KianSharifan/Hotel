using Hotel.Data;
using Microsoft.AspNetCore.Mvc;
using Hotel.Services;
using Hotel.Models;

namespace Hotel.Controllers;


[Route("API/Rooms")]
[ApiController]
public class RoomsController : Controller
{
    private readonly AppDBContext  _context;
    private readonly RoomServices _roomServices;
    public RoomsController(AppDBContext context, RoomServices roomServices)
    {
        _context = context;
        _roomServices = roomServices;
    }
    
    [HttpGet]
    public async Task<IActionResult> GetRoomTypes()
    {
        return Ok(await _roomServices.AllRoomTypes());
    }
}