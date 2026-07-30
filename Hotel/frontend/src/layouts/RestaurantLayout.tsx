import { Outlet } from "react-router-dom";
import { Sidebar} from "../components/AdminSidebar";
import type { SidebarNavItem } from "../components/AdminSidebar";

const restaurantManagerNavItems: SidebarNavItem[] = [
    { label: "Orders", path: "/dashboard/restaurant/orders" },
    { label: "Menu", path: "/dashboard/restaurant/menu"},
    { label: "Orders History", path: "/dashboard/restaurant/orders-history" },
    { label: "Staff", path: "/dashboard/restaurant/staff" },
];

export default function RestaurantManagerLayout() {
    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar title="Restaurant Manager" items={restaurantManagerNavItems} />
            <main className="flex-1 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
}
