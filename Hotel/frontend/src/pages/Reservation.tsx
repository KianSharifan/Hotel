import { useNavigate } from "react-router-dom"
import { useState } from "react"
import img from "../assets/img3.png"

function Reservation() {

  const navigate = useNavigate()

  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [Aguests, setAguests] = useState(1)
  const [Cguests, setCguests] = useState(1)
  const totalGuests = Aguests+Cguests
  // const [roomCount, setRoomCount] = useState(1)

  function handleSearch() {

    navigate(

      `/reservation/booking-results?guests=${totalGuests}`

    )

  }

  return (

    <div className="bg-black min-h-screen text-white ">

<section
  className="
    min-h-screen
    bg-cover
    bg-center
    relative
    flex
    items-center
    justify-center
    text-center
    px-6
    overflow-hidden
  "
  style={{
    backgroundImage: `url(${img})`
  }}
>

  {/*dark overlay*/}
  <div className="absolute inset-0 bg-black/50"></div>

  {/*black fade*/}
  <div
    className="
      absolute
      bottom-0
      left-0
      w-full
      h-[45%]

      bg-gradient-to-t
      from-black
      via-black/80
      to-transparent
    "
  ></div>


  {/* HERO CONTENT */}
  <div className="relative z-10 max-w-5xl -mt-40">

    <p className="animate-pulse uppercase tracking-[12px] text-gray-300 mb-6">

      Welcome To Noire Palace

    </p>

    <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">

      Begin Your Extraordinary Escape

    </h1>

    <p className="text-xl text-gray-200 leading-relaxed">

      Indulge in world-class luxury,
      unforgettable elegance,
      and timeless hospitality crafted exclusively for you.

    </p>

  </div>


  {/*form*/}
  <div
    className="
      absolute
      bottom-10
      left-1/2
      -translate-x-1/2

      w-[92%]
      max-w-7xl

      z-20
    "
  >

    <div
      className="
        bg-white
        text-black
        rounded-3xl
        shadow-2xl
        p-10
      "
    >

      <div className="grid md:grid-cols-5 gap-6">

        {/* CHECK IN */}
        <div>

          <label className="block mb-3 font-semibold text-left pl-5">

            Check In

          </label>

          <input
            type="date"

            min={new Date().toISOString().split("T")[0]}

            value={checkIn}

            onChange={(e) =>
              setCheckIn(e.target.value)
            }

            className="
              w-full
              border
              border-gray-300
              rounded-xl
              px-4
              py-4
            "
          />

        </div>


        {/* CHECK OUT */}
        <div>

          <label className="text-2px block mb-3 font-semibold text-left pl-5">

            Check Out

          </label>

          <input
            type="date"

            min={checkIn || new Date().toISOString().split("T")[0]}

            value={checkOut}

            onChange={(e) =>
              setCheckOut(e.target.value)
            }

            className="
              w-full
              border
              border-gray-300
              rounded-xl
              px-4
              py-4
            "
          />

        </div>


        {/* GUESTS */}
        <div>

          <label className="block mb-3 font-semibold text-left pl-5">

            Adult Guests

          </label>

          <select
            value={Aguests}

            onChange={(e) =>
              setAguests(Number(e.target.value))
            }

            className="
              w-full
              border
              border-gray-300
              rounded-xl
              px-4
              py-4
            "
          >

            <option value={1}>1 Guest</option>
            <option value={2}>2 Guests</option>
            <option value={3}>3 Guests</option>
            <option value={4}>4 Guests</option>
            <option value={5}>5 Guests</option>
            <option value={6}>6 Guests</option>

          </select>

        </div>



        <div>

          <label className="block mb-3 font-semibold text-left pl-5">

            Children Guests

          </label>

          <select
            value={Cguests}

            onChange={(e) =>
              setCguests(Number(e.target.value))
            }

            className="
              w-full
              border
              border-gray-300
              rounded-xl
              px-4
              py-4
            "
          >

            <option value={1}>1 Guest</option>
            <option value={2}>2 Guests</option>
            <option value={3}>3 Guests</option>
            <option value={4}>4 Guests</option>
            <option value={5}>5 Guests</option>
            <option value={6}>6 Guests</option>

          </select>

        </div>


        {/* ROOMS */}
        {/* <div>

          <label className="block mb-3 font-semibold">

            Rooms

          </label>

          <select
            value={roomCount}

            onChange={(e) =>
              setRoomCount(Number(e.target.value))
            }

            className="
              w-full
              border
              border-gray-300
              rounded-xl
              px-4
              py-4
            "
          >

            <option value={1}>1 Room</option>
            <option value={2}>2 Rooms</option>
            <option value={3}>3 Rooms</option>

          </select>

        </div> */}


        {/* BUTTON */}
        <div className="flex items-end">

          <button
            // onClick={handleSearch}
            onClick={() => navigate("/reservation/guests")}

            className="
              w-full
              bg-black
              text-white
              py-4
              rounded-xl
              hover:bg-gray-800
              hover:scale-105
              transition
              duration-500
            "
          >

            Search Rooms

          </button>

        </div>

      </div>

    </div>

  </div>

</section>

 

    </div>

  )
}

export default Reservation