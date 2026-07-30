import { Outlet } from "react-router-dom";
import { Sidebar} from "../components/AdminSidebar";
import type { SidebarNavItem } from "../components/AdminSidebar";


const houseKeepingNavItems: SidebarNavItem[] = [
    { label: "Manager", path: "/dashboard/housekeeping/manager" },
    { label: "House keeper", path: "/dashboard/housekeeping/housekeeper" }
];

export default function houseKeepingLayout() {
    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar title="House Keeping" items={houseKeepingNavItems} />
            <main className="flex-1 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
}
