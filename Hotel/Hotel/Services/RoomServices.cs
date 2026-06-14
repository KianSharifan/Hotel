using Hotel.Data;
using Hotel.DTOs;
using Hotel.Models;
using Microsoft.EntityFrameworkCore;

namespace Hotel.Services;

public class RoomServices
{
    private readonly AppDBContext _context;

    public RoomServices(AppDBContext context)
    {
        _context = context;
    }

    public async Task<List<RoomType>> AllRoomTypes()
    {
        return await _context.RoomTypes.ToListAsync();
    }

    public async Task<List<RoomType>> AvailableRooms(RoomSearchDTO input)
    {
        int totalGuests = input.NumberOfAdults + input.NumberOfKids;
        return await _context.Rooms
            .Where(room => room.Status == "Available")
            .Where(room => room.RoomType.MaxGuests >= totalGuests)
            .Where(room => !_context.Reservations.Any(r => 
                r.RoomId == room.RoomId && 
                r.CheckInDate < input.CheckOut && 
                r.CheckOutDate > input.CheckIn))
            .Select(room => room.RoomType)
            .Distinct()
            .ToListAsync();
    }

    public async Task<Room?> FindAvailableRoom(RoomReservationDTO input)
    {
        return await _context.Rooms
            .Where(room => room.Status == "Available" && room.RoomType == input.RoomType)
            .Where(room => !_context.Reservations.Any(r =>
                r.RoomId == room.RoomId &&
                r.CheckInDate < input.CheckOut &&
                r.CheckOutDate > input.CheckIn))
            .FirstOrDefaultAsync();
    }

    public async Task<int> Reserve(RoomReservationDTO input)
    {
        int output = 0;
        var room = await FindAvailableRoom(input);
        if (room == null)
            return output;
        output = room.RoomId;
        Reservation reservation = new Reservation()
        {
            CheckInDate = input.CheckIn,
            CheckOutDate = input.CheckOut,
            GuestId = input.GuestId,
            NumberOfGuests = input.NAdults + input.NKids,
            RoomId = room.RoomId,
            Status = "Not Checked In",
            SpecialRequest = input.SpecialRequest
        };
        _context.Reservations.Add(reservation);
        if (input.Meals == 1)
        {
            var service = _context.Services.FirstOrDefault(s => s.Name == "Breakfast");
            GuestServiceUsage gsu = new GuestServiceUsage()
            {
                GuestId = input.GuestId,
                Quantity = (uint)((input.NAdults + input.NKids) * (input.CheckOut.DayNumber - input.CheckIn.DayNumber)),
                Price = ((input.NAdults + input.NKids) * (input.CheckOut.DayNumber - input.CheckIn.DayNumber)) *
                        service.Price,
                ServiceId = service.Id,
                UseDate = input.CheckIn.ToDateTime(new TimeOnly(08, 00, 00)),
                ReservationId = reservation.Id
            };
            _context.GuestServiceUsages.Add(gsu);
        }

        if (input.Meals == 2)
        {
            var service = _context.Services.FirstOrDefault(s => s.Name == "AllMeals");
            GuestServiceUsage gsu = new GuestServiceUsage()
            {
                GuestId = input.GuestId,
                Quantity = (uint)((input.NAdults + input.NKids) * (input.CheckOut.DayNumber - input.CheckIn.DayNumber)),
                Price = ((input.NAdults + input.NKids) * (input.CheckOut.DayNumber - input.CheckIn.DayNumber)) *
                        service.Price,
                ServiceId = service.Id,
                UseDate = input.CheckIn.ToDateTime(new TimeOnly(08, 00, 00)),
                ReservationId = reservation.Id
            };
            _context.GuestServiceUsages.Add(gsu);
        }
        _context.SaveChanges();
        return output;
    }
}