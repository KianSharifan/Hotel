import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/home"
import Rooms from "./pages/rooms"
import Navbar from "./components/navbar"
import Restaurant from "./pages/Restaurant"
import Spa from "./pages/Spa"
import Golf from "./pages/Golf"
import Pool from "./pages/Pool"




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

      </Routes>

    </BrowserRouter>
  )
}

export default App