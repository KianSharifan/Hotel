import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
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
              bg-black/70
              backdrop-blur-xl
              border border-[#D4AF37]/15
              shadow-[0_8px_30px_rgba(0,0,0,0.5)]
              rounded-lg
            `
        }
      `}
    >
      <div className="flex items-center justify-between px-5 sm:px-8 py-3.5">
        <button
          onClick={() => go("/")}
          className="flex items-center gap-2.5 cursor-pointer select-none group"
        >
          <span className="font-cinzel text-xl sm:text-xl tracking-[3px] text-[#f0ede6] transition-colors duration-500 group-hover:text-[#D4AF37]">
            Noire Palace
          </span>
        </button>

        <nav className="hidden lg:flex items-center gap-12">
          {navLinks.map((link) => (
            <button
              key={link.title}
              onClick={() => navigate(link.path)}
              className="
                font-cinzel
                text-xs
                uppercase
                tracking-[3px]
                text-white/80
                transition-all
                duration-500
                hover:text-[#D4AF37]
              "
            >
              {link.title}
            </button>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-5">
          {user ? (
            <>
              <span className="font-cinzel text-xs tracking-[1px] text-white/50">
                {user.username}
              </span>

              <button
                onClick={logout}
                className="
                  font-cinzel
                  px-4 py-1.5
                  text-xs
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
                font-cinzel
                px-4 py-1.5
                text-xs
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
          className="
            lg:hidden
            p-2
            -mr-2
            rounded-md
            text-white/90
            transition-colors duration-300
          "
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden border-t border-[#D4AF37]/10"
          >
            <nav className="flex flex-col px-5 sm:px-8 py-4 gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.title}
                  onClick={() => go(link.path)}
                  className="
                    font-cinzel
                    text-left
                    text-xs
                    uppercase
                    tracking-[3px]
                    py-3
                    text-white/80
                    border-b border-white/10 last:border-b-0
                    transition-colors duration-300
                    hover:text-[#D4AF37]
                  "
                >
                  {link.title}
                </button>
              ))}

              <div className="pt-4 flex flex-col gap-3">
                {user ? (
                  <>
                    <span className="font-cinzel text-xs tracking-[1px] text-white/50">
                      {user.username}
                    </span>
                    <button
                      onClick={() => {
                        logout();
                        setMobileOpen(false);
                      }}
                      className="
                        font-cinzel
                        w-full
                        px-4 py-2
                        text-xs
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
                    onClick={() => go("/login")}
                    className="
                      font-cinzel
                      w-full
                      px-4 py-2
                      text-xs
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
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
