using Microsoft.AspNetCore.Mvc;
using Hotel.Data;
using Hotel.DTOs;
using Hotel.Mappers;
using Hotel.Models;
using Hotel.Services;

namespace Hotel.Controllers;


[Route("API/Restaurant/Tables")]
[ApiController]
public class RestaurantTablesController : Controller
{
    private readonly AppDBContext  _context;
    private readonly RestaurantServices _restaurantServices;


    public RestaurantTablesController(AppDBContext context, RestaurantServices restaurantServices)
    {
        _context = context;
        _restaurantServices = restaurantServices;
    }
    
    //should have authentication
    [HttpPost]
    public async Task<IActionResult> Reservation(TableStatusDTO reservation)
    {
        try
        {
            if (reservation.Time != null && reservation.Email != null)
            {
                var availableTables = _context.RestaurantTables.Where(t => t.Capacity >= reservation.Capacity)
                    .Where(t => t.Status == "Available")
                    .OrderBy(t => t.Capacity -  reservation.Capacity)
                    .ToList();

                foreach (var table in availableTables)
                {
                    if (!_context.TableReservations.Any(s => s.TableId == table.Id
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
                        _context.TableReservations.Add(reserve);
                        await _context.SaveChangesAsync();
                        return Ok("Reservation Successful");
                    }
                }
            }
            return BadRequest("No available tables");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
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
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
    
    //should have authorization [Authorize(Roles = "Admin")]
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id,[FromBody]TableStatusDTO input)
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
        catch (Exception e)
        {
            return BadRequest(e.Message);
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
            return Ok();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
    //should have authentication
    [HttpPost("{id}")]
    public async Task<IActionResult> CreateTable(int id,[FromBody]TableDTO input)
    {
        try
        {
            if(_context.RestaurantTables.Any(t => t.Id == id))
                return BadRequest("Table with such id already exists");
            var table = input.ToTable();
            _context.RestaurantTables.Add(table);
            await _context.SaveChangesAsync();
            return Ok();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}