using Hotel.Data;
using Hotel.DTOs;
using Microsoft.AspNetCore.Mvc;
using Hotel.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Hotel.Interfaces;

namespace Hotel.Controllers;

[Route("API/Rooms")]
[ApiController]
public class RoomsController : Controller
{
    private readonly AppDbContext  _context;
    private readonly IRoomServices _roomServices;
    public RoomsController(AppDbContext context, IRoomServices roomServices)
    {
        _context = context;
        _roomServices = roomServices;
    }
    
     [HttpGet("{id}")]
     [Authorize(Roles = "HotelManager,FrontOfficeManager,DirectorOfRooms")]
     public async Task<IActionResult> GetRoom(int id)
     {
         try
         {
             var r = await _context.Rooms.FirstOrDefaultAsync(r => r.RoomId == id);
             if (r == null)
                 return NotFound();
             return Ok(r);
         }
         catch (Exception)
         {
             return StatusCode(500, "An unexpected error occurred");
         }
     }
     
     [HttpGet]
     [Authorize(Roles = "HotelManager,FrontOfficeManager,DirectorOfRooms")]
     public async Task<IActionResult> GetRooms()
     {
         try
         {
             return Ok(await _context.Rooms.ToListAsync());
         }
         catch (Exception)
         {
             return StatusCode(500, "An unexpected error occurred");
         }
     }

     [HttpPut("{id}")]
     [Authorize(Roles = "HotelManager,DirectorOfRooms,FrontOfficeManager")]
     public async Task<IActionResult> UpdateRoom(int id, [FromBody]RoomDto dto)
     {
         try
         {
             var room = await _context.Rooms.FindAsync(id);
             if (room == null)
                 return NotFound();
             if(dto.Status != null)
                 room.Status = dto.Status;
             if(dto.Floor != null)
                 room.Floor = dto.Floor.Value;
             if(dto.HotelId != null)
                 room.HotelId = dto.HotelId.Value;
             if(dto.RoomNumber != null)
                 room.RoomNumber = dto.RoomNumber.Value;
             if(dto.RoomTypeId != null)
                 room.RoomTypeId = dto.RoomTypeId.Value;
             if(dto.Note != null)
                 room.Notes = dto.Note;
             await _context.SaveChangesAsync();
             return Ok(room);
         }
         catch (Exception)
         {
             return StatusCode(500, "An unexpected error occurred");
         }
     }
     
     [HttpDelete("{roomNumber}")]
     [Authorize(Roles = "HotelManager,DirectorOfRooms")]
     public async Task<IActionResult> DeleteRoom(int roomNumber)
     {
         try
         {
             var room = await _context.Rooms.FirstOrDefaultAsync(r => r.RoomNumber == roomNumber);
             if (room == null)
                 return NotFound();
             _context.Rooms.Remove(room);
             await _context.SaveChangesAsync();
             return NoContent();
         }
         catch (Exception)
         {
             return StatusCode(500, "An unexpected error occurred");
         }
     }

     [HttpPost]
     [Authorize(Roles = "HotelManager,DirectorOfRooms")]
     public async Task<IActionResult> CreateRoom([FromBody] RoomDto room)
     {
         try
         { 
             if (room.RoomTypeId == null || room.HotelId == null || room.Floor == null || room.RoomNumber == null)
                 return BadRequest("Missing required fields");
             
             var r = new Room
             {
                 HotelId = room.HotelId.Value,
                 Floor = room.Floor.Value,
                 Notes = room.Note,
                 Status = room.Status,
                 RoomNumber = room.RoomNumber.Value,
                 RoomTypeId = room.RoomTypeId.Value
             };
             _context.Rooms.Add(r);
             await _context.SaveChangesAsync();
             return CreatedAtAction(nameof(GetRoom), new { id = r.RoomId },r);
         }
         catch (Exception)
         {
             return StatusCode(500, "An unexpected error occurred");
         }
     }

    [HttpPost("Reservation")]
    [AllowAnonymous]
    public async Task<IActionResult> Reservation([FromBody] RoomReservationDto input)
    {
        try
        {
            var output = await _roomServices.Reserve(input);
            if (output == (0,0))
                return BadRequest("No available room");
            return CreatedAtAction(
                nameof(FrontDeskManagerController.GetReservation)
                ,controllerName: "FrontDeskManager",
                routeValues: new { id = output.Item2 },
                output.Item1);
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    }
 }