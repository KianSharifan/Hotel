import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import Home from "./pages/home"
import Rooms from "./pages/rooms"
import Navbar from "./components/navbar"
import Restaurant from "./pages/Restaurant"
import Spa from "./pages/Spa"
import Gym from "./pages/Gym"
import Golf from "./pages/Golf"
import Pool from "./pages/Pool"
import PrivateBeach from "./pages/PrivateBeach"
import Reservation from "./pages/Reservation"
import RestaurantReservation from "./pages/RestaurantReserve"
import GuestsPage from "./pages/GuestsPage"
import DatesPage from "./pages/DatesPage"
import BookingRooms from "./pages/BookingRooms"
import PaymentPage from "./pages/PaymentPage"
import { BookingProvider } from "./context/BookingContext"
import Menu from "./pages/Menu"
import Login from "./pages/Login"
import { AuthProvider } from "./context/AuthContext"
import Register from "./pages/Register"
import EmployeeRegister from "./pages/EmployeeRegister"
import RestaurantOrders from "./pages/ControlPanel/Restaurant/RestaurantOrders"
import RestaurantMenu from "./pages/ControlPanel/Restaurant/RestaurantMenu"
import AdminLayout from "./layouts/AdminLayout"
import OrdersHistory from "./pages/ControlPanel/Restaurant/OrdersHistory"
import Staff from "./pages/ControlPanel/Restaurant/RestaurantEmployees"
import CheckIn from "./pages/ControlPanel/FrontDeskManager/CheckIn"
import CheckOut from "./pages/ControlPanel/FrontDeskManager/CheckOut"
import HousekeepingManager from "./pages/ControlPanel/HouseKeeping/hkManager"
import HousekeeperTasks from "./pages/ControlPanel/HouseKeeping/housekeeper"
import HRManagement from "./pages/ControlPanel/Hr"
import MaintenanceManager from "./pages/ControlPanel/Maintenance/MaintenanceManager"
import EngineerMaintenance from "./pages/ControlPanel/Maintenance/EngineerMaintenance"
import Finance from "./pages/ControlPanel/Finance"
import Services from "./pages/ControlPanel/Services"




const HIDDEN_NAVBAR_PATHS = [
  "/reservation/guests",
  "/reservation/dates",
  "/reservation/rooms",
  "/reservation/payment",
  "/login",
  "/register",
  "/admin/restaurant-panel",
  "/admin/restaurant-panel/menu-panel",
  "/employeeRegister",
  "/employee/frontdesk-manager/checkin",
  "/employee/frontdesk-manager/checkout",
  "/employee/houseKeeping/manager",
  "/employee/houseKeeping/housekeeper",
  "/employee/HrManagement",
  "/employee/maintenance/maintenanceManager",
  "/employee/maintenance/engineerMaintenance",
  "/employee/finance",
  "/employee/services"
]

function AppInner() {
  const location = useLocation()
  const hideNavbar = HIDDEN_NAVBAR_PATHS.some((p) => location.pathname.startsWith(p))

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/restaurant" element={<Restaurant />} />
        <Route path="/amenities/spa" element={<Spa />} />
        <Route path="/amenities/gym" element={<Gym />} />
        <Route path="/amenities/pool" element={<Pool />} />
        <Route path="/amenities/privatebeach" element={<PrivateBeach />} />
        <Route path="/amenities/golf" element={<Golf />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/restaurant/restaurantReservation" element={<RestaurantReservation />} />
        <Route path="/restaurant/menu" element={<Menu />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/employeeRegister" element={<EmployeeRegister />}/>
        <Route path="/employee/frontdesk-manager/checkin" element={<CheckIn />}/>
        <Route path="/employee/frontdesk-manager/checkout" element={<CheckOut />}/>
        <Route path="/employee/houseKeeping/manager" element={<HousekeepingManager />}/>
        <Route path="/employee/houseKeeping/houseKeeper" element={<HousekeeperTasks />}/>
        <Route path="/employee/HrManagement" element={<HRManagement />}/>
        <Route path="/employee/maintenance/maintenanceManager" element={<MaintenanceManager />}/>
        <Route path="/employee/maintenance/engineerMaintenance" element={<EngineerMaintenance />}/>
        <Route path="/employee/finance" element={<Finance />}/>
        <Route path="/employee/services" element={<Services />}/>
        
        

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="restaurant-panel" element={<RestaurantOrders />}/>
          <Route path="restaurant-panel/menu-panel" element={<RestaurantMenu />}/>
          <Route path="restaurant-panel/orders-history" element={<OrdersHistory />}/>
          <Route path="restaurant-panel/staff" element={<Staff />}/>
        </Route>

        {/*4-step booking flow */}
        <Route path="/reservation/guests" element={<GuestsPage />} />
        <Route path="/reservation/dates" element={<DatesPage />} />
        <Route path="/reservation/rooms" element={<BookingRooms />} />
        <Route path="/reservation/payment" element={<PaymentPage />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <BookingProvider>
          <AppInner />
        </BookingProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
