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
    // Steps ahead of what's been reached are disabled
    return stepNum > booking.step
  }

  function isLockedBack(stepNum: number) {
    // Steps 1 & 2 lock after room is chosen
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
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 30 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              style={{
                background: "linear-gradient(135deg, #111 0%, #1a1a1a 100%)",
                border: "1px solid rgba(200,168,75,0.3)",
                borderRadius: "24px",
                padding: "48px",
                maxWidth: "440px",
                width: "90%",
                textAlign: "center",
                fontFamily: "'Cormorant Garamond', serif",
              }}
            >
              <div style={{
                width: "56px", height: "56px", borderRadius: "50%",
                background: "rgba(200,168,75,0.1)", border: "1px solid rgba(200,168,75,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 24px",
              }}>
                <AlertTriangle size={24} color="#c8a84b" />
              </div>
              <h2 style={{ fontSize: "1.8rem", fontWeight: 300, color: "#fff", marginBottom: "12px", fontStyle: "italic" }}>
                Modify Selection?
              </h2>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "1rem", lineHeight: 1.6, marginBottom: "32px", fontFamily: "sans-serif", fontWeight: 300 }}>
                Changing your guests or dates will reset your room selection and all progress. This cannot be undone.
              </p>
              <div style={{ display: "flex", gap: "12px" }}>
                <button
                  onClick={() => setWarningFor(null)}
                  style={{
                    flex: 1, padding: "14px", borderRadius: "12px",
                    border: "1px solid rgba(255,255,255,0.15)", background: "transparent",
                    color: "rgba(255,255,255,0.6)", cursor: "pointer", fontSize: "0.9rem",
                    fontFamily: "sans-serif", transition: "all 0.3s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)")}
                >
                  Keep Selection
                </button>
                <button
                  onClick={confirmReset}
                  style={{
                    flex: 1, padding: "14px", borderRadius: "12px",
                    background: "linear-gradient(135deg, #c8a84b, #a07830)",
                    border: "none", color: "#000", cursor: "pointer",
                    fontSize: "0.9rem", fontWeight: 600, fontFamily: "sans-serif",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                >
                  Reset & Modify
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: "rgba(6,6,6,0.92)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(200,168,75,0.15)",
        fontFamily: "'Cormorant Garamond', serif",
      }}>
        {/* Top bar: logo + cancel */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "16px 48px 0",
          maxWidth: "1400px", margin: "0 auto",
        }}>
          <motion.div
            style={{ cursor: "pointer", display: "flex", alignItems: "baseline", gap: "10px" }}
            onClick={() => navigate("/")}
            whileHover={{ opacity: 0.75 }}
          >
            <span style={{ fontSize: "1.4rem", fontStyle: "italic", fontWeight: 300, color: "#c8a84b", letterSpacing: "0.05em" }}>
              Noire Palace
            </span>
            <span style={{ fontSize: "0.6rem", color: "rgba(200,168,75,0.4)", letterSpacing: "0.3em", textTransform: "uppercase" }}>
              Reservation
            </span>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { resetBooking(); navigate("/") }}
            style={{
              display: "flex", alignItems: "center", gap: "8px",
              background: "transparent", border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "8px", padding: "8px 18px", cursor: "pointer",
              color: "rgba(255,255,255,0.45)", fontSize: "0.7rem",
              letterSpacing: "0.2em", textTransform: "uppercase",
              fontFamily: "sans-serif", transition: "all 0.3s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = "rgba(220,80,80,0.4)"
              e.currentTarget.style.color = "rgba(220,80,80,0.8)"
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"
              e.currentTarget.style.color = "rgba(255,255,255,0.45)"
            }}
          >
            <X size={12} />
            Cancel Reservation
          </motion.button>
        </div>

        {/* Steps */}
        <div style={{
          display: "flex", alignItems: "stretch",
          maxWidth: "1400px", margin: "0 auto",
          padding: "0 48px",
        }}>
          {STEPS.map((step, idx) => {
            const locked = isLocked(step.num)
            const lockedBack = isLockedBack(step.num)
            const isActive = currentStep === step.num
            const isDone = booking.step > step.num && step.num < 4
            const summary = stepSummary(step.num)
            const Icon = step.icon

            return (
              <div key={step.num} style={{ display: "flex", flex: 1, alignItems: "center" }}>
                <motion.button
                  onClick={() => handleStepClick(step.num, step.path)}
                  whileHover={!locked ? { y: -1 } : {}}
                  whileTap={!locked ? { scale: 0.98 } : {}}
                  style={{
                    flex: 1,
                    display: "flex", flexDirection: "column", alignItems: "flex-start",
                    padding: "18px 20px 14px",
                    background: "transparent", border: "none", cursor: locked ? "not-allowed" : "pointer",
                    position: "relative", transition: "all 0.3s",
                    opacity: locked ? 0.3 : lockedBack ? 0.5 : 1,
                  }}
                >
                  {/* Active underline */}
                  <motion.div
                    style={{
                      position: "absolute", bottom: 0, left: 0, right: 0, height: "2px",
                      background: "linear-gradient(90deg, #c8a84b, #f5e09a, #c8a84b)",
                      transformOrigin: "left",
                    }}
                    initial={false}
                    animate={{ scaleX: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />

                  {/* Step number + icon row */}
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                    <div style={{
                      width: "26px", height: "26px", borderRadius: "50%",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      background: isDone
                        ? "linear-gradient(135deg, #c8a84b, #a07830)"
                        : isActive
                          ? "rgba(200,168,75,0.15)"
                          : "rgba(255,255,255,0.05)",
                      border: isDone
                        ? "none"
                        : isActive
                          ? "1px solid rgba(200,168,75,0.6)"
                          : "1px solid rgba(255,255,255,0.1)",
                      flexShrink: 0,
                      transition: "all 0.4s",
                    }}>
                      {isDone
                        ? <span style={{ fontSize: "0.65rem", color: "#000", fontWeight: 700 }}>✓</span>
                        : <Icon size={12} color={isActive ? "#c8a84b" : "rgba(255,255,255,0.3)"} />
                      }
                    </div>
                    <span style={{
                      fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.25em",
                      color: isActive ? "#c8a84b" : "rgba(255,255,255,0.35)",
                      fontFamily: "sans-serif", fontWeight: 500,
                      transition: "color 0.3s",
                    }}>
                      {step.label}
                    </span>
                    {lockedBack && (
                      <span style={{ fontSize: "0.5rem", color: "rgba(200,168,75,0.5)", marginLeft: "4px" }}>🔒</span>
                    )}
                  </div>

                  {/* Summary value */}
                  <div style={{ paddingLeft: "36px" }}>
                    {summary ? (
                      <motion.span
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                          fontSize: "0.85rem", fontStyle: "italic", fontWeight: 300,
                          color: isActive ? "#fff" : "rgba(255,255,255,0.55)",
                          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                          display: "block", maxWidth: "180px",
                        }}
                      >
                        {summary}
                      </motion.span>
                    ) : (
                      <span style={{
                        fontSize: "0.75rem", color: "rgba(255,255,255,0.2)",
                        fontFamily: "sans-serif", fontStyle: "normal",
                      }}>
                        {locked ? "Complete previous step" : "Not selected"}
                      </span>
                    )}
                  </div>
                </motion.button>

                {/* Divider */}
                {idx < STEPS.length - 1 && (
                  <div style={{
                    width: "1px", height: "36px",
                    background: "rgba(200,168,75,0.15)",
                    flexShrink: 0,
                  }} />
                )}
              </div>
            )
          })}
        </div>

        <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300&display=swap');`}</style>
      </header>
    </>
  )
}
