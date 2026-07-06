import { Outlet } from "react-router-dom"
import AdminSidebar from "../components/AdminSidebar"

export default function AdminLayout() {

    return (

        <div className="min-h-screen bg-gray-100">

            <AdminSidebar />

            <div className="pt-6 px-8">

                <Outlet />

            </div>

        </div>

    )

}