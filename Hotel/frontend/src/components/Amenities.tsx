import { Link } from "react-router-dom"
// import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"



const amenities = [
  {
    title: "Restaurant",
    description: "Fine dining experience with world-class chefs.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
    link: "/restaurant"
  },
  {
    title: "Spa",
    description: "Relax and rejuvenate in our luxury spa.",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874",
    link: "/amenities/spa"
  },
  {
    title: "Golf",
    description: "Championship golf courses surrounded by breathtaking scenery.",
    image: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b",
    link: "/amenities/golf"
  },
  {
    title: "Pool",
    description: "Infinity pools overlooking stunning landscapes.",
    image: "https://images.unsplash.com/photo-1572331165267-854da2b10ccc",
    link: "/amenities/pool"
  },
  {
    title: "Private Beach",
    description: "Exclusive beach access with luxury cabanas.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    link: "/amenities/privatebeach"
  },
  // {
  //   title: "Luxury Suites",
  //   description: "Elegant suites crafted for unforgettable stays.",
  //   image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
  //   link: "/rooms"
  // }
]




function Amenities() {
  // const navigate = useNavigate()

  const [current, setcurrent] = useState(0);

  function nextSlide(){
      if (current<amenities.length-2) {
        setcurrent(current+1)
      }
  }

  function prevSlide(){
    if (current>0) {
      setcurrent(current-1)
    }
  }

  return (

    <section className="bg-gray-100 py-28 px-10">

      <div className="text-center mb-20">

        <h2 className="text-6xl font-bold mb-6">

          Resort Experiences

        </h2>

      </div>

     <div className="relative max-w-7xl mx-auto overflow-hidden">

      {/* LEFT BUTTON */}

      <button
        onClick={prevSlide}
        className="
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          z-30

          w-14
          h-14

          rounded-full

          bg-black
          text-white

          hover:scale-110
          transition
        "
      >
        ←
      </button>

      {/* RIGHT BUTTON */}

      <button
        onClick={nextSlide}
        className="
          absolute
          right-4
          top-1/2
          -translate-y-1/2
          z-30

          w-14
          h-14

          rounded-full

          bg-black
          text-white

          hover:scale-110
          transition
        "
      >
        →
      </button>

      <AnimatePresence mode="wait">

        <motion.div

          key={current}

          className="
            grid
            md:grid-cols-2
            gap-8
          "

          initial={{
            opacity: 0,
            x: 100
          }}

          animate={{
            opacity: 1,
            x: 0
          }}

          exit={{
            opacity: 0,
            x: -100
          }}

          transition={{
            duration: 0.8
          }}

        >

          {amenities
            .slice(current, current + 2)
            .map((item) => (

              <Link
                key={item.title}
                to={item.link}
              >

                <motion.div

                  whileHover={{
                    y: -10,
                    scale: 1.02
                  }}

                  transition={{
                    duration: 0.3
                  }}

                  className="
                    bg-white
                    rounded-3xl
                    overflow-hidden
                    shadow-xl
                  "
                >

                  <img
                    src={item.image}
                    className="
                      h-[500px]
                      w-full
                      object-cover
                    "
                  />

                  <div className="p-8">

                    <h3 className="text-4xl font-bold mb-4">

                      {item.title}

                    </h3>

                    <p className="text-gray-600">

                      {item.description}

                    </p>

                  </div>

                </motion.div>

              </Link>

          ))}

        </motion.div>

      </AnimatePresence>

    </div>

    </section>
  )
}

export default Amenities