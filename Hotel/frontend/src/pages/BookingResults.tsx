// import rooms from "../data/rooms"
// import { useState, useEffect } from "react"

// import { useSearchParams } from "react-router-dom"

// import { amenityIcons } from "../data/amenityIcons"

// function BookingResults() {

//   const [searchParams] = useSearchParams()

//   const guests =
//     Number(searchParams.get("guests"))

//   const filteredRooms =
//     rooms.filter((room) =>
//       room.maxGuests >= guests
//     )

//     const [loaded, setLoaded] = useState(false)

//     useEffect(() => {

//       setLoaded(true)

//     }, [])

    



//   return (

//     <div className="bg-stone-500 min-h-screen px-10 py-32">

//       {/* TITLE */}
//       <div className="text-center mb-20">

//         <p className="uppercase tracking-[8px] text-gray-500 mb-4">

//           Available Luxury Suites

//         </p>

//         <h1 className="text-6xl font-bold mb-6">

//           Discover Your Perfect Stay

//         </h1>

//         <p className="text-stone-800 text-xl">

//           Curated luxury accommodations
//           tailored to your experience.

//         </p>

//       </div>


//       {/* ROOM CARDS */}
//       <div 
//       className="grid md:grid-cols-2 gap-10 max-w-7xl mx-auto"
//       >

//         {filteredRooms.map((room, index) => (

//           <div 
//             key={room.id}
//             style={{
//   transitionDelay: `${index * 150}ms`
// }}

//             className={`
//             ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}
//             delay-[${index * 150}ms]
//               bg-[#d2a679]
//               rounded-3xl
//               overflow-hidden
//               shadow-xl

//               hover:scale-[1.02]

//               transition
//               duration-500
//             `}
//           >

//             {/* IMAGE */}
//             <img
//               src={room.image}

//               className="
//                 h-96
//                 w-full
//                 object-cover
//               "
//             />

//             {/* CONTENT */}
//             <div className="p-8">

//               <h2 className="text-4xl font-bold mb-4">

//                 {room.name}

//               </h2>

//               <p className="text-gray-600 mb-6 leading-relaxed">

//                 {room.description}

//               </p>


//               {/* INFO */}
//               <div className="flex flex-wrap gap-4 mb-8">

//                 <div className="bg-[#c68b59] px-4 py-2 rounded-full">

//                   👥 {room.maxGuests} Guests

//                 </div>

//                 <div className="bg-[#c68b59] px-4 py-2 rounded-full">

//                   🛏 {room.beds} Beds

//                 </div>

//                 <div className="bg-[#c68b59] px-4 py-2 rounded-full">

//                   📐 {room.size}

//                 </div>

//               </div>


//               {/* AMENITIES */}
//               <div className="flex flex-wrap gap-3 mb-8">

//                 {room.amenities.map((amenity) => {

//                   const Icon =
//                     amenityIcons[amenity]

//                   return (

//                     <div
//                       key={amenity}

//                       className="
//                         flex
//                         items-center
//                         gap-2

//                         border
//                         border-gray-300

//                         px-4
//                         py-2

//                         rounded-full
//                         text-sm

//                         bg-white/50
//                         backdrop-blur-sm
//                       "
//                     >

//                       {Icon &&
//                         <Icon
//                           size={18}
//                           className="text-[#d4af37]"
//                         />
//                       }

//                       <span>

//                         {amenity}

//                       </span>

//                     </div>

//                   )

//                 })}

//               </div>


//               {/* BOTTOM */}
//               <div className="flex items-center justify-between">

//                 <div>

//                   <p className="text-gray-500">

//                     Starting From

//                   </p>

//                   <h3 className="text-4xl font-bold">

//                     ${room.price}

//                   </h3>

//                 </div>

//                 <button
//                   className="
//                     bg-black
//                     text-white

//                     px-8
//                     py-4

//                     rounded-xl

//                     hover:bg-gray-800
//                     hover:scale-105

//                     transition
//                     duration-500
//                   "
//                 >

//                   Select Room

//                 </button>

//               </div>

//             </div>

//           </div>

//         ))}

//       </div>

//     </div>

//   )
// }

// export default BookingResults