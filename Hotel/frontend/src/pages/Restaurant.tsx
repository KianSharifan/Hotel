import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import heroImg from "../assets/restaurantHero.png"
import diningImg from "../assets/diningAmbiance.png"
import wagyuImg from "../assets/wagyuDish.png"
import lobsterImg from "../assets/lobsterDish.png"
import dessertImg from "../assets/dessertDish.png"

function Restaurant() {
  const navigate = useNavigate()

  const dishes = [
    {
      name: "Wagyu Royal Steak",
      tag: "Signature",
      image: wagyuImg,
      description: "Premium Japanese Wagyu with truffle sauce."
    },
    {
      name: "Ocean Lobster",
      tag: "Chef's Choice",
      image: lobsterImg,
      description: "Fresh lobster with herb butter."
    },
    {
      name: "Golden Dessert",
      tag: "Finale",
      image: dessertImg,
      description: "Signature dessert with edible gold."
    }
  ]

  return (

    <div className="bg-[#0a0a0a] text-white">
      <section
        className="
          h-screen
          bg-cover
          bg-center
          flex
          items-center
          justify-center
          relative
        "
        style={{
          backgroundImage: `url(${heroImg})`
        }}
      >

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.3) 45%, rgba(0,0,0,0.9) 100%)",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-6"
        >

          <p className="font-cinzel text-xs tracking-[6px] uppercase text-[#D4AF37] mb-6">
            Noire Palace · Fine Dining
          </p>

          <h1 className="font-cormorant text-6xl md:text-8xl font-light italic text-[#f0ede6] mb-6">
            Noire Restaurant
          </h1>

          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-16" style={{ background: "linear-gradient(90deg, transparent, #D4AF37)" }} />
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
              <rect x="3.5" y="0" width="1" height="8" fill="#D4AF37" />
              <rect x="0" y="3.5" width="8" height="1" fill="#D4AF37" />
            </svg>
            <div className="h-px w-16" style={{ background: "linear-gradient(90deg, #D4AF37, transparent)" }} />
          </div>

          <p className="font-cinzel text-sm tracking-[3px] uppercase text-white/50 mb-12">
            A Luxury Fine Dining Experience
          </p>

          <div className="flex justify-center gap-6">
            <button
              onClick={()=>navigate("/restaurant/menu")}
              className="w-52 bg-white text-black px-8 py-4 rounded-xl border-2 border-gray-700/50
              transition-all
              duration-300
              hover:bg-gray-300
              hover:scale-105">
              Menu
            </button>

            <button
              onClick={()=>navigate("/restaurant/restaurantReservation")}
              className="w-52 bg-white text-black px-8 py-4 rounded-xl border-2 border-gray-700/50
              transition-all
              duration-300
              hover:bg-gray-300
              hover:scale-105">
              Reserve Table
            </button>
          </div>

        </motion.div>
      </section>


      <section
        className="py-32 px-10 max-w-6xl mx-auto"
      >

        <div className="grid md:grid-cols-2 gap-16 items-center">

          <motion.img
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true, amount: 0.3 }}
            src={diningImg}
            className="h-[600px] object-cover w-full"
          />

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <p className="font-cinzel text-xs tracking-[4px] uppercase text-[#D4AF37] mb-5">
              Culinary Artistry
            </p>

            <h2 className="font-cormorant text-5xl md:text-6xl font-light text-[#f0ede6] mb-6">
              Where Flavor Meets Artistry
            </h2>

            <div className="w-[50px] h-px bg-[#D4AF37]/50 mb-8" />

            <p className="text-[#a09880] text-lg leading-relaxed mb-10">
              Every plate at Noire Restaurant is composed by chefs who treat
              seasonal, world-class ingredients as raw material for a
              story told course by course.
            </p>

            <div className="flex flex-wrap gap-x-10 gap-y-4">
              {["Tasting Menus", "Curated Wine List", "Open Nightly"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-[#D4AF37]" />
                  <span className="font-cinzel text-xs tracking-[2px] uppercase text-white/50">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

      </section>


      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${diningImg})` }}
        />
        <div className="absolute inset-0 bg-black/70" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          className="relative z-10 text-center px-6 max-w-3xl"
        >
          <p className="font-cormorant text-3xl md:text-5xl italic font-light text-[#f0ede6] leading-snug">
            "Every plate is a story, every evening an occasion."
          </p>
          <p className="font-cinzel text-xs tracking-[4px] uppercase text-[#D4AF37] mt-8">
            — Executive Chef, Noire Palace
          </p>
        </motion.div>
      </section>


      <section className="py-32 px-10 max-w-6xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.4 }}
          className="text-center mb-20"
        >
          <p className="font-cinzel text-xs tracking-[6px] uppercase text-[#D4AF37] mb-5">
            The Tasting
          </p>
          <h2 className="font-cormorant text-5xl md:text-6xl font-light text-[#f0ede6]">
            Signature Dishes
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-10">
          {dishes.map((dish, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
              className="group relative overflow-hidden"
            >

              <div className="relative h-96 overflow-hidden">
                <img
                  src={dish.image}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(to top, rgba(0,0,0,0.85) 10%, transparent 60%)",
                  }}
                />
                <span
                  className="absolute top-5 left-5 font-cinzel text-[0.65rem] tracking-[3px] uppercase text-[#D4AF37] px-3 py-1.5"
                  style={{
                    border: "1px solid rgba(212,175,55,0.4)",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    backdropFilter: "blur(6px)",
                  }}
                >
                  {dish.tag}
                </span>
              </div>

              <div className="pt-6">
                <h3 className="font-cormorant text-2xl italic font-light text-[#f0ede6] mb-2">
                  {dish.name}
                </h3>
                <p className="text-[#a09880] text-sm leading-relaxed">
                  {dish.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Restaurant
