using Hotel.Data;
using Hotel.DTOs;
using Hotel.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Hotel.Controllers;

[Route("API/FrontDeskManager")]
[ApiController]
public class FrontDeskManagerController : Controller
{
    private readonly AppDBContext  _context;
    public FrontDeskManagerController(AppDBContext context)
    {
    _context = context;
    }
    
    //should have auth
    [HttpPost("Reservations")]
    public async Task<ActionResult> AllReservations()
    {
        try
        {
            return Ok(await _context.Reservations.ToListAsync());

        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
    //should have auth
    [HttpGet("Reservations/{id}")]
    public async Task<ActionResult> GetReservation(int id)
    {
        try
        {
            var r = await _context.Reservations.FirstOrDefaultAsync(r => r.Id == id);
            if (r == null)
                return NotFound();
            return Ok(r);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
    //should have auth
    [HttpPost("Checkout")]
    public async Task<IActionResult> CheckOut([FromBody]CheckOutDTO dto)
    {
        try
        {
            var r = _context.Reservations.FirstOrDefault(r => r.CheckInDate == dto.ReservationDate && r.Room.RoomNumber == dto.RoomNumber);
            if (r == null)
                return NotFound();
            double total = 0;
            total += (r.CheckOutDate.DayNumber - r.CheckInDate.DayNumber) * r.Room.RoomType.Price;
            var su = _context.GuestServiceUsages.Where(s => s.ReservationId == r.Id).ToList();
            foreach (var s in su)
            {
                total += s.Price;
            }
            var subTotal = total;
            if(dto.Discount > 100 || dto.Discount < 0)
                return BadRequest("Discount can't be greater than 100 or less than 0");
            if (dto.Tax > 100 || dto.Discount < 0)
                return BadRequest("Tax can't be greater than 100 or less than 0");
            if(dto.Tax == null || dto.Discount == null)
                return BadRequest("Tax or Discount cannot be null");
            if (dto.Discount == 0)
                total = total * (dto.Tax.Value + 100)/100;
            else
            {
                total = total / ((dto.Discount.Value + 100) / 100) * ((dto.Tax.Value + 100) / 100);
            }
            Invoice i = new Invoice()
            {
                GuestId = r.GuestId,
                ReservationId = r.Id,
                SubTotal = subTotal,
                Total = total,
                Discount = dto.Discount.Value,
                Tax = dto.Tax.Value,
                IssueDate = DateTime.Now,
                Status = "Not Payed!"
            };
            var u = r.Guest.User;
            u.IsActive = false;
            await _context.Invoices.AddAsync(i);
            await _context.SaveChangesAsync();
            return Ok(i.Id);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
    //should have auth
    [HttpPost("CheckIn")]
    public async Task<IActionResult> CheckIn([FromBody]CheckInDTO dto)
    {
        try
        {
            var r = await _context.Reservations.FirstOrDefaultAsync(r =>
                r.CheckInDate == dto.ReservationDate && r.Guest.User.Username == dto.UserName);
            if (r == null)
                return NotFound();
            var g = _context.Guests.FirstOrDefault(g => g.GuestId == r.GuestId);
            if (g == null)
                return NotFound();
            g.Nationality = dto.Nationality;
            g.PassportNumber = dto.PassportNumber;
            var u = _context.Users.FirstOrDefault(u => u.Username == dto.UserName);
            if (u == null)
                return NotFound();
            u.IsActive = true;
            u.FirstName = dto.FirstName;
            u.LastName = dto.LastName;
            await _context.SaveChangesAsync();
            return Ok(r.Room.RoomNumber);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    //should have auth
    [HttpPost("Payment/{id}")]
    public async Task<IActionResult> Payment(int id, [FromBody] PayDTO dto)
    {
        try
        {
            var i = await _context.Invoices.FirstOrDefaultAsync(i => i.Id == id);
            if (i == null)
                return NotFound();
            if(dto.TransactionId == null)
                return BadRequest("TransactionId cannot be null");
            var p = new Payment()
            {
                InvoiceId = id,
                PaymentMethod = dto.PaymentMethod,
                TransactionId = dto.TransactionId,
                Amount = i.Total,
                Status = "Paid",
                PaymentDate = DateTime.Now
            };
            await _context.Payments.AddAsync(p);
            i.Status = "Paid";
            await _context.SaveChangesAsync();
            return Ok();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}