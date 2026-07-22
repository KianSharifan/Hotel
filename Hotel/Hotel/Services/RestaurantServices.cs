using Hotel.Data;
using Microsoft.EntityFrameworkCore;
using Hotel.DTOs;
using Hotel.Interfaces;
using Hotel.Models;

namespace Hotel.Services;

public class RestaurantServices : IRestaurantServices
{
    private readonly AppDbContext  _context;
    
    public RestaurantServices(AppDbContext context)
    {
    _context = context;
    }

    public async Task<List<MenuCategory>> GetAllMenuCategories()
    {
        return await _context.MenuCategories.ToListAsync();
    }

    public async Task<List<MenuItem>> GetAllMenuItems()
    {
        return await _context.MenuItems.ToListAsync();
    }

    public bool CategoryExists(CategoryDto dto)
    {
        if(_context.MenuCategories.Any(c => c.Name == dto.Name))
            return true;
        return false;
    }

    public async Task<string> TableUpdate(int id, TableStatusDto input)
    {
        var table = await _context.RestaurantTables.FindAsync(id);
        if (table == null)
            return "Not Found";
        if (input.SpecialReq == "Reservation")
        {
            if (table.Status != "Available")
                return "Bad Request";
            if (input.Time != null && input.Email != null)
            {
                if (!_context.TableReservations.Any(t => t.TableId == id
                                                        && t.Time.Date == input.Time.Value.Date
                                                        && t.Time.Hour * 60 + t.Time.Minute - 120 <
                                                        input.Time.Value.Hour * 60 + input.Time.Value.Minute
                                                        && input.Time.Value.Hour * 60 + input.Time.Value.Minute <
                                                        t.Time.Hour * 60 + t.Time.Minute + 120))
                {
                    var reservation = new TableReservation()
                    {
                        TableId = id,
                        Time = input.Time.Value,
                        Email = input.Email,
                        Description = "This Reservation was done by the staff"
                    };
                    _context.TableReservations.Add(reservation);
                }
            }
            return "Bad Request";
        }
        if (input.SpecialReq == "Available")
        {
            table.Status = "Available";
            if (input.Capacity != null)
                table.Capacity = input.Capacity.Value;
        }
        if (input.SpecialReq == "Maintenance")
        {
            table.Status = "Maintenance";
            if (input.Capacity != null)
                table.Capacity = input.Capacity.Value;
        }
        await _context.SaveChangesAsync();
        return "Ok";
    }
}