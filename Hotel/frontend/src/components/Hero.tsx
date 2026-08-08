import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import hotelImage from "../assets/hotelImg.png";
import logo from "../assets/logo.png";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative h-screen w-full overflow-hidden">

      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: 1.06 }}
        transition={{
          duration: 30,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
        className="absolute inset-0"
      >
        <img
          src={hotelImage}
          alt="Noire Palace"
          className="h-full w-full object-cover"
        />
      </motion.div>


      <div className="absolute inset-0 bg-black/40" />

      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent" />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/20" />

      <div className="absolute left-[-250px] top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-amber-500/10 blur-[180px]" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.3 }}
        className="
          relative
          z-20
          flex
          h-full
          items-center
          justify-center
          text-center
          px-6
        "
      >
        <div className="max-w-3xl flex flex-col items-center pt-13">

          <motion.img
            src={logo}
            alt="Noire Palace"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="
              w-[360px]
              md:w-[430px]
              xl:w-[500px]
              object-contain
              
              drop-shadow-[0_0_25px_rgba(212,175,55,.12)]
            "
          />

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: .6 }}
            className="
              text-white
              font-cormorant
              text-2xl
              md:text-3xl
              font-light
              tracking-wide
              
            "
          >
            Extraordinary Stays Await
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: .8 }}
            className="
              max-w-2xl
              text-stone-300
              text-lg
              leading-9
              font-cormorant
              mb-12
            "
          >
            Crafted for those who seek exceptional comfort,
            timeless elegance, and unforgettable experiences
            in the heart of Noire Palace.
          </motion.p>

   
          <motion.button
            whileHover={{
              scale: 1.03,
              y: -2
            }}
            whileTap={{
              scale: .97
            }}
            onClick={() => navigate("/reservation")}
            className="
              px-12
              py-4

              border
              border-[#9f8550]

              text-[#f4e6c2]

              uppercase

              tracking-[0.35em]

              text-xs

              bg-black/20
              backdrop-blur-md

              hover:bg-[#9f8550]
              hover:text-black

              transition-all
              duration-500

              shadow-[0_15px_40px_rgba(0,0,0,.4)]
            "
          >
            Book Your Stay
          </motion.button>

        </div>
      </motion.div>

          </section>
        );
      }