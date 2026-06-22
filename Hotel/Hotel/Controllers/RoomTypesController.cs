using Microsoft.AspNetCore.Mvc;
using Hotel.Data;
using Hotel.Services;
using Hotel.DTOs;
using Hotel.Models;

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
        try
        {
            return Ok(_context.RoomTypes);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet("AvailableRoomTypes")]
    public async Task<IActionResult> GetAvailableRoomTypes([FromBody]RoomSearchDTO roomSearch)
    {
        var output = await _roomServices.AvailableRoomTypes(roomSearch);
        return Ok(output);
    }
    
    //should have authentication
    [HttpGet("{id}")]
    public async Task<IActionResult> GetRoomType(int id)
    {
        try
        {
            var i = await _context.RoomTypes.FindAsync(id);
            if (i == null)
                return NotFound();
            return Ok(i);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
    //should have authentication
    [HttpPost]
    public async Task<IActionResult> CreateRoomType(RoomTypeDTO dto)
    {
        try
        {
            RoomType roomType = new RoomType();
            if (dto.MaxGuests != null && dto.NumberOfSingles != null && dto.NumberOfDoubles != null && dto.NumberOfSingles != null)
            {
                roomType.Name = dto.Name;
                roomType.MaxGuests = dto.MaxGuests.Value;
                roomType.Description = dto.Description;
                roomType.NumberSingleBed = dto.NumberOfSingles.Value;
                roomType.NumberDoubleBed = dto.NumberOfDoubles.Value;
                roomType.NumberSofaBed = dto.NumberOfDoubles.Value;
                roomType.URL = dto.Image; 
            }
            else
            {
                throw new Exception("Invalid input");
            }
            await _context.RoomTypes.AddAsync(roomType);
            await _context.SaveChangesAsync();
            return Ok();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
            
    //should have authentication
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateRoomType(int id, RoomTypeDTO dto)
    {
        try
        {
            var roomType = await _context.RoomTypes.FindAsync(id);
            if (roomType != null)
            {
                if(dto.MaxGuests != null)
                    roomType.MaxGuests = dto.MaxGuests.Value;
                if (dto.Description != null)
                    roomType.Description = dto.Description;
                if(dto.Name != null)
                    roomType.Name = dto.Name;
                if(dto.NumberOfSingles != null)
                    roomType.NumberSingleBed = dto.NumberOfSingles.Value;
                if(dto.NumberOfDoubles != null)
                    roomType.NumberDoubleBed = dto.NumberOfDoubles.Value;
                if(dto.NumberOfSofa != null)
                    roomType.NumberSofaBed = dto.NumberOfSofa.Value;
                if(dto.Image != null)
                    roomType.URL = dto.Image;
                if(dto.Price != null)
                    roomType.Price = dto.Price.Value;
                
                await _context.SaveChangesAsync();
                return Ok();
            }
            
            return NotFound();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
    //should have authentication
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteRoomType(int id)
    {
        try
        {
            var roomType = await _context.RoomTypes.FindAsync(id);
            if (roomType == null)
                return NotFound();
            _context.RoomTypes.Remove(roomType);
            await _context.SaveChangesAsync();
            return Ok();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}