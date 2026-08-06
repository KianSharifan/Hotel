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
import OrdersHistory from "./pages/ControlPanel/Restaurant/OrdersHistory"
import RestaurantTables from "./pages/ControlPanel/Restaurant/RestaurantTables"
import RestaurantSettings from "./pages/ControlPanel/Restaurant/RestaurantSettings"
import RestaurantReservations from "./pages/ControlPanel/Restaurant/RestaurantReservations"
import CheckIn from "./pages/ControlPanel/FrontDeskManager/CheckIn"
import CheckOut from "./pages/ControlPanel/FrontDeskManager/CheckOut"
import HousekeepingManager from "./pages/ControlPanel/HouseKeeping/hkManager"
import HousekeeperTasks from "./pages/ControlPanel/HouseKeeping/housekeeper"
import HRManagement from "./pages/ControlPanel/Hr"
import MaintenanceManager from "./pages/ControlPanel/Maintenance/MaintenanceManager"
import EngineerMaintenance from "./pages/ControlPanel/Maintenance/EngineerMaintenance"
import Finance from "./pages/ControlPanel/Finance"
import Services from "./pages/ControlPanel/Services"
import Departments from "./pages/ControlPanel/HotelManager/Departments"
import HotelSettings from "./pages/ControlPanel/HotelManager/Hotel"
import RoomsManagement from "./pages/ControlPanel/RoomsManagement"
import DashboardLayout from "./layouts/DashboardLayout"
import UsersManagement from "./pages/ControlPanel/HotelManager/Users"






const HIDDEN_NAVBAR_PATHS = [
  "/reservation/guests",
  "/reservation/dates",
  "/reservation/rooms",
  "/reservation/payment",
  "/login",
  "/register",
  "/dashboard/finance",
  "/dashboard/departments",
  "/dashboard/hotel-settings",
  "/dashboard/create-employees",
  "/dashboard/restaurant/orders",
  "/dashboard/restaurant/orders-history",
  "/dashboard/restaurant/restaurant-settings",
  "/dashboard/restaurant/restaurant-tables",
  "/dashboard/restaurant/restaurant-reservations",
  "/dashboard/restaurant/menu",
  "/dashboard/checkin",
  "/dashboard/checkout",
  "/dashboard/users",
  "/dashboard/services",
  "/dashboard/housekeeping-management",
  "/dashboard/housekeeper",
  "/dashboard/human-resources",
  "/dashboard/maintenance-management",
  "/dashboard/engineer-maintenance",
  "/dashboard/rooms-management"
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

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="checkin" element={<CheckIn />} />
          <Route path="checkout" element={<CheckOut />} />
          <Route path="housekeeping-management" element={<HousekeepingManager />} />
          <Route path="housekeeper" element={<HousekeeperTasks />} />
          <Route path="human-resources" element={<HRManagement />} />
          <Route path="maintenance-management" element={<MaintenanceManager />} />
          <Route path="engineer-maintenance" element={<EngineerMaintenance />} />
          <Route path="finance" element={<Finance />} />
          <Route path="rooms-management" element={<RoomsManagement />} />
          <Route path="services" element={<Services />} />
          <Route path="create-employees" element={<EmployeeRegister />} />
          <Route path="hotel-settings" element={<HotelSettings />} />
          <Route path="departments" element={<Departments />} />
          <Route path="restaurant/orders" element={<RestaurantOrders />} />
          <Route path="restaurant/menu" element={<RestaurantMenu />} />
          <Route path="restaurant/orders-history" element={<OrdersHistory />} />
          <Route path="restaurant/restaurant-settings" element={<RestaurantSettings />} />
          <Route path="restaurant/restaurant-tables" element={<RestaurantTables />} />
          <Route path="restaurant/restaurant-reservations" element={<RestaurantReservations />} />
          <Route path="users" element={<UsersManagement />} />
          
          
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
