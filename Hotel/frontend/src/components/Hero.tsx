import hotelImage from "../assets/hero.png"
import { useNavigate } from "react-router-dom"

function Hero() {
    const navigate = useNavigate()

  return (

    <section
      className="
      relative
      h-screen
      bg-fixed
      bg-cover
      bg-center
      flex
      items-center
      justify-center
      "
    //   style={{
    //     backgroundImage:
    //       "url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070')"
    //   }}

    style={{
        backgroundImage: `url(${hotelImage})`
    }}
    >

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl px-6">

        <p className="uppercase tracking-[10px] mb-6 text-lg">

          Luxury Resort & Spa

        </p>

        <h1 className="text-7xl md:text-8xl font-bold leading-tight mb-8">

          Experience Timeless Elegance

        </h1>

        <p className="text-xl md:text-2xl text-gray-200 mb-10">

          Discover world-class hospitality,
          breathtaking suites,
          and unforgettable moments.

        </p>

        <div className="flex justify-center gap-6">

          <button
            className="
            bg-white
            text-black
            px-8
            py-4
            rounded-xl
            text-lg
            hover:bg-gray-300
            transition
            "
          >
            Explore Rooms
          </button>

          <button
            className="
            border
            border-white
            px-8
            py-4
            rounded-xl
            text-lg
            hover:bg-white
            hover:text-black
            transition
            "
            onClick={() => navigate("/reservation")}
          >
            Book Now
          </button>

        </div>

      </div>

    </section>
  )
}

export default Hero

// import { useEffect, useState } from "react"
// import { useNavigate } from "react-router-dom"

// type HeroData = {

//   name: string

//   image: string

//   email: string

//   phone: string

// }

// function Hero() {

//   const navigate = useNavigate()

//   const [hotel, setHotel] = useState<HeroData | null>(null)

//   useEffect(() => {

//     async function fetchHotel() {

//       const res =
//         await fetch("https://localhost:5001/api/hotel")

//       const data = await res.json()

//       setHotel(data)

//     }

//     fetchHotel()

//   }, [])

//   if (!hotel) return <div className="h-screen bg-black"></div>

//   return (

//     <section
//       className="
//         relative
//         h-screen
//         bg-cover
//         bg-center
//         flex
//         items-center
//         justify-center
//       "
//       style={{
//         backgroundImage: `url(${hotel.image})`
//       }}
//     >

//       <div className="absolute inset-0 bg-black/50"></div>

//       {/* HEADER */}
//       <header className="absolute top-0 left-0 w-full flex justify-between px-14 py-8 text-white">

//         <h1 className="text-3xl font-bold tracking-[4px]">
//           {hotel.name}
//         </h1>

//         <div className="flex gap-8 text-sm">

//           <p>☎ {hotel.phone}</p>

//           <p>✉ {hotel.email}</p>

//         </div>

//       </header>

//       {/* CONTENT */}
//       <div className="relative z-10 text-center text-white">

//         <h1 className="text-7xl font-bold mb-8">
//           Welcome to {hotel.name}
//         </h1>

//         <div className="flex gap-6 justify-center">

//           <button
//             onClick={() => navigate("/rooms")}
//             className="bg-white text-black px-8 py-4 rounded-xl"
//           >
//             Explore Rooms
//           </button>

//           <button
//             onClick={() => navigate("/reservation")}
//             className="border border-white px-8 py-4 rounded-xl"
//           >
//             Book Now
//           </button>

//         </div>

//       </div>

//     </section>
//   )
// }

// export default Hero