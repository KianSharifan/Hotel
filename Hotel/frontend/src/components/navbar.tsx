// import { Link } from "react-router-dom"

// function Navbar() {
//     return(
//         <nav className="absolute top-0 left-0 w-full z-50 flex justify-between 
//                         items-center px-16 py-8 text-white">

//             <h1 className="text-4xl font-bold tracking-widest">NOIRE PALACE</h1>

//             <div className="bg-black text-white p-4 flex gap-6">
//                 <Link to="/">Home</Link>
//                 <Link to="/rooms">Rooms</Link>
//                 <Link to="/restaurant">Restaurant</Link>
//                 <Link to="/events">Events</Link>
//                 <Link to="/spa">Spa</Link>
//                 <Link to="/reservation">Reservation</Link>
//             </div>

//         </nav>
//     )
// }

// export default Navbar;

import { useNavigate } from "react-router-dom"

function Navbar() {

  const navigate = useNavigate()

  return (

    <header
      className="
      absolute
      top-0
      left-0
      w-full
      z-50

      flex
      justify-between
      items-center

      px-14
      py-8

      text-white
      "
    >

      {/* LEFT SIDE */}
      <div className="flex items-center gap-14">

        {/* LOGO */}
        <h1
          className="
          text-3xl
          font-bold
          tracking-[4px]
          cursor-pointer
          "
          onClick={() => navigate("/")}
        >
          VELORIA
        </h1>

        {/* NAVBAR */}
        <nav className="flex gap-10 text-lg">

          <button
            onClick={() => navigate("/")}

            className="
            hover:text-gray-300
            transition
            "
          >
            Home
          </button>

          <button
            onClick={() => navigate("/rooms")}

            className="
            hover:text-gray-300
            transition
            "
          >
            Rooms
          </button>

          <button
            onClick={() => navigate("/restaurant")}

            className="
            hover:text-gray-300
            transition
            "
          >
            Restaurant
          </button>

          <button
            onClick={() => navigate("/spa")}

            className="
            hover:text-gray-300
            transition
            "
          >
            Spa
          </button>

        </nav>

      </div>

      
      <div
        className="
        text-right
        text-sm
        space-y-2
        "
      >

        <p>
          +1 800 987 654
        </p>

        <p>
          contact@veloria.com
        </p>

      </div>

    </header>

  )
}

export default Navbar