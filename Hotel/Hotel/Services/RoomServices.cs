using Hotel.Data;
using Hotel.DTOs;
using Hotel.Interfaces;
using Hotel.Models;
using Microsoft.EntityFrameworkCore;

namespace Hotel.Services;

public class RoomServices : IRoomServices
{
    private readonly AppDbContext _context;

    public RoomServices(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<RoomType?>> AvailableRoomTypes(RoomSearchDto input)
    {
        try
        {
            int totalGuests = input.NumberOfAdults + input.NumberOfKids;
            var roomTypes = await _context.Rooms.Include(r => r.RoomType)
                .Where(room => room.Status == "Available")
                .Where(room => room.RoomType!.MaxGuests >= totalGuests)
                .Where(room => !_context.Reservations.Any(r => 
                    r.RoomId == room.RoomId && 
                    r.CheckInDate < input.CheckOut && 
                    r.CheckOutDate > input.CheckIn))
                .Select(room => room.RoomType)
                .Distinct()
                .ToListAsync();
            return roomTypes;
        }
        catch (Exception)
        {
            throw new Exception("An unexpected error occurred");
        }
    }

    public async Task<Room?> FindAvailableRoom(RoomReservationDto input)
    {
        try
        {
            return await _context.Rooms.Include(r => r.RoomType)
                .Where(room => room.Status == "Available" && room.RoomType!.RoomTypeId == input.RoomTypeId)
                .Where(room => !_context.Reservations.Any(r =>
                    r.RoomId == room.RoomId &&
                    r.CheckInDate < input.CheckOut &&
                    r.CheckOutDate > input.CheckIn))
                .FirstOrDefaultAsync();
        }
        catch (Exception)
        {
            throw new Exception("An unexpected error occurred");
        }
    }

    public async Task<(int,int)> Reserve(RoomReservationDto input)
    {
        await using var transaction = await _context.Database.BeginTransactionAsync();
        try
        {
            var output = (0,0);
            var room = await FindAvailableRoom(input);
            if (room == null)
                return output;
            if (input.PaymentDto != null)
                return output;
            // _validationService.AddGuest(input.PaymentDto!);
            output.Item1 = (int)room.RoomNumber;
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
            await _context.Reservations.AddAsync(reservation);
            await _context.SaveChangesAsync();
            output.Item2 = reservation.Id;
            if (input.Meals == 1)
            {
                var service = _context.Services.FirstOrDefault(s => s.Name == "Breakfast");
                if (service == null)
                    return (0,0);
                GuestServiceUsage gsu = new GuestServiceUsage
                {
                    GuestId = input.GuestId,
                    Quantity = (uint)((input.NAdults + input.NKids) * (input.CheckOut.DayNumber - input.CheckIn.DayNumber)),
                    Price = (input.NAdults + input.NKids) * (input.CheckOut.DayNumber - input.CheckIn.DayNumber) *
                            service.Price,
                    ServiceId = service.Id,
                    UseDate = input.CheckIn.ToDateTime(new TimeOnly(08, 00, 00)).ToUniversalTime(),
                    ReservationId = reservation.Id
                };
                await _context.GuestServiceUsages.AddAsync(gsu);
            }
            if (input.Meals == 2)
            {
                var service = _context.Services.FirstOrDefault(s => s.Name == "AllMeals");
                if (service == null)
                     return (0,0);
                GuestServiceUsage gsu = new GuestServiceUsage
                {
                    GuestId = input.GuestId,
                    Quantity = (uint)((input.NAdults + input.NKids) * (input.CheckOut.DayNumber - input.CheckIn.DayNumber)),
                    Price = (input.NAdults + input.NKids) * (input.CheckOut.DayNumber - input.CheckIn.DayNumber) *
                        service.Price,
                    ServiceId = service.Id,
                    UseDate = input.CheckIn.ToDateTime(new TimeOnly(08, 00, 00)).ToUniversalTime(),
                    ReservationId = reservation.Id
                };
                await _context.GuestServiceUsages.AddAsync(gsu);
            }
            await _context.SaveChangesAsync();
            await transaction.CommitAsync();
            return output;
        }
        catch (Exception)
        {
            await transaction.RollbackAsync();
            throw new Exception("An unexpected error occurred");
        }
    }
}