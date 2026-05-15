using Microsoft.AspNetCore.Mvc;

namespace Hotel.Controllers;

public class UsersController : Controller
{
    // GET
    public IActionResult Index()
    {
        return View();
    }
}