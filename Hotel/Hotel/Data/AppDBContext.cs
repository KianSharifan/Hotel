using Microsoft.EntityFrameworkCore;
namespace Hotel.Data;
using Hotel.Models;
public class AppDBContext : DbContext
{
    public AppDBContext(DbContextOptions<AppDBContext> options)
        : base(options)
    {
    }

    public DbSet<Models.Hotel> Hotels { get; set; }

    public DbSet<Department> Departments { get; set; }

    public DbSet<Position> Positions { get; set; }

    public DbSet<Role> Roles { get; set; }

    public DbSet<Guest> Guests { get; set; }

    public DbSet<RoomType> RoomTypes { get; set; }

    public DbSet<Service> Services { get; set; }

    public DbSet<MenuCategory> MenuCategories { get; set; }

    public DbSet<Employee> Employees { get; set; }

    public DbSet<User> Users { get; set; }

    public DbSet<Room> Rooms { get; set; }

    public DbSet<Restaurant> Restaurants { get; set; }

    public DbSet<MenuItem> MenuItems { get; set; }

    public DbSet<Table> RestaurantTables { get; set; }

    public DbSet<Reservation> Reservations { get; set; }

    public DbSet<Order> Orders { get; set; }

    public DbSet<Invoice> Invoices { get; set; }

    public DbSet<Payment> Payments { get; set; }

    public DbSet<GuestServiceUsage> GuestServiceUsages { get; set; }

    public DbSet<HouseKeeping> HouseKeepings { get; set; }

    public DbSet<MaintenanceRequest> MaintenanceRequests { get; set; }

    public DbSet<OrderItem> OrderItems { get; set; }
}

// The constraints should be added later.