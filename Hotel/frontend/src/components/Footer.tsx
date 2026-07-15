import {FaInstagram, FaFacebookF, FaXTwitter} from "react-icons/fa6"

function Footer() {

  return (
    <footer className="bg-black text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 pb-14 border-b border-white/10">

          <div className="md:col-span-2 space-y-4">
            <h2 className="text-3xl font-serif italic tracking-wide">
              Noire Palace
            </h2>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Luxury Resort & Spa — an intimate sanctuary of timeless
              elegance, crafted for those who seek the extraordinary.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center hover:border-[#c8a84b]/60 hover:text-[#c8a84b] transition-colors duration-300">
                <FaInstagram size={15} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center hover:border-[#c8a84b]/60 hover:text-[#c8a84b] transition-colors duration-300">
                <FaFacebookF size={15} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center hover:border-[#c8a84b]/60 hover:text-[#c8a84b] transition-colors duration-300">
                <FaXTwitter size={15} />
              </a>
            </div>
          </div>


          <div className="space-y-4">
            <p className="text-[0.65rem] tracking-[0.3em] uppercase text-[#c8a84b]/60">
              Contact
            </p>
            <div className="space-y-2 text-sm text-white/60">
              <p className="hover:text-white transition-colors duration-300">
                212-308-9100
              </p>
              <p className="hover:text-white transition-colors duration-300">
                contact@noire.com
              </p>
            </div>
          </div>

     
          <div className="space-y-4">
            <p className="text-[0.65rem] tracking-[0.3em] uppercase text-[#c8a84b]/60">
              Location
            </p>
            <p className="text-sm text-white/60 leading-relaxed">
              220 Central Park South
              <br />
              New York, NY 10019
              <br />
              United States
            </p>
          </div>

        </div>

     
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs tracking-wide">
            © {new Date().getFullYear()} Noire Palace. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-white/30">
            <a href="#" className="hover:text-white/60 transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white/60 transition-colors duration-300">
              Terms of Service
            </a>
          </div>
        </div>

      </div>

    </footer>
  )
}

export default Footer