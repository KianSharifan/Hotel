namespace HotelTests.ServicesTests;
using System;
using System.Threading.Tasks;
using System.Linq;
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
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;
 
        return new AppDbContext(options);
    }
}