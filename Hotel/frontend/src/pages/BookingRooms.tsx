import { useNavigate } from "react-router-dom"
import { motion } from "motion/react"
import { useBooking } from "../context/BookingContext"
import BookingHeader from "../components/BookingHeader"
import { amenityIcons } from "../data/amenityIcons"
// import rooms from "../data/rooms"
import { useEffect, useState } from "react"
import { getAvailableRooms } from "../api/roomApi"




export default function BookingRooms() {
  const { booking, setRoom, resetBooking } = useBooking()
  const navigate = useNavigate()
  const [rooms, setRooms] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // if (loading) {
  //   return (
  //     <div className="min-h-screen bg-[#080808] text-white flex items-center justify-center">
  //       Loading rooms...
  //     </div>
  //   )
  // }

  useEffect(() => {
  if (
    !booking.checkIn ||
    !booking.checkOut ||
    booking.adults + booking.children === 0
  ) {
    return
  }

    async function loadRooms() {
      try {
        const data = await getAvailableRooms(
          booking.adults,
          booking.children,
          booking.checkIn,
          booking.checkOut
        )

    
console.log("ROOMS FROM API", data)
        setRooms(data)
      }
      catch (err) {
        console.error(err)
      }
      finally {
        setLoading(false)
      }
    }

    loadRooms()
  }, [])


  const totalGuests = booking.adults + booking.children
  const filteredRooms = rooms

  function nights() {
    if (!booking.checkIn || !booking.checkOut) return 1
    return Math.round((new Date(booking.checkOut).getTime() - new Date(booking.checkIn).getTime()) / 86400000)
  }

  // function handleSelect(room: typeof rooms[0]) {
  //   setRoom({
  //     id: room.roomTypeId,
  //     name: room.name,
  //     price: room.price
  //   })
  //   navigate("/reservation/payment")
  // }

function handleSelect(room: any) {
  console.log("SELECTED ROOM", room)

  setRoom({
    id: room.roomTypeId,
    name: room.name,
    price: room.price
  })

  navigate("/reservation/payment")
}

  return (
    <div className="min-h-screen bg-[#080808] pt-[120px]">
      <BookingHeader />

      <div className="max-w-[1100px] mx-auto px-6 pt-16 pb-32 relative z-10">

        {/* Title */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          className="text-center mb-16">
          <p className="text-[0.65rem] tracking-[0.45em] uppercase text-[#c8a84b]/60 font-sans mb-4">Step 3 of 4</p>
          <h1 className="font-serif-lux text-5xl md:text-6xl font-light italic text-white leading-tight mb-4">
            Choose Your Suite
          </h1>
          <div className="w-[60px] h-px bg-gradient-to-r from-transparent via-[#c8a84b] to-transparent mx-auto mb-4" />
          <p className="font-sans text-sm text-white/35 tracking-wide">
            {filteredRooms.length} suite{filteredRooms.length !== 1 ? "s" : ""} available for {totalGuests} guest{totalGuests !== 1 ? "s" : ""} · {nights()} night{nights() !== 1 ? "s" : ""}
          </p>
        </motion.div>

        {/* Room cards */}
        <div className="flex flex-col gap-8">
          {filteredRooms.map((room, index) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.12, duration: 0.7, ease: "easeOut" }}
              whileHover={{
                borderColor: "rgba(200,168,75,0.28)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
              }}
              className="grid grid-cols-1 md:grid-cols-[420px_1fr] bg-white/[0.02] border border-[#c8a84b]/10 rounded-3xl overflow-hidden transition-[border-color,box-shadow] duration-400"
            >
              {/* Image */}
              <div className="relative overflow-hidden h-[340px]">
                <motion.img
                  src={room.url}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.7 }}
                  className="w-full h-full object-cover block"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#080808]/40" style={{ backgroundImage: "linear-gradient(90deg, transparent 60%, rgba(8,8,8,0.4) 100%)" }} />
              </div>

              {/* Content */}
              <div className="p-10 flex flex-col justify-between">
                <div>
                  <h2 className="font-serif-lux text-3xl font-light italic text-white mb-3">{room.name}</h2>

                  <p className="text-sm text-white/40 leading-relaxed font-sans font-light mb-6">
                    {room.description}
                  </p>

                  {/* Stats */}
                  <div className="flex gap-3 mb-5 flex-wrap">
                    {[
                      { label: `${room.maxGuests} Guests` },
                      { label: `${room.numberDoubleBed +
                                room.numberSingleBed +
                                room.numberSofaBed} Beds` },
                      // { label: room.size },
                    ].map(tag => (
                      <span key={tag.label} className="px-4 py-1.5 rounded-full border border-[#c8a84b]/20 text-xs text-[#c8a84b]/75 font-sans tracking-wide">
                        {tag.label}
                      </span>
                    ))}
                  </div>

                  {/* Amenities */}
                  {/* <div className="flex gap-2.5 flex-wrap mb-8">
                    {room.amenities.slice(0, 5).map((amenity: string) => {
                      const Icon = amenityIcons[amenity]
                      return (
                        <div key={amenity} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full 
                        bg-white/[0.04] border border-white/[0.07] text-xs text-white/45 font-sans">
                          {Icon && <Icon size={12} className="text-[#c8a84b]/60" />}
                          {amenity}
                        </div>
                      )
                    })}
                  </div> */}
                </div>

                {/* Price + CTA */}
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-[0.6rem] tracking-[0.2em] uppercase text-white/25 font-sans mb-1.5">
                      Per Night
                    </p>
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-serif-lux text-4xl font-light text-[#c8a84b] leading-none">
                        ${room.price.toLocaleString()}
                      </span>
                    </div>
                    {nights() > 1 && (
                      <p className="text-xs text-white/25 font-sans mt-1">
                        ${(room.price * nights()).toLocaleString()} for {nights()} nights
                      </p>
                    )}
                  </div>

                  <motion.button
                    onClick={() => handleSelect(room)}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="px-9 py-4 bg-gradient-to-br from-[#c8a84b] to-[#a07830] border-none rounded-xl text-black font-serif-lux text-base italic cursor-pointer tracking-wide shadow-[0_8px_24px_rgba(200,168,75,0.2)] transition-shadow duration-300 hover:shadow-[0_12px_36px_rgba(200,168,75,0.4)]"
                  >
                    Select Suite →
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Reset */}
        <div className="text-center mt-12">
          <button onClick={() => { resetBooking(); navigate("/") }}
            className="bg-none border-none cursor-pointer text-white/20 text-xs tracking-[0.2em] uppercase font-sans transition-colors duration-300 hover:text-red-400/60">
            Cancel Reservation
          </button>
        </div>
      </div>
    </div>
  )
}























