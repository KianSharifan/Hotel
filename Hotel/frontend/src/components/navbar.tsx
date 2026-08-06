import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logosmall.png";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, logout } = useAuth();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 80);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close the mobile menu whenever the route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const isHome = location.pathname === "/";
  const floatingNavbar = isHome && !scrolled;

  const navLinks = [
    { title: "Home", path: "/" },
    { title: "Rooms", path: "/rooms" },
    { title: "Dining", path: "/restaurant" },
    { title: "Spa", path: "/amenities/spa" },
  ];

  function go(path: string) {
    navigate(path);
    setMobileOpen(false);
  }

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
      <div className="flex items-center justify-between px-5 sm:px-8 py-2.5">
          <motion.img
            src={logo}
            alt="Noire Palace"
            whileHover={{ scale: 1.05 }}
            onClick={() => go("/")}
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

        <div className="hidden lg:flex items-center gap-5">
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

        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          className={`
            lg:hidden
            p-2
            -mr-2
            rounded-md
            transition-colors duration-300
            ${floatingNavbar ? "text-white" : "text-black"}
          `}
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden border-t border-white/10"
          >
            <nav className="flex flex-col px-5 sm:px-8 py-4 gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.title}
                  onClick={() => go(link.path)}
                  className={`
                    text-left
                    text-sm
                    uppercase
                    tracking-[4px]
                    py-3
                    border-b border-white/10 last:border-b-0
                    transition-colors duration-300
                    hover:text-[#D4AF37]
                    ${floatingNavbar ? "text-white" : "text-black"}
                  `}
                >
                  {link.title}
                </button>
              ))}

              <div className="pt-4 flex flex-col gap-3">
                {user ? (
                  <>
                    <span
                      className={`text-sm ${
                        floatingNavbar ? "text-stone-200" : "text-stone-700"
                      }`}
                    >
                      {user.username}
                    </span>
                    <button
                      onClick={() => {
                        logout();
                        setMobileOpen(false);
                      }}
                      className="
                        w-full
                        px-4 py-2
                        uppercase
                        tracking-[3px]
                        text-sm
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
                    onClick={() => go("/login")}
                    className="
                      w-full
                      px-4 py-2
                      uppercase
                      tracking-[3px]
                      text-sm
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
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
