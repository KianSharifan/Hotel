function FeaturedRooms() {

  return (

    <section className="bg-white py-28 px-10">

      <div className="text-center mb-20">

        <p className="uppercase tracking-[8px] text-gray-500 mb-4">
          Accommodation
        </p>

        <h2 className="text-6xl font-bold">
          Featured Suites
        </h2>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

        <div className="rounded-3xl overflow-hidden shadow-xl">

          <img
            src="https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1974"
            className="h-80 w-full object-cover"
          />

          <div className="p-8">

            <h3 className="text-3xl font-bold mb-4">
              Presidential Suite
            </h3>

            <p className="text-gray-600 mb-6">

              Elegant luxury suite with breathtaking ocean views.

            </p>

            <button className="bg-black text-white px-6 py-3 rounded-xl">

              View Details

            </button>

          </div>

        </div>

        <div className="rounded-3xl overflow-hidden shadow-xl">

                <img
                    src="https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1974"
                    className="h-80 w-full object-cover"
                />

                <div className="p-8">

                    <h3 className="text-3xl font-bold mb-4">
                    Presidential Suite
                    </h3>

                    <p className="text-gray-600 mb-6">

                    Elegant luxury suite with breathtaking ocean views.

                    </p>

                    <button className="bg-black text-white px-6 py-3 rounded-xl">

                    View Details

                    </button>

                </div>

                </div>

                
                <div className="rounded-3xl overflow-hidden shadow-xl">

                        <img
                            src="https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1974"
                            className="h-80 w-full object-cover"
                        />

                        <div className="p-8">

                            <h3 className="text-3xl font-bold mb-4">
                            Presidential Suite
                            </h3>

                            <p className="text-gray-600 mb-6">

                            Elegant luxury suite with breathtaking ocean views.

                            </p>

                            <button className="bg-black text-white px-6 py-3 rounded-xl">

                            View Details

                            </button>

                        </div>

                        </div>


      </div>

    </section>
  )
}

export default FeaturedRooms

// import { useEffect, useState } from "react"
// import { useNavigate } from "react-router-dom"

// type Room = {

//   roomId: number

//   roomTypeId: number

//   pricePerNight: number

//   status?: string

// }

// const roomImages: Record<number, string> = {

//   1: "https://images.unsplash.com/photo-1590490360182-c33d57733427",

//   2: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461",

//   3: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b"

// }

// function FeaturedRooms() {

//   const navigate = useNavigate()

//   const [rooms, setRooms] = useState<Room[]>([])

//   useEffect(() => {

//     async function fetchRooms() {

//       const response =
//         await fetch("https://localhost:5001/api/rooms")

//       const data = await response.json()

//       setRooms(data)

//     }

//     fetchRooms()

//   }, [])

//   return (

//     <section className="bg-white py-28 px-10">

//       {/* TITLE */}
//       <div className="text-center mb-20">

//         <p className="uppercase tracking-[8px] text-gray-500 mb-4">
//           Accommodation
//         </p>

//         <h2 className="text-6xl font-bold">
//           Featured Suites
//         </h2>

//       </div>

//       {/* ROOMS */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

//         {rooms.map((room) => (

//           <div
//             key={room.roomId}
//             className="
//               rounded-3xl
//               overflow-hidden
//               shadow-xl
//               transition
//               duration-500
//               hover:scale-105
//             "
//           >

//             {/* IMAGE */}
//             <img
//               src={roomImages[room.roomTypeId]}
//               className="
//                 h-80
//                 w-full
//                 object-cover
//                 transition
//                 duration-500
//                 hover:scale-110
//               "
//             />

//             {/* CONTENT */}
//             <div className="p-8">

//               <h3 className="text-3xl font-bold mb-4">

//                 Room #{room.roomId}

//               </h3>

//               <p className="text-gray-600 mb-4">

//                 Price per night: ${room.pricePerNight}

//               </p>

//               <p className="text-gray-500 mb-6">

//                 Status: {room.status ?? "Available"}

//               </p>

//               <button
//                 onClick={() => navigate("/rooms")}
//                 className="
//                   bg-black
//                   text-white
//                   px-6
//                   py-3
//                   rounded-xl
//                   hover:bg-gray-800
//                   transition
//                 "
//               >
//                 View Details
//               </button>

//             </div>

//           </div>

//         ))}

//       </div>

//     </section>
//   )
// }

// export default FeaturedRooms