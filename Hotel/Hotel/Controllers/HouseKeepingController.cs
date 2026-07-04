using Microsoft.AspNetCore.Mvc;

namespace Hotel.Controllers;

public class HouseKeepingController : Controller
{
    // GET
    public IActionResult Index()
    {
        return View();
    }
}