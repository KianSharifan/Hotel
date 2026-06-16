using Hotel.Data;
using Hotel.Migrations;
using Microsoft.EntityFrameworkCore;

namespace Hotel.Services;

public class RestaurantServices
{
    private readonly AppDBContext  _context;
    
    public RestaurantServices(AppDBContext context)
    {
    _context = context;
    }

    public async Task<List<Models.MenuCategory>> GetAllMenuCategories()
    {
        return await _context.MenuCategories.ToListAsync();
    }

    public async Task<List<Models.MenuItem>> GetAllMenuItems()
    {
        return await _context.MenuItems.ToListAsync();
    }

    public async Task<List<Models.MenuItem>> CategoryItems(string category)
    {
        List<Models.MenuItem>  menuItems = await _context.MenuItems.Where(m => m.MenuCategory.Name == category).ToListAsync();
        return menuItems;
    }
}