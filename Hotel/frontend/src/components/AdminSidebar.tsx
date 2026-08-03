import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { sidebarConfig } from "../utils/sidebarConfig";

export interface SidebarNavItem {
    label: string;
    path: string;
}

export function Sidebar() {

    const { user, logout, loading } = useAuth();
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = useState(false);

    if (loading) {
        return null;
    }

    if (!user) {
        return null;
    }

    const config = sidebarConfig[user.role];

    if (!config) {
        return <div>Unknown role.</div>;
    }

    function handleLogout() {
        logout();
        navigate("/");
    }

    const linkBaseClasses =
        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors";
    const linkInactiveClasses = "text-slate-600 hover:bg-slate-100 hover:text-slate-900";
    const linkActiveClasses = "bg-slate-900 text-white";

    const sidebarContent = (
        <div className="flex h-full flex-col bg-white text-slate-900">
            <div className="border-b border-slate-200 px-5 py-6">
                <p className="text-xs uppercase tracking-[4px] text-slate-400">
                    Noire Palace
                </p>
                <h2 className="mt-1 text-lg font-semibold text-slate-900">{config.title}</h2>
                {user?.username && (
                    <p className="mt-1 text-xs text-slate-500">Signed in as {user.username}</p>
                )}
            </div>

            <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
                {config.items.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={() => setMobileOpen(false)}
                        className={({ isActive }) =>
                            `${linkBaseClasses} ${isActive ? linkActiveClasses : linkInactiveClasses}`
                        }
                    >
                        {/* {item.icon && <span className="text-base">{item.icon}</span>} */}
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="border-t border-slate-200 p-3">
                <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                >
                    <span>🚪</span>
                    <span>Log out</span>
                </button>
            </div>
        </div>
    );

    return (
        <>
            {/* Mobile top bar */}
            <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 text-slate-900 md:hidden">
                <span className="text-sm font-semibold">{config.title}</span>
                <button
                    type="button"
                    onClick={() => setMobileOpen(true)}
                    aria-label="Open menu"
                    className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
                >
                    ☰
                </button>
            </div>

            {/* Mobile overlay + drawer */}
            {mobileOpen && (
                <div className="fixed inset-0 z-50 md:hidden">
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setMobileOpen(false)}
                    />
                    <div className="absolute inset-y-0 left-0 w-64 shadow-xl">
                        <div className="flex justify-end border-b border-slate-200 bg-white p-2">
                            <button
                                type="button"
                                onClick={() => setMobileOpen(false)}
                                aria-label="Close menu"
                                className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="h-[calc(100%-3rem)]">{sidebarContent}</div>
                    </div>
                </div>
            )}

            {/* Desktop sidebar */}
            <aside className="hidden w-64 shrink-0 border-r border-slate-200 md:block">
                {sidebarContent}
            </aside>
        </>
    );
}
