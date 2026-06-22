namespace Hotel.Mappers;

using Hotel.Models;
using Hotel.DTOs;

public static class HotelMapper
{
    public static Hotel ToHotel(this HotelDTO dto)
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

    public static HotelDTO ToDTO(this Hotel hotel)
    {
        return new HotelDTO()
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