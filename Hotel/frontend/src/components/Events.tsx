import { motion } from "framer-motion"
import djimg from "../assets/djset.png";
import { image } from "motion/react-client";

const events = [
  {
    id: 1,
    title: "Sunset DJ Set",
    subtitle: "Every Friday Night",
    description:
      "Experience unforgettable sunset vibes with internationally acclaimed DJs performing by the infinity pool while guests enjoy handcrafted cocktails and breathtaking ocean views.",
    image: djimg
  },

  {
    id: 2,
    title: "Live Jazz Evening",
    subtitle: "Saturday Lounge Sessions",
    description:
      "Relax in our luxury lounge while talented jazz musicians create an intimate atmosphere accompanied by premium wines and gourmet dining.",
    image:
      "https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=2070"
  },

  {
    id: 3,
    title: "Celebrity Concert Night",
    subtitle: "Special Monthly Event",
    description:
      "Join exclusive performances from renowned singers and artists. VIP seating, signature menus, and a spectacular production create a truly memorable night.",
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=2070"
  }
]

function Events() {
  return (
    <section className="bg-black text-white py-32 px-8 md:px-20">

      {/* TITLE */}

      <div className="text-center mb-28">

        <p className="uppercase tracking-[10px] text-gray-400 mb-5">
          Experiences
        </p>

        <h2 className="text-5xl md:text-7xl font-bold mb-6">
          Events & Entertainment
        </h2>

        <p className="text-gray-400 max-w-3xl mx-auto text-lg">
          Discover exclusive experiences, live performances,
          luxury gatherings, and unforgettable nights.
        </p>

      </div>

      <div className="space-y-36">

        {events.map((event, index) => (

          <motion.div
            key={event.id}
            initial={{
              opacity: 0,
              x: index % 2 === 0 ? -100 : 100
            }}
            whileInView={{
              opacity: 1,
              x: 0
            }}
            transition={{
              duration: 0.9
            }}
            viewport={{ once: true }}
            className={`
              flex
              flex-col
              md:flex-row
              items-center
              gap-14
              ${index % 2 !== 0 ? "md:flex-row-reverse" : ""}
            `}
          >

            {/* IMAGE */}

            <div className="flex-1 overflow-hidden rounded-3xl">

              <img
                src={event.image}
                alt={event.title}
                className="
                  w-full
                  h-[550px]
                  object-cover
                  rounded-3xl
                  transition-all
                  duration-700
                  hover:scale-110
                  hover:brightness-75
                "
              />

            </div>

            {/* TEXT */}

            <motion.div
              initial={{
                opacity: 0,
                y: 80
              }}
              whileInView={{
                opacity: 1,
                y: 0
              }}
              transition={{
                duration: 1
              }}
              viewport={{ once: true }}
              className="flex-1"
            >

              <p className="uppercase tracking-[8px] text-amber-400 mb-4">
                {event.subtitle}
              </p>

              <h3 className="text-5xl font-bold mb-8">
                {event.title}
              </h3>

              <p className="text-gray-300 text-xl leading-relaxed mb-10">
                {event.description}
              </p>

              <button
                className="
                  px-8
                  py-4
                  rounded-2xl
                  border
                  border-white
                  transition-all
                  duration-500
                  hover:bg-white
                  hover:text-black
                  hover:scale-105
                "
              >
                Learn More
              </button>

            </motion.div>

          </motion.div>

        ))}

      </div>

    </section>
  )
}

export default Events