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
    public IActionResult GetRoomTypes()
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
    public async Task<IActionResult> GetAvailableRoomTypes([FromQuery]RoomSearchDTO roomSearch)
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
    public async Task<IActionResult> CreateRoomType([FromBody]RoomTypeDTO dto)
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
                roomType.NumberSofaBed = dto.NumberOfSofa.Value;
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
        // catch (Exception e)
        // {
        //     return BadRequest(e.Message);
        // }

        catch(Exception e)
        {
            return BadRequest(
                e.InnerException?.Message ?? e.Message
            );
        }
    }
            
    //should have authentication
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateRoomType(int id, [FromBody]RoomTypeDTO dto)
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
    
    //should have auth
    [HttpGet("AllAmenities")]
    public IActionResult GetAllAmenities()
    {
        try
        {
            return Ok(_context.Amenities);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
    //should have auth
    [HttpPost("CreateAmenity")]
    public async Task<IActionResult> CreateAmenity([FromBody]AmenityDTO dto)
    {
        try
        {
            if (dto.Name == null)
                return BadRequest("Invalid input");
            if(_context.Amenities.Any(a => a.Name == dto.Name))
                return BadRequest("Amenity already exists");
            var amenity = new Amenity()
            {
                Name = dto.Name,
            };
            await _context.Amenities.AddAsync(amenity);
            await _context.SaveChangesAsync();
            return Ok();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
    //should have auth
    [HttpPut("UpdateAmenity")]
    public async Task<IActionResult> UpdateAmenity([FromBody] AmenityDTO dto)
    {
        try
        {
            if (dto.Name == null)
                return BadRequest("Invalid input"); 
            var a = _context.Amenities.FirstOrDefault(a => a.Name == dto.Name);
            if (a == null)
                return NotFound();
            a.Name = dto.Name;
            await _context.SaveChangesAsync();
            return Ok();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
    //should have auth
    [HttpDelete("DeleteAmenity")]
    public async Task<IActionResult> DeleteAmenity(int id)
    {
        try
        {
            var a  = _context.Amenities.FirstOrDefault(a => a.Id == id);
            if (a == null)
                return NotFound();
            _context.Amenities.Remove(a);
            await _context.SaveChangesAsync();
            return Ok();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
    //should have auth
    [HttpPost("AddRoomAmenity")]
    public async Task<IActionResult> AddRoomAmenity([FromBody]RoomAmenities dto)
    {
        try
        {
            if (!_context.Amenities.Any(a => a.Id == dto.AmenityId))
                return NotFound();
            if(!_context.RoomTypes.Any(r => r.RoomTypeId == dto.RoomTypeId))
                return NotFound();
            if(_context.RoomAmenities.Any(r => r.AmenityId == dto.AmenityId && r.RoomTypeId == dto.RoomTypeId))
                return BadRequest("Amenity already exists");
            _context.RoomAmenities.Add(dto);
            await _context.SaveChangesAsync();
            return Ok();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
    //should have auth
    [HttpDelete("DeleteRoomAmenity")]
    public async Task<IActionResult> DeleteRoomAmenity([FromBody] RoomAmenities dto)
    {
        try
        {
            if (!_context.Amenities.Any(a => a.Id == dto.AmenityId))
                return NotFound();
            if (!_context.RoomTypes.Any(r => r.RoomTypeId == dto.RoomTypeId))
                return NotFound();
        
            var r = _context.RoomAmenities.FirstOrDefault(r => r.AmenityId == dto.AmenityId  && r.RoomTypeId == dto.RoomTypeId);
            if (r == null)
                return NotFound();
            _context.RoomAmenities.Remove(r);
            await _context.SaveChangesAsync();
            return Ok();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}