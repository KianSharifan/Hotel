import { Link } from "react-router-dom"

function Navbar() {
    return(
        <div className="bg-black text-white p-4 flex gap-6">
            <Link to="/">Home</Link>
            <Link to="/rooms">Rooms</Link>
        </div>
    )
}

export default Navbar;