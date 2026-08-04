using Hotel.Data;
using Hotel.Models;
using Microsoft.EntityFrameworkCore;
using System.Text;
using System.Security.Cryptography;

namespace Hotel.Seeding;
public class SeedDb
{
    public static async Task SeedDataBase(IApplicationBuilder app)
    {
        using var scope = app.ApplicationServices.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        await context.Database.MigrateAsync();
        if (!context.Hotels.Any())
        {
            context.Hotels.Add(
                new Models.Hotel
                {
                    Name = "Noir",
                    Address = "220 Central Park South,NY 10019",
                    Phone = "212-308-9100",
                    CheckInTime = new TimeOnly(3, 0),
                    CheckOutTime = new TimeOnly(11, 0),
                    City = "New York",
                    Country = "United States",
                    Email = "info@veloria.com",
                    StarRating = 5.0
                }
            );
            var roomTypes = new List<RoomType>
            {
                new RoomType
                {
                    Name = "Standard Room",
                    MaxGuests = 2,
                    NumberDoubleBed = 1,
                    NumberSingleBed = 0,
                    NumberSofaBed = 0,
                    Description = "A comfortable room with a queen bed, work desk, and modern bathroom.",
                    Price = 69.99,
                    PicUrl = "/assets/room1.png"
                },
                new RoomType
                {
                    Name = "Deluxe Room",
                    MaxGuests = 3,
                    NumberDoubleBed = 1,
                    NumberSingleBed = 1,
                    NumberSofaBed = 0,
                    Description = "A spacious room featuring a king bed, seating area, and premium décor.",
                    Price = 92.99,
                    PicUrl="/assets/room2.png"
                },
                new RoomType
                {
                    Name = "Superior Room",
                    MaxGuests = 2,
                    NumberDoubleBed = 0,
                    NumberSingleBed = 2,
                    NumberSofaBed = 0,
                    Description = "An upgraded room offering enhanced bedding, better views, and refined finishes.",
                    Price = 119.99,
                    PicUrl="/assets/room3.png"
                },
                new RoomType
                {
                    Name = "Junior Suite",
                    MaxGuests = 3,
                    NumberDoubleBed = 1,
                    NumberSingleBed = 0,
                    NumberSofaBed = 1,
                    Description = "A semi-suite with a lounge area, elegant furnishings, and an expanded bathroom.",
                    Price = 149.99,
                    PicUrl="/assets/room4.png"
                },
                new RoomType
                {
                    Name = "Executive Suite",
                    MaxGuests = 3,
                    NumberDoubleBed = 1,
                    NumberSingleBed = 0,
                    NumberSofaBed = 1,
                    Description = "A luxury suite with a separate living room, workspace, and upgraded amenities.",
                    Price = 249.99,
                    PicUrl="/assets/room5.png"
                },
                new RoomType
                {
                    Name = "Presidential Suite",
                    MaxGuests = 4,
                    NumberDoubleBed = 2,
                    NumberSingleBed = 0,
                    NumberSofaBed = 1,
                    Description = "The hotel's signature suite with multiple rooms, premium décor, and exclusive services.",
                    Price =499.99,
                    PicUrl="/assets/room6.png"
                }
            };
            await context.RoomTypes.AddRangeAsync(roomTypes);
            var roles = new List<Role>
            {
                new Role
                {
                    Name = "HotelManager"
                },
                new Role
                {
                    Name = "Security"
                },
                new Role
                {
                    Name = "Engineer"
                },
                new Role
                {
                    Name = "Housekeeper"
                },
                new Role
                {
                    Name = "Guest"
                },
                new Role
                {
                    Name = "RestaurantManager"
                },
                new Role
                {
                Name = "Waiter"
                },
                new Role
                {
                Name = "Chef"
                },
                new Role
                {
                    Name = "FrontOfficeManager"
                },
                new Role
                {
                    Name = "DirectorOfHR"
                },
                new Role
                {
                    Name = "DirectorOfFinance"
                },
                new Role
                {
                    Name = "DirectorOfRooms"
                }
            };
            await context.Roles.AddRangeAsync(roles);
            var positions = new List<Position>()
            {
                new Position
                {
                    Title = "Intern",
                    BaseSalary = 10000
                },
                new Position
                {
                    Title = "Junior",
                    BaseSalary = 40000
                },
                new Position
                {
                    Title = "Senior",
                    BaseSalary = 70000
                },
                new Position
                {
                    Title = "Manager",
                    BaseSalary = 10000
                }
            };
            await context.Positions.AddRangeAsync(positions);
            var departments = new List<Department>
            {
                new Department
                {
                    Name = "Front Office"
                },
                new Department
                {
                    Name = "Housekeeping"
                },
                new Department
                {
                    Name = "Food and Beverage"
                },
                new Department
                {
                    Name = "Maintenance"
                },
                new Department
                {
                    Name = "Security"
                },
                new Department
                {
                    Name = "Human Resources"
                },
                new Department
                {
                    Name = "Finance"
                }
            };
            await context.Departments.AddRangeAsync(departments);
            var menuCategories = new List<MenuCategory>
            {
                new MenuCategory
                {
                    Name = "Breakfast"
                },
                new MenuCategory
                {
                    Name = "Appetizers"
                },
                new MenuCategory
                {
                    Name = "Main Courses"
                },
                new MenuCategory
                {
                    Name = "Desserts"
                },
                new MenuCategory
                {
                    Name = "Beverages"
                },
                new MenuCategory
                {
                    Name = "Kids Menu"
                },
                new MenuCategory
                {
                    Name = "Pizzas"
                },
                new MenuCategory
                {
                    Name = "Burgers"
                },
            };
            await context.MenuCategories.AddRangeAsync(menuCategories);
            await context.SaveChangesAsync();

            var hotelManagerPasswordHash = Convert.ToHexString(
                SHA256.HashData(Encoding.UTF8.GetBytes("Manager123!"))
            );
            var hotelManager = new User
            {
                Username = "HotelManager",
                Email = "manager@noirhotel.com",
                Phone = "2123089100",
                PasswordHash = hotelManagerPasswordHash,
                IsActive = true,
                CreatedAt = DateTime.UtcNow,
                FirstName = "Alex",
                LastName = "Morgan",
                RoleId = 1
            };
            await context.Users.AddAsync(hotelManager);
            await context.SaveChangesAsync();
            var hotelManagerEmployee = new Employee
            {
                Id = hotelManager.Id,
                PositionId = 4,
                DepartmentId = 1,
                HireDate = DateTime.UtcNow,
                Salary = 100000,
                BirthDate = new DateTime(1985, 1, 1).ToUniversalTime()
            };
            await context.Employees.AddAsync(hotelManagerEmployee);

            var menuItems = new List<MenuItem>
            { 
            // BREAKFAST (1)
    new MenuItem {MenuCategoryId = 1, Name = "Classic Omelette", Description = "Three‑egg omelette with cheese and herbs.", Price = 8.99 },
    new MenuItem {MenuCategoryId = 1, Name = "Pancake Stack", Description = "Fluffy pancakes with maple syrup.", Price = 7.49 },
    new MenuItem {MenuCategoryId = 1, Name = "French Toast", Description = "Golden toast with cinnamon and powdered sugar.", Price = 7.99 },
    new MenuItem {MenuCategoryId = 1, Name = "English Breakfast", Description = "Eggs, sausage, beans, toast, and tomatoes.", Price = 11.99 },
    new MenuItem {MenuCategoryId = 1, Name = "Fruit Bowl", Description = "Fresh seasonal fruits.", Price = 5.49 },
    new MenuItem {MenuCategoryId = 1, Name = "Avocado Toast", Description = "Sourdough topped with smashed avocado.", Price = 6.99 },
            // APPETIZERS (2)
    new MenuItem {MenuCategoryId = 2, Name = "Caesar Salad", Description = "Romaine lettuce with parmesan and croutons.", Price = 6.99 },
    new MenuItem {MenuCategoryId = 2, Name = "Garlic Bread", Description = "Toasted baguette with garlic butter.", Price = 4.49 },
    new MenuItem {MenuCategoryId = 2, Name = "Tomato Soup", Description = "Creamy tomato soup with basil.", Price = 5.99 },
    new MenuItem {MenuCategoryId = 2, Name = "Mozzarella Sticks", Description = "Crispy fried mozzarella with marinara.", Price = 6.49 },
    new MenuItem {MenuCategoryId = 2, Name = "Chicken Wings", Description = "Spicy or BBQ wings served with dip.", Price = 8.99 },
    new MenuItem {MenuCategoryId = 2, Name = "Greek Salad", Description = "Feta cheese, olives, cucumber, and tomatoes.", Price = 7.49 },
            // MAIN COURSES (3)
    new MenuItem {MenuCategoryId = 3, Name = "Grilled Chicken Plate", Description = "Chicken breast with vegetables.", Price = 14.99 },
    new MenuItem {MenuCategoryId = 3, Name = "Beef Steak", Description = "Sirloin steak cooked to preference.", Price = 19.99 },
    new MenuItem {MenuCategoryId = 3, Name = "Salmon Fillet", Description = "Grilled salmon with lemon butter.", Price = 17.49 },
    new MenuItem {MenuCategoryId = 3, Name = "Pasta Alfredo", Description = "Creamy Alfredo sauce with fettuccine.", Price = 12.99 },
    new MenuItem {MenuCategoryId = 3, Name = "Chicken Curry", Description = "Mild curry served with rice.", Price = 13.49 },
    new MenuItem {MenuCategoryId = 3, Name = "Vegetable Stir Fry", Description = "Mixed vegetables with soy glaze.", Price = 11.49 },
    new MenuItem {MenuCategoryId = 3, Name = "BBQ Ribs", Description = "Slow‑cooked ribs with BBQ sauce.", Price = 18.99 },
    new MenuItem {MenuCategoryId = 3, Name = "Shrimp Scampi", Description = "Garlic butter shrimp with pasta.", Price = 16.99 },
    new MenuItem {MenuCategoryId = 3, Name = "Chicken Parmesan", Description = "Breaded chicken with marinara.", Price = 15.49 },
    new MenuItem {MenuCategoryId = 3, Name = "Lamb Chops", Description = "Grilled lamb with herbs.", Price = 21.99 },
    new MenuItem {MenuCategoryId = 3, Name = "Fish & Chips", Description = "Crispy fried fish with fries.", Price = 13.99 },
    new MenuItem {MenuCategoryId = 3, Name = "Beef Lasagna", Description = "Layered pasta with beef and cheese.", Price = 12.49 },
            // DESSERTS (4)
    new MenuItem {MenuCategoryId = 4, Name = "Chocolate Lava Cake", Description = "Molten chocolate center.", Price = 6.49 },
    new MenuItem {MenuCategoryId = 4, Name = "Cheesecake Slice", Description = "Classic creamy cheesecake.", Price = 5.99 },
    new MenuItem {MenuCategoryId = 4, Name = "Ice Cream Bowl", Description = "Three scoops of your choice.", Price = 4.99 },
    new MenuItem {MenuCategoryId = 4, Name = "Apple Pie", Description = "Warm apple pie with cinnamon.", Price = 5.49 },
    new MenuItem {MenuCategoryId = 4, Name = "Tiramisu", Description = "Coffee‑flavored Italian dessert.", Price = 6.99 },
    new MenuItem {MenuCategoryId = 4, Name = "Brownie Sundae", Description = "Brownie topped with ice cream.", Price = 6.49 },
            // BEVERAGES (5)
    new MenuItem {MenuCategoryId = 5, Name = "Fresh Orange Juice", Description = "Freshly squeezed.", Price = 3.99 },
    new MenuItem {MenuCategoryId = 5, Name = "Cappuccino", Description = "Espresso with steamed milk.", Price = 3.49 },
    new MenuItem {MenuCategoryId = 5, Name = "Latte", Description = "Smooth espresso latte.", Price = 3.79 },
    new MenuItem {MenuCategoryId = 5, Name = "Iced Tea", Description = "Chilled black tea with lemon.", Price = 2.99 },
    new MenuItem {MenuCategoryId = 5, Name = "Cola", Description = "Chilled soft drink.", Price = 1.99 },
    new MenuItem {MenuCategoryId = 5, Name = "Mineral Water", Description = "Still or sparkling.", Price = 1.49 },
    new MenuItem {MenuCategoryId = 5, Name = "Hot Chocolate", Description = "Rich cocoa drink.", Price = 3.29 },
            // KIDS MENU (6)
    new MenuItem {MenuCategoryId = 6, Name = "Kids Chicken Nuggets", Description = "Served with fries.", Price = 5.49 },
    new MenuItem {MenuCategoryId = 6, Name = "Mini Pasta Bowl", Description = "Small pasta with tomato sauce.", Price = 4.99 },
    new MenuItem {MenuCategoryId = 6, Name = "Kids Burger", Description = "Small beef burger with cheese.", Price = 5.99 },
    new MenuItem {MenuCategoryId = 6, Name = "Kids Pizza Slice", Description = "Cheese pizza slice.", Price = 4.49 },
            // PIZZAS (7)
    new MenuItem {MenuCategoryId = 7, Name = "Margherita Pizza", Description = "Tomato, mozzarella, basil.", Price = 9.99 },
    new MenuItem {MenuCategoryId = 7, Name = "Pepperoni Pizza", Description = "Pepperoni and cheese.", Price = 11.49 },
    new MenuItem {MenuCategoryId = 7, Name = "BBQ Chicken Pizza", Description = "BBQ sauce, chicken, onions.", Price = 12.49 },
    new MenuItem {MenuCategoryId = 7, Name = "Veggie Pizza", Description = "Peppers, onions, olives.", Price = 10.99 },
    new MenuItem {MenuCategoryId = 7, Name = "Four Cheese Pizza", Description = "Mozzarella, cheddar, parmesan, gorgonzola.", Price = 12.99 },
            // BURGERS (8)
    new MenuItem {MenuCategoryId = 8, Name = "Classic Beef Burger", Description = "Beef patty with cheese.", Price = 10.99 },
    new MenuItem {MenuCategoryId = 8, Name = "Chicken Burger", Description = "Crispy chicken fillet.", Price = 9.49 },
    new MenuItem {MenuCategoryId = 8, Name = "Double Beef Burger", Description = "Two patties, double cheese.", Price = 13.49 },
    new MenuItem {MenuCategoryId = 8, Name = "Veggie Burger", Description = "Plant‑based patty with toppings.", Price = 9.99 },
    new MenuItem {MenuCategoryId = 8, Name = "BBQ Bacon Burger", Description = "Beef, bacon, BBQ sauce.", Price = 12.49 },
    new MenuItem {MenuCategoryId = 8, Name = "Spicy Jalapeño Burger", Description = "Beef patty with jalapeños.", Price = 11.49 },
};
            await context.MenuItems.AddRangeAsync(menuItems);
            await context.Restaurants.AddAsync
            (
                new Restaurant
                {
                    HotelId = 1,
                    Name = "Aurelia Fine Dining",
                    Address = "1st Floor, Main Lobby",
                    OpeningTime = new TimeOnly(7, 0),
                    ClosingTime = new TimeOnly(23, 0)
                }
            );
            var services = new List<Service>
{
    new Service
    {
        Name = "Room Cleaning",
        Description = "Daily housekeeping service including bed making, dusting, and bathroom cleaning.",
        Price = 75.00
    },
    new Service
    {
        Name = "Laundry Service",
        Description = "Professional washing, drying, and folding of guest clothing.",
        Price = 17.50
    },
    new Service
    {
        Name = "Dry Cleaning",
        Description = "Premium dry cleaning for delicate or formal garments.",
        Price = 20.00
    },
    new Service
    {
        Name = "In_Room Dining",
        Description = "Food and beverages delivered directly to the guest's room.",
        Price = 15.00
    },
    new Service
    {
        Name = "Airport Shuttle",
        Description = "Transportation service to and from the airport.",
        Price = 90.00
    },
    new Service
    {
        Name = "Spa Massage",
        Description = "Relaxing full-body massage performed by professional therapists.",
        Price = 60.00
    },
    new Service
    {
        Name = "Sauna Access",
        Description = "Unlimited access to the hotel's sauna facilities.",
        Price = 10.00
    },
    new Service
    {
        Name = "Fitness Center Access",
        Description = "Full access to the gym and fitness equipment.",
        Price = 14.99
    },
    new Service
    {
        Name = "Swimming Pool Access",
        Description = "Use of the indoor or outdoor swimming pool.",
        Price = 14.99
    },
    new Service
    {
        Name = "Breakfast Buffet",
        Description = "Unlimited breakfast buffet with hot and cold dishes.",
        Price = 34.99
    },
    new Service
    {
        Name = "Late Checkout",
        Description = "Extend checkout time until 3 PM.",
        Price = 60.00
    },
    new Service
    {
        Name = "Early CheckIn",
        Description = "Check in as early as 9 AM.",
        Price = 60.00
    },
    new Service
    {
        Name = "City Tour",
        Description = "Guided tour of local attractions and landmarks.",
        Price = 200.00
    },
    new Service
    {
        Name = "Babysitting Service",
        Description = "Professional childcare service available on request.",
        Price = 120.00
    },
    new Service
    {
        Name = "Pet Care",
        Description = "Pet sitting and feeding service for guests traveling with animals.",
        Price = 70.00
    },
    new Service
    {
        Name = "Mini-Bar Refill",
        Description = "Restocking of in-room mini-bar items.",
        Price = 40.00
    },
    new Service
    {
        Name = "Event Hall Booking",
        Description = "Rental of the hotel's event hall for meetings or celebrations.",
        Price = 1200.00
    },
    new Service
    {
        Name = "Breakfast",
        Price = 30,
        Description = "A full journey in a table full of tastes as much as you want to."
    },
    new Service
    {
        Name = "AllMeals",
        Price = 50,
        Description = "You can use both Breakfast and Lunch tables as much as you want to."
    }
    
};
            await context.Services.AddRangeAsync(services);
            await context.SaveChangesAsync();
            var tables = new List<Table>
            {
                new Table {RestaurantId = 1, Status = "Available", Capacity = 2 },
                new Table {RestaurantId = 1, Status = "Available", Capacity = 2 },
                new Table {RestaurantId = 1, Status = "Available", Capacity = 2 },
                new Table {RestaurantId = 1, Status = "Available", Capacity = 2 },
                new Table {RestaurantId = 1, Status = "Available", Capacity = 2 },
                new Table {RestaurantId = 1, Status = "Available", Capacity = 4 },
                new Table {RestaurantId = 1, Status = "Available", Capacity = 4 },
                new Table {RestaurantId = 1, Status = "Available", Capacity = 4 },
                new Table {RestaurantId = 1, Status = "Available", Capacity = 4 },
                new Table {RestaurantId = 1, Status = "Available", Capacity = 4 },
                new Table {RestaurantId = 1, Status = "Available", Capacity = 4 },
                new Table {RestaurantId = 1, Status = "Available", Capacity = 4 },
                new Table {RestaurantId = 1, Status = "Available", Capacity = 4 },
                new Table {RestaurantId = 1, Status = "Available", Capacity = 6 },
                new Table {RestaurantId = 1, Status = "Available", Capacity = 6 },
                new Table {RestaurantId = 1, Status = "Available", Capacity = 6 },
                new Table {RestaurantId = 1, Status = "Available", Capacity = 6 },
                new Table {RestaurantId = 1, Status = "Available", Capacity = 6 },
                new Table {RestaurantId = 1, Status = "Available", Capacity = 8 },
                new Table {RestaurantId = 1, Status = "Available", Capacity = 8 }
            };
            await context.RestaurantTables.AddRangeAsync(tables);
var rooms = new List<Room>
{
 new Room {HotelId = 1, RoomNumber = 101, Floor = 1, RoomTypeId = 1, Status = "Available", Notes = null },
new Room {HotelId = 1, RoomNumber = 102, Floor = 1, RoomTypeId = 1, Status = "Available", Notes = null },
new Room {HotelId = 1, RoomNumber = 103, Floor = 1, RoomTypeId = 1, Status = "Available", Notes = null },
new Room {HotelId = 1, RoomNumber = 104, Floor = 1, RoomTypeId = 1, Status = "Available", Notes = null },
new Room {HotelId = 1, RoomNumber = 105, Floor = 1, RoomTypeId = 1, Status = "Available", Notes = null },
new Room {HotelId = 1, RoomNumber = 201, Floor = 2, RoomTypeId = 1, Status = "Available", Notes = null },
new Room {HotelId = 1, RoomNumber = 202, Floor = 2, RoomTypeId = 1, Status = "Available", Notes = null },
new Room {HotelId = 1, RoomNumber = 203, Floor = 2, RoomTypeId = 1, Status = "Available", Notes = null },
new Room {HotelId = 1, RoomNumber = 204, Floor = 2, RoomTypeId = 1, Status = "Available", Notes = null },
new Room {HotelId = 1, RoomNumber = 205, Floor = 2, RoomTypeId = 1, Status = "Available", Notes = null },
new Room {HotelId = 1, RoomNumber = 301, Floor = 3, RoomTypeId = 2, Status = "Available", Notes = null },
new Room {HotelId = 1, RoomNumber = 302, Floor = 3, RoomTypeId = 2, Status = "Available", Notes = null },
new Room {HotelId = 1, RoomNumber = 303, Floor = 3, RoomTypeId = 2, Status = "Available", Notes = null },
new Room {HotelId = 1, RoomNumber = 304, Floor = 3, RoomTypeId = 2, Status = "Available",  Notes = null },
new Room {HotelId = 1, RoomNumber = 401, Floor = 4, RoomTypeId = 2, Status = "Available", Notes = null },
new Room {HotelId = 1, RoomNumber = 402, Floor = 4, RoomTypeId = 2, Status = "Available", Notes = null },
new Room {HotelId = 1, RoomNumber = 403, Floor = 4, RoomTypeId = 2, Status = "Available", Notes = null },
new Room {HotelId = 1, RoomNumber = 404, Floor = 4, RoomTypeId = 2, Status = "Available", Notes = null },
new Room {HotelId = 1, RoomNumber = 501, Floor = 5, RoomTypeId = 3, Status = "Available", Notes = null },
new Room {HotelId = 1, RoomNumber = 502, Floor = 5, RoomTypeId = 3, Status = "Available", Notes = null },
new Room {HotelId = 1, RoomNumber = 503, Floor = 5, RoomTypeId = 3, Status = "Available", Notes = null },
new Room {HotelId = 1, RoomNumber = 601, Floor = 6, RoomTypeId = 3, Status = "Available", Notes = null },
new Room {HotelId = 1, RoomNumber = 602, Floor = 6, RoomTypeId = 3, Status = "Available", Notes = null },
new Room {HotelId = 1, RoomNumber = 603, Floor = 6, RoomTypeId = 3, Status = "Available", Notes = null },
new Room {HotelId = 1, RoomNumber = 701, Floor = 7, RoomTypeId = 4, Status = "Available", Notes = null },
new Room {HotelId = 1, RoomNumber = 702, Floor = 7, RoomTypeId = 4, Status = "Available", Notes = null },
new Room {HotelId = 1, RoomNumber = 703, Floor = 7, RoomTypeId = 4, Status = "Available", Notes = null },
new Room {HotelId = 1, RoomNumber = 704, Floor = 7, RoomTypeId = 4, Status = "Available", Notes = null },
new Room {HotelId = 1, RoomNumber = 801, Floor = 8, RoomTypeId = 5, Status = "Available", Notes = null },
new Room {HotelId = 1, RoomNumber = 802, Floor = 8, RoomTypeId = 5, Status = "Available", Notes = null },
new Room {HotelId = 1, RoomNumber = 901, Floor = 9, RoomTypeId = 6, Status = "Available", Notes = null } 
};
            await context.Rooms.AddRangeAsync(rooms);
            var amenities = new List<Amenity>
            {
                new Amenity {Name = "Free Wi-Fi" },
                new Amenity {Name = "Air Conditioning" },
                new Amenity {Name = "Mini Bar" },
                new Amenity {Name = "Flat Screen TV" },
                new Amenity {Name = "Jacuzzi" },
                new Amenity {Name = "Balcony with View" }
            };
            await context.Amenities.AddRangeAsync(amenities);
            await context.SaveChangesAsync();
            var roomAmenities = new List<RoomAmenities>
            {
                new RoomAmenities { RoomTypeId = 1, AmenityId = 1 },
                new RoomAmenities { RoomTypeId = 1, AmenityId = 4 },
                new RoomAmenities { RoomTypeId = 1, AmenityId = 2 },
                new RoomAmenities { RoomTypeId = 1, AmenityId = 3 },
                
                new RoomAmenities { RoomTypeId = 2, AmenityId = 1 },
                new RoomAmenities { RoomTypeId = 2, AmenityId = 4 },
                new RoomAmenities { RoomTypeId = 2, AmenityId = 2 },
                new RoomAmenities { RoomTypeId = 2, AmenityId = 3 },
                
                new RoomAmenities { RoomTypeId = 3, AmenityId = 1 },
                new RoomAmenities { RoomTypeId = 3, AmenityId = 4 },
                new RoomAmenities { RoomTypeId = 3, AmenityId = 2 },
                new RoomAmenities { RoomTypeId = 3, AmenityId = 3 },
                
                new RoomAmenities { RoomTypeId = 4, AmenityId = 1 },
                new RoomAmenities { RoomTypeId = 4, AmenityId = 2 },
                new RoomAmenities { RoomTypeId = 4, AmenityId = 3 },
                new RoomAmenities { RoomTypeId = 4, AmenityId = 4 },
                new RoomAmenities { RoomTypeId = 4, AmenityId = 5 },
                
                new RoomAmenities { RoomTypeId = 5, AmenityId = 1 },
                new RoomAmenities { RoomTypeId = 5, AmenityId = 2 },
                new RoomAmenities { RoomTypeId = 5, AmenityId = 3 },
                new RoomAmenities { RoomTypeId = 5, AmenityId = 4 },
                new RoomAmenities { RoomTypeId = 5, AmenityId = 6 },

                new RoomAmenities { RoomTypeId = 6, AmenityId = 1 },
                new RoomAmenities { RoomTypeId = 6, AmenityId = 2 },
                new RoomAmenities { RoomTypeId = 6, AmenityId = 3 },
                new RoomAmenities { RoomTypeId = 6, AmenityId = 4 },
                new RoomAmenities { RoomTypeId = 6, AmenityId = 5 },
                new RoomAmenities { RoomTypeId = 6, AmenityId = 6 }
            };
            await context.RoomAmenities.AddRangeAsync(roomAmenities); 
var shifts = new List<Shift>
{
    new Shift {Day = "Monday", StartTime = new TimeOnly(0, 0), EndTime = new TimeOnly(8, 0) },
    new Shift {Day = "Monday", StartTime = new TimeOnly(8, 0), EndTime = new TimeOnly(16, 0) },
    new Shift {Day = "Monday", StartTime = new TimeOnly(16, 0), EndTime = new TimeOnly(23, 59) },

    new Shift {Day = "Tuesday", StartTime = new TimeOnly(0, 0), EndTime = new TimeOnly(8, 0) },
    new Shift {Day = "Tuesday", StartTime = new TimeOnly(8, 0), EndTime = new TimeOnly(16, 0) },
    new Shift {Day = "Tuesday", StartTime = new TimeOnly(16, 0), EndTime = new TimeOnly(23, 59) },

    new Shift {Day = "Wednesday", StartTime = new TimeOnly(0, 0), EndTime = new TimeOnly(8, 0) },
    new Shift {Day = "Wednesday", StartTime = new TimeOnly(8, 0), EndTime = new TimeOnly(16, 0) },
    new Shift {Day = "Wednesday", StartTime = new TimeOnly(16, 0), EndTime = new TimeOnly(23, 59) },

    new Shift {Day = "Thursday", StartTime = new TimeOnly(0, 0), EndTime = new TimeOnly(8, 0) },
    new Shift {Day = "Thursday", StartTime = new TimeOnly(8, 0), EndTime = new TimeOnly(16, 0) },
    new Shift {Day = "Thursday", StartTime = new TimeOnly(16, 0), EndTime = new TimeOnly(23, 59) },

    new Shift {Day = "Friday", StartTime = new TimeOnly(0, 0), EndTime = new TimeOnly(8, 0) },
    new Shift {Day = "Friday", StartTime = new TimeOnly(8, 0), EndTime = new TimeOnly(16, 0) },
    new Shift {Day = "Friday", StartTime = new TimeOnly(16, 0), EndTime = new TimeOnly(23, 59) },

    new Shift {Day = "Saturday", StartTime = new TimeOnly(0, 0), EndTime = new TimeOnly(8, 0) },
    new Shift {Day = "Saturday", StartTime = new TimeOnly(8, 0), EndTime = new TimeOnly(16, 0) },
    new Shift {Day = "Saturday", StartTime = new TimeOnly(16, 0), EndTime = new TimeOnly(23, 59) },

    new Shift {Day = "Sunday", StartTime = new TimeOnly(0, 0), EndTime = new TimeOnly(8, 0) },
    new Shift {Day = "Sunday", StartTime = new TimeOnly(8, 0), EndTime = new TimeOnly(16, 0) },
    new Shift {Day = "Sunday", StartTime = new TimeOnly(16, 0), EndTime = new TimeOnly(23, 59) }
};
            await context.Shifts.AddRangeAsync(shifts);
            await context.SaveChangesAsync();
        }
    }
}