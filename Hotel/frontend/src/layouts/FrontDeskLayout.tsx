import { Outlet } from "react-router-dom";
import { Sidebar} from "../components/AdminSidebar";
import type { SidebarNavItem } from "../components/AdminSidebar";


const fdManagerNavItems: SidebarNavItem[] = [
    { label: "Check In", path: "/dashboard/frontdesk/checkin" },
    { label: "Check Out", path: "/dashboard/frontdesk/checkout" },
    { label: "Services", path: "/dashboard/frontdesk/services" }, 
];

export default function fdManagerLayout() {
    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar title="FrontDesk Manager" items={fdManagerNavItems} />
            <main className="flex-1 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
}
