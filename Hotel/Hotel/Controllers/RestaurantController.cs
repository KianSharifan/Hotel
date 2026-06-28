using Hotel.Data;
using Hotel.DTOs;
using Hotel.Mappers;
using Hotel.Models;
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

    [HttpPut("Restaurant")]
    public async Task<IActionResult> UpdateRestaurant(RestaurantDTO dto)
    {
        try
        {
            var r = await _context.Restaurants.FirstOrDefaultAsync();
            if (r == null)
                return NotFound();
            if(dto.Name != null)
                r.Name = dto.Name;
            if (dto.Address != null)
                r.Address = dto.Address;
            if (dto.OpenTime != null)
                r.OpeningTime = dto.OpenTime.Value;
            if (dto.CloseTime != null)
                r.ClosingTime = dto.CloseTime.Value;
            await _context.SaveChangesAsync();
            return Ok();
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
            List<MenuCategory>  menuCategories = await _restaurantServices.GetAllMenuCategories();
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
            var cat = new MenuCategory()
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
                var item = new MenuItem()
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
    
    //should have auth
    [HttpPost("Orders")]
    public async Task<IActionResult> CreateOrder([FromBody]OrderDTO order)
    {
        try
        {
            var o = new Order()
            {
                GuestId = order.GuestId,
                TableId = order.TableId,
                OrderType = order.OrderType,
                Status = order.Status,
                CreatedAt = new TimeOnly(DateTime.Now.Hour, DateTime.Now.Minute, DateTime.Now.Second)
            };
            _context.Orders.Add(o);
            await _context.SaveChangesAsync();
            return Ok();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
    //should have auth
    [HttpDelete("Orders/{id}")]
    public async Task<IActionResult> DeleteOrder(int id)
    {
        try
        {
            var o = _context.Orders.FirstOrDefault(o => o.Id == id);
            if (o == null)
            {
                return NotFound();
            }
            _context.Orders.Remove(o);
            List<OrderItem>  orderItems = _context.OrderItems.Where(oi => oi.OrderId == id).ToList();
            _context.OrderItems.RemoveRange(orderItems);
            await _context.SaveChangesAsync();
            return Ok();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
    //should have auth
    [HttpPost("Orders/{orderId}/Items/{itemId}")]
    public async Task<IActionResult> AddOrderItem(int orderId,int itemId,[FromBody]OrderItemDTO dto)
    {
        try
        {
            var oi = new OrderItem()
            {
                OrderId = orderId,
                ItemId = itemId,
                Quantity = dto.Quantity
            };
            _context.OrderItems.Add(oi);
            await _context.SaveChangesAsync();
            return Ok();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPut("Orders/{orderId}/Items/{itemId}")]
    public async Task<IActionResult> ChangeOrderItem(int orderId,int itemId, [FromBody] OrderItemDTO dto)
    {
        try
        {
            var oi = _context.OrderItems.FirstOrDefault(oi => oi.OrderId == orderId && oi.ItemId == itemId);
            if (oi == null)
                return NotFound();
            oi.Quantity = dto.Quantity;
            await _context.SaveChangesAsync();
            return Ok();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}