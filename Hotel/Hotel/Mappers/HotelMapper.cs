namespace Hotel.Mappers;
using Models;
using DTOs;

public static class HotelMapper
{
    public static Hotel ToHotel(this HotelDto dto)
    {
        var h = new Hotel();
        if (dto.CheckinTime.HasValue &&  dto.CheckoutTime.HasValue && dto.StarRating.HasValue)
        {
            h.Name = dto.Name;
            h.Email = dto.Email;
            h.Phone = dto.Phone;
            h.Address = dto.Address;
            h.Country = dto.Country;
            h.City = dto.City;
            h.StarRating = dto.StarRating.Value;
            h.CheckInTime = dto.CheckinTime.Value;
            h.CheckOutTime = dto.CheckoutTime.Value;
        }
        return h;
    }

    public static HotelDto ToDto(this Hotel hotel)
    {
        return new HotelDto()
        {
            Name = hotel.Name,
            Email = hotel.Email,
            Phone = hotel.Phone,
            Address = hotel.Address,
            Country = hotel.Country,
            City = hotel.City,
            StarRating = hotel.StarRating,
            CheckinTime = hotel.CheckInTime,
            CheckoutTime = hotel.CheckOutTime
        };
    }
}