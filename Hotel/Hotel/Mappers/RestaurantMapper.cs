namespace Hotel.Mappers;
using DTOs;
using Models;

public static class RestaurantMapper
{
    public static RestaurantDto ToRestaurantDto(this Restaurant restaurant)
    {
        RestaurantDto restaurantDto = new RestaurantDto();
        if (restaurant.Name != null && restaurant.Address != null)
        {
            restaurantDto.Name = restaurant.Name;
            restaurantDto.Address = restaurant.Address;
            restaurantDto.OpenTime = restaurant.OpeningTime;
            restaurantDto.CloseTime = restaurant.ClosingTime;
        }
        return restaurantDto;
    }

    public static Table ToTable(this TableDto dto)
    {
        Table table = new Table()
        {
            Id = dto.Id,
            Capacity = dto.Capacity,
            Status = "Available",
            RestaurantId = 1
        };
        return table;
    }

    public static TableDto ToTableDto(this Table table)
    {
        TableDto tableDto = new TableDto()
        {
            Id = table.Id,
            Capacity = table.Capacity,
        };
        return tableDto;
    }

    public static OrderItem ToOrderItem(this OrderItemDto dto,int orderId)
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