import { motion } from "framer-motion";
import LuxurySection from "../layouts/AmenitiesLayout";
import pool1 from "../assets/pool.png"
import pool2 from "../assets/pool2.png"
import poolH from "../assets/poolHero.png"

export default function Pool() {
  return (
    <div className="bg-gradient-to-b from-sky-50 via-white to-white min-h-screen">
      <div
        className="relative h-[65vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${poolH})` }}
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
          <p className="font-cormorant italic text-base tracking-[4px] uppercase text-sky-200 mb-4">
            Where Sky Meets Water
          </p>

          <h1 className="font-cormorant text-5xl md:text-7xl font-light tracking-wide text-white">
            Infinity <span className="italic text-sky-300">Pool</span>
          </h1>

          <div className="w-16 h-px bg-sky-200/70 mx-auto mt-6" />
        </motion.div>
      </div>

      <LuxurySection
        title="Skyline Infinity Pool"
        subtitle="Swim above the horizon"
        image={pool2}
      >
        A breathtaking infinity pool blending seamlessly with ocean and sky.
        Designed for ultimate relaxation and luxury.
      </LuxurySection>

      <LuxurySection
        reverse
        title="Poolside Service"
        subtitle="Luxury at every moment"
        image={pool1}
      >
        Enjoy cocktails, gourmet snacks, and private cabana service without
        leaving the water.
      </LuxurySection>
    </div>
  );
}
