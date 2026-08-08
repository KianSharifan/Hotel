import { motion } from "framer-motion";
import LuxurySection from "../layouts/AmenitiesLayout"
import gym1 from "../assets/gym.png"
import gym2 from "../assets/gym2.png"
import gymH from "../assets/gymHero.png"


export default function Gym() {
  return (
    <div className="bg-gradient-to-b from-slate-50 via-white to-white min-h-screen">
      <div
        className="relative h-[65vh] flex items-center justify-center text-center bg-cover bg-center"
        style={{ backgroundImage: `url(${gymH})` }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 45%, rgba(0,0,0,0.4) 100%)",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 px-6"
        >
          <p className="font-cormorant italic text-base tracking-[4px] uppercase text-slate-200 mb-4">
            Strength &amp; Discipline
          </p>

          <h1 className="font-cormorant text-5xl md:text-7xl font-light tracking-wide text-white">
            Fitness <span className="italic text-slate-300">Center</span>
          </h1>

          <div className="w-16 h-px bg-slate-200/70 mx-auto mt-6" />
        </motion.div>
      </div>

      <LuxurySection
        title="Strength & Endurance"
        subtitle="Train without limits"
        image={gym2}
      >
        State-of-the-art equipment and open, sunlit space designed to power
        every kind of workout, from strength training to high-intensity cardio.
      </LuxurySection>

      <LuxurySection
        reverse
        title="Personal Training"
        subtitle="Guidance built around you"
        image={gym1}
      >
        Certified trainers offer personalized sessions, tailored programs,
        and expert coaching to help you reach your goals during your stay.
      </LuxurySection>
    </div>
  );
}
