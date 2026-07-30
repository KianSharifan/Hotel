// src/utils/roleRoutes.ts

const roleRoutes: Record<string, string> = {
    Guest: "/",

    HotelManager: "/dashboard/hotel-management/hotel-settings",

    DirectorOfHR: "/dashboard/human-resources/director",

    FrontOfficeManager: "/dashboard/frontdesk/checkin",

    HouseKeeper: "/dashboard/housekeeping/housekeeper",

    RestaurantManager: "/dashboard/restaurant/orders-history",

    Chef: "/dashboard/restaurant/menu",

    Waiter: "/dashboard/restaurant/orders",

    Engineer: "/dashboard/maintenance/engineers",

    MaintenanceEngineer: "/dashboard/maintenance/engineers",

    DirectorOfFinance: "/dashboard/finance",

    DirectorOfRooms: "/dashboard/rooms"
};

export default roleRoutes;