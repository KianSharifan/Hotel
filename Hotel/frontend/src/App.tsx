import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/home"
import Rooms from "./pages/rooms"
import Navbar from "./components/navbar"

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/rooms" element={<Rooms />} />

      </Routes>

    </BrowserRouter>
  )
}

export default App