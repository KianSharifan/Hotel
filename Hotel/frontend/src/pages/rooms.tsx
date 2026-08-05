import { useEffect, useState } from "react"

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
        <div className="text-white text-center mt-20">
          Loading rooms...
        </div>
      )
    }

  return (
    <div className="bg-black text-white min-h-screen">

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
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070')"
        }}
      >

        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 text-center px-6">

          <p
            className="
            uppercase
            tracking-[10px]
            text-gray-300
            mb-6
            animate-pulse
            "
          >
            Luxury Collection
          </p>

          <h1
            className="
            text-6xl
            md:text-8xl
            font-bold
            mb-8
            opacity-0
            animate-[fadeIn_1.5s_ease_forwards]
            "
          >
            Our Rooms & Suites
          </h1>

          <p
            className="
            text-xl
            text-gray-200
            max-w-3xl
            mx-auto
            opacity-0
            animate-[fadeIn_2s_ease_forwards]
            "
          >
            Discover extraordinary luxury,
            breathtaking interiors,
            and unforgettable hospitality.
          </p>

        </div>

      </section>
 
      <div className="py-28 px-8 md:px-20 space-y-32">

        {rooms.map((roomData, index) => {
            const room = roomData.roomType
            const amenities = roomData.amenities
        
          return(
          <div
            key={room.roomTypeId}

            className={`
              flex
              flex-col
              md:flex-row
              items-center
              gap-14
              group
              transition-all
              duration-700
              hover:scale-[1.01]
              ${index % 2 !== 0 ? "md:flex-row-reverse" : ""}
            `}
          >

            <div
              className="
              flex-1
              overflow-hidden
              rounded-3xl
              "
            >

              <img
                src={`http://localhost:5263${room.picUrl}`}

                className="
                w-full
                h-[550px]
                object-cover
                rounded-3xl

                transition-all
                duration-700

                group-hover:scale-110
                group-hover:brightness-75
                "
              />
            </div>

            <div
              className="
              flex-1
              transform
              transition-all
              duration-700
              group-hover:translate-y-[-10px]
              "
            >

              <p
                className="
                uppercase
                tracking-[8px]
                text-gray-400
                mb-5
                "
              >
                Premium Experience
              </p>

              <h2
                className="
                text-5xl
                md:text-6xl
                font-bold
                mb-8
                "
              >
                {room.name}
              </h2>

              <p
                className="
                text-gray-300
                text-xl
                leading-relaxed
                mb-10
                "
              >
                {room.description}
              </p>

              <div className="mb-8 text-gray-400">
                <p>Guests: {room.maxGuests}</p>
                <p>Double Beds: {room.numberDoubleBed}</p>
                <p>Single Beds: {room.numberSingleBed}</p>
                <p>Sofa Beds: {room.numberSofaBed}</p>
              </div>

              <div className="mb-8">
                  <h3 className="text-white font-semibold mb-3">
                      Amenities
                  </h3>

                  <div className="flex flex-wrap gap-3">
                      {amenities.map((amenity) => (
                          <span
                              key={amenity.name}
                              className="
                              px-4
                              py-2
                              rounded-full
                              bg-zinc-900
                              border
                              border-zinc-700
                              text-sm
                              text-gray-300
                              "
                          >
                              {amenity.name}
                          </span>
                      ))}
                  </div>
              </div>
            </div>
            
          </div>
          )
        })}
      </div>
    </div>
  )
}

export default Rooms