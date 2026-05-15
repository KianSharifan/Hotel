using Hotel.Models;
using Microsoft.AspNetCore.Mvc;

namespace Hotel.Controllers;


[Route("api/[controller]")]
[ApiController]
public class HotelController : Controller
{
    static private List<Models.Hotel> hotels = new List<Models.Hotel>
    {
        new Models.Hotel { ID = 1, Name = "a", Address = "b", City = "c", State = "d" }
    };
    [HttpGet]
    public ActionResult<List<Models.Hotel>> Get()
    {
        return Ok(hotels);
    }
  
}