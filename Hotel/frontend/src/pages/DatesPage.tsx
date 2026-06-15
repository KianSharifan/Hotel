import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "motion/react"
import { useBooking } from "../context/BookingContext"
import BookingHeader from "../components/BookingHeader"
import { ChevronLeft, ChevronRight } from "lucide-react"

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"]
const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}
function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}
function toKey(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2,"0")}-${String(d).padStart(2,"0")}`
}

export default function DatesPage() {
  const { booking, setDates, resetBooking } = useBooking()
  const navigate = useNavigate()

  const today = new Date()
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [checkIn, setCheckIn] = useState(booking.checkIn || "")
  const [checkOut, setCheckOut] = useState(booking.checkOut || "")
  const [hovered, setHovered] = useState<string | null>(null)
  const [direction, setDirection] = useState(1)

  const canContinue = !!(checkIn && checkOut && checkOut > checkIn)

  function prevMonth() {
    setDirection(-1)
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1) }
    else setViewMonth(m => m - 1)
  }
  function nextMonth() {
    setDirection(1)
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1) }
    else setViewMonth(m => m + 1)
  }

  function handleDayClick(key: string) {
    const isPast = key < toKey(today.getFullYear(), today.getMonth(), today.getDate())
    if (isPast) return

    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(key); setCheckOut("")
    } else {
      if (key <= checkIn) { setCheckIn(key); setCheckOut("") }
      else setCheckOut(key)
    }
  }

  function isInRange(key: string) {
    const end = hovered || checkOut
    if (!checkIn || !end) return false
    return key > checkIn && key < end
  }
  function isStart(key: string) { return key === checkIn }
  function isEnd(key: string) { return key === checkOut }
  function isPast(key: string) {
    return key < toKey(today.getFullYear(), today.getMonth(), today.getDate())
  }

  function nights() {
    if (!checkIn || !checkOut) return 0
    return Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000)
  }

  function fmt(d: string) {
    if (!d) return ""
    const dt = new Date(d + "T12:00:00")
    return dt.toLocaleDateString("en-US", { weekday: "short", month: "long", day: "numeric" })
  }

  const daysInMonth = getDaysInMonth(viewYear, viewMonth)
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth)

  return (
    <div className="min-h-screen bg-[#080808] pt-[120px]">
      <BookingHeader />

      <div className="fixed top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(200,168,75,0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-[780px] mx-auto px-6 pt-16 pb-32 relative z-10">

        {/* Title */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          className="text-center mb-12">
          <p className="text-[0.65rem] tracking-[0.45em] uppercase text-[#c8a84b]/60 font-sans mb-4">Step 2 of 4</p>
          <h1 className="font-serif-lux text-5xl md:text-6xl font-light italic text-white leading-tight mb-4">
            Choose Your Dates
          </h1>
          <div className="w-[60px] h-px bg-gradient-to-r from-transparent via-[#c8a84b] to-transparent mx-auto" />
        </motion.div>

        {/* Selected dates summary */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 mb-10 px-8 py-6 bg-white/[0.02] border border-[#c8a84b]/10 rounded-2xl">
          <div className="text-center">
            <p className="text-[0.6rem] tracking-[0.3em] uppercase text-[#c8a84b]/50 font-sans mb-2">Check In</p>
            <p className={`font-serif-lux text-lg italic ${checkIn ? "text-white" : "text-white/20"}`}>
              {checkIn ? fmt(checkIn) : "Select a date"}
            </p>
          </div>
          <div className="text-center">
            {nights() > 0 && (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                className="bg-[#c8a84b]/10 border border-[#c8a84b]/25 rounded-full px-3.5 py-1.5">
                <p className="font-serif-lux text-sm text-[#c8a84b]">{nights()} {nights() === 1 ? "night" : "nights"}</p>
              </motion.div>
            )}
            {!nights() && <div className="w-10 h-px bg-white/10 mx-auto" />}
          </div>
          <div className="text-center">
            <p className="text-[0.6rem] tracking-[0.3em] uppercase text-[#c8a84b]/50 font-sans mb-2">Check Out</p>
            <p className={`font-serif-lux text-lg italic ${checkOut ? "text-white" : "text-white/20"}`}>
              {checkOut ? fmt(checkOut) : "Select a date"}
            </p>
          </div>
        </motion.div>

        {/* Calendar */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.7 }}
          className="bg-white/[0.02] border border-[#c8a84b]/10 rounded-3xl p-8 overflow-hidden">

          {/* Month nav */}
          <div className="flex items-center justify-between mb-8">
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={prevMonth}
              className="w-10 h-10 rounded-full border border-[#c8a84b]/20 bg-transparent cursor-pointer flex items-center justify-center">
              <ChevronLeft size={16} className="text-[#c8a84b]" />
            </motion.button>

            <AnimatePresence mode="wait">
              <motion.h2 key={`${viewYear}-${viewMonth}`}
                initial={{ opacity: 0, x: direction * 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -30 }}
                transition={{ duration: 0.25 }}
                className="font-serif-lux text-2xl font-light italic text-white">
                {MONTHS[viewMonth]} {viewYear}
              </motion.h2>
            </AnimatePresence>

            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={nextMonth}
              className="w-10 h-10 rounded-full border border-[#c8a84b]/20 bg-transparent cursor-pointer flex items-center justify-center">
              <ChevronRight size={16} className="text-[#c8a84b]" />
            </motion.button>
          </div>

          {/* Day labels */}
          <div className="grid grid-cols-7 mb-2">
            {DAYS.map(d => (
              <div key={d} className="text-center py-2 text-[0.6rem] tracking-[0.15em] uppercase text-white/25 font-sans">
                {d}
              </div>
            ))}
          </div>

          {/* Days grid */}
          <AnimatePresence mode="wait">
            <motion.div key={`${viewYear}-${viewMonth}`}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -40 }}
              transition={{ duration: 0.28 }}
              className="grid grid-cols-7 gap-0.5">

              {Array.from({ length: firstDay }).map((_, i) => <div key={`e-${i}`} />)}

              {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
                const key = toKey(viewYear, viewMonth, day)
                const past = isPast(key)
                const start = isStart(key)
                const end = isEnd(key)
                const inRange = isInRange(key)
                const isToday = key === toKey(today.getFullYear(), today.getMonth(), today.getDate())
                const isEdge = start || end

                return (
                  <motion.button
                    key={day}
                    onClick={() => handleDayClick(key)}
                    onHoverStart={() => !past && checkIn && !checkOut && setHovered(key)}
                    onHoverEnd={() => setHovered(null)}
                    whileHover={!past ? { scale: isEdge ? 1 : 1.05 } : {}}
                    whileTap={!past ? { scale: 0.92 } : {}}
                    className={`aspect-square flex items-center justify-center relative font-serif-lux text-base transition-all duration-200 ${
                      isEdge ? "rounded-full font-semibold" : inRange ? "rounded-none font-light" : "rounded-full font-light"
                    } ${
                      isEdge
                        ? "bg-gradient-to-br from-[#c8a84b] to-[#a07830] text-black border-none"
                        : inRange
                          ? "bg-[#c8a84b]/12 text-white/80 border-none"
                          : `bg-transparent ${isToday ? "border border-[#c8a84b]/35" : "border-none"} ${past ? "text-white/12" : "text-white"}`
                    } ${past ? "cursor-not-allowed" : "cursor-pointer"}`}
                  >
                    {day}
                  </motion.button>
                )
              })}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-8">
          <motion.button
            onClick={() => { if (canContinue) { setDates(checkIn, checkOut); navigate("/reservation/rooms") } }}
            disabled={!canContinue}
            whileHover={canContinue ? { scale: 1.02 } : {}}
            whileTap={canContinue ? { scale: 0.97 } : {}}
            className={`w-full p-5 rounded-2xl font-serif-lux text-lg italic transition-all duration-400 border-none ${
              canContinue
                ? "bg-gradient-to-br from-[#c8a84b] to-[#a07830] text-black cursor-pointer"
                : "bg-white/5 text-white/20 cursor-not-allowed"
            }`}
          >
            {canContinue ? `Continue — ${nights()} ${nights() === 1 ? "night" : "nights"} →` : "Select check-in and check-out dates"}
          </motion.button>
        </motion.div>

        {/* Reset */}
        <div className="text-center mt-6">
          <button onClick={() => { resetBooking(); navigate("/") }}
            className="bg-none border-none cursor-pointer text-white/20 text-xs tracking-[0.2em] uppercase font-sans transition-colors duration-300 hover:text-red-400/60">
            Cancel Reservation
          </button>
        </div>
      </div>
    </div>
  )
}
