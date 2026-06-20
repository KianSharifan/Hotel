namespace Hotel.Mappers;
using Hotel.DTOs;
using Hotel.Models;

public static class RoomMapper
{
    public static RoomTypeDTO ToDTO(this RoomType roomType)
    {
        RoomTypeDTO dto = new RoomTypeDTO()
        {
            Name = roomType.Name,
            Image = roomType.URL,
            MaxGuests = roomType.MaxGuests,
            NumberOfDoubles = roomType.NumberDoubleBed,
            NumberOfSingles = roomType.NumberSingleBed,
            NumberOfSofa = roomType.NumberSingleBed,
            Description = roomType.Description
        };
        return dto;
    }

    public static RoomType ToRoomType(this RoomTypeDTO dto)
    {
        RoomType roomType = new RoomType();
        try
        {
            if (dto.MaxGuests != null && dto.NumberOfSingles != null && dto.NumberOfDoubles != null && dto.NumberOfSingles != null)
            {
                roomType.Name = dto.Name;
                roomType.MaxGuests = dto.MaxGuests.Value;
                roomType.Description = dto.Description;
                roomType.NumberSingleBed = dto.NumberOfSingles.Value;
                roomType.NumberDoubleBed = dto.NumberOfDoubles.Value;
                roomType.NumberSofaBed = dto.NumberOfDoubles.Value;
                roomType.URL = dto.Image;
                return roomType; 
            }
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }

        return roomType;
    }
}