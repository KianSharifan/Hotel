using Microsoft.AspNetCore.Mvc;

namespace Hotel.Controllers;

public class ServiceController : Controller
{
    // GET
    public IActionResult Index()
    {
        return View();
    }
}