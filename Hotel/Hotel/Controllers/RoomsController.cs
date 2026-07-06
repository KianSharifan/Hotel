using Hotel.Data;
using Hotel.DTOs;
using Microsoft.AspNetCore.Mvc;
using Hotel.Services;
using Hotel.Models;
using Microsoft.EntityFrameworkCore;

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
     public async Task<IActionResult> GetRoom(int id)
     {
         try
         {
             return Ok(await _context.Rooms.FindAsync(id));
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
     [HttpPut("{id}")]
     public async Task<IActionResult> UpdateRoom(int id, [FromBody]RoomDTO dto)
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
             return Ok();
         }
         catch (Exception e)
         {
             return BadRequest(e.Message);
         }
     }
     
     //should have authentication
     [HttpDelete("{roomNumber}")]
     public async Task<IActionResult> DeleteRoom(int roomNumber)
     {
         try
         {
             var room = await _context.Rooms.FirstOrDefaultAsync(r => r.RoomNumber == roomNumber);
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

     //should have authentication
     [HttpPost]
     public async Task<IActionResult> CreateRoom([FromBody] RoomDTO room)
     {
         try
         {
             var r = new Room();
             if (room.RoomTypeId != null && room.Id != null && room.HotelId != null && room.Floor != null && room.PricePerNight != null && room.RoomNumber != null)
             {
                 r.RoomId = room.Id.Value;
                 r.HotelId = room.HotelId.Value;
                 r.Floor = room.Floor.Value;
                 r.Notes =  room.Note;
                 r.Status = room.Status;
                 r.RoomNumber = room.RoomNumber.Value;
             }
             _context.Rooms.Add(r);
             await _context.SaveChangesAsync();
             return Ok();
         }
         catch (Exception e)
         {
             return BadRequest(e.Message);
         }
     }

    //  [HttpPost("Reservation")]
    //  public async Task<IActionResult> Reservation([FromBody] RoomReservationDTO input)
    //  {
    //      try
    //      {
    //          int output = await _roomServices.Reserve(input);
    //          if (output == 0)
    //              return BadRequest("Reservation could not be done no other room with this roomType Available");
    //          return Ok(output);
    //      }
    //      catch(Exception e)
    //      {
    //          return BadRequest(e.Message);
    //      }
    //  }

    [HttpPost("Reservation")]
    public async Task<IActionResult> Reservation([FromBody] RoomReservationDTO input)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        int output = await _roomServices.Reserve(input);

        if (output == 0)
            return BadRequest("No available room");

        return Ok(output);
    }
 }