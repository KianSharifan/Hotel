using Microsoft.AspNetCore.Mvc;
using Hotel.Data;
using Hotel.Models;
using Microsoft.EntityFrameworkCore;

namespace Hotel.Controllers;

[Route("API/Finance")]
[ApiController]
public class FinanceController : Controller
{
    private readonly AppDbContext  _context;
    public FinanceController(AppDbContext context)
    {
        _context = context;
    }
    
    //should have auth
    [HttpGet("RestaurantPayments")]
    public async Task<IActionResult> RestaurantPayments()
    {
        try
        {
            var output = await _context.Payments.Where(payment => payment.OrderId != null).ToListAsync();
            return Ok(output);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
    //should have auth
    [HttpGet("HotelPayments")]
    public async Task<IActionResult> HotelPayments()
    {
        try
        {
            var output = await _context.Payments.Where(payment => payment.InvoiceId != null).ToListAsync();
            return Ok(output); 
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
    //should have auth
    [HttpDelete("DeletePayment/{id}")]
    public async Task<IActionResult> DeletePayment(int id)
    {
        try
        {
            var payment = await _context.Payments.FirstOrDefaultAsync(p  => p.Id == id);
            if (payment == null)
                return NotFound();
            _context.Payments.Remove(payment);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
    //should have auth
    [HttpGet("AllInvoices")]
    public async Task<IActionResult> AllInvoices()
    {
        try
        {
            var output = await _context.Invoices.ToListAsync();
            return Ok(output);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
    
    //should have auth
    [HttpDelete("DeleteInvoice/{id}")]
    public async Task<IActionResult> DeleteInvoice(int id)
    {
        try
        {
            var invoice = await _context.Invoices.FirstOrDefaultAsync(i => i.Id == id);
            if (invoice == null)
                return NotFound();
            _context.Invoices.Remove(invoice);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}