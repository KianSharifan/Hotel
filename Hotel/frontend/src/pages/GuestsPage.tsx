import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "motion/react"
import { useBooking } from "../context/BookingContext"
import BookingHeader from "../components/BookingHeader"
import { Minus, Plus } from "lucide-react"

function Counter({
  label, sublabel, value, onChange, min = 0, max = 8
}: {
  label: string; sublabel: string; value: number
  onChange: (v: number) => void; min?: number; max?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      whileHover={{ borderColor: "rgba(200,168,75,0.28)" }}
      className="flex items-center justify-between p-9 bg-white/[0.02] border border-[#c8a84b]/12 rounded-2xl backdrop-blur-md transition-colors duration-300"
    >
      <div>
        <p className="font-serif-lux text-2xl font-light italic text-white mb-1">{label}</p>
        <p className="text-xs text-white/30 tracking-[0.15em] font-sans uppercase">
          {sublabel}
        </p>
      </div>

      <div className="flex items-center gap-7">
        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className={`w-11 h-11 rounded-full border border-[#c8a84b]/30 bg-transparent flex items-center justify-center transition-all duration-200 ${
            value <= min ? "cursor-not-allowed opacity-25" : "cursor-pointer opacity-100"
          }`}
        >
          <Minus size={16} className="text-[#c8a84b]" />
        </motion.button>

        <motion.span
          key={value}
          initial={{ scale: 1.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="font-serif-lux text-5xl font-light text-[#c8a84b] min-w-[48px] text-center leading-none"
        >
          {value}
        </motion.span>

        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          className={`w-11 h-11 rounded-full border border-[#c8a84b]/30 bg-[#c8a84b]/8 flex items-center justify-center transition-all duration-200 ${
            value >= max ? "cursor-not-allowed opacity-25" : "cursor-pointer opacity-100"
          }`}
        >
          <Plus size={16} className="text-[#c8a84b]" />
        </motion.button>
      </div>
    </motion.div>
  )
}

export default function GuestsPage() {
  const { booking, setGuests, resetBooking } = useBooking()
  const navigate = useNavigate()
  const [adults, setAdults] = useState(booking.adults || 1)
  const [children, setChildren] = useState(booking.children || 0)

  const canContinue = adults >= 1

  function handleConfirm() {
    setGuests(adults, children)
    navigate("/reservation/dates")
  }

  return (
    <div className="min-h-screen bg-[#080808] pt-[120px]">
      <BookingHeader />

      {/* Background glow */}
      <div className="fixed top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(200,168,75,0.04)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-[640px] mx-auto px-6 pt-20 pb-32 relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-[0.65rem] tracking-[0.45em] uppercase text-[#c8a84b]/60 font-sans mb-4">
            Step 1 of 4
          </p>
          <h1 className="font-serif-lux text-5xl md:text-6xl font-light italic text-white leading-tight mb-4">
            Who's Joining You?
          </h1>
          <div className="w-[60px] h-px bg-gradient-to-r from-transparent via-[#c8a84b] to-transparent mx-auto" />
        </motion.div>

        {/* Counters */}
        <div className="flex flex-col gap-4 mb-12">
          <Counter
            label="Adults"
            sublabel="Ages 13 and above"
            value={adults}
            onChange={setAdults}
            min={1}
          />
          <Counter
            label="Children"
            sublabel="Ages 2 – 12"
            value={children}
            onChange={setChildren}
            min={0}
          />
        </div>

        {/* Total summary */}
        <motion.div
          animate={{ opacity: canContinue ? 1 : 0.3 }}
          className="text-center mb-10 p-5 bg-[#c8a84b]/5 border border-[#c8a84b]/10 rounded-2xl"
        >
          <span className="font-serif-lux text-base text-white/50 italic">
            {adults + children} {adults + children === 1 ? "guest" : "guests"} total
          </span>
        </motion.div>

        {/* CTA */}
        <motion.button
          onClick={handleConfirm}
          disabled={!canContinue}
          whileHover={canContinue ? { scale: 1.02 } : {}}
          whileTap={canContinue ? { scale: 0.97 } : {}}
          className={`w-full p-5 rounded-2xl font-serif-lux text-lg italic tracking-wide transition-all duration-400 ${
            canContinue
              ? "bg-gradient-to-br from-[#c8a84b] to-[#a07830] text-black cursor-pointer border-none"
              : "bg-white/5 text-white/20 cursor-not-allowed border-none"
          }`}
        >
          {canContinue ? "Continue to Dates →" : "Select at least 1 adult"}
        </motion.button>

        {/* Reset */}
        <div className="text-center mt-8">
          <button
            onClick={() => { resetBooking(); navigate("/") }}
            className="bg-none border-none cursor-pointer text-white/20 text-xs tracking-[0.2em] uppercase font-sans transition-colors duration-300 hover:text-red-400/60"
          >
            Cancel Reservation
          </button>
        </div>
      </div>
    </div>
  )
}
