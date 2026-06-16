using Hotel.Models;
using Hotel.Data;
using Microsoft.AspNetCore.Mvc;
using BCrypt.Net;
using Hotel.DTOs;
using Hotel.Mappers;
using Hotel.Migrations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Hotel.Services;


namespace Hotel.Controllers;

// [Authorize]
[Route("Home")]
[ApiController]
public class HotelController : Controller
{
    private readonly AppDBContext _context;
    public HotelController(AppDBContext context)
    {
        _context = context;
    }
    
    // [HttpGet]
    // public async Task<IActionResult> GetHotels()
    // {
    //     RoomServices roomServices = new RoomServices(_context);
    //     List<RoomType> output = new List<RoomType>();
    //
    //     try
    //     {
    //         output = await roomServices.AvailableRoomTypes(new RoomSearchDTO()
    //             {
    //                 NumberOfAdults = 2, NumberOfKids = 1, CheckOut = DateOnly.MinValue,
    //                 CheckIn = new DateOnly(2026, 3, 12)
    //             }
    //         );
    //     }
    //     catch (Exception e)
    //     {
    //         Console.WriteLine(e);
    //         throw;
    //     }
    //     
    //     return Ok(output);
    // }
}