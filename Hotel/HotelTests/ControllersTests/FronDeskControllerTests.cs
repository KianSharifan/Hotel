namespace HotelTests.ControllersTests;

using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using Xunit;
using Microsoft.EntityFrameworkCore;
using Hotel.Data;
using Hotel.Models;
using Hotel.DTOs;
using Hotel.Controllers;
using Moq;
using Hotel.Interfaces;

public class FronDeskControllerTests
{
    private readonly Mock<IHouseKeepingServices> _mockHouseKeepingServices;
    public FronDeskControllerTests()
    {
        _mockHouseKeepingServices = new Mock<IHouseKeepingServices>();
    }

    private AppDbContext GetInMemoryContext()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .ConfigureWarnings(w =>
                w.Ignore(Microsoft.EntityFrameworkCore.Diagnostics.InMemoryEventId.TransactionIgnoredWarning))
            .Options;

        return new AppDbContext(options);
    }
    
    //test to see if a person checkout works correctly
    [Fact]
    public async Task CheckOut_Successfully()
    {
        var context = GetInMemoryContext();
        context.Hotels.Add(new Hotel { Name = "Hotel1", StarRating = 5, CheckInTime = TimeOnly.MinValue, CheckOutTime = TimeOnly.MaxValue, Address = "here", City = "1", Country = "1", Email = "Hotel@gmail.com", Phone = "09111111111" });
        context.RoomTypes.Add(new RoomType { RoomTypeId = 1, MaxGuests = 4, Name = "RoomType1", NumberDoubleBed = 1, NumberSingleBed = 2, NumberSofaBed = 0, Price = 50 });
        context.Rooms.Add(new Room { RoomId = 1, HotelId = 1, RoomNumber = 101, Floor = 1, Status = "Available", RoomTypeId = 1 });
        context.Users.Add(new User
        {
            Id = 1, Username = "User1", Email = "User@gmail.com", Phone = "0900000000", PasswordHash = "This is hashed",
            CreatedAt = DateTime.UtcNow, RoleId = 5
        });
        context.Guests.Add(new Guest { GuestId = 1 });
        context.Reservations.Add(new Reservation
        {
            GuestId = 1, RoomId = 1, CheckInDate = new DateOnly(2026, 8, 8), CheckOutDate = new DateOnly(2026, 8, 11),
            NumberOfGuests = 3, Status = "CheckedIn"
        });
        await context.SaveChangesAsync();

        var sut = new FrontDeskManagerController(context,_mockHouseKeepingServices.Object);
        var input = new CheckOutDto
        {
            RoomNumber = 101,
            Discount = 10,
            ReservationDate = new DateOnly(2026, 8, 8),
            Tax = 5
        };
        var result = await sut.CheckOut(input);
        Assert.IsType<CreatedAtActionResult>(result);
        var createdInvoice = await context.Invoices.Include(i => i.Reservation).ThenInclude(r => r!.Room).FirstOrDefaultAsync(i => i.GuestId == 1 && i.Reservation!.Room!.RoomNumber == 101);
        Assert.NotNull(createdInvoice);
        Assert.Equal(
            expected:50*3*1.05*0.9,
            actual:createdInvoice.Total);
    }
    
    //test to see if the services' prices are included too
    [Fact]
    public async Task CheckOut_WithService_Successfully()
    {
        var context = GetInMemoryContext();
        context.Hotels.Add(new Hotel { Name = "Hotel1", StarRating = 5, CheckInTime = TimeOnly.MinValue, CheckOutTime = TimeOnly.MaxValue, Address = "here", City = "1", Country = "1", Email = "Hotel@gmail.com", Phone = "09111111111" });
        context.RoomTypes.Add(new RoomType { RoomTypeId = 1, MaxGuests = 4, Name = "RoomType1", NumberDoubleBed = 1, NumberSingleBed = 2, NumberSofaBed = 0, Price = 50 });
        context.Rooms.Add(new Room { RoomId = 1, HotelId = 1, RoomNumber = 101, Floor = 1, Status = "Available", RoomTypeId = 1 });
        context.Users.Add(new User
        {
            Id = 1, Username = "User1", Email = "User@gmail.com", Phone = "0900000000", PasswordHash = "This is hashed",
            CreatedAt = DateTime.UtcNow, RoleId = 5
        });
        context.Guests.Add(new Guest { GuestId = 1 });
        context.Reservations.Add(new Reservation
        {
            GuestId = 1, RoomId = 1, CheckInDate = new DateOnly(2026, 8, 8), CheckOutDate = new DateOnly(2026, 8, 11),
            NumberOfGuests = 3, Status = "CheckedIn"
        });
        context.Services.Add(new Service {Id = 1, Name = "Service1", Price = 50 });
        context.GuestServiceUsages.Add(new GuestServiceUsage { GuestId = 1 ,ServiceId = 1,ReservationId = 1,Quantity = 2,Price = 50*2,UseDate = DateTime.UtcNow});
        await context.SaveChangesAsync();

        var sut = new FrontDeskManagerController(context,_mockHouseKeepingServices.Object);
        var input = new CheckOutDto
        {
            RoomNumber = 101,
            Discount = 5,
            ReservationDate = new DateOnly(2026, 8, 8),
            Tax = 10
        };
        var result = await sut.CheckOut(input);
        Assert.IsType<CreatedAtActionResult>(result);
        var createdInvoice = await context.Invoices.Include(i => i.Reservation).ThenInclude(r => r!.Room).FirstOrDefaultAsync(i => i.GuestId == 1 && i.Reservation!.Room!.RoomNumber == 101);
        Assert.NotNull(createdInvoice);
        Assert.Equal(
            expected:(50*3+100)*1.10*0.95,
            actual:createdInvoice.Total);
    } 
}