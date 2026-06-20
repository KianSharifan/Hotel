import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function Navbar() {

  const navigate = useNavigate()
  const { user, logout } = useAuth()

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

      <div className="flex items-center gap-14">

        <h1
          className="
          text-3xl
          font-bold
          tracking-[4px]
          cursor-pointer
          "
          onClick={() => navigate("/")}
        >
          NOIRE PALACE
        </h1>

        <nav className="flex gap-10 text-lg">

          <button
            onClick={() => navigate("/")}

            className="
            hover:text-gray-500
            transition
            "
          >
            Home
          </button>

          <button
            onClick={() => navigate("/rooms")}

            className="
            hover:text-gray-500
            transition
            "
          >
            Rooms
          </button>

          <button
            onClick={() => navigate("/restaurant")}

            className="
            hover:text-gray-500
            transition
            "
          >
            Restaurant
          </button>

          <button
            onClick={() => navigate("/amenities/spa")}
            className="
            hover:text-gray-500
            transition">
            Spa
          </button>

        </nav>
      </div>


      {
        user ? (
          <div className="flex items-center gap-4">

            <span className="text-sm">
              {user.username}
            </span>

            <button
              onClick={logout}
              className="
              border
              border-[#c8a84b]
              px-4
              py-2
              rounded-xl
              "
            >
              Logout
            </button>

          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="
            border
            border-white
            px-5
            py-2
            rounded-xl
            hover:bg-white
            hover:text-black
            transition
            "
          >
            Login
          </button>
        )
      }
      {/* <button 
        onClick={() => navigate("/login")}
        className="
        text-right
        transition
        text-lg
        border
        border-white
        px-5
        py-2
        rounded-xl
        text-l
        hover:bg-white
        hover:text-black
        transition
        "
      >
        Login
      </button> */}


    </header>

  )
}

export default Navbar