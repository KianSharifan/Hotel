import { Outlet } from "react-router-dom";
import { Sidebar} from "../components/AdminSidebar";
import type { SidebarNavItem } from "../components/AdminSidebar";


const maintenanceNavItems: SidebarNavItem[] = [
    { label: "Manager", path: "/dashboard/maintenance/manager" },
    { label: "Engineers", path: "/dashboard/maintenance/engineers" }
];

export default function HumanResourcesLayout() {
    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar title="Maintenance" items={maintenanceNavItems} />
            <main className="flex-1 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
}
