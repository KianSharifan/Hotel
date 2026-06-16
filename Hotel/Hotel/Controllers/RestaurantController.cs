using Hotel.Data;
using Hotel.DTOs;
using Hotel.Mappers;
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
    public IActionResult Restaurant()
    {
        RestaurantDTO dto = _context.Restaurants.First().ToRestaurantDTO();
        return Ok(dto);
    }
    
    [HttpGet("Menu")]
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

    [HttpGet("Menu/Categories")]
    public async Task<IActionResult> Categories()
    {
        List<Models.MenuCategory>  menuCategories = await _restaurantServices.GetAllMenuCategories();
        return Ok(menuCategories);
    }

    [HttpGet("Menu/{menuCategory}/MenuItems")]
    public async Task<IActionResult> MenuCategoryItems(string menuCategory)
    {
        return Ok(await _restaurantServices.CategoryItems(menuCategory));
    }
}