using Microsoft.AspNetCore.Mvc;
using Hotel.Data;
using Hotel.Services;



namespace Hotel.Controllers;


[Route("API/RoomTypes")]
[ApiController]
public class RoomTypesController : Controller
{
    private readonly AppDBContext  _context;
    private readonly RoomServices _roomServices;
    public RoomTypesController(AppDBContext context, RoomServices roomServices)
    {
        _context = context;
        _roomServices = roomServices;
    }
    
    [HttpGet]
    public async Task<IActionResult> GetRoomTypes()
    {
        return Ok(await _roomServices.AllRoomTypes());
    }

    //should have authentication
    [HttpGet("{id}")]
    public async Task<IActionResult> GetRoomType(int id)
    {
        try
        {
            await _context.RoomTypes.FindAsync(id);
            return Ok();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}