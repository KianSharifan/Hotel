import type { SidebarNavItem } from "../components/AdminSidebar";

export interface SidebarRoleConfig {
    title: string;
    items: SidebarNavItem[];
}

export const sidebarConfig: Record<string, SidebarRoleConfig> = {
    HotelManager: {
        title: "Hotel Manager",
        items: [
            { label: "Departments", path: "/dashboard/hotel-management/departments" },
            { label: "Hotel Settings", path: "/dashboard/hotel-management/hotel-settings" },
            { label: "Create Employees", path: "/dashboard/create-employees" },
            { label: "Housekeeping", path: "/dashboard/housekeeping-management" },
            { label: "Maintenance", path: "/dashboard/maintenance-management" },
            { label: "Rooms", path: "/dashboard/rooms-management" },
            { label: "HR", path: "/dashboard/human-resources" },
            { label: "Finance", path: "/dashboard/finance" },
            { label: "Restaurant", path: "/dashboard/restaurant/orders" },
            { label: "Services", path: "/dashboard/services" },
        ],
    },

    DirectorOfHR: {
        title: "Director of HR",
        items: [
            { label: "HR", path: "/dashboard/human-resources" },
            { label: "Create Employees", path: "/dashboard/create-employees" },
        ],
    },

    DirectorOfRooms: {
        title: "Director of Rooms",
        items: [
            { label: "Rooms", path: "/dashboard/rooms-management" },
            { label: "Maintenance", path: "/dashboard/maintenance-management" },
        ],
    },

    FrontOfficeManager: {
        title: "Front Office",
        items: [
            { label: "Check In", path: "/dashboard/checkin" },
            { label: "Check Out", path: "/dashboard/checkout" },
            { label: "Services", path: "/dashboard/services" },
            { label: "Housekeeping", path: "/dashboard/housekeeping-management" },
            { label: "Finance", path: "/dashboard/finance" },
            { label: "Maintenance", path: "/dashboard/maintenance-management" },
            { label: "Rooms", path: "/dashboard/rooms-management" },
        ],
    },

    Housekeeper: {
        title: "Housekeeper",
        items: [
            { label: "My Tasks", path: "/dashboard/housekeeper" },
            { label: "Housekeeping", path: "/dashboard/housekeeping-management" },
        ],
    },


    Engineer: {
        title: "Engineer",
        items: [
            { label: "My Tasks", path: "/dashboard/engineer-maintenance" },
            { label: "Maintenance", path: "/dashboard/maintenance-management" },
        ],
    },

    RestaurantManager: {
        title: "Restaurant",
        items: [
            { label: "Orders", path: "/dashboard/restaurant/orders" },
            { label: "Menu", path: "/dashboard/restaurant/menu" },
            { label: "Order History", path: "/dashboard/restaurant/orders-history" },
            { label: "restaurant-settings", path: "/dashboard/restaurant-settings" },
            { label: "Finance", path: "/dashboard/finance" },
        ],
    },

    Chef: {
        title: "Restaurant",
        items: [
            { label: "Orders", path: "/dashboard/restaurant/orders" },
            { label: "Menu", path: "/dashboard/restaurant/menu" },
            { label: "Order History", path: "/dashboard/restaurant/orders-history" }
        ],
    },

    Waiter: {
        title: "Restaurant",
        items: [
            { label: "Orders", path: "/dashboard/restaurant/orders" },
            { label: "Order History", path: "/dashboard/restaurant/orders-history" }
        ],
    },

    DirectorOfFinance: {
        title: "Finance",
        items: [
            { label: "Finance", path: "/dashboard/finance" },
            { label: "Check Out", path: "/dashboard/checkout" },
        ],
    },
};