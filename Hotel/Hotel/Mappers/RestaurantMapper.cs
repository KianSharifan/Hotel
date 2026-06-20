namespace Hotel.Mappers;
using Hotel.DTOs;
using Hotel.Models;

public static class RestaurantMapper
{
    public static Restaurant ToRestaurant(this RestaurantDTO dto)
    {
        Restaurant restaurant = new Restaurant()
        {
            Address = dto.Address,
            HotelId = 1,
            Name = dto.Name,
            ClosingTime = dto.CloseTime,
            OpeningTime = dto.OpenTime
        };
        return restaurant;
    }

    public static RestaurantDTO ToRestaurantDTO(this Restaurant restaurant)
    {
        RestaurantDTO restaurantDto = new RestaurantDTO()
        {
            Name = restaurant.Name,
            Address = restaurant.Address,
            OpenTime = restaurant.OpeningTime,
            CloseTime = restaurant.ClosingTime
        };
        return restaurantDto;
    }

    public static Table ToTable(this TableDTO dto)
    {
        Table table = new Table()
        {
            Capacity = dto.Capacity,
            Status = "Available",
            RestaurantId = 1
        };
        return table;
    }

    public static TableDTO ToTableDTO(this Table table)
    {
        TableDTO tableDTO = new TableDTO()
        {
            Capacity = table.Capacity,
        };
        return tableDTO;
    }
}