// import { Link } from "react-router-dom"
// import { useNavigate } from "react-router-dom"
// import { useAuth } from "../context/AuthContext"

// function Navbar() {

//   const navigate = useNavigate()
//   const { user, logout } = useAuth()

//   return (

//     <header
//       className="
//       absolute
//       top-0
//       left-0
//       w-full
//       z-50

//       flex
//       justify-between
//       items-center

//       px-14
//       py-8

//       text-white
//       "
//     >

//       <div className="flex items-center gap-14">

//         <h1
//           className="
//           text-3xl
//           font-bold
//           tracking-[4px]
//           cursor-pointer
//           font-cormorant
//           "
//           onClick={() => navigate("/")}
//         >
//           NOIRE PALACE
//         </h1>

//         <nav className="flex gap-10 text-lg">

//           <button
//             onClick={() => navigate("/")}

//             className="
//             hover:text-gray-500
//             transition
//             "
//           >
//             Home
//           </button>

//           <button
//             onClick={() => navigate("/rooms")}

//             className="
//             hover:text-gray-500
//             transition
//             "
//           >
//             Rooms
//           </button>

//           <button
//             onClick={() => navigate("/restaurant")}

//             className="
//             hover:text-gray-500
//             transition
//             "
//           >
//             Restaurant
//           </button>

//           <button
//             onClick={() => navigate("/amenities/spa")}
//             className="
//             hover:text-gray-500
//             transition">
//             Spa
//           </button>

//         </nav>
//       </div>


//       {
//         user ? (
//           <div className="flex items-center gap-4">

//             <span className="text-sm">
//               {user.username}
//             </span>

//             <button
//               onClick={logout}
//               className="
//               border
//               border-[#c8a84b]
//               px-4
//               py-2
//               rounded-xl
//               "
//             >
//               Logout
//             </button>

//           </div>
//         ) : (
//           <button
//             onClick={() => navigate("/login")}
//             className="
//             border
//             border-white
//             px-5
//             py-2
//             rounded-xl
//             hover:bg-white
//             hover:text-black
//             transition
//             "
//           >
//             Login
//           </button>
//         )
//       }
//       {/* <button 
//         onClick={() => navigate("/login")}
//         className="
//         text-right
//         transition
//         text-lg
//         border
//         border-white
//         px-5
//         py-2
//         rounded-xl
//         text-l
//         hover:bg-white
//         hover:text-black
//         transition
//         "
//       >
//         Login
//       </button> */}


//     </header>

//   )
// }

// export default Navbar



import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logosmall.png";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, logout } = useAuth();

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 80);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isHome = location.pathname === "/";
  const floatingNavbar = isHome && !scrolled;

  const navLinks = [
    { title: "Home", path: "/" },
    { title: "Rooms", path: "/rooms" },
    { title: "Dining", path: "/restaurant" },
    { title: "Spa", path: "/amenities/spa" },
  ];

  return (
    <motion.header
      className={`
        fixed top-6 left-1/2 -translate-x-1/2
        z-[999]
        w-[94%] max-w-[1600px]
        transition-all duration-700
        ${
          floatingNavbar
            ? `
              bg-black/20
              backdrop-blur-xl
              border border-white/10
              rounded-lg
            `
            : `
              bg-[#A9967A]
              backdrop-blur-xl
              shadow-2xl
              rounded-lg
            `
        }
      `}
    >
      <div className="flex items-center justify-between px-8 py-2.5">
        {/* Logo */}
        {/* <motion.h1
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate("/")}
          className={`
            cursor-pointer
            select-none
            font-cinzel
            text-3xl
            tracking-[8px]
            transition-all
            ${
              floatingNavbar
                ? "text-white"
                : "text-black"
            }
          `}
        >
          NOIRE PALACE */}
        {/* </motion.h1> */}


          <motion.img
            src={logo}
            alt="Noire Palace"
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate("/")}
            className="
              cursor-pointer
              select-none
              w-15
              h-15
              object-contain
            "
          />

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-12">
          {navLinks.map((link) => (
            <button
              key={link.title}
              onClick={() => navigate(link.path)}
              className={`
                text-sm
                uppercase
                tracking-[4px]
                transition-all
                duration-500
                hover:text-[#D4AF37]
                ${
                  floatingNavbar
                    ? "text-white"
                    : "text-black"
                }
              `}
            >
              {link.title}
            </button>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-5">
          {user ? (
            <>
              <span
                className={`text-sm ${
                  floatingNavbar
                    ? "text-stone-200"
                    : "text-stone-700"
                }`}
              >
                {user.username}
              </span>

              <button
                onClick={logout}
                className="
                  px-4 py-1.5
                  uppercase
                  tracking-[3px]
                  border border-[#D4AF37]
                  text-[#D4AF37]
                  transition-all duration-500
                  hover:bg-[#D4AF37]
                  hover:text-black
                "
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/login?return=/payment")}
              className="
                px-4 py-1.5
                uppercase
                tracking-[3px]
                bg-[#D4AF37]
                text-black
                transition-all duration-500
                hover:bg-[#EBCB6C]
              "
            >
              Login
            </button>
          )}
        </div>
      </div>
    </motion.header>
  );
}