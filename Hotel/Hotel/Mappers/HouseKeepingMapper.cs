using Hotel.DTOs;
using Hotel.Models;

namespace Hotel.Mappers;

public static class HouseKeepingMapper
{
    public static HouseKeepingDTO ToDto(this HouseKeeping houseKeeping)
    {
        var h = new HouseKeepingDTO
        {
            HouseKeepingId = houseKeeping.Id,
            EmployeeId = houseKeeping.EmployeeId,
            RoomId = houseKeeping.RoomId,
            Notes = houseKeeping.Notes,
            Status = houseKeeping.Status,
            ScheduledDate = houseKeeping.ScheduledDate
        };
        return h;
    }
}