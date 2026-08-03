namespace HotelTests.ServicesTests;

using System;
using System.Threading.Tasks;
using Xunit;
using Microsoft.EntityFrameworkCore;
using Hotel.Data;
using Hotel.Services;
using Hotel.Models;
using Hotel.DTOs;

public class HouseKeepingTests
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
    
    //test to see if assigning a housekeeping to a housekeeper works
    [Fact]
    public async Task Assign_HouseKeeping()
    {
        var context = GetInMemoryContext();
        context.Roles.Add(new Role { RoleId = 1, Name = "Housekeeper" });
        context.Positions.Add(new Position { Id = 1, Title = "Title", BaseSalary = 10000 });
        context.RoomTypes.Add(new RoomType { RoomTypeId = 1, MaxGuests = 4 , Name = "RoomType1" , NumberDoubleBed = 1,NumberSingleBed = 2,NumberSofaBed = 0,Price = 50});
        context.Rooms.Add(new Room { RoomId = 1,HotelId = 1,RoomNumber = 101,Floor = 1, Status = "Available", RoomTypeId = 1 });
        context.Users.Add(new User
        {
            Id = 1, Username = "User1", Email = "User@gmail.com", Phone = "091112345678",
            PasswordHash = "HashedPassword", CreatedAt = DateTime.UtcNow, RoleId = 1
        });
        context.Departments.Add(new Department { Id = 1, Name = "HouseKeeping" });
        context.Employees.Add(new Employee
        {
            Id = 1, PositionId = 1, DepartmentId = 1, HireDate = DateTime.UtcNow, Salary = 15000,
            BirthDate = DateTime.UtcNow
        });
        await context.SaveChangesAsync();
        var sut = new HouseKeepingServices(context);
        var time = DateTime.UtcNow;
        var input = new HouseKeepingDto
        {
            RoomId = 1,
            EmployeeId = 1,
            ScheduledDate = time
        };
        var houseKeeping = await sut.AssignHouseKeeping(input);
        Assert.NotNull(houseKeeping);
        Assert.Equal(
            expected: (false, 1, time),
            actual: (houseKeeping.Status, houseKeeping.EmployeeId, houseKeeping.ScheduledDate)
        );
    }
}