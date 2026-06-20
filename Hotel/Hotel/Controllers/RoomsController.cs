using Hotel.Data;
using Hotel.DTOs;
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
    
    //should have authentication
     [HttpGet("{id}")]
     public IActionResult GetRoom(int id)
     {
         try
         {
             return Ok(_context.Rooms.Where(r => r.RoomId == id));
         }
         catch (Exception e)
         {
             return BadRequest(e.Message);
         }
     }
     
     // should have authentication
     [HttpGet]
     public IActionResult GetRooms()
     {
         try
         {
             return Ok(_context.Rooms);
         }
         catch (Exception e)
         {
             return BadRequest(e.Message);
         }
     }

     //should have authentication
     // [HttpPut("{id}")]
     // public IActionResult UpdateRoom(int id, Room room)
     // {
     //     
     // }
     
     //should have authentication
     [HttpDelete("{id}")]
     public async Task<IActionResult> DeleteRoom(int id)
     {
         try
         {
             var room = await _context.Rooms.FindAsync(id);
             if (room == null)
                 return NotFound();
             _context.Rooms.Remove(room);
             await _context.SaveChangesAsync();
             return Ok();
         }
         catch (Exception e)
         {
             return BadRequest(e.Message);
         }
     }
     
     
 }