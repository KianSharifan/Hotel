using Hotel.Data;
using Hotel.Models;
using Microsoft.EntityFrameworkCore;

namespace Hotel.Seeding;

public class SeedDB
{
    public static void SeedDataBase(IApplicationBuilder app)
    {
        using var scope = app.ApplicationServices.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<AppDBContext>();
        context.Database.Migrate();
        if (!context.Hotels.Any())
        {
            context.Hotels.Add(
                new Models.Hotel
                {
                    Id = 1,
                    Name = "Veloria",
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
                    RoomTypeId = 1,
                    Name = "Standard Room",
                    MaxGuests = 2,
                    Description = "A comfortable room with a queen bed, work desk, and modern bathroom."
                },
                new RoomType
                {
                    RoomTypeId = 2,
                    Name = "Deluxe Room",
                    MaxGuests = 3,
                    Description = "A spacious room featuring a king bed, seating area, and premium décor."
                },
                new RoomType
                {
                    RoomTypeId = 3,
                    Name = "Superior Room",
                    MaxGuests = 2,
                    Description = "An upgraded room offering enhanced bedding, better views, and refined finishes."
                },
                new RoomType
                {
                    RoomTypeId = 4,
                    Name = "Junior Suite",
                    MaxGuests = 3,
                    Description = "A semi‑suite with a lounge area, elegant furnishings, and an expanded bathroom."
                },
                new RoomType
                {
                    RoomTypeId = 5,
                    Name = "Executive Suite",
                    MaxGuests = 3,
                    Description = "A luxury suite with a separate living room, workspace, and upgraded amenities."
                },
                new RoomType
                {
                    RoomTypeId = 6,
                    Name = "Presidential Suite",
                    MaxGuests = 4,
                    Description =
                        "The hotel's signature suite with multiple rooms, premium décor, and exclusive services."
                }
            };
            context.RoomTypes.AddRange(roomTypes);
            var roles = new List<Role>
            {
                new Role
                {
                    RoleId = 1,
                    Name = "Administrator"
                },
                new Role
                {
                    RoleId = 2,
                    Name = "Manager"
                },
                new Role
                {
                    RoleId = 3,
                    Name = "Receptionist"
                },
                new Role
                {
                    RoleId = 4,
                    Name = "Housekeeping"
                },
                new Role
                {
                    RoleId = 5,
                    Name = "Guest"
                },
                new Role
                {
                    RoleId = 6,
                    Name = "Concierge"
                },
                new Role
                {
                RoleId = 7,
                Name = "Waiter"
                },
                new Role
                {
                RoleId = 8,
                Name = "Chef"
                }
            };
            context.Roles.AddRange(roles);
            var departments = new List<Department>
            {
                new Department
                {
                    Id = 1,
                    Name = "Front Office"
                },
                new Department
                {
                    Id = 2,
                    Name = "Housekeeping"
                },
                new Department
                {
                    Id = 3,
                    Name = "Food and Beverage"
                },
                new Department
                {
                    Id = 4,
                    Name = "Maintenance"
                },
                new Department
                {
                    Id = 5,
                    Name = "Security"
                },
                new Department
                {
                    Id = 6,
                    Name = "Human Resources"
                },
                new Department
                {
                    Id = 7,
                    Name = "Finance"
                }
            };
            context.Departments.AddRange(departments);
            var menuCategories = new List<MenuCategory>
            {
                new MenuCategory
                {
                    MenuCategoryId = 1,
                    Name = "Breakfast"
                },
                new MenuCategory
                {
                    MenuCategoryId = 2,
                    Name = "Appetizers"
                },
                new MenuCategory
                {
                    MenuCategoryId = 3,
                    Name = "Main Courses"
                },
                new MenuCategory
                {
                    MenuCategoryId = 4,
                    Name = "Desserts"
                },
                new MenuCategory
                {
                    MenuCategoryId = 5,
                    Name = "Beverages"
                },
                new MenuCategory
                {
                    MenuCategoryId = 6,
                    Name = "Kids Menu"
                },
                new MenuCategory
                {
                    MenuCategoryId = 7,
                    Name = "Pizzas"
                },
                new MenuCategory
                {
                    MenuCategoryId = 8,
                    Name = "Burgers"
                },
            };
            context.MenuCategories.AddRange(menuCategories);
            var menuItems = new List<MenuItem>
            { 
                // BREAKFAST (1)
    new MenuItem { Id = 1, MenuCategoryId = 1, Name = "Classic Omelette", Description = "Three‑egg omelette with cheese and herbs.", Price = 8.99 },
    new MenuItem { Id = 2, MenuCategoryId = 1, Name = "Pancake Stack", Description = "Fluffy pancakes with maple syrup.", Price = 7.49 },
    new MenuItem { Id = 3, MenuCategoryId = 1, Name = "French Toast", Description = "Golden toast with cinnamon and powdered sugar.", Price = 7.99 },
    new MenuItem { Id = 4, MenuCategoryId = 1, Name = "English Breakfast", Description = "Eggs, sausage, beans, toast, and tomatoes.", Price = 11.99 },
    new MenuItem { Id = 5, MenuCategoryId = 1, Name = "Fruit Bowl", Description = "Fresh seasonal fruits.", Price = 5.49 },
    new MenuItem { Id = 6, MenuCategoryId = 1, Name = "Avocado Toast", Description = "Sourdough topped with smashed avocado.", Price = 6.99 },

                // APPETIZERS (2)
    new MenuItem { Id = 7, MenuCategoryId = 2, Name = "Caesar Salad", Description = "Romaine lettuce with parmesan and croutons.", Price = 6.99 },
    new MenuItem { Id = 8, MenuCategoryId = 2, Name = "Garlic Bread", Description = "Toasted baguette with garlic butter.", Price = 4.49 },
    new MenuItem { Id = 9, MenuCategoryId = 2, Name = "Tomato Soup", Description = "Creamy tomato soup with basil.", Price = 5.99 },
    new MenuItem { Id = 10, MenuCategoryId = 2, Name = "Mozzarella Sticks", Description = "Crispy fried mozzarella with marinara.", Price = 6.49 },
    new MenuItem { Id = 11, MenuCategoryId = 2, Name = "Chicken Wings", Description = "Spicy or BBQ wings served with dip.", Price = 8.99 },
    new MenuItem { Id = 12, MenuCategoryId = 2, Name = "Greek Salad", Description = "Feta cheese, olives, cucumber, and tomatoes.", Price = 7.49 },

                // MAIN COURSES (3)
    new MenuItem { Id = 13, MenuCategoryId = 3, Name = "Grilled Chicken Plate", Description = "Chicken breast with vegetables.", Price = 14.99 },
    new MenuItem { Id = 14, MenuCategoryId = 3, Name = "Beef Steak", Description = "Sirloin steak cooked to preference.", Price = 19.99 },
    new MenuItem { Id = 15, MenuCategoryId = 3, Name = "Salmon Fillet", Description = "Grilled salmon with lemon butter.", Price = 17.49 },
    new MenuItem { Id = 16, MenuCategoryId = 3, Name = "Pasta Alfredo", Description = "Creamy Alfredo sauce with fettuccine.", Price = 12.99 },
    new MenuItem { Id = 17, MenuCategoryId = 3, Name = "Chicken Curry", Description = "Mild curry served with rice.", Price = 13.49 },
    new MenuItem { Id = 18, MenuCategoryId = 3, Name = "Vegetable Stir Fry", Description = "Mixed vegetables with soy glaze.", Price = 11.49 },
    new MenuItem { Id = 19, MenuCategoryId = 3, Name = "BBQ Ribs", Description = "Slow‑cooked ribs with BBQ sauce.", Price = 18.99 },
    new MenuItem { Id = 20, MenuCategoryId = 3, Name = "Shrimp Scampi", Description = "Garlic butter shrimp with pasta.", Price = 16.99 },
    new MenuItem { Id = 49, MenuCategoryId = 3, Name = "Chicken Parmesan", Description = "Breaded chicken with marinara.", Price = 15.49 },
    new MenuItem { Id = 50, MenuCategoryId = 3, Name = "Lamb Chops", Description = "Grilled lamb with herbs.", Price = 21.99 },
    new MenuItem { Id = 51, MenuCategoryId = 3, Name = "Fish & Chips", Description = "Crispy fried fish with fries.", Price = 13.99 },
    new MenuItem { Id = 52, MenuCategoryId = 3, Name = "Beef Lasagna", Description = "Layered pasta with beef and cheese.", Price = 12.49 },

                // DESSERTS (4)
    new MenuItem { Id = 21, MenuCategoryId = 4, Name = "Chocolate Lava Cake", Description = "Molten chocolate center.", Price = 6.49 },
    new MenuItem { Id = 22, MenuCategoryId = 4, Name = "Cheesecake Slice", Description = "Classic creamy cheesecake.", Price = 5.99 },
    new MenuItem { Id = 23, MenuCategoryId = 4, Name = "Ice Cream Bowl", Description = "Three scoops of your choice.", Price = 4.99 },
    new MenuItem { Id = 24, MenuCategoryId = 4, Name = "Apple Pie", Description = "Warm apple pie with cinnamon.", Price = 5.49 },
    new MenuItem { Id = 25, MenuCategoryId = 4, Name = "Tiramisu", Description = "Coffee‑flavored Italian dessert.", Price = 6.99 },
    new MenuItem { Id = 26, MenuCategoryId = 4, Name = "Brownie Sundae", Description = "Brownie topped with ice cream.", Price = 6.49 },

            // BEVERAGES (5)
    new MenuItem { Id = 27, MenuCategoryId = 5, Name = "Fresh Orange Juice", Description = "Freshly squeezed.", Price = 3.99 },
    new MenuItem { Id = 28, MenuCategoryId = 5, Name = "Cappuccino", Description = "Espresso with steamed milk.", Price = 3.49 },
    new MenuItem { Id = 29, MenuCategoryId = 5, Name = "Latte", Description = "Smooth espresso latte.", Price = 3.79 },
    new MenuItem { Id = 30, MenuCategoryId = 5, Name = "Iced Tea", Description = "Chilled black tea with lemon.", Price = 2.99 },
    new MenuItem { Id = 31, MenuCategoryId = 5, Name = "Cola", Description = "Chilled soft drink.", Price = 1.99 },
    new MenuItem { Id = 32, MenuCategoryId = 5, Name = "Mineral Water", Description = "Still or sparkling.", Price = 1.49 },
    new MenuItem { Id = 33, MenuCategoryId = 5, Name = "Hot Chocolate", Description = "Rich cocoa drink.", Price = 3.29 },

            // KIDS MENU (6)
    new MenuItem { Id = 34, MenuCategoryId = 6, Name = "Kids Chicken Nuggets", Description = "Served with fries.", Price = 5.49 },
    new MenuItem { Id = 35, MenuCategoryId = 6, Name = "Mini Pasta Bowl", Description = "Small pasta with tomato sauce.", Price = 4.99 },
    new MenuItem { Id = 36, MenuCategoryId = 6, Name = "Kids Burger", Description = "Small beef burger with cheese.", Price = 5.99 },
    new MenuItem { Id = 37, MenuCategoryId = 6, Name = "Kids Pizza Slice", Description = "Cheese pizza slice.", Price = 4.49 },

            // PIZZAS (7)
    new MenuItem { Id = 38, MenuCategoryId = 7, Name = "Margherita Pizza", Description = "Tomato, mozzarella, basil.", Price = 9.99 },
    new MenuItem { Id = 39, MenuCategoryId = 7, Name = "Pepperoni Pizza", Description = "Pepperoni and cheese.", Price = 11.49 },
    new MenuItem { Id = 40, MenuCategoryId = 7, Name = "BBQ Chicken Pizza", Description = "BBQ sauce, chicken, onions.", Price = 12.49 },
    new MenuItem { Id = 41, MenuCategoryId = 7, Name = "Veggie Pizza", Description = "Peppers, onions, olives.", Price = 10.99 },
    new MenuItem { Id = 42, MenuCategoryId = 7, Name = "Four Cheese Pizza", Description = "Mozzarella, cheddar, parmesan, gorgonzola.", Price = 12.99 },

            // BURGERS (8)
    new MenuItem { Id = 43, MenuCategoryId = 8, Name = "Classic Beef Burger", Description = "Beef patty with cheese.", Price = 10.99 },
    new MenuItem { Id = 44, MenuCategoryId = 8, Name = "Chicken Burger", Description = "Crispy chicken fillet.", Price = 9.49 },
    new MenuItem { Id = 45, MenuCategoryId = 8, Name = "Double Beef Burger", Description = "Two patties, double cheese.", Price = 13.49 },
    new MenuItem { Id = 46, MenuCategoryId = 8, Name = "Veggie Burger", Description = "Plant‑based patty with toppings.", Price = 9.99 },
    new MenuItem { Id = 47, MenuCategoryId = 8, Name = "BBQ Bacon Burger", Description = "Beef, bacon, BBQ sauce.", Price = 12.49 },
    new MenuItem { Id = 48, MenuCategoryId = 8, Name = "Spicy Jalapeño Burger", Description = "Beef patty with jalapeños.", Price = 11.49 },
};
            context.MenuItems.AddRange(menuItems);
            context.Restaurants.Add
            (
                new Restaurant
                {
                    Id = 1,
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
        Id = 1,
        Name = "Room Cleaning",
        Description = "Daily housekeeping service including bed making, dusting, and bathroom cleaning.",
        Price = 75.00
    },
    new Service
    {
        Id = 2,
        Name = "Laundry Service",
        Description = "Professional washing, drying, and folding of guest clothing.",
        Price = 17.50
    },
    new Service
    {
        Id = 3,
        Name = "Dry Cleaning",
        Description = "Premium dry cleaning for delicate or formal garments.",
        Price = 20.00
    },
    new Service
    {
        Id = 4,
        Name = "In‑Room Dining",
        Description = "Food and beverages delivered directly to the guest's room.",
        Price = 15.00
    },
    new Service
    {
        Id = 5,
        Name = "Airport Shuttle",
        Description = "Transportation service to and from the airport.",
        Price = 90.00
    },
    new Service
    {
        Id = 6,
        Name = "Spa Massage",
        Description = "Relaxing full‑body massage performed by professional therapists.",
        Price = 60.00
    },
    new Service
    {
        Id = 7,
        Name = "Sauna Access",
        Description = "Unlimited access to the hotel's sauna facilities.",
        Price = 10.00
    },
    new Service
    {
        Id = 8,
        Name = "Fitness Center Access",
        Description = "Full access to the gym and fitness equipment.",
        Price = 14.99
    },
    new Service
    {
        Id = 9,
        Name = "Swimming Pool Access",
        Description = "Use of the indoor or outdoor swimming pool.",
        Price = 14.99
    },
    new Service
    {
        Id = 10,
        Name = "Breakfast Buffet",
        Description = "Unlimited breakfast buffet with hot and cold dishes.",
        Price = 34.99
    },
    new Service
    {
        Id = 11,
        Name = "Late Checkout",
        Description = "Extend checkout time until 3 PM.",
        Price = 60.00
    },
    new Service
    {
        Id = 12,
        Name = "Early Check‑In",
        Description = "Check in as early as 9 AM.",
        Price = 60.00
    },
    new Service
    {
        Id = 13,
        Name = "City Tour",
        Description = "Guided tour of local attractions and landmarks.",
        Price = 200.00
    },
    new Service
    {
        Id = 14,
        Name = "Babysitting Service",
        Description = "Professional childcare service available on request.",
        Price = 120.00
    },
    new Service
    {
        Id = 15,
        Name = "Pet Care",
        Description = "Pet sitting and feeding service for guests traveling with animals.",
        Price = 70.00
    },
    new Service
    {
        Id = 16,
        Name = "Mini‑Bar Refill",
        Description = "Restocking of in‑room mini‑bar items.",
        Price = 40.00
    },
    new Service
    {
        Id = 17,
        Name = "Event Hall Booking",
        Description = "Rental of the hotel's event hall for meetings or celebrations.",
        Price = 1200.00
    }
};
            context.Services.AddRange(services);
            var tables = new List<Table>
            {
                new Table { Id = 1, RestaurantId = 1, Status = "Available", Reserved = false },
                new Table { Id = 2, RestaurantId = 1, Status = "Available", Reserved = false },
                new Table { Id = 3, RestaurantId = 1, Status = "Available", Reserved = false },
                new Table { Id = 4, RestaurantId = 1, Status = "Available", Reserved = false },
                new Table { Id = 5, RestaurantId = 1, Status = "Available", Reserved = false },

                new Table { Id = 6, RestaurantId = 1, Status = "Available", Reserved = false },
                new Table { Id = 7, RestaurantId = 1, Status = "Available", Reserved = false },
                new Table { Id = 8, RestaurantId = 1, Status = "Available", Reserved = false },
                new Table { Id = 9, RestaurantId = 1, Status = "Available", Reserved = false },
                new Table { Id = 10, RestaurantId = 1, Status = "Available", Reserved = false },

                new Table { Id = 11, RestaurantId = 1, Status = "Available", Reserved = false },
                new Table { Id = 12, RestaurantId = 1, Status = "Available", Reserved = false },
                new Table { Id = 13, RestaurantId = 1, Status = "Available", Reserved = false },
                new Table { Id = 14, RestaurantId = 1, Status = "Available", Reserved = false },
                new Table { Id = 15, RestaurantId = 1, Status = "Available", Reserved = false },

                new Table { Id = 16, RestaurantId = 1, Status = "Available", Reserved = false },
                new Table { Id = 17, RestaurantId = 1, Status = "Available", Reserved = false },
                new Table { Id = 18, RestaurantId = 1, Status = "Available", Reserved = false },
                new Table { Id = 19, RestaurantId = 1, Status = "Available", Reserved = false },
                new Table { Id = 20, RestaurantId = 1, Status = "Available", Reserved = false }
            };
            context.RestaurantTables.AddRange(tables);
            var rooms = new List<Room>
            {
                new Room { RoomId = 1, HotelId = 1, RoomNumber = 101, Floor = 1, RoomTypeId = 1, Status = "Available", PricePerNight = 89.99, Notes = null },
                new Room { RoomId = 2, HotelId = 1, RoomNumber = 102, Floor = 1, RoomTypeId = 1, Status = "Available", PricePerNight = 89.99, Notes = null },
                new Room { RoomId = 3, HotelId = 1, RoomNumber = 103, Floor = 1, RoomTypeId = 1, Status = "Available", PricePerNight = 89.99, Notes = null },
                new Room { RoomId = 4, HotelId = 1, RoomNumber = 104, Floor = 1, RoomTypeId = 1, Status = "Available", PricePerNight = 89.99, Notes = null },
                new Room { RoomId = 5, HotelId = 1, RoomNumber = 105, Floor = 1, RoomTypeId = 1, Status = "Available", PricePerNight = 89.99, Notes = null },
                new Room { RoomId = 6, HotelId = 1, RoomNumber = 201, Floor = 2, RoomTypeId = 1, Status = "Available", PricePerNight = 92.99, Notes = null },
                new Room { RoomId = 7, HotelId = 1, RoomNumber = 202, Floor = 2, RoomTypeId = 1, Status = "Available", PricePerNight = 92.99, Notes = null },
                new Room { RoomId = 8, HotelId = 1, RoomNumber = 203, Floor = 2, RoomTypeId = 1, Status = "Available", PricePerNight = 92.99, Notes = null },
                new Room { RoomId = 9, HotelId = 1, RoomNumber = 204, Floor = 2, RoomTypeId = 1, Status = "Available", PricePerNight = 92.99, Notes = null },
                new Room { RoomId = 10, HotelId = 1, RoomNumber = 205, Floor = 2, RoomTypeId = 1, Status = "Available", PricePerNight = 92.99, Notes = null },
                new Room { RoomId = 11, HotelId = 1, RoomNumber = 301, Floor = 3, RoomTypeId = 2, Status = "Available", PricePerNight = 119.99, Notes = null },
                new Room { RoomId = 12, HotelId = 1, RoomNumber = 302, Floor = 3, RoomTypeId = 2, Status = "Available", PricePerNight = 119.99, Notes = null },
                new Room { RoomId = 13, HotelId = 1, RoomNumber = 303, Floor = 3, RoomTypeId = 2, Status = "Available", PricePerNight = 119.99, Notes = null },
                new Room { RoomId = 14, HotelId = 1, RoomNumber = 304, Floor = 3, RoomTypeId = 2, Status = "Available", PricePerNight = 119.99, Notes = null },
                new Room { RoomId = 15, HotelId = 1, RoomNumber = 401, Floor = 4, RoomTypeId = 2, Status = "Available", PricePerNight = 129.99, Notes = null },
                new Room { RoomId = 16, HotelId = 1, RoomNumber = 402, Floor = 4, RoomTypeId = 2, Status = "Available", PricePerNight = 129.99, Notes = null },
                new Room { RoomId = 17, HotelId = 1, RoomNumber = 403, Floor = 4, RoomTypeId = 2, Status = "Available", PricePerNight = 129.99, Notes = null },
                new Room { RoomId = 18, HotelId = 1, RoomNumber = 404, Floor = 4, RoomTypeId = 2, Status = "Available", PricePerNight = 129.99, Notes = null },
                new Room { RoomId = 19, HotelId = 1, RoomNumber = 501, Floor = 5, RoomTypeId = 3, Status = "Available", PricePerNight = 149.99, Notes = null },
                new Room { RoomId = 20, HotelId = 1, RoomNumber = 502, Floor = 5, RoomTypeId = 3, Status = "Available", PricePerNight = 149.99, Notes = null },
                new Room { RoomId = 21, HotelId = 1, RoomNumber = 503, Floor = 5, RoomTypeId = 3, Status = "Available", PricePerNight = 149.99, Notes = null },
                new Room { RoomId = 22, HotelId = 1, RoomNumber = 601, Floor = 6, RoomTypeId = 3, Status = "Available", PricePerNight = 159.99, Notes = null },
                new Room { RoomId = 23, HotelId = 1, RoomNumber = 602, Floor = 6, RoomTypeId = 3, Status = "Available", PricePerNight = 159.99, Notes = null },
                new Room { RoomId = 24, HotelId = 1, RoomNumber = 603, Floor = 6, RoomTypeId = 3, Status = "Available", PricePerNight = 159.99, Notes = null },
                new Room { RoomId = 25, HotelId = 1, RoomNumber = 701, Floor = 7, RoomTypeId = 4, Status = "Available", PricePerNight = 189.99, Notes = null },
                new Room { RoomId = 26, HotelId = 1, RoomNumber = 702, Floor = 7, RoomTypeId = 4, Status = "Available", PricePerNight = 189.99, Notes = null },
                new Room { RoomId = 27, HotelId = 1, RoomNumber = 703, Floor = 7, RoomTypeId = 4, Status = "Available", PricePerNight = 189.99, Notes = null },
                new Room { RoomId = 28, HotelId = 1, RoomNumber = 704, Floor = 7, RoomTypeId = 4, Status = "Available", PricePerNight = 189.99, Notes = null },
                new Room { RoomId = 29, HotelId = 1, RoomNumber = 801, Floor = 8, RoomTypeId = 5, Status = "Available", PricePerNight = 249.99, Notes = null },
                new Room { RoomId = 30, HotelId = 1, RoomNumber = 802, Floor = 8, RoomTypeId = 5, Status = "Available", PricePerNight = 249.99, Notes = null },
                new Room { RoomId = 31, HotelId = 1, RoomNumber = 901, Floor = 9, RoomTypeId = 6, Status = "Available", PricePerNight = 499.99, Notes = null }
            };
            context.Rooms.AddRange(rooms);
            context.SaveChanges();
        }
        
    }
}