using Hotel.Interfaces;

namespace HotelTests.ControllersTests;

using System;
using System.Threading.Tasks;
using Xunit;
using Microsoft.EntityFrameworkCore;
using Hotel.Data;
using Hotel.Services;
using Hotel.Models;
using Hotel.DTOs;
using Moq;

public class HouseKeepingControllerTests
{
    private readonly Mock<IHouseKeepingServices> _mockHouseKeepingServices;
    public HouseKeepingControllerTests()
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
    
    //test
}