namespace Hotel.Mappers;
using DTOs;
using Models;

public static class RestaurantMapper
{
    public static RestaurantDTO ToRestaurantDTO(this Restaurant restaurant)
    {
        RestaurantDTO restaurantDto = new RestaurantDTO();
        if (restaurant.Name != null && restaurant.Address != null)
        {
            restaurantDto.Name = restaurant.Name;
            restaurantDto.Address = restaurant.Address;
            restaurantDto.OpenTime = restaurant.OpeningTime;
            restaurantDto.CloseTime = restaurant.ClosingTime;
        }
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
        TableDTO tableDto = new TableDTO()
        {
            Capacity = table.Capacity,
        };
        return tableDto;
    }

    public static OrderItem ToOrderItem(this OrderItemDTO dto,int orderId)
    {
        OrderItem orderItem = new OrderItem()
        {
            OrderId = orderId,
            Quantity = dto.Quantity,
            ItemId = dto.ItemId
        };
        return orderItem;
    }
}