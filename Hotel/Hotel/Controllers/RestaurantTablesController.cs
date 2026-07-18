using Microsoft.AspNetCore.Mvc;
using Hotel.Data;
using Hotel.DTOs;
using Hotel.Mappers;
using Hotel.Models;
using Hotel.Services;
using Microsoft.EntityFrameworkCore;

namespace Hotel.Controllers;


[Route("API/Restaurant/Tables")]
[ApiController]
public class RestaurantTablesController : Controller
{
    private readonly AppDbContext  _context;
    private readonly RestaurantServices _restaurantServices;


    public RestaurantTablesController(AppDbContext context, RestaurantServices restaurantServices)
    {
        _context = context;
        _restaurantServices = restaurantServices;
    }
    
    //should have authentication
    [HttpPost("Reservations")]
    public async Task<IActionResult> Reservation([FromBody]TableStatusDto reservation)
    {
        try
        {
            if (reservation.Time != null && reservation.Email != null)
            {
                var availableTables = await _context.RestaurantTables.Where(t => t.Capacity >= reservation.Capacity)
                    .Where(t => t.Status == "Available")
                    .OrderBy(t => t.Capacity -  reservation.Capacity)
                    .ToListAsync();

                foreach (var table in availableTables)
                {
                    if (!await _context.TableReservations.AnyAsync(s => s.TableId == table.Id
                                                             && s.Time.Date == reservation.Time.Value.Date
                                                             && s.Time.Hour * 60 + s.Time.Minute - 120 <
                                                             reservation.Time.Value.Hour * 60 + reservation.Time.Value.Minute
                                                             && reservation.Time.Value.Hour * 60 +
                                                             reservation.Time.Value.Minute <
                                                             s.Time.Hour * 60 + s.Time.Minute + 120))
                    {
                        var reserve = new TableReservation()
                        {
                            TableId = table.Id,
                            Time = reservation.Time.Value,
                            Description = reservation.SpecialReq,
                            Email = reservation.Email
                        };
                        await _context.TableReservations.AddAsync(reserve);
                        await _context.SaveChangesAsync();
                        return CreatedAtAction(nameof(GetReservation),new { id = reserve.Id},reserve);
                    }
                }
            }
            return BadRequest("No available tables");
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    }
    
    //should have auth
    [HttpGet("Reservations")]
    public async Task<IActionResult> AllReservations()
    {
        try
        {
            var allReservation = await _context.TableReservations.ToListAsync();
            return Ok(allReservation);
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    }
    
    //should have auth
    [HttpGet("Reservations/{id}")]
    public async Task<IActionResult> GetReservation(int id)
    {
        try
        {
            var r =  await _context.TableReservations.FirstOrDefaultAsync(s => s.Id == id);
            if (r == null)
                return NotFound();
            return Ok(r);
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    }
    
    //should have authorization
    [HttpGet("{id}")]
    public async Task<IActionResult> GetTableStatus(int id)
    {
        try
        {
            var table = await _context.RestaurantTables.FindAsync(id);
            if (table == null)
                return NotFound();
            return Ok(table);
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    }
    
    //should have authorization [Authorize(Roles = "Admin")]
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id,[FromBody]TableStatusDto input)
    {
        try
        {
            string output = await _restaurantServices.TableUpdate(id, input);
            if (output == "Not Found")
                return NotFound();
            if(output == "Bad Request")
                return BadRequest();
            return Ok();
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    }
    
    //should have authentication
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTable(int id)
    {
        try
        {
            var table = await _context.RestaurantTables.FindAsync(id);
            if (table == null)
                return NotFound();
            _context.RestaurantTables.Remove(table);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    }
    
    //should have authentication
    [HttpPost]
    public async Task<IActionResult> CreateTable([FromBody]TableDto input)
    {
        try
        {
            var table = input.ToTable();
            await _context.RestaurantTables.AddAsync(table);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTableStatus),new { id = table.Id },table);
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    }
}