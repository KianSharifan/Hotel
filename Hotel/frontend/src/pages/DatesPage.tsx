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
    <div style={{ minHeight: "100vh", background: "#080808", paddingTop: "120px" }}>
      <BookingHeader />

      <div style={{
        position: "fixed", top: "40%", left: "50%", transform: "translate(-50%,-50%)",
        width: "700px", height: "700px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(200,168,75,0.03) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "780px", margin: "0 auto", padding: "60px 24px 120px", position: "relative", zIndex: 1 }}>

        {/* Title */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          style={{ textAlign: "center", marginBottom: "48px" }}>
          <p style={{ fontSize: "0.65rem", letterSpacing: "0.45em", textTransform: "uppercase", color: "rgba(200,168,75,0.6)", fontFamily: "sans-serif", marginBottom: "16px" }}>Step 2 of 4</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 300, fontStyle: "italic", color: "#fff", lineHeight: 1.1, marginBottom: "16px" }}>
            Choose Your Dates
          </h1>
          <div style={{ width: "60px", height: "1px", background: "linear-gradient(90deg, transparent, #c8a84b, transparent)", margin: "0 auto" }} />
        </motion.div>

        {/* Selected dates summary */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", gap: "16px", marginBottom: "40px", padding: "24px 32px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(200,168,75,0.1)", borderRadius: "16px" }}>
          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(200,168,75,0.5)", fontFamily: "sans-serif", marginBottom: "8px" }}>Check In</p>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontStyle: "italic", color: checkIn ? "#fff" : "rgba(255,255,255,0.2)" }}>
              {checkIn ? fmt(checkIn) : "Select a date"}
            </p>
          </div>
          <div style={{ textAlign: "center" }}>
            {nights() > 0 && (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} style={{
                background: "rgba(200,168,75,0.1)", border: "1px solid rgba(200,168,75,0.25)",
                borderRadius: "20px", padding: "6px 14px",
              }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.85rem", color: "#c8a84b" }}>{nights()} {nights() === 1 ? "night" : "nights"}</p>
              </motion.div>
            )}
            {!nights() && <div style={{ width: "40px", height: "1px", background: "rgba(255,255,255,0.1)", margin: "0 auto" }} />}
          </div>
          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(200,168,75,0.5)", fontFamily: "sans-serif", marginBottom: "8px" }}>Check Out</p>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontStyle: "italic", color: checkOut ? "#fff" : "rgba(255,255,255,0.2)" }}>
              {checkOut ? fmt(checkOut) : "Select a date"}
            </p>
          </div>
        </motion.div>

        {/* Calendar */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.7 }}
          style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(200,168,75,0.1)", borderRadius: "24px", padding: "32px", overflow: "hidden" }}>

          {/* Month nav */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px" }}>
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={prevMonth}
              style={{ width: "40px", height: "40px", borderRadius: "50%", border: "1px solid rgba(200,168,75,0.2)", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <ChevronLeft size={16} color="#c8a84b" />
            </motion.button>

            <AnimatePresence mode="wait">
              <motion.h2 key={`${viewYear}-${viewMonth}`}
                initial={{ opacity: 0, x: direction * 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -30 }}
                transition={{ duration: 0.25 }}
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", fontWeight: 300, fontStyle: "italic", color: "#fff" }}>
                {MONTHS[viewMonth]} {viewYear}
              </motion.h2>
            </AnimatePresence>

            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={nextMonth}
              style={{ width: "40px", height: "40px", borderRadius: "50%", border: "1px solid rgba(200,168,75,0.2)", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <ChevronRight size={16} color="#c8a84b" />
            </motion.button>
          </div>

          {/* Day labels */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", marginBottom: "8px" }}>
            {DAYS.map(d => (
              <div key={d} style={{ textAlign: "center", padding: "8px 0", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", fontFamily: "sans-serif" }}>
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
              style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "2px" }}>

              {Array.from({ length: firstDay }).map((_, i) => <div key={`e-${i}`} />)}

              {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
                const key = toKey(viewYear, viewMonth, day)
                const past = isPast(key)
                const start = isStart(key)
                const end = isEnd(key)
                const inRange = isInRange(key)
                const isToday = key === toKey(today.getFullYear(), today.getMonth(), today.getDate())

                return (
                  <motion.button
                    key={day}
                    onClick={() => handleDayClick(key)}
                    onHoverStart={() => !past && checkIn && !checkOut && setHovered(key)}
                    onHoverEnd={() => setHovered(null)}
                    whileHover={!past ? { scale: start || end ? 1 : 1.05 } : {}}
                    whileTap={!past ? { scale: 0.92 } : {}}
                    style={{
                      aspectRatio: "1",
                      borderRadius: start || end ? "50%" : inRange ? "0" : "50%",
                      border: isToday && !start && !end ? "1px solid rgba(200,168,75,0.35)" : "none",
                      background: start || end
                        ? "linear-gradient(135deg, #c8a84b, #a07830)"
                        : inRange
                          ? "rgba(200,168,75,0.12)"
                          : "transparent",
                      color: past ? "rgba(255,255,255,0.12)"
                        : start || end ? "#000"
                          : inRange ? "rgba(255,255,255,0.8)"
                            : "#fff",
                      cursor: past ? "not-allowed" : "pointer",
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1rem", fontWeight: start || end ? 600 : 300,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "all 0.2s",
                      position: "relative",
                    }}
                  >
                    {day}
                  </motion.button>
                )
              })}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} style={{ marginTop: "32px" }}>
          <motion.button
            onClick={() => { if (canContinue) { setDates(checkIn, checkOut); navigate("/reservation/rooms") } }}
            disabled={!canContinue}
            whileHover={canContinue ? { scale: 1.02 } : {}}
            whileTap={canContinue ? { scale: 0.97 } : {}}
            style={{
              width: "100%", padding: "20px",
              background: canContinue ? "linear-gradient(135deg, #c8a84b 0%, #a07830 100%)" : "rgba(255,255,255,0.05)",
              border: "none", borderRadius: "14px",
              color: canContinue ? "#000" : "rgba(255,255,255,0.2)",
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.1rem", fontStyle: "italic",
              cursor: canContinue ? "pointer" : "not-allowed",
              transition: "all 0.4s",
            }}
          >
            {canContinue ? `Continue — ${nights()} ${nights() === 1 ? "night" : "nights"} →` : "Select check-in and check-out dates"}
          </motion.button>
        </motion.div>

        {/* Reset */}
        <div style={{ textAlign: "center", marginTop: "24px" }}>
          <button onClick={() => { resetBooking(); navigate("/") }}
            style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.2)", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "sans-serif", transition: "color 0.3s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "rgba(220,80,80,0.6)")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.2)")}>
            Cancel Reservation
          </button>
        </div>
      </div>
    </div>
  )
}
