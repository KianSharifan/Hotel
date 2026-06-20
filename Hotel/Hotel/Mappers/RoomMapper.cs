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
        RoomType roomType = new RoomType()
        {
            Name = dto.Name,
            MaxGuests = dto.MaxGuests,
            Description = dto.Description,
            NumberSingleBed = dto.NumberOfSingles,
            NumberDoubleBed = dto.NumberOfDoubles,
            NumberSofaBed = dto.NumberOfDoubles,
            URL = dto.Image
        };
        return roomType;
    }
}