using Microsoft.AspNetCore.Mvc;

namespace ChatLeandroService.controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
