using Hotel.Data;
using Hotel.DTOs;
using Hotel.Mappers;
using Microsoft.AspNetCore.Mvc;
using Hotel.Services;
using Microsoft.EntityFrameworkCore;

namespace Hotel.Controllers;


[Route("API/Restaurant")]
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
        try
        {
            RestaurantDTO dto = _context.Restaurants.First().ToRestaurantDTO();
            return Ok(dto);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
    [HttpGet("Menu")]
    public async Task<IActionResult> Menu()
    {
        try
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
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet("Menu/Categories")]
    public async Task<IActionResult> Categories()
    {
        try
        {
            List<Models.MenuCategory>  menuCategories = await _restaurantServices.GetAllMenuCategories();
            return Ok(menuCategories);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    //should have authentication
    [HttpPost("Menu/Categories")]
    public async Task<IActionResult> CreateCategory([FromBody]CategoryDTO category)
    {
        try
        {
            if(_restaurantServices.CategoryExists(category))
                return BadRequest("Category already exists");
            var cat = new Models.MenuCategory()
            {
                Name = category.Name,
            };
            _context.MenuCategories.Add(cat);
            await _context.SaveChangesAsync();
            return Ok();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
    //should have authentication
    [HttpDelete("Menu/Categories")]
    public async Task<IActionResult> DeleteCategory([FromBody]CategoryDTO category)
    {
        try
        {
            if(!_restaurantServices.CategoryExists(category))
                return BadRequest("Category does not exists");
            _context.MenuCategories.Remove(_context.MenuCategories.First(c => c.Name == category.Name));
            await _context.SaveChangesAsync();
            return Ok();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
    //should have authentication
    [HttpPost("Menu/{menuCategory}/MenuItems")]
    public async Task<IActionResult> AddMenuItems(string menuCategory,[FromBody]MenuItemDTO dto)
    {
        try
        {
            var category = _context.MenuCategories
                .FirstOrDefault(m => m.Name == menuCategory);
    
            if (category == null)
                return BadRequest("Category does not exist");
    
            int categoryId = category.MenuCategoryId;
            if (dto.Price != null)
            {
                var item = new Models.MenuItem()
                {
                    Name = dto.Name,
                    MenuCategoryId = categoryId,
                    Price = dto.Price.Value,
                    Description = dto.Description
                };
                _context.MenuItems.Add(item);
                await _context.SaveChangesAsync();
                return Ok();
            }
            return BadRequest("Price is not valid");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
    // should have authentication
    [HttpPut("Menu/{menuCategory}/MenuItems")]
    public async Task<IActionResult> UpdateMenuItems(string menuCategory,[FromBody]MenuItemDTO dto)
    {
        try
        {
            var menuItem = await _context.MenuItems
                .Include(m  => m.MenuCategory)
                .FirstOrDefaultAsync(m => m.Name == dto.Name);
            if (menuItem == null)
                return BadRequest("Item does not exist");
            if(menuItem.MenuCategory.Name != menuCategory)
                return BadRequest("Category does not match");

            if(dto.Price != null)
                menuItem.Price = dto.Price.Value;
            if(dto.Description != null)
                menuItem.Description = dto.Description;
            if(dto.Name != null)
                menuItem.Name = dto.Name;
            await _context.SaveChangesAsync();
            return Ok();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
    // should have authentication
    [HttpDelete("Menu/{menuCategory}/MenuItems")]
    public async Task<IActionResult> DeleteMenuItems(string menuCategory,[FromBody]MenuItemDTO dto)
    {
        try
        {
            var menuItem = await _context.MenuItems
                .Include(m  => m.MenuCategory)
                .FirstOrDefaultAsync(m => m.Name == dto.Name);
            if (menuItem == null)
                return BadRequest("Item does not exist");
            if(menuItem.MenuCategory.Name != menuCategory)
                return BadRequest("Category does not match");
            _context.MenuItems.Remove(menuItem);
            await _context.SaveChangesAsync();
            return Ok();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}