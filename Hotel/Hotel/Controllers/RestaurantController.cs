using Hotel.Data;
using Hotel.DTOs;
using Hotel.Mappers;
using Hotel.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Hotel.Interfaces;

namespace Hotel.Controllers;

[Route("API/Restaurant")]
[ApiController]
public class RestaurantController : Controller
{
    private readonly AppDbContext  _context;
    private readonly IRestaurantServices _restaurantServices;
    public RestaurantController(AppDbContext context, IRestaurantServices restaurantServices)
    {
        _context = context;
        _restaurantServices = restaurantServices;
    }

    [AllowAnonymous]
    [HttpGet]
    public async Task<IActionResult> Restaurant()
    {
        try
        {
            var restaurant = await _context.Restaurants.FirstOrDefaultAsync();
            if (restaurant == null) return NotFound();
            return Ok(restaurant.ToRestaurantDto());
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    }
    
    [HttpPut]
    [Authorize(Roles = "HotelManager,RestaurantManager")]
    public async Task<IActionResult> UpdateRestaurant(RestaurantDto dto)
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
            return Ok(r.ToRestaurantDto());
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    }
    
    [HttpGet("Menu")]
    [AllowAnonymous]
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
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    }

    [HttpGet("Menu/Categories")]
    [AllowAnonymous]
    public async Task<IActionResult> Categories()
    {
        try
        {
            List<MenuCategory>  menuCategories = await _restaurantServices.GetAllMenuCategories();
            return Ok(menuCategories);
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    }
    
    [HttpPost("Menu/Categories")]
    [Authorize(Roles = "HotelManager,RestaurantManager,Chef")]
    public async Task<IActionResult> CreateCategory([FromBody]CategoryDto category)
    {
        try
        {
            if (category.Name == null)
                return BadRequest("Category name is required");
            if(_restaurantServices.CategoryExists(category))
                return BadRequest("Category already exists");
            var cat = new MenuCategory
            {
                Name = category.Name,
            };
            await _context.MenuCategories.AddAsync(cat);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(Categories),null,cat);
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    }
    
    [HttpDelete("Menu/Categories")]
    [Authorize(Roles = "HotelManager,RestaurantManager,Chef")]
    public async Task<IActionResult> DeleteCategory([FromBody]CategoryDto category)
    {
        try
        {
            var cat = await _context.MenuCategories.FirstOrDefaultAsync(c => c.Name == category.Name);
            if (cat == null)
                return NotFound("Category does not exist");
            _context.MenuCategories.Remove(cat);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    }
    
    [HttpPost("Menu/{menuCategory}/MenuItems")]
    [Authorize(Roles = "HotelManager,RestaurantManager,Chef,Waiter")]
    public async Task<IActionResult> AddMenuItems(string menuCategory,[FromBody]MenuItemDto dto)
    {
        try
        {
            var category = await _context.MenuCategories
                .FirstOrDefaultAsync(m => m.Name == menuCategory);
    
            if (category == null)
                return BadRequest("Category does not exist");
    
            int categoryId = category.MenuCategoryId;
            if (dto.Price != null)
            {
                var item = new MenuItem
                {
                    Name = dto.Name,
                    MenuCategoryId = categoryId,
                    Price = dto.Price.Value,
                    Description = dto.Description
                };
                await _context.MenuItems.AddAsync(item);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(CategoryMenuItems),new { menuCategory }, item);
            }
            return BadRequest("Price is not valid");
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    }
    
    [HttpPut("Menu/{menuCategory}/MenuItems")]
    [Authorize(Roles = "HotelManager,RestaurantManager,Chef,Waiter")]
    public async Task<IActionResult> UpdateMenuItems(string menuCategory,[FromBody]MenuItemDto dto)
    {
        try
        {
            var menuItem = await _context.MenuItems
                .Include(m  => m.MenuCategory)
                .FirstOrDefaultAsync(m => m.Name == dto.Name);
            if (menuItem == null)
                return BadRequest("Item does not exist");
            if(menuItem.MenuCategory!.Name != menuCategory)
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
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    }
    
    [HttpGet("Menu/{menuCategory}/MenuItems")]
    [AllowAnonymous]
    public async Task<IActionResult> CategoryMenuItems(string menuCategory)
    {
        try
        {
            var cat = await _context.MenuCategories.FirstOrDefaultAsync(c => c.Name!.ToLower() == menuCategory.ToLower());
            if (cat == null)
                return NotFound("Category does not exist");
            var output = await _context.MenuItems.Include(m => m.MenuCategory)
                .Where(m => m.MenuCategory!.Name!.ToLower() == cat.Name!.ToLower()).ToListAsync();
        
            return Ok(output);
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    }
    
    [HttpDelete("Menu/{menuCategory}/MenuItems")]
    [Authorize(Roles = "HotelManager,RestaurantManager,Chef")]
    public async Task<IActionResult> DeleteMenuItems(string menuCategory,[FromBody]MenuItemDto dto)
    {
        try
        {
            var menuItem = await _context.MenuItems
                .Include(m  => m.MenuCategory)
                .FirstOrDefaultAsync(m => m.Name == dto.Name);
            if (menuItem == null)
                return BadRequest("Item does not exist");
            if(menuItem.MenuCategory!.Name != menuCategory)
                return BadRequest("Category does not match");
            _context.MenuItems.Remove(menuItem);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    }
    
    [HttpGet("Orders")]
    [Authorize(Roles = "HotelManager,RestaurantManager,Chef,Waiter")]
    public async Task<IActionResult> AllOrders()
    {
        try
        {
            return Ok(await _context.Orders.ToListAsync());
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    }
    
    [HttpGet("Orders/NotCompleted")]
    [Authorize(Roles = "HotelManager,RestaurantManager,Chef,Waiter")]
    public async Task<IActionResult> AllNotCompletedOrders()
    {
        try
        {
            var output =await _context.Orders
                .Where(o => o.Status != "Completed")
                .Select(o => new
                {
                    Order = o,
                    Items =_context.OrderItems
                        .Where(oi => oi.OrderId == o.Id)
                        .Include(oi => oi.MenuItem)
                        .Select(oi => new
                        {
                            oi.MenuItem!.Name,
                            oi.Quantity,
                            oi.MenuItem.Price
                        })
                        .ToList()
                })
                .ToListAsync();
            return Ok(output);

        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    }
    
    [HttpGet("Orders/{id}")]
    [Authorize(Roles = "HotelManager,RestaurantManager,Chef,Waiter")]
    public async Task<IActionResult> GetOrder(int id)
    {
        try
        {
            var o = await _context.Orders.FirstOrDefaultAsync(o => o.Id == id);
            if (o == null)
                return NotFound();
            var orderItems = await _context.OrderItems
                .Where(or => or.OrderId == id)
                .Include(or => or.MenuItem)
                .Select(oi => new
                {
                    oi.Quantity,
                    oi.MenuItem!.Name,
                    oi.MenuItem.Price
                })
                .ToListAsync();
            var r = new
            {
                o,
                orderItems
            };
            return Ok(r);
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    }
    
    [HttpPost("Orders")]
    [Authorize(Roles = "HotelManager,RestaurantManager,Chef,Waiter")]
    public async Task<IActionResult> CreateOrder([FromBody]OrderDto order)
    {
        await using var transaction = await _context.Database.BeginTransactionAsync();
        try
        {
            double total = 0;
            var o = new Order
            {
                TableId = order.TableId,
                Status = "Pending",
                CreatedAt = new TimeOnly(DateTime.UtcNow.Hour, DateTime.UtcNow.Minute, DateTime.UtcNow.Second)
            };
            await _context.Orders.AddAsync(o);
            await _context.SaveChangesAsync();
            if (order.OrderItems != null)
            {
                foreach (var oi in order.OrderItems)
                {
                    var menuItem = await _context.MenuItems.FindAsync(oi.ItemId);
                    if (menuItem == null)
                        return BadRequest($"MenuItem with id {oi.ItemId} not found");

                    var item = oi.ToOrderItem(o.Id);
                    item.MenuItem = menuItem;
                    await _context.OrderItems.AddAsync(item);
                    total += item.Quantity * menuItem.Price;
                }
            }
            o.TotalPrice = total;
            await _context.SaveChangesAsync();
            await transaction.CommitAsync();
            return CreatedAtAction(nameof(GetOrder), new { id = o.Id }, o);
        }
        catch (Exception)
        {
            await transaction.RollbackAsync();
            return StatusCode(500, "An unexpected error occurred");
        }
    }
    
    [HttpDelete("Orders/{id}")]
    [Authorize(Roles = "HotelManager,RestaurantManager,Chef,Waiter")]
    public async Task<IActionResult> DeleteOrder(int id)
    {
        try
        {
            var o = await _context.Orders.FirstOrDefaultAsync(o => o.Id == id);
            if (o == null)
            {
                return NotFound();
            }
            _context.Orders.Remove(o);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    }

    [HttpPut("Orders/{orderId}")]
    [Authorize(Roles = "HotelManager,RestaurantManager,Chef,Waiter")]
    public async Task<IActionResult> ChangeOrderItem(int orderId, [FromBody] OrderDto dto)
    {
        try
        {
            var o = await _context.Orders.FirstOrDefaultAsync(o => o.Id == orderId);
            if (o == null)
                return NotFound("Order not found");
            if (dto.Status == "Completed")
            {
                o.Status = dto.Status;
                var p = new Payment
                {
                    OrderId = orderId,
                    Amount = o.TotalPrice,
                    Status = "Payed",
                    PaymentDate = DateTime.UtcNow,
                    TransactionId = dto.TransactionId,
                    PaymentMethod = dto.PaymentMethod
                };
                await _context.Payments.AddAsync(p);
                await _context.SaveChangesAsync();
            }
            if(dto.Status != null)
                o.Status = dto.Status;
            if (dto.OrderItems != null)
            {
                foreach (var oi in dto.OrderItems)
                {
                    var temp = await _context.OrderItems.FirstOrDefaultAsync(ori =>
                        ori.ItemId == oi.ItemId && ori.OrderId == orderId);
                    var item = oi.ToOrderItem(o.Id);
                    item.MenuItem = await _context.MenuItems.FindAsync(item.ItemId);
                    if(temp == null && oi.Quantity == 0)
                        continue;
                    if (temp == null)
                    {
                        o.TotalPrice += item.Quantity * item.MenuItem!.Price;
                        await _context.OrderItems.AddAsync(item);
                    }
                    else if (oi.Quantity == 0)
                    {
                        o.TotalPrice += (item.Quantity-temp.Quantity) * item.MenuItem!.Price;
                        _context.OrderItems.Remove(temp);
                    }
                    else
                    {
                        o.TotalPrice += (item.Quantity-temp.Quantity) * item.MenuItem!.Price;
                        temp.Quantity = oi.Quantity;
                    }
                }
            }
            await _context.SaveChangesAsync();
            return Ok();
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    }
}