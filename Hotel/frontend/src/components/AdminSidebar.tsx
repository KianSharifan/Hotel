import { useState } from "react"
import { Link } from "react-router-dom"

export default function AdminSidebar() {

    const [open, setOpen] = useState(false)

    return (
        <>
            {/* Hamburger */}

            <button
                onClick={() => setOpen(true)}
                className="
                    fixed
                    top-1
                    left-3
                    z-50
                    text-3xl
                    bg-none
                    text-blue-600
                    rounded-lg
                    px-3
                    py-2
                "
            >
                ☰
            </button>

            {/* Dark overlay */}

            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="
                        fixed
                        inset-0
                        bg-black/40
                        z-40
                    "
                />
            )}

            {/* Sidebar */}

            <div
                className={`
                    fixed
                    top-0
                    left-0
                    h-screen
                    w-72
                    bg-blue-700
                    text-white
                    z-50
                    transition-all
                    duration-300
                    ${open ? "translate-x-0" : "-translate-x-full"}
                `}
            >

                <div className="flex justify-between items-center p-6">
                    <h2 className="text-xl font-bold">

                        Manage Restaurant

                    </h2>

                    <button
                        onClick={() => setOpen(false)}
                        className="text-3xl"
                    >
                        ×
                    </button>

                </div>

                <nav className="flex flex-col">
                    <Link
                        to="/admin/restaurant-panel"
                        className="px-6 py-4 hover:bg-blue-800"
                    >
                        Restaurant Orders
                    </Link>

                    <Link
                        to="/admin/restaurant-panel/menu-panel"
                        className="px-6 py-4 hover:bg-blue-800"
                    >
                        Menu
                    </Link>

                    <Link
                        to="/admin/restaurant-panel/staff"
                        className="px-6 py-4 hover:bg-blue-800"
                    >
                        Staff
                    </Link>

                    <Link
                        to="/admin/restaurant-panel/orders-history"
                        className="px-6 py-4 hover:bg-blue-800"
                    >
                        Orders History
                    </Link>
                </nav>
            </div>
        </>
    )
}