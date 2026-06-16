using Microsoft.AspNetCore.Mvc;
using Hotel.Data;
using Hotel.DTOs;
using Hotel.Models;
using Hotel.Services;

namespace Hotel.Controllers;


[Route("Restaurant/Tables")]
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
    
    [HttpGet]
    public IActionResult GetAllAvailableTables()
    {
        var tables = _context.RestaurantTables
            .Where(t => t.Status == "Available")
            .ToList();
        return Ok(tables);
    }
    
    //should have authorization
    [HttpGet("{id}")]
    public async Task<IActionResult> GetTableStatus(int id)
    {
        var table = await _context.RestaurantTables.FindAsync(id);
        if (table == null)
            return NotFound();
        return Ok(table);
    }
    
    
    //should have authorization [Authorize(Roles = "Admin")]
    [HttpPut("{id}")]
    public IActionResult Update(int id,TableStatusDTO  input)
    {
        var table = _context.RestaurantTables.Find(id);
        if (table == null)
            return NotFound();
        if (input.Status == "Reserved")
        {
            if (table.Status != "Available")
                return BadRequest("This table can not be reserved");
            table.Status = "Reserved By " + input.Email;
            table.Reserved = true;
        }
        if (input.Status == "Available")
        {
            table.Status = "Available";
            table.Reserved = false;
        }

        if (input.Status == "Maintenance")
        {
            table.Status = "Maintenance";
            table.Reserved = false;
        }
        _context.SaveChanges();
        return Ok();
    }
}