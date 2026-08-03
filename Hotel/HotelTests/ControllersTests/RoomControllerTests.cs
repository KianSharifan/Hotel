namespace HotelTests.ControllersTests;
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
public class RoomControllerTests
{
    private readonly Mock<IRoomServices> _mockRoomServices;
    public RoomControllerTests()
    {
        _mockRoomServices = new Mock<IRoomServices>();
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
    
    //test to see if the creation and deletion of a room both works
    [Fact]
    public async Task CreateRoom_Successfully()
    {
        var context = GetInMemoryContext();
        context.Hotels.Add(new Hotel { Name = "Hotel1", StarRating = 5, CheckInTime = TimeOnly.MinValue, CheckOutTime = TimeOnly.MaxValue, Address = "here", City = "1", Country = "1", Email = "Hotel@gmail.com", Phone = "09111111111" });
        context.RoomTypes.Add(new RoomType { RoomTypeId = 1, MaxGuests = 4, Name = "RoomType1", NumberDoubleBed = 1, NumberSingleBed = 2, NumberSofaBed = 0, Price = 50 });
        await context.SaveChangesAsync();
        
        var sut = new RoomsController(context,_mockRoomServices.Object);
        var input = new RoomDto
        {
            HotelId = 1,
            RoomNumber = 101,
            RoomTypeId = 1,
            Floor = 1
        };

        await sut.CreateRoom(input);
        var room = await context.Rooms.FirstOrDefaultAsync(r => r.RoomNumber == 101);
        Assert.NotNull(room);

        await sut.DeleteRoom(101);
        var roomAfterDelete = await context.Rooms.FirstOrDefaultAsync(r => r.RoomNumber == 101);
        Assert.Null(roomAfterDelete);
    }
    
    //test to see that the invalid inputs can't create a room
    [Fact]
    public async Task CreateRoom_Unsuccessfully_InvalidInput()
    {
        var context = GetInMemoryContext();
        context.Hotels.Add(new Hotel { Name = "Hotel1", StarRating = 5, CheckInTime = TimeOnly.MinValue, CheckOutTime = TimeOnly.MaxValue, Address = "here", City = "1", Country = "1", Email = "Hotel@gmail.com", Phone = "09111111111" });
        context.RoomTypes.Add(new RoomType { RoomTypeId = 1, MaxGuests = 4, Name = "RoomType1", NumberDoubleBed = 1, NumberSingleBed = 2, NumberSofaBed = 0, Price = 50 });
        await context.SaveChangesAsync();
        
        var sut = new RoomsController(context,_mockRoomServices.Object);
        var input = new RoomDto
        {
            HotelId = 1,
            RoomNumber = 101,
            RoomTypeId = null,
            Floor = 1
        };
        
        await sut.CreateRoom(input);
        var room = await context.Rooms.FirstOrDefaultAsync(r => r.RoomNumber == 101);
        Assert.Null(room);
        
        var input1 = new RoomDto
        {
            HotelId = 1,
            RoomNumber = null,
            RoomTypeId = 1,
            Floor = 1
        };
        
        await sut.CreateRoom(input1);
        var room1 = await context.Rooms.FirstOrDefaultAsync(r => r.RoomNumber == 101);
        Assert.Null(room1);
    }
    
}