namespace HotelTests.ServicesTests;
using System;
using System.Threading.Tasks;
using Xunit;
using Microsoft.EntityFrameworkCore;
using Hotel.Data;
using Hotel.Services;
using Hotel.Models;
using Hotel.DTOs;


public class RoomReservationTest
{
    private AppDbContext GetInMemoryContext()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .ConfigureWarnings(w =>
                w.Ignore(Microsoft.EntityFrameworkCore.Diagnostics.InMemoryEventId.TransactionIgnoredWarning))
            .Options;

        return new AppDbContext(options);
    }
    
    [Fact]
    public async Task Reserve_RoomAvailable_CreatesReservationWithCorrectData()
    {
        var context = GetInMemoryContext();
        context.Hotels.Add(new Hotel { Name = "Hotel1",StarRating = 5,CheckInTime = TimeOnly.MinValue,CheckOutTime = TimeOnly.MaxValue,Address = "here",City = "1",Country = "1",Email = "Hotel@gmail.com",Phone = "09111111111"});
        context.RoomTypes.Add(new RoomType { RoomTypeId = 1, MaxGuests = 4 , Name = "RoomType1" , NumberDoubleBed = 1,NumberSingleBed = 2,NumberSofaBed = 0,Price = 50});
        context.Rooms.Add(new Room { RoomId = 1,HotelId = 1,RoomNumber = 101,Floor = 1, Status = "Available", RoomTypeId = 1 });
        await context.SaveChangesAsync();

        var sut = new RoomServices(context);
        var input = new RoomReservationDto
        {
            RoomTypeId = 1,
            CheckIn = new DateOnly(2026, 8, 1),
            CheckOut = new DateOnly(2026, 8, 3),
            GuestId = 1,
            NAdults = 2,
            NKids = 2,
            Meals = 0
        };

        await sut.Reserve(input);

        var savedReservation = await context.Reservations.FirstOrDefaultAsync(r => r.RoomId == 1);
        Assert.NotNull(savedReservation);
        Assert.Equal(
            expected: ("Not Checked In", 1, 4),
            actual: (savedReservation.Status, savedReservation.GuestId, savedReservation.NumberOfGuests)
        );
    }
}