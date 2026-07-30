using Hotel.Data;
using Hotel.DTOs;
using Hotel.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace Hotel.Controllers;

[Route("API/FrontDeskManager")]
[ApiController]
public class FrontDeskManagerController : Controller
{
    private readonly AppDbContext  _context;
    public FrontDeskManagerController(AppDbContext context)
    {
    _context = context;
    }
    
    [HttpGet("Reservations")]
    [Authorize(Roles = "HotelManager,FrontOfficeManager")]
    public async Task<ActionResult> AllReservations()
    {
        try
        {
            return Ok(await _context.Reservations.ToListAsync());
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    }
    
    [HttpGet("Reservations/{id}")]
    [Authorize(Roles = "HotelManager,FrontOfficeManager")]
    public async Task<ActionResult> GetReservation(int id)
    {
        try
        {
            var r = await _context.Reservations.FirstOrDefaultAsync(r => r.Id == id);
            if (r == null)
                return NotFound();
            return Ok(r);
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    }
    
    [HttpPost("Checkout")]
    [Authorize(Roles = "HotelManager,FrontOfficeManager")]
    public async Task<IActionResult> CheckOut([FromBody]CheckOutDto dto)
    {
        await using var transaction = await _context.Database.BeginTransactionAsync();
        try
        {
            if(dto.Discount > 100 || dto.Discount < 0)
                return BadRequest("Discount can't be greater than 100 or less than 0");
            if (dto.Tax > 100 || dto.Tax < 0)
                return BadRequest("Tax can't be greater than 100 or less than 0");
            if(dto.Tax == null || dto.Discount == null)
                return BadRequest("Tax or Discount cannot be null");
            var r = await _context.Reservations
                .Include(r => r.Room)
                .Include(r=>r.Guest)
                .FirstOrDefaultAsync(r => r.CheckInDate == dto.ReservationDate && r.Room!.RoomNumber == dto.RoomNumber);
            if (r == null)
                return NotFound();
            double total = 0;
            r.Room!.RoomType = _context.RoomTypes.FirstOrDefault(rt => r.Room.RoomTypeId == rt.RoomTypeId);
            total += (r.CheckOutDate.DayNumber - r.CheckInDate.DayNumber) * r.Room.RoomType!.Price;
            var su = _context.GuestServiceUsages.Where(s => s.ReservationId == r.Id).ToList();
            foreach (var s in su)
                total += s.Price;
            var subTotal = total;
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
                IssueDate = DateTime.UtcNow,
                Status = "Not Payed!"
            };
            r.Guest!.User = _context.Users.FirstOrDefault(u => u.Id == r.GuestId);
            var u = r.Guest.User;
            u!.IsActive = false;
            r.Status = "Checked Out";
            await _context.Invoices.AddAsync(i);
            await _context.SaveChangesAsync();
            await transaction.CommitAsync();
            return CreatedAtAction(
                nameof(FinanceController.GetInvoices)
                ,controllerName: "Finance",
                routeValues: new { id = i.Id },
                i.Id);
        }
        catch (Exception)
        {
            await transaction.RollbackAsync();
            return StatusCode(500, "An unexpected error occurred");
        }
    }
    
    //should have auth
    [HttpPost("CheckIn")]
    [Authorize(Roles = "HotelManager,FrontOfficeManager")]
    public async Task<IActionResult> CheckIn([FromBody]CheckInDto dto)
    {
        try
        {
            var r = await _context.Reservations
                .Include(r => r.Room)
                .Include(r=>r.Guest)
                .ThenInclude(r=>r!.User)
                .FirstOrDefaultAsync(r =>
                r.CheckInDate == dto.ReservationDate && r.Guest!.User!.Username == dto.UserName);
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
            return Ok(r.Room!.RoomNumber);
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    }

    [HttpPost("Payment/{id}")]
    [Authorize(Roles = "HotelManager,FrontOfficeManager,DirectorOfFinance")]
    public async Task<IActionResult> Payment(int id, [FromBody] PayDto dto)
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
                PaymentDate = DateTime.UtcNow
            };
            await _context.Payments.AddAsync(p);
            i.Status = "Paid";
            await _context.SaveChangesAsync();
            return CreatedAtAction(
                nameof(FinanceController.HotelPayments)
                ,controllerName: "Finance"
                ,routeValues: new { id = p.Id }
                ,p.Id);
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred");
        }
    }
}