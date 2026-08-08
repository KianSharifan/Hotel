import { motion } from "framer-motion";
import LuxurySection from "../layouts/AmenitiesLayout";
import pbeach1 from "../assets/privateBeach.png"
import pbeach2 from "../assets/privateBeach2.png"
import pbeachH from "../assets/privateBeachHero.png"

export default function PrivateBeach() {
  return (
    <div className="bg-gradient-to-b from-blue-50 via-white to-white min-h-screen">
      <div
        className="relative h-[65vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${pbeachH})` }}
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
          <p className="font-cormorant italic text-base tracking-[4px] uppercase text-cyan-200 mb-4">
            Secluded &amp; Serene
          </p>

          <h1 className="font-cormorant text-5xl md:text-7xl font-light tracking-wide text-white">
            Private <span className="italic text-cyan-300">Beach</span>
          </h1>

          <div className="w-16 h-px bg-cyan-200/70 mx-auto mt-6" />
        </motion.div>
      </div>

      <LuxurySection
        title="Exclusive Shoreline"
        subtitle="Secluded luxury experience"
        image={pbeach2}
      >
        Enjoy crystal-clear waters, soft white sand, and absolute privacy in
        your own luxury beachfront escape.
      </LuxurySection>

      <LuxurySection
        reverse
        title="Sunset Lounge"
        subtitle="Unforgettable evenings"
        image={pbeach1}
      >
        Private cabanas, cocktail service, and sunset views designed for pure
        relaxation.
      </LuxurySection>
    </div>
  );
}
