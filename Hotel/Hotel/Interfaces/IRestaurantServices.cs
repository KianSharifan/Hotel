using Hotel.Models;
using Hotel.DTOs;

namespace Hotel.Interfaces;

public interface IRestaurantServices
{
    Task<List<MenuCategory>> GetAllMenuCategories();
    Task<List<MenuItem>> GetAllMenuItems();
    bool CategoryExists(CategoryDto dto);
    Task<string> TableUpdate(int id, TableStatusDto input);
}