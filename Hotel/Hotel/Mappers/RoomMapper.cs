namespace Hotel.Mappers;
using DTOs;
using Models;

public static class RoomMapper
{
    public static RoomTypeDto ToDto(this RoomType roomType)
    {
        RoomTypeDto dto = new RoomTypeDto()
        {
            Name = roomType.Name,
            Image = roomType.PicUrl,
            MaxGuests = roomType.MaxGuests,
            NumberOfDoubles = roomType.NumberDoubleBed,
            NumberOfSingles = roomType.NumberSingleBed,
            NumberOfSofa = roomType.NumberSingleBed,
            Description = roomType.Description,
            Price = roomType.Price
        };
        return dto;
    }

    public static RoomType ToRoomType(this RoomTypeDto dto)
    {
        RoomType roomType = new RoomType();
        try
        {
            if (dto.MaxGuests != null && dto.NumberOfSingles != null && dto.NumberOfDoubles != null && dto.NumberOfSingles != null && dto.Price != null)
            {
                roomType.Name = dto.Name;
                roomType.MaxGuests = dto.MaxGuests.Value;
                roomType.Description = dto.Description;
                roomType.NumberSingleBed = dto.NumberOfSingles.Value;
                roomType.NumberDoubleBed = dto.NumberOfDoubles.Value;
                roomType.NumberSofaBed = dto.NumberOfDoubles.Value;
                roomType.Price = dto.Price.Value;
                roomType.PicUrl = dto.Image;
            }
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
        return roomType;
    }

    public static AmenityDto ToDto(this Amenity amenity)
    {
        var dto = new AmenityDto();
        try
        {
            if (amenity.Name != null)
                dto.Name = amenity.Name;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
        return dto;
    }
}