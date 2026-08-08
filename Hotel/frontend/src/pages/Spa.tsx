import { motion } from "framer-motion";
import LuxurySection from "../layouts/AmenitiesLayout";
import spaImg1 from "../assets/spa.png"
import spaImg2 from "../assets/spa2.png"
import spaH from "../assets/spaHero.png"

export default function Spa() {
  return (
    <div className="bg-gradient-to-b from-rose-50 via-white to-white min-h-screen">
      <div
        className="relative h-[65vh] flex items-center justify-center text-center bg-cover bg-center"
        style={{ backgroundImage: `url(${spaH})` }}
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
          <p className="font-cormorant italic text-base tracking-[4px] uppercase text-rose-200 mb-4">
            Wellness &amp; Renewal
          </p>

          <h1 className="font-cormorant text-5xl md:text-7xl font-light tracking-wide text-white">
            Serenity <span className="italic text-rose-300">Spa</span>
          </h1>

          <div className="w-16 h-px bg-rose-200/70 mx-auto mt-6" />
        </motion.div>
      </div>

      <LuxurySection
        title="Healing & Relaxation"
        subtitle="A sanctuary of calm and luxury"
        image={spaImg2}
      >
        Experience world-class spa treatments designed to restore balance,
        reduce stress, and rejuvenate your body and mind.
      </LuxurySection>

      <LuxurySection
        reverse
        title="Signature Treatments"
        subtitle="Exclusive wellness rituals"
        image={spaImg1}
      >
        Aromatherapy, deep tissue massage, hot stone therapy, and personalized
        wellness sessions crafted by expert therapists.
      </LuxurySection>
    </div>
  );
}
