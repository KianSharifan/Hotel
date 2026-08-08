import { motion } from "framer-motion"
import djImg from "../assets/dj.png";
import jazzImg from "../assets/jazz.png"
import concertImg from "../assets/concert.png"


const events = [
  {
    id: 1,
    tag: "Fridays",
    title: "Sunset DJ Set",
    subtitle: "Every Friday Night",
    description:
      "Experience unforgettable sunset vibes with internationally acclaimed DJs performing by the infinity pool while guests enjoy handcrafted cocktails and breathtaking ocean views.",
    image: djImg
  },

  {
    id: 2,
    tag: "Saturdays",
    title: "Live Jazz Evening",
    subtitle: "Saturday Lounge Sessions",
    description:
      "Relax in our luxury lounge while talented jazz musicians create an intimate atmosphere accompanied by premium wines and gourmet dining.",
    image: jazzImg,
  },

  {
    id: 3,
    tag: "Monthly",
    title: "Celebrity Concert Night",
    subtitle: "Special Monthly Event",
    description:
      "Join exclusive performances from renowned singers and artists. VIP seating, signature menus, and a spectacular production create a truly memorable night.",
    image: concertImg,
  }
]

function Events() {

  return (
    <section className="relative bg-[#0a0a0a] text-white py-32 px-8 md:px-20 overflow-hidden">

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(212,175,55,0.05) 0%, transparent 70%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative text-center mb-28"
      >
        <p className="font-cinzel text-xs tracking-[6px] uppercase text-[#D4AF37] mb-5">
          Noire Palace · Entertainment
        </p>

        <h2 className="font-cormorant text-5xl md:text-7xl font-light leading-none text-[#f0ede6]">
          Events &amp;{" "}
          <span className="italic text-[#D4AF37]">Entertainment</span>
        </h2>

        <div className="mt-10 flex items-center justify-center gap-4">
          <div
            className="h-px w-20"
            style={{ background: "linear-gradient(90deg, transparent, #D4AF37)" }}
          />
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <rect x="4.5" y="0" width="1" height="10" fill="#D4AF37" />
            <rect x="0" y="4.5" width="10" height="1" fill="#D4AF37" />
          </svg>
          <div
            className="h-px w-20"
            style={{ background: "linear-gradient(90deg, #D4AF37, transparent)" }}
          />
        </div>

        <p className="mt-10 text-[#a09880] max-w-2xl mx-auto text-lg leading-relaxed">
          Discover exclusive experiences, live performances, luxury gatherings,
          and unforgettable nights.
        </p>
      </motion.div>

      <div className="relative space-y-36">

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

            <div className="flex-1 relative">

              <div className="overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)] transition-shadow duration-700 hover:shadow-[0_20px_70px_rgba(212,175,55,0.15)]">
                <img
                  src={event.image}
                  alt={event.title}
                  className="
                    w-full
                    h-[550px]
                    object-cover
                    transition-all
                    duration-700
                    hover:scale-110
                    hover:brightness-75
                  "
                />
              </div>

              <div
                className={`
                  absolute
                  -top-4
                  ${index % 2 === 0 ? "-left-4" : "-right-4"}
                  -rotate-6
                  bg-black/70
                  backdrop-blur-md
                `}
                style={{
                  border: "1px solid rgba(212,175,55,0.4)",
                }}
              >
                <p className="font-cinzel text-xs tracking-[4px] uppercase text-[#D4AF37] px-5 py-2.5">
                  {event.tag}
                </p>
              </div>

            </div>


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

              <p className="font-cinzel text-xs tracking-[4px] uppercase text-[#D4AF37] mb-4">
                {event.subtitle}
              </p>

              <h3 className="font-cormorant text-4xl md:text-5xl font-light italic text-[#f0ede6] mb-6">
                {event.title}
              </h3>

              <div className="w-[40px] h-px bg-[#D4AF37]/50 mb-8" />

              <p className="text-[#a09880] text-lg leading-relaxed mb-10">
                {event.description}
              </p>


            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Events
