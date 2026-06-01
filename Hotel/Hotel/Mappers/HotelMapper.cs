namespace Hotel.Mappers;

using Hotel.Models;
using Hotel.DTOs;

public static class HotelMapper
{
    public static Hotel ToHotel(this HotelHomeDTO dto)
    {
        return new Hotel()
        {
            Name = dto.Name,
            Email = dto.Email,
            Phone = dto.Phone,
            Address = dto.Address,
            Country = dto.Country,
            City = dto.City,
            StarRating = dto.StarRating,
            CheckInTime = dto.CheckinTime,
            CheckOutTime = dto.CheckoutTime
        };
    }

    public static HotelHomeDTO ToDTO(this Hotel hotel)
    {
        return new HotelHomeDTO()
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