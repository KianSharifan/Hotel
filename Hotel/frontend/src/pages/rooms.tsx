import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import roomsH from "../assets/roomsHero.png"

interface RoomType {
  roomTypeId: number
  name: string
  maxGuests: number
  numberDoubleBed: number
  numberSofaBed: number
  numberSingleBed: number
  description: string
  picUrl: string
  price: number
}

interface Amenity {
  name: string
}

interface RoomTypeResponse{
  roomType: RoomType
  amenities: Amenity[]
}

function Rooms() {
  const navigate = useNavigate()
  const [rooms, setRooms] = useState<RoomTypeResponse[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("http://localhost:5263/API/RoomTypes")
      .then(response => response.json())
      .then(data => {
        console.log("DATA:", data)
        setRooms(data)
        setLoading(false)
      })
      .catch(error => {
        console.log("ERROR:", error)
        setLoading(false)
      })
  }, [])

    if (loading) {
      return (
        <div className="bg-[#0a0a0a] min-h-screen flex items-center justify-center">
          <p className="font-cinzel text-xs tracking-[4px] uppercase text-[#D4AF37]/70">
            Loading Rooms…
          </p>
        </div>
      )
    }

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen">

      <section
        className="
        h-[70vh]
        bg-cover
        bg-center
        bg-fixed
        relative
        flex
        items-center
        justify-center
        "
        style={{ backgroundImage: `url(${roomsH})` }}
      >

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.25) 45%, rgba(0,0,0,0.85) 100%)",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-6"
        >

          <p className="font-cinzel text-xs tracking-[6px] uppercase text-[#D4AF37] mb-6">
            Noire Palace · Luxury Collection
          </p>

          <h1 className="font-cormorant text-6xl md:text-8xl font-light text-[#f0ede6] mb-8">
            Our Rooms &amp; <span className="italic text-[#D4AF37]">Suites</span>
          </h1>

          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-16" style={{ background: "linear-gradient(90deg, transparent, #D4AF37)" }} />
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
              <rect x="3.5" y="0" width="1" height="8" fill="#D4AF37" />
              <rect x="0" y="3.5" width="8" height="1" fill="#D4AF37" />
            </svg>
            <div className="h-px w-16" style={{ background: "linear-gradient(90deg, #D4AF37, transparent)" }} />
          </div>

          <p className="text-lg text-[#a09880] max-w-2xl mx-auto leading-relaxed">
            Discover extraordinary luxury,
            breathtaking interiors,
            and unforgettable hospitality.
          </p>

        </motion.div>

      </section>
 
      <div className="py-28 px-8 md:px-20 space-y-32">

        {rooms.map((roomData, index) => {
            const room = roomData.roomType
            const amenities = roomData.amenities

            const bedInfo = [
              room.numberDoubleBed ? `${room.numberDoubleBed} Double Bed${room.numberDoubleBed > 1 ? "s" : ""}` : null,
              room.numberSingleBed ? `${room.numberSingleBed} Single Bed${room.numberSingleBed > 1 ? "s" : ""}` : null,
              room.numberSofaBed ? `${room.numberSofaBed} Sofa Bed${room.numberSofaBed > 1 ? "s" : ""}` : null,
            ].filter(Boolean) as string[]
        
          return(
          <motion.div
            key={room.roomTypeId}
            initial={{ opacity: 0, x: index % 2 === 0 ? -80 : 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true, amount: 0.2 }}

            className={`
              flex
              flex-col
              md:flex-row
              items-center
              gap-14
              group
              ${index % 2 !== 0 ? "md:flex-row-reverse" : ""}
            `}
          >

            <div
              className="
              flex-1
              overflow-hidden
              "
            >

              <img
                src={`http://localhost:5263${room.picUrl}`}
                alt={room.name}
                className="
                w-full
                h-[550px]
                object-cover

                transition-all
                duration-700

                group-hover:scale-110
                group-hover:brightness-75
                "
              />
            </div>

            <div className="flex-1">

              <p className="font-cinzel text-xs tracking-[4px] uppercase text-[#D4AF37] mb-5">
                Premium Experience
              </p>

              <h2 className="font-cormorant text-5xl md:text-6xl font-light italic text-[#f0ede6] mb-6">
                {room.name}
              </h2>

              <div className="w-[50px] h-px bg-[#D4AF37]/50 mb-8" />

              <p className="text-[#a09880] text-lg leading-relaxed mb-8">
                {room.description}
              </p>
              
              <div className="flex flex-wrap gap-x-8 gap-y-3 mb-10">
                {[`${room.maxGuests} Guests`, ...bedInfo].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-[#D4AF37]" />
                    <span className="font-cinzel text-xs tracking-[2px] uppercase text-white/50">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mb-10">
                  <p className="font-cinzel text-[0.65rem] tracking-[3px] uppercase text-white/40 mb-4">
                      Amenities
                  </p>

                  <div className="flex flex-wrap gap-3">
                      {amenities.map((amenity) => (
                          <span
                              key={amenity.name}
                              className="px-4 py-2 rounded-full text-xs text-white/70 font-sans"
                              style={{
                                border: "1px solid rgba(212,175,55,0.25)",
                                backgroundColor: "rgba(0,0,0,0.4)",
                              }}
                          >
                              {amenity.name}
                          </span>
                      ))}
                  </div>
              </div>

              <button
                onClick={() => navigate("/reservation")}
                className="
                  font-cinzel
                  px-8
                  py-3
                  text-xs
                  tracking-[3px]
                  uppercase
                  transition-all
                  duration-300
                "
                style={{
                  border: "1px solid rgba(212,175,55,0.4)",
                  color: "#D4AF37",
                  backgroundColor: "transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#D4AF37"
                  e.currentTarget.style.color = "#000"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent"
                  e.currentTarget.style.color = "#D4AF37"
                }}
              >
                Reserve Now
              </button>
            </div>
            
          </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default Rooms
