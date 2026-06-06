using Hotel.Data;
using Hotel.DTOs;
using Hotel.Models;

namespace Hotel.Services;

public class RoomServices
{
    private readonly AppDBContext _context;

    public RoomServices(AppDBContext context)
    {
        _context = context;
    }

    public List<RoomType> AvailableRooms(RoomSearchDTO input)
    {
        int totalGuests = input.NumberOfAdults + input.NumberOfKids;
        return _context.Rooms
            .Where(room => room.Status == "Available")
            .Where(room => room.RoomType.MaxGuests >= totalGuests)
            .Where(room => !_context.Reservations.Any(r => 
                r.RoomId == room.RoomId && 
                r.CheckInDate < input.CheckOut && 
                r.CheckOutDate > input.CheckIn))
            .Select(room => room.RoomType)
            .Distinct()
            .ToList();
    }
}