import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/home"
import Rooms from "./pages/rooms"
import Navbar from "./components/navbar"
import Restaurant from "./pages/Restaurant"
import Spa from "./pages/Spa"
import Golf from "./pages/Golf"
import Pool from "./pages/Pool"
import Reservation from "./pages/Reservation"
import BookingResults from "./pages/BookingResults"
import RestaurantReservation from "./pages/RestaurantReserve"




function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/restaurant" element={<Restaurant />} />
        <Route path="/amenities/spa" element={<Spa />} />
        <Route path="/amenities/pool" element={<Pool />} />
        <Route path="/amenities/golf" element={<Golf />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/reservation/booking-results" element={<BookingResults />} />
        <Route path="/restaurant/restaurantReservation" element={<RestaurantReservation />} />

      </Routes>

    </BrowserRouter>
  )
}

export default App