using Microsoft.AspNetCore.Mvc;
using Hotel.Data;
using Hotel.DTOs;
using Hotel.Models;
using Hotel.Services;

namespace Hotel.Controllers;

public class RestaurantTablesController : Controller
{
    private readonly AppDBContext  _context;
    private readonly RestaurantServices _restaurantServices;

    public RestaurantTablesController(AppDBContext context, RestaurantServices restaurantServices)
    {
        _context = context;
        _restaurantServices = restaurantServices;
    }
    
    // [HttpGet]
    // public async IActionResult Index()
    // {
    //     return Ok();
    // }
    
    
    //should have authorization [Authorize(Roles = "Admin")]
    [HttpPut("{id}")]
    public IActionResult Update(int id,TableStatusDTO  input)
    {
        var table = _context.RestaurantTables.Find(id);
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
        _context.SaveChanges();
        return Ok();
    }
}