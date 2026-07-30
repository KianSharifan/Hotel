import { Outlet } from "react-router-dom";
import { Sidebar} from "../components/AdminSidebar";
import type { SidebarNavItem } from "../components/AdminSidebar";


const hotelManagerNavItems: SidebarNavItem[] = [
    { label: "Hotel Settings", path: "/dashboard/hotel-management/hotel-settings" },
    { label: "Departments", path: "/dashboard/hotel-management/departments" },
    { label: "Employees", path: "/dashboard/hotel-management/create-employees" },
];

export default function HotelManagerLayout() {
    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar title="Hotel Manager" items={hotelManagerNavItems} />
            <main className="flex-1 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
}
