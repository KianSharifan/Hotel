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
}