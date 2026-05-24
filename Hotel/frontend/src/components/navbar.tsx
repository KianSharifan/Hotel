import { Link } from "react-router-dom"
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
          contact@noire.com
        </p>

      </div>

    </header>

  )
}

export default Navbar