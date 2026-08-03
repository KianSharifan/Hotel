const roleRoutes: Record<string, string> = {
    Guest: "/",

    HotelManager: "/dashboard/hotel-settings",

    DirectorOfHR: "/dashboard/human-resources",

    FrontOfficeManager: "/dashboard/checkin",

    Housekeeper: "/dashboard/housekeeper",

    RestaurantManager: "/dashboard/restaurant/orders-history",

    Chef: "/dashboard/restaurant/menu",

    Waiter: "/dashboard/restaurant/orders",

    Engineer: "/dashboard/engineer-maintenance",

    MaintenanceEngineer: "/dashboard/maintenance-management",

    DirectorOfFinance: "/dashboard/finance",

    DirectorOfRooms: "/dashboard/rooms-management"
};

export default roleRoutes;