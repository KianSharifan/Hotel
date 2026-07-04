// import hotelImage from "../assets/hero.png"
// import hotelImage2 from "../assets/hotelImg2.png"
// import { useNavigate } from "react-router-dom"
// import { motion } from "motion/react"

// function Hero() {
//     const navigate = useNavigate()

//   return (

//     <section
//       className="
//       w-full
//       relative
//       h-screen
     
//       bg-cover
//       bg-center
//       flex
//       overflow-hidden
//       items-center
//       justify-center
//       "
//     //   style={{
//     //     backgroundImage:
//     //       "url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070')"
//     //   }}

//     style={{
//         backgroundImage: `url(${hotelImage2})`
//     }}
//     >

//       {/* Dark Overlay */}
//       <div className="absolute inset-0 bg-black/50"></div>

//       {/* Content */}
//       <motion.div className="relative z-10 text-center  max-w-4xl px-6"
//         initial={{
//             opacity: 0,
//             y: 80
//           }}

//           animate={{
//             opacity: 1,
//             y: 0
//           }}

//           transition={{
//             duration: 1.2
//           }}>

//         <p className="text-[#9F8B4A] uppercase tracking-[10px] mb-6 text-lg">

//           Luxury Resort & Spa

//         </p>

//         <h1 className="text-black drop-shadow-[0_0_10px_rgba(212,175,55,0.8)] text-7xl md:text-8xl leading-tight mb-8 font-cinzel">

//           Experience Timeless Elegance

//         </h1>

//         <p className="text-[#B99939] text-xl md:text-2xl mb-10">

//           Discover world-class hospitality,
//           breathtaking suites,
//           and unforgettable moments.

//         </p>

//         <div className="text-[#B99939] flex justify-center gap-6 flex-wrap">

//           <button
//             onClick={() => navigate("/rooms")}
//             className="
//             bg-black
//             border
//             border-2
//             px-8
//             py-4
//             rounded-xl
//             text-lg
//             hover:bg-[#9E781A]
//             hover:text-black
//             transition
//             text-[#9E781A]
//             "
//           >
//             Explore Rooms
//           </button>

//           <button
//             className="
//             bg-black
//             border
//             border-2
//             text-[#9E781A]
//             px-8
//             py-4
//             rounded-xl
//             text-lg
//             hover:bg-[#9E781A]
//             hover:text-black
//             transition
//             "
//             onClick={() => navigate("/reservation")}
//           >
//             Book Now
//           </button>

//         </div>

//       </motion.div>

//     </section>
//   )
// }

// export default Hero












import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import hotelImage from "../assets/hotelImg.png";
import logo from "../assets/logo.png";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative h-screen w-full overflow-hidden">

      {/* Animated Background */}
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

        {/* <video    
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover">
          <source src={heroVideo} type="video/mp4" />
        </video> */}
      </motion.div>

      {/* Cinematic Overlays */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent" />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/20" />

      {/* Golden Glow */}
      <div className="absolute left-[-250px] top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-amber-500/10 blur-[180px]" />

      {/* Hero Content */}
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

          {/* Logo */}
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

          {/* Tagline */}
          {/* <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: .4 }}
            className="
              uppercase
              tracking-[0.55em]
              text-[#b79a5a]
              text-[11px]
              md:text-xs
              font-cinzel
              mb-5
            "
          >
            Luxury Hotel • Resort • Spa
          </motion.p> */}

          {/* Heading */}
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

          {/* Description */}
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

          {/* Button */}
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