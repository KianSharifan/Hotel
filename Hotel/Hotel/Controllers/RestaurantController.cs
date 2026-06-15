using Hotel.Data;
using Microsoft.AspNetCore.Mvc;
using Hotel.Services;

namespace Hotel.Controllers;


[Route("Restaurant")]
[ApiController]
public class RestaurantController : Controller
{
    private readonly AppDBContext  _context;
    private readonly RestaurantServices _restaurantServices;

    public RestaurantController(AppDBContext context, RestaurantServices restaurantServices)
    {
        _context = context;
        _restaurantServices = restaurantServices;
    }
    [HttpGet]
    public async Task<IActionResult> Menu()
    {
        var menuCategories = await _restaurantServices.GetAllMenuCategories();
        var menuItems = await _restaurantServices.GetAllMenuItems();
        var result = new
        {
            menuItems,
            menuCategories
        };
        return Ok(result);
    }
}