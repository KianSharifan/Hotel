namespace HotelTests.ControllersTests;

using Microsoft.AspNetCore.Mvc;
using Hotel.Interfaces;
using System;
using System.Threading.Tasks;
using Xunit;
using Microsoft.EntityFrameworkCore;
using Hotel.Data;
using Hotel.Models;
using Hotel.DTOs;
using Hotel.Controllers;
using Moq;

public class TableControllerTest
{
    private readonly Mock<IRestaurantServices> _mockRestaurantServices;

    public TableControllerTest()
    {
        _mockRestaurantServices = new Mock<IRestaurantServices>();
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

    //test to see if the reservation happens if a table is free
    [Fact]
    public async Task TableReservation_Available_ReturnsCreatedAtAction()
    {
        var context = GetInMemoryContext();
        context.Hotels.Add(new Hotel { Name = "Hotel1", StarRating = 5, CheckInTime = TimeOnly.MinValue, CheckOutTime = TimeOnly.MaxValue, Address = "here", City = "1", Country = "1", Email = "Hotel@gmail.com", Phone = "09111111111" });
        context.Restaurants.Add(new Restaurant { Id = 1, HotelId = 1, Name = "Restaurant1", Address = "Address", OpeningTime = new TimeOnly(9, 0), ClosingTime = new TimeOnly(23, 0) });
        context.RestaurantTables.Add(new Table { Id = 1, RestaurantId = 1, Status = "Available", Capacity = 4 });
        await context.SaveChangesAsync();

        var sut = new RestaurantTablesController(context, _mockRestaurantServices.Object);

        var input = new TableStatusDto
        {
            Capacity = 2,
            Time = new DateTime(2026, 8, 1, 19, 0, 0),
            Email = "guest@example.com",
            SpecialReq = null
        };

        var result = await sut.Reservation(input);

        Assert.IsType<CreatedAtActionResult>(result);
        var savedReservation = await context.TableReservations.FirstOrDefaultAsync(r => r.TableId == 1);
        Assert.NotNull(savedReservation);
        Assert.Equal("guest@example.com", savedReservation.Email);
    }
    
    //test to see that no table is offered when requested capacity exceeds every table's capacity
    [Fact]
    public async Task TableReservation_CapacityExceedsAllTables_ReturnsBadRequest()
    {
        var context = GetInMemoryContext();
        context.Hotels.Add(new Hotel { Name = "Hotel1", StarRating = 5, CheckInTime = TimeOnly.MinValue, CheckOutTime = TimeOnly.MaxValue, Address = "here", City = "1", Country = "1", Email = "Hotel@gmail.com", Phone = "09111111111" });
        context.Restaurants.Add(new Restaurant { Id = 1, HotelId = 1, Name = "Restaurant1", Address = "Address", OpeningTime = new TimeOnly(9, 0), ClosingTime = new TimeOnly(23, 0) });
        context.RestaurantTables.Add(new Table { Id = 1, RestaurantId = 1, Status = "Available", Capacity = 4 });
        await context.SaveChangesAsync();

        var sut = new RestaurantTablesController(context, _mockRestaurantServices.Object);
        var input = new TableStatusDto
        {
            Capacity = 6,
            Time = new DateTime(2026, 8, 1, 19, 0, 0),
            Email = "guest@example.com",
            SpecialReq = null
        };

        var result = await sut.Reservation(input);
        Assert.IsType<BadRequestObjectResult>(result);
        var savedReservation = await context.TableReservations.FirstOrDefaultAsync(r => r.Email == "guest@example.com");
        Assert.Null(savedReservation);
    }

    //test to see that a reservation fails when requested time fails within 120 minutes of an existing reservation on the same table
    [Fact]
    public async Task TableReservation_TimeWithin120MinutesOfExistingReservation_ReturnsBadRequest()
    {
        var context = GetInMemoryContext();
        context.Hotels.Add(new Hotel { Name = "Hotel1", StarRating = 5, CheckInTime = TimeOnly.MinValue, CheckOutTime = TimeOnly.MaxValue, Address = "here", City = "1", Country = "1", Email = "Hotel@gmail.com", Phone = "09111111111" });
        context.Restaurants.Add(new Restaurant { Id = 1, HotelId = 1, Name = "Restaurant1", Address = "Address", OpeningTime = new TimeOnly(9, 0), ClosingTime = new TimeOnly(23, 0) });
        context.RestaurantTables.Add(new Table { Id = 1, RestaurantId = 1, Status = "Available", Capacity = 4 });
        context.TableReservations.Add(new TableReservation
        {
            TableId = 1,
            Time = new DateTime(2026, 8, 1, 19, 0, 0),
            Email = "otherguest@example.com"
        });
        await context.SaveChangesAsync();
        var sut = new RestaurantTablesController(context, _mockRestaurantServices.Object);
        var input = new TableStatusDto
        {
            Capacity = 2,
            Time = new DateTime(2026, 8, 1, 20, 0, 0),
            Email = "newguest@example.com",
            SpecialReq = null
        };

        var result = await sut.Reservation(input);
        Assert.IsType<BadRequestObjectResult>(result);
        var savedReservation = await context.TableReservations.FirstOrDefaultAsync(r => r.Email == "newguest@example.com");
        Assert.Null(savedReservation);
    }
}