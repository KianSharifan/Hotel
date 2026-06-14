import rooms from "../data/rooms"
import { useNavigate } from "react-router-dom"

function Rooms() {

  const navigate = useNavigate();

  return (

    <div className="bg-black text-white min-h-screen">

      {/*hero*/}
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

      {/* rooms */}
      <div className="py-28 px-8 md:px-20 space-y-32">

        {rooms.map((room, index) => (

          <div
            key={room.id}

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

            {/* img */}
            <div
              className="
              flex-1
              overflow-hidden
              rounded-3xl
              "
            >

              <img
                src={room.image}

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

            {/* text */}
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

              {/* buttons */}
              <div className="flex gap-6">

                <button
                  className="
                  bg-white
                  text-black

                  px-8
                  py-4

                  rounded-2xl
                  text-lg

                  transition-all
                  duration-500

                  hover:bg-gray-300
                  hover:scale-105
                  "
                >
                  Explore
                </button>

                {/* <button

                  onClick={() => navigate("/reservation")}

                  className="
                  border
                  border-white

                  px-8
                  py-4

                  rounded-2xl
                  text-lg

                  transition-all
                  duration-500

                  hover:bg-white
                  hover:text-black
                  hover:scale-105
                  "
                >
                  Book Now
                </button> */}

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  )
}

export default Rooms