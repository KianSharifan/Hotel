import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { motion } from "framer-motion"
import img from "../assets/img3.png"
import { useBooking } from "../context/BookingContext"

function Reservation() {

  const navigate = useNavigate()

  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [Aguests, setAguests] = useState(1)
  const [Cguests, setCguests] = useState(1)
  const { setGuests, setDates } = useBooking()

  function handleContinue() {
    setGuests(Aguests, Cguests)
    if (checkIn && checkOut) {
      setDates(checkIn, checkOut)
    }
    navigate("/reservation/guests")
  }

  return (
    <div className="bg-[#080808] min-h-screen text-white">
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

        <div className="absolute inset-0 bg-black/50"></div>

        <div
          className="
            absolute
            bottom-0
            left-0
            w-full
            h-[45%]
            bg-gradient-to-t
            from-[#080808]
            via-[#080808]/80
            to-transparent
          "
        ></div>


        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 max-w-5xl -mt-40"
        >

          <h1 className="font-cormorant text-6xl md:text-8xl font-light italic mb-8 leading-tight text-white">
            Begin Your Extraordinary Escape
          </h1>

          <div className="w-[60px] h-px bg-gradient-to-r from-transparent via-[#c8a84b] to-transparent mx-auto mb-8" />

          <p className="text-lg text-white/50 leading-relaxed font-sans font-light max-w-2xl mx-auto">
            Indulge in world-class luxury,
            unforgettable elegance,
            and timeless hospitality crafted exclusively for you.
          </p>
        </motion.div>


        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
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
              bg-white/[0.03]
              backdrop-blur-xl
              border
              border-[#c8a84b]/15
              rounded-3xl
              shadow-2xl
              p-10
            "
          >

      <div className="grid md:grid-cols-5 gap-6">

        <div>
          <label className="block text-[0.6rem] tracking-[0.3em] uppercase text-[#c8a84b]/60 font-sans mb-3 text-left pl-1">
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
              bg-white/[0.03]
              border
              border-white/[0.08]
              focus:border-[#c8a84b]/50
              rounded-xl
              px-4
              py-4
              text-white
              outline-none
              transition-colors
              duration-300
              [color-scheme:dark]
            "
          />
        </div>


        <div>
          <label className="block text-[0.6rem] tracking-[0.3em] uppercase text-[#c8a84b]/60 font-sans mb-3 text-left pl-1">
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
              bg-white/[0.03]
              border
              border-white/[0.08]
              focus:border-[#c8a84b]/50
              rounded-xl
              px-4
              py-4
              text-white
              outline-none
              transition-colors
              duration-300
              [color-scheme:dark]
            "
          />
        </div>


        <div>
          <label className="block text-[0.6rem] tracking-[0.3em] uppercase text-[#c8a84b]/60 font-sans mb-3 text-left pl-1">
            Adult Guests
          </label>

          <select
            value={Aguests}
            onChange={(e) =>
              setAguests(Number(e.target.value))
            }
            className="
              w-full
              bg-white/[0.03]
              border
              border-white/[0.08]
              focus:border-[#c8a84b]/50
              rounded-xl
              px-4
              py-4
              text-white
              outline-none
              transition-colors
              duration-300
              [color-scheme:dark]
            "
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n} className="bg-[#080808]">
                {n}
              </option>
            ))}
          </select>
        </div>



        <div>

          <label className="block text-[0.6rem] tracking-[0.3em] uppercase text-[#c8a84b]/60 font-sans mb-3 text-left pl-1">
            Children Guests
          </label>

          <select
            value={Cguests}
            onChange={(e) =>
              setCguests(Number(e.target.value))
            }
            className="
              w-full
              bg-white/[0.03]
              border
              border-white/[0.08]
              focus:border-[#c8a84b]/50
              rounded-xl
              px-4
              py-4
              text-white
              outline-none
              transition-colors
              duration-300
              [color-scheme:dark]
            "
          >
            {[0, 1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n} className="bg-[#080808]">
                {n}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={handleContinue}
            className="
              w-full
              bg-gradient-to-br
              from-[#c8a84b]
              to-[#a07830]
              text-black
              font-serif-lux
              italic
              text-lg
              py-4
              rounded-xl
              shadow-[0_8px_24px_rgba(200,168,75,0.2)]
              hover:shadow-[0_12px_36px_rgba(200,168,75,0.4)]
              hover:scale-[1.02]
              transition-all
              duration-300
            "
          >
            Search Rooms
          </button>

        </div>
      </div>
    </div>
  </motion.div>
</section>

    </div>
  )
}

export default Reservation
