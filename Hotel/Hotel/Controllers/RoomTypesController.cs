using Microsoft.AspNetCore.Mvc;
using Hotel.Data;
using Hotel.Services;
using Hotel.DTOs;
using Hotel.Models;
using Microsoft.EntityFrameworkCore;

namespace Hotel.Controllers;

[Route("API/RoomTypes")]
[ApiController]
public class RoomTypesController : Controller
{
    private readonly AppDbContext  _context;
    private readonly RoomServices _roomServices;
    public RoomTypesController(AppDbContext context, RoomServices roomServices)
    {
        _context = context;
        _roomServices = roomServices;
    }
    
    [HttpGet]
    public async Task<IActionResult> GetRoomTypes()
    {
        try
        {
            return Ok(await _context.RoomTypes.ToListAsync());
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    }

    [HttpGet("AvailableRoomTypes")]
    public async Task<IActionResult> GetAvailableRoomTypes([FromQuery]RoomSearchDto roomSearch)
    {
        try
        {
            var output = await _roomServices.AvailableRoomTypes(roomSearch);
            return Ok(output);
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
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
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    }
    
    //should have authentication
    [HttpPost]
    public async Task<IActionResult> CreateRoomType([FromBody]RoomTypeDto dto)
    {
        try
        {
            RoomType roomType = new RoomType();
            if (dto.MaxGuests != null && dto.NumberOfSingles != null && dto.NumberOfDoubles != null && dto.NumberOfSofa != null && dto.Price != null && dto.Name != null)
            {
                roomType.Price = dto.Price.Value;
                roomType.Name = dto.Name;
                roomType.MaxGuests = dto.MaxGuests.Value;
                roomType.Description = dto.Description;
                roomType.NumberSingleBed = dto.NumberOfSingles.Value;
                roomType.NumberDoubleBed = dto.NumberOfDoubles.Value;
                roomType.NumberSofaBed = dto.NumberOfSofa.Value;
                roomType.PicUrl = dto.Image; 
            }
            else
            {
                return BadRequest("Invalid inputs");
            }
            await _context.RoomTypes.AddAsync(roomType);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetRoomType),new {id = roomType.RoomTypeId},roomType);
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    }
            
    //should have authentication
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateRoomType(int id, [FromBody]RoomTypeDto dto)
    {
        try
        {
            var roomType = await _context.RoomTypes.FindAsync(id);
            if (roomType != null)
            {
                if (dto.Price != null)
                    roomType.Price = dto.Price.Value;
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
                    roomType.PicUrl = dto.Image;
                await _context.SaveChangesAsync();
                return Ok(roomType);
            }
            
            return NotFound();
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
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
            return NoContent();
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    }
    
    //should have auth
    [HttpGet("Amenities")]
    public async Task<IActionResult> GetAllAmenities()
    {
        try
        {
            return Ok(await _context.Amenities.ToListAsync());
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    }
    
    //should have auth
    [HttpGet("Amenities/{name}")]
    public async Task<IActionResult> GetAmenity(string name)
    {
        try
        {
            var a = await _context.Amenities.FirstOrDefaultAsync(a => a.Name == name);
            if (a == null)
                return NotFound();
            var ra = await _context.RoomAmenities
                .Include(r => r.RoomType)
                .Include(r => r.Amenity)
                .Where(ra => ra.Amenity!.Name == name)
                .Select(ra => new
                {
                    ra.RoomType!.Name
                })
                .ToListAsync();
            return Ok(new{a,ra});
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    }
    
    
    //should have auth
    [HttpPost("Amenities")]
    public async Task<IActionResult> CreateAmenity([FromBody]AmenityDto dto)
    {
        try
        {
            if (dto.Name == null)
                return BadRequest("Invalid input");
            if(await _context.Amenities.AnyAsync(a => a.Name == dto.Name))
                return BadRequest("Amenity already exists");
            var amenity = new Amenity()
            {
                Name = dto.Name,
            };
            await _context.Amenities.AddAsync(amenity);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetAmenity),new {name = amenity.Name},amenity);
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    }
    
    //should have auth
    [HttpPut("Amenities/{id}")]
    public async Task<IActionResult> UpdateAmenity(int id,[FromBody] AmenityDto dto)
    {
        try
        {
            if (dto.Name == null)
                return BadRequest("Invalid input"); 
            var a = await _context.Amenities.FirstOrDefaultAsync(a => a.Id == id);
            if (a == null)
                return NotFound();
            a.Name = dto.Name;
            await _context.SaveChangesAsync();
            return Ok(a);
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    }
    
    //should have auth
    [HttpDelete("Amenities/{id}")]
    public async Task<IActionResult> DeleteAmenity(int id)
    {
        try
        {
            var a  = await _context.Amenities.FirstOrDefaultAsync(a => a.Id == id);
            if (a == null)
                return NotFound();
            _context.Amenities.Remove(a);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    }
    
    //should have auth
    [HttpPost("RoomAmenity")]
    public async Task<IActionResult> AddRoomAmenity([FromBody]RoomAmenities ra)
    {
        try
        {
            var a = await _context.Amenities.FirstOrDefaultAsync(r => r.Id == ra.AmenityId);
            if (a == null)
                return NotFound();
            if(! await _context.RoomTypes.AnyAsync(r => r.RoomTypeId == ra.RoomTypeId))
                return NotFound();
            if(await _context.RoomAmenities.AnyAsync(r => r.AmenityId == ra.AmenityId && r.RoomTypeId == ra.RoomTypeId))
                return BadRequest("Amenity already exists");
            await _context.RoomAmenities.AddAsync(ra);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetAmenity),new {name = a.Name},ra);
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    }
    
    //should have auth
    [HttpDelete("RoomAmenity")]
    public async Task<IActionResult> DeleteRoomAmenity([FromBody] RoomAmenities dto)
    {
        try
        {
            if (!await _context.Amenities.AnyAsync(a => a.Id == dto.AmenityId))
                return NotFound();
            if (!await _context.RoomTypes.AnyAsync(r => r.RoomTypeId == dto.RoomTypeId))
                return NotFound();
        
            var r = await _context.RoomAmenities.FirstOrDefaultAsync(r => r.AmenityId == dto.AmenityId  && r.RoomTypeId == dto.RoomTypeId);
            if (r == null)
                return NotFound();
            _context.RoomAmenities.Remove(r);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    }
}