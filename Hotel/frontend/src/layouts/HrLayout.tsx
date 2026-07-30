import { Outlet } from "react-router-dom";
import { Sidebar} from "../components/AdminSidebar";
import type { SidebarNavItem } from "../components/AdminSidebar";


const HumanResourcesNavItems: SidebarNavItem[] = [
    { label: "Directoring", path: "/dashboard/human-resources/director" },
    { label: "Employees", path: "/dashboard/human-resources/create-employees" },
    // { label: "maintenance", path: "/dashboard/human-resources/maintenance/manager" },
    // { label: "housekeeping", path: "/dashboard/human-resources/housekeeping/manager" },
];

export default function HumanResourcesLayout() {
    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar title="Human Resources" items={HumanResourcesNavItems} />
            <main className="flex-1 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
}
