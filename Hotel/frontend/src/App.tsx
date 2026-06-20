// import { BrowserRouter, Routes, Route } from "react-router-dom"
// import Home from "./pages/home"
// import Rooms from "./pages/rooms"
// import Navbar from "./components/navbar"
// import Restaurant from "./pages/Restaurant"
// import Spa from "./pages/Spa"
// import Golf from "./pages/Golf"
// import Pool from "./pages/Pool"
// import Reservation from "./pages/Reservation"
// import BookingResults from "./pages/BookingResults"
// import RestaurantReservation from "./pages/RestaurantReserve"




// function App() {
//   return (
//     <BrowserRouter>

//       <Navbar />

//       <Routes>

//         <Route path="/" element={<Home />} />
//         <Route path="/rooms" element={<Rooms />} />
//         <Route path="/restaurant" element={<Restaurant />} />
//         <Route path="/amenities/spa" element={<Spa />} />
//         <Route path="/amenities/pool" element={<Pool />} />
//         <Route path="/amenities/golf" element={<Golf />} />
//         <Route path="/reservation" element={<Reservation />} />
//         <Route path="/reservation/booking-results" element={<BookingResults />} />
//         <Route path="/restaurant/restaurantReservation" element={<RestaurantReservation />} />

//       </Routes>

//     </BrowserRouter>
//   )
// }

// export default App


import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import Home from "./pages/home"
import Rooms from "./pages/rooms"
import Navbar from "./components/navbar"
import Restaurant from "./pages/Restaurant"
import Spa from "./pages/Spa"
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



const HIDDEN_NAVBAR_PATHS = [
  "/reservation/guests",
  "/reservation/dates",
  "/reservation/rooms",
  "/reservation/payment",
  "/login",
  "/register",
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
        <Route path="/amenities/pool" element={<Pool />} />
        <Route path="/amenities/privatebeach" element={<PrivateBeach />} />
        <Route path="/amenities/golf" element={<Golf />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/restaurant/restaurantReservation" element={<RestaurantReservation />} />
        <Route path="/restaurant/menu" element={<Menu />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        

        {/* New 4-step booking flow */}
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
