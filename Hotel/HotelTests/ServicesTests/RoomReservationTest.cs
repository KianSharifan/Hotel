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
    
    //test to see if the reservation happens
    [Fact]
    public async Task Reserve_RoomAvailable_CreatesReservation()
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
    
    //test to see if the meals would be added to the service usages of the user
    [Fact]
    public async Task Reserve_RoomAvailable_CreatesReservationWithMeal()
    {
        var context = GetInMemoryContext();
        context.Hotels.Add(new Hotel { Name = "Hotel1",StarRating = 5,CheckInTime = TimeOnly.MinValue,CheckOutTime = TimeOnly.MaxValue,Address = "here",City = "1",Country = "1",Email = "Hotel@gmail.com",Phone = "09111111111"});
        context.RoomTypes.Add(new RoomType { RoomTypeId = 1, MaxGuests = 4 , Name = "RoomType1" , NumberDoubleBed = 1,NumberSingleBed = 2,NumberSofaBed = 0,Price = 50});
        context.Rooms.Add(new Room { RoomId = 1,HotelId = 1,RoomNumber = 101,Floor = 1, Status = "Available", RoomTypeId = 1 });
        context.Services.Add(new Service { Name = "AllMeals", Description = "You can use both Breakfast and Lunch tables as much as you want to.", Price = 50 });
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
            Meals = 2
        };
        await sut.Reserve(input);
        var savedServiceUsage = await context.GuestServiceUsages.Include(su => su.Service).FirstOrDefaultAsync(su => su.GuestId == 1);
        Assert.NotNull(savedServiceUsage);
        Assert.Equal(
            expected: ("AllMeals", 4*2, 50*4*2),
            actual: (savedServiceUsage.Service!.Name, (int)savedServiceUsage.Quantity, savedServiceUsage.Price)
            );
    }
    
    //test to see if reservations fail when dates overlap with an existing reservation
    [Fact]
    public async Task Reserve_DatesOverlapWithExistingReservation_DoesNotCreateReservation()
    {
        var context = GetInMemoryContext();
        context.Hotels.Add(new Hotel { Name = "Hotel1", StarRating = 5, CheckInTime = TimeOnly.MinValue, CheckOutTime = TimeOnly.MaxValue, Address = "here", City = "1", Country = "1", Email = "Hotel@gmail.com", Phone = "09111111111" });
        context.RoomTypes.Add(new RoomType { RoomTypeId = 1, MaxGuests = 4, Name = "RoomType1", NumberDoubleBed = 1, NumberSingleBed = 2, NumberSofaBed = 0, Price = 50 });
        context.Rooms.Add(new Room { RoomId = 1, HotelId = 1, RoomNumber = 101, Floor = 1, Status = "Available", RoomTypeId = 1 });

        context.Reservations.Add(new Reservation
        {
            RoomId = 1,
            CheckInDate = new DateOnly(2026, 8, 1),
            CheckOutDate = new DateOnly(2026, 8, 5),
            GuestId = 2,
            NumberOfGuests = 2,
            Status = "Not Checked In"
        });
        await context.SaveChangesAsync();

        var sut = new RoomServices(context);
        var input = new RoomReservationDto
        {
            RoomTypeId = 1,
            CheckIn = new DateOnly(2026, 8, 3),
            CheckOut = new DateOnly(2026, 8, 6),
            GuestId = 1,
            NAdults = 2,
            NKids = 0,
            Meals = 0
        };

        var result = await sut.Reserve(input);

        Assert.Equal((0, 0), result);

        var newReservation = await context.Reservations.FirstOrDefaultAsync(r => r.GuestId == 1);
        Assert.Null(newReservation);
    }
    
        
    //test to see available roomTypes based on different guest counts
    [Theory]
    [InlineData(2, 1, 2)]
    [InlineData(3, 1, 1)]
    [InlineData(3, 2, 0)]
    public async Task Available_RoomTypes_DifferentGuestCounts_ReturnsExpectedCount(int numberOfAdults, int numberOfKids, int expectedCount)
    {
        var context = GetInMemoryContext();
        context.Hotels.Add(new Hotel { Name = "Hotel1", StarRating = 5, CheckInTime = TimeOnly.MinValue, CheckOutTime = TimeOnly.MaxValue, Address = "here", City = "1", Country = "1", Email = "Hotel@gmail.com", Phone = "09111111111" });
        context.RoomTypes.Add(new RoomType { RoomTypeId = 1, MaxGuests = 4, Name = "RoomType1", NumberDoubleBed = 1, NumberSingleBed = 2, NumberSofaBed = 0, Price = 50 });
        context.RoomTypes.Add(new RoomType { RoomTypeId = 2, MaxGuests = 3, Name = "RoomType2", NumberDoubleBed = 1, NumberSingleBed = 0, NumberSofaBed = 1, Price = 40 });
        context.Rooms.Add(new Room { RoomId = 1, HotelId = 1, RoomNumber = 101, Floor = 1, Status = "Available", RoomTypeId = 1 });
        context.Rooms.Add(new Room { RoomId = 2, HotelId = 1, RoomNumber = 102, Floor = 1, Status = "Available", RoomTypeId = 2 });

        await context.SaveChangesAsync();

        var sut = new RoomServices(context);
        var input = new RoomSearchDto
        {
            CheckIn = new DateOnly(2026, 8, 1),
            CheckOut = new DateOnly(2026, 8, 3),
            NumberOfAdults = numberOfAdults,
            NumberOfKids = numberOfKids,
        };

        var output = await sut.AvailableRoomTypes(input);

        Assert.NotNull(output);
        Assert.Equal(expectedCount, output.Count);
    }
}