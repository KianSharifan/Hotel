import { Link } from "react-router-dom"
import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import restaurantImg from "../assets/restaurant.png";
import spaImg from "../assets/spa.png";
import golfImg from "../assets/golf.png";
import poolImg from "../assets/pool.png";
import privateBeachImg from "../assets/privateBeach.png";
import gymImg from "../assets/gym.png";


const amenities = [
  {
    title: "Restaurant",
    subtitle: "Culinary Artistry",
    description: "Fine dining experience with world-class chefs crafting seasonal menus from the finest ingredients.",
    image: restaurantImg,
    link: "/restaurant",
    tag: "Fine Dining",
  },
  {
    title: "Spa",
    subtitle: "Pure Serenity",
    description: "Relax and rejuvenate in our luxury spa with treatments inspired by ancient healing traditions.",
    image: spaImg,
    link: "/amenities/spa",
    tag: "Wellness",
  },
  {
    title: "Golf",
    subtitle: "Championship Greens",
    description: "Championship golf courses surrounded by breathtaking scenery, designed by world-renowned architects.",
    image: golfImg,
    link: "/amenities/golf",
    tag: "Sport",
  },
  {
    title: "Pool",
    subtitle: "Infinite Horizons",
    description: "Infinity pools dissolving into stunning landscapes, where sky and water become one.",
    image: poolImg,
    link: "/amenities/pool",
    tag: "Leisure",
  },
  {
    title: "Private Beach",
    subtitle: "Exclusive Shores",
    description: "Exclusive beach access with luxury cabanas, curated cocktails, and your own stretch of paradise.",
    image: privateBeachImg,
    link: "/amenities/privatebeach",
    tag: "Exclusive",
  },
  {
    title: "Fitness Center",
    subtitle: "Strength Meets Serenity",
    description: "Train with state-of-the-art equipment in a sunlit sanctuary, open around the clock for every guest.",
    image: gymImg,
    link: "/amenities/gym",
    tag: "24/7 Access",
  }
]

const TOTAL = amenities.length

function getSlice(index: number) {
  return [amenities[index % TOTAL], amenities[(index + 1) % TOTAL]]
}


function ArrowBtn({
  onClick,
  direction,
}: {
  onClick: () => void
  direction: "left" | "right"
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        [direction]: "-26px",         
        zIndex: 30,
        width: "52px",
        height: "52px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid rgba(212,175,55,0.4)",
        background: hovered ? "#D4AF37" : "rgba(10,10,10,0.7)",
        color: hovered ? "#000" : "#D4AF37",
        backdropFilter: "blur(8px)",
        cursor: "pointer",
        transition: "background 0.3s, color 0.3s",
      }}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path
          d={direction === "left" ? "M11 4L6 9L11 14" : "M7 4L12 9L7 14"}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="square"
        />
      </svg>
    </button>
  )
}

export default function Amenities() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)

  function next() {
    setDirection(1)
    setCurrent((prev) => (prev + 2) % TOTAL)
  }

  function prev() {
    setDirection(-1)
    setCurrent((prev) => (prev - 2 + TOTAL) % TOTAL)
  }

  const visibleItems = getSlice(current)

  const pairCount = Math.ceil(TOTAL / 2)
  const activePair = Math.floor(current / 2)

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "55%" : "-55%",
      opacity: 0,
      scale: 0.97,
    }),
    center: {
      x: "0%",
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-55%" : "55%",
      opacity: 0,
      scale: 0.97,
    }),
  }

  return (
    <section
      className="relative py-32 overflow-hidden"
      style={{ backgroundColor: "#0a0a0a" }}
    >

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(212,175,55,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative text-center mb-20 px-6">
        <p
          className="uppercase text-xs tracking-[6px] mb-5"
          style={{ color: "#D4AF37", fontFamily: "'Cinzel', serif" }}
        >
          Noire Palace · Experiences
        </p>

        <h2
          className="text-5xl md:text-7xl font-light leading-none"
          style={{
            fontFamily: "'Cormorant Garamond', 'Georgia', serif",
            color: "#f0ede6",
          }}
        >
          Resort{" "}
          <span style={{ fontStyle: "italic", color: "#D4AF37" }}>
            Experiences
          </span>
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
      </div>


      <div className="relative max-w-7xl mx-auto px-16">
        <ArrowBtn onClick={prev} direction="left" />
        <ArrowBtn onClick={next} direction="right" />

        <div className="overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
              className="grid md:grid-cols-2 gap-6"
            >
              {visibleItems.map((item, i) => (
                <Link key={`${item.title}-${i}`} to={item.link}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="group relative overflow-hidden cursor-pointer"
                    style={{ height: "580px" }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.05) 100%)",
                      }}
                    />

                    <div className="absolute top-6 left-6">
                      <span
                        className="text-xs uppercase tracking-[4px] px-4 py-2"
                        style={{
                          fontFamily: "'Cinzel', serif",
                          color: "#D4AF37",
                          border: "1px solid rgba(212,175,55,0.4)",
                          backgroundColor: "rgba(0,0,0,0.4)",
                          backdropFilter: "blur(8px)",
                        }}
                      >
                        {item.tag}
                      </span>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <div
                        className="h-px mb-5 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                        style={{ background: "#D4AF37" }}
                      />

                      <p
                        className="text-xs uppercase tracking-[4px] mb-2"
                        style={{
                          color: "#D4AF37",
                          fontFamily: "'Cinzel', serif",
                        }}
                      >
                        {item.subtitle}
                      </p>

                      <h3
                        className="text-4xl font-light mb-3"
                        style={{
                          fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                          color: "#f0ede6",
                        }}
                      >
                        {item.title}
                      </h3>

                      <p
                        className="text-sm leading-relaxed max-w-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ color: "#a09880" }}
                      >
                        {item.description}
                      </p>

                      <div className="mt-5 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">
                        <span
                          className="text-xs uppercase tracking-[3px]"
                          style={{
                            color: "#D4AF37",
                            fontFamily: "'Cinzel', serif",
                          }}
                        >
                          Discover
                        </span>
                        <div className="h-px w-8" style={{ background: "#D4AF37" }} />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center justify-between">

          <div className="flex items-center gap-3">
            {Array.from({ length: pairCount }).map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > activePair ? 1 : -1)
                  setCurrent(i * 2)
                }}
                style={{
                  width: i === activePair ? "32px" : "6px",
                  height: "2px",
                  background:
                    i === activePair ? "#D4AF37" : "rgba(212,175,55,0.25)",
                  border: "none",
                  outline: "none",
                  cursor: "pointer",
                  padding: 0,
                  transition: "width 0.4s, background 0.4s",
                }}
              />
            ))}
          </div>

          <span
            className="text-xs tracking-[3px]"
            style={{
              color: "rgba(212,175,55,0.4)",
              fontFamily: "'Cinzel', serif",
            }}
          >
            {String(activePair + 1).padStart(2, "0")} /{" "}
            {String(pairCount).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  )
}
