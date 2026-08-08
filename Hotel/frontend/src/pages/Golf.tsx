import { motion } from "framer-motion";
import LuxurySection from "../layouts/AmenitiesLayout"
import golf1 from "../assets/golf.png"
import golf2 from "../assets/golf2.png"
import golfHero from "../assets/golfHero.png"

export default function Golf() {
  return (
    <div className="bg-gradient-to-b from-green-50 via-white to-white min-h-screen">
      <div
        className="relative h-[65vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${golfHero})` }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 45%, rgba(0,0,0,0.35) 100%)",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 px-6"
        >
          <p className="font-cormorant italic text-base tracking-[4px] uppercase text-emerald-200 mb-4">
            Coastal Fairways
          </p>

          <h1 className="font-cormorant text-5xl md:text-7xl font-light tracking-wide text-white">
            Oceanview <span className="italic text-emerald-300">Golf</span>
          </h1>

          <div className="w-16 h-px bg-emerald-200/70 mx-auto mt-6" />
        </motion.div>
      </div>

      <LuxurySection
        title="Championship Course"
        subtitle="Designed for precision and beauty"
        image={golf2}
      >
        Play on a world-class 18-hole golf course surrounded by breathtaking
        coastal views and perfect fairways.
      </LuxurySection>

      <LuxurySection
        reverse
        title="Elite Training"
        subtitle="Perfect your swing"
        image={golf1}
      >
        Private coaching, advanced simulators, and pro-level facilities for all
        skill levels.
      </LuxurySection>
    </div>
  );
}
