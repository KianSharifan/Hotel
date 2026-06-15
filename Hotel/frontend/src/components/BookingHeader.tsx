import { useNavigate, useLocation } from "react-router-dom"
import { useBooking } from "../context/BookingContext"
import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Users, Calendar, BedDouble, CreditCard, AlertTriangle, X } from "lucide-react"

const STEPS = [
  { num: 1, label: "Guests", icon: Users, path: "/reservation/guests" },
  { num: 2, label: "Dates", icon: Calendar, path: "/reservation/dates" },
  { num: 3, label: "Room", icon: BedDouble, path: "/reservation/rooms" },
  { num: 4, label: "Payment", icon: CreditCard, path: "/reservation/payment" },
]

export default function BookingHeader() {
  const { booking, resetBooking } = useBooking()
  const navigate = useNavigate()
  const location = useLocation()
  const [warningFor, setWarningFor] = useState<number | null>(null)

  const currentStep = STEPS.findIndex((s) => location.pathname === s.path) + 1
  const totalGuests = booking.adults + booking.children

  const stepSummary = (num: number) => {
    if (num === 1 && totalGuests > 0)
      return `${booking.adults} adult${booking.adults !== 1 ? "s" : ""}${booking.children > 0 ? `, ${booking.children} child${booking.children !== 1 ? "ren" : ""}` : ""}`
    if (num === 2 && booking.checkIn)
      return `${fmtDate(booking.checkIn)} → ${booking.checkOut ? fmtDate(booking.checkOut) : "?"}`
    if (num === 3 && booking.selectedRoom)
      return booking.selectedRoom.name
    if (num === 4 && booking.selectedRoom)
      return `$${calcTotal()} total`
    return null
  }

  function fmtDate(d: string) {
    if (!d) return ""
    const dt = new Date(d + "T12:00:00")
    return dt.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  function calcTotal() {
    if (!booking.selectedRoom || !booking.checkIn || !booking.checkOut) return 0
    const diff = (new Date(booking.checkOut).getTime() - new Date(booking.checkIn).getTime()) / 86400000
    return (diff * booking.selectedRoom.price).toLocaleString()
  }

  function isLocked(stepNum: number) {
    return stepNum > booking.step
  }

  function isLockedBack(stepNum: number) {
    return booking.selectedRoom !== null && stepNum < 3
  }

  function handleStepClick(stepNum: number, path: string) {
    if (isLocked(stepNum)) return
    if (isLockedBack(stepNum)) {
      setWarningFor(stepNum)
      return
    }
    navigate(path)
  }

  function confirmReset() {
    resetBooking()
    setWarningFor(null)
    navigate("/reservation/guests")
  }

  return (
    <>
      {/* Warning Modal */}
      <AnimatePresence>
        {warningFor !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 30 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-gradient-to-br from-[#111] to-[#1a1a1a] border border-[#c8a84b]/30 rounded-3xl p-12 max-w-[440px] w-[90%] text-center font-serif-lux"
            >
              <div className="w-14 h-14 rounded-full bg-[#c8a84b]/10 border border-[#c8a84b]/30 flex items-center justify-center mx-auto mb-6">
                <AlertTriangle size={24} className="text-[#c8a84b]" />
              </div>
              <h2 className="text-3xl font-light italic text-white mb-3">
                Modify Selection?
              </h2>
              <p className="text-white/50 text-base leading-relaxed mb-8 font-sans font-light">
                Changing your guests or dates will reset your room selection and all progress. This cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setWarningFor(null)}
                  className="flex-1 py-3.5 rounded-xl border border-white/15 bg-transparent text-white/60 cursor-pointer text-sm font-sans transition-all hover:border-white/40"
                >
                  Keep Selection
                </button>
                <button
                  onClick={confirmReset}
                  className="flex-1 py-3.5 rounded-xl bg-gradient-to-br from-[#c8a84b] to-[#a07830] border-none text-black cursor-pointer text-sm font-semibold font-sans transition-all hover:opacity-85"
                >
                  Reset &amp; Modify
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-[1000] bg-[#060606]/92 backdrop-blur-xl border-b border-[#c8a84b]/15 font-serif-lux">
        {/* Top bar: logo + cancel */}
        <div className="flex items-center justify-between px-12 pt-4 max-w-[1400px] mx-auto">
          <motion.div
            className="cursor-pointer flex items-baseline gap-2.5"
            onClick={() => navigate("/")}
            whileHover={{ opacity: 0.75 }}
          >
            <span className="text-2xl italic font-light text-[#c8a84b] tracking-wide">
              Noire Palace
            </span>
            <span className="text-[0.6rem] text-[#c8a84b]/40 tracking-[0.3em] uppercase">
              Reservation
            </span>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { resetBooking(); navigate("/") }}
            className="flex items-center gap-2 bg-transparent border border-white/12 rounded-lg px-4.5 py-2 cursor-pointer text-white/45 text-xs tracking-[0.2em] uppercase font-sans transition-all hover:border-red-400/40 hover:text-red-400/80"
          >
            <X size={12} />
            Cancel Reservation
          </motion.button>
        </div>

        {/* Steps */}
        <div className="flex items-stretch max-w-[1400px] mx-auto px-12">
          {STEPS.map((step, idx) => {
            const locked = isLocked(step.num)
            const lockedBack = isLockedBack(step.num)
            const isActive = currentStep === step.num
            const isDone = booking.step > step.num && step.num < 4
            const summary = stepSummary(step.num)
            const Icon = step.icon

            return (
              <div key={step.num} className="flex flex-1 items-center">
                <motion.button
                  onClick={() => handleStepClick(step.num, step.path)}
                  whileHover={!locked ? { y: -1 } : {}}
                  whileTap={!locked ? { scale: 0.98 } : {}}
                  className={`flex-1 flex flex-col items-start px-5 pt-4.5 pb-3.5 bg-transparent border-none relative transition-all duration-300 ${
                    locked ? "cursor-not-allowed opacity-30" : lockedBack ? "cursor-pointer opacity-50" : "cursor-pointer opacity-100"
                  }`}
                >
                  {/* Active underline */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#c8a84b] via-[#f5e09a] to-[#c8a84b] origin-left"
                    initial={false}
                    animate={{ scaleX: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />

                  {/* Step number + icon row */}
                  <div className="flex items-center gap-2.5 mb-1">
                    <div className={`w-6.5 h-6.5 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-400 ${
                      isDone
                        ? "bg-gradient-to-br from-[#c8a84b] to-[#a07830] border-none"
                        : isActive
                          ? "bg-[#c8a84b]/15 border border-[#c8a84b]/60"
                          : "bg-white/5 border border-white/10"
                    }`}>
                      {isDone
                        ? <span className="text-[0.65rem] text-black font-bold">✓</span>
                        : <Icon size={12} className={isActive ? "text-[#c8a84b]" : "text-white/30"} />
                      }
                    </div>
                    <span className={`text-[0.6rem] uppercase tracking-[0.25em] font-sans font-medium transition-colors duration-300 ${
                      isActive ? "text-[#c8a84b]" : "text-white/35"
                    }`}>
                      {step.label}
                    </span>
                    {lockedBack && (
                      <span className="text-[0.5rem] text-[#c8a84b]/50 ml-1">🔒</span>
                    )}
                  </div>

                  {/* Summary value */}
                  <div className="pl-9">
                    {summary ? (
                      <motion.span
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`text-sm italic font-light whitespace-nowrap overflow-hidden text-ellipsis block max-w-[180px] ${
                          isActive ? "text-white" : "text-white/55"
                        }`}
                      >
                        {summary}
                      </motion.span>
                    ) : (
                      <span className="text-xs text-white/20 font-sans not-italic">
                        {locked ? "Complete previous step" : "Not selected"}
                      </span>
                    )}
                  </div>
                </motion.button>

                {/* Divider */}
                {idx < STEPS.length - 1 && (
                  <div className="w-px h-9 bg-[#c8a84b]/15 flex-shrink-0" />
                )}
              </div>
            )
          })}
        </div>
      </header>
    </>
  )
}
