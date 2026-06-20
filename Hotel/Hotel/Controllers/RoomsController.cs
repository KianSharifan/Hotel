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
     public IActionResult GetRoomTypes(int id)
     {
         try
         {
             return Ok(_context.RoomAmenities.Where(r => r.RoomId == id));
         }
         catch (Exception e)
         {
             return BadRequest(e.Message);
         }
     }
     
     //should have authentication
     // [HttpPost("{id}")]
     // public IActionResult CreateRoomType(int id, RoomTypeDTO roomTypeDto)
     // {
     //     var roomType = new RoomType()
     //     {
     //         
     //     }
     // }
 }