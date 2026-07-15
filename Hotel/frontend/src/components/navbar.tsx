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
              onClick={() => navigate("/login")}
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