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
      style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "36px 44px",
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(200,168,75,0.12)",
        borderRadius: "20px",
        backdropFilter: "blur(10px)",
        transition: "border-color 0.3s",
      }}
      whileHover={{ borderColor: "rgba(200,168,75,0.28)" }}
    >
      <div>
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "1.7rem", fontWeight: 300, fontStyle: "italic",
          color: "#fff", marginBottom: "4px",
        }}>{label}</p>
        <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em", fontFamily: "sans-serif", textTransform: "uppercase" }}>
          {sublabel}
        </p>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>
        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          style={{
            width: "44px", height: "44px", borderRadius: "50%",
            border: "1px solid rgba(200,168,75,0.3)",
            background: "transparent", cursor: value <= min ? "not-allowed" : "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            opacity: value <= min ? 0.25 : 1, transition: "all 0.2s",
          }}
        >
          <Minus size={16} color="#c8a84b" />
        </motion.button>

        <motion.span
          key={value}
          initial={{ scale: 1.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "3rem", fontWeight: 300, color: "#c8a84b",
            minWidth: "48px", textAlign: "center", lineHeight: 1,
          }}
        >
          {value}
        </motion.span>

        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          style={{
            width: "44px", height: "44px", borderRadius: "50%",
            border: "1px solid rgba(200,168,75,0.3)",
            background: "rgba(200,168,75,0.08)", cursor: value >= max ? "not-allowed" : "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            opacity: value >= max ? 0.25 : 1, transition: "all 0.2s",
          }}
        >
          <Plus size={16} color="#c8a84b" />
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
    <div style={{ minHeight: "100vh", background: "#080808", paddingTop: "120px" }}>
      <BookingHeader />

      {/* Background glow */}
      <div style={{
        position: "fixed", top: "40%", left: "50%", transform: "translate(-50%,-50%)",
        width: "600px", height: "600px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(200,168,75,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{
        maxWidth: "640px", margin: "0 auto", padding: "80px 24px 120px",
        position: "relative", zIndex: 1,
      }}>
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: "center", marginBottom: "64px" }}
        >
          <p style={{
            fontSize: "0.65rem", letterSpacing: "0.45em", textTransform: "uppercase",
            color: "rgba(200,168,75,0.6)", fontFamily: "sans-serif", marginBottom: "16px",
          }}>Step 1 of 4</p>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 300, fontStyle: "italic",
            color: "#fff", lineHeight: 1.1, marginBottom: "16px",
          }}>
            Who's Joining You?
          </h1>
          <div style={{ width: "60px", height: "1px", background: "linear-gradient(90deg, transparent, #c8a84b, transparent)", margin: "0 auto" }} />
        </motion.div>

        {/* Counters */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "48px" }}>
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
          style={{
            textAlign: "center", marginBottom: "40px",
            padding: "20px",
            background: "rgba(200,168,75,0.05)",
            border: "1px solid rgba(200,168,75,0.1)",
            borderRadius: "14px",
          }}
        >
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1rem", color: "rgba(255,255,255,0.5)", fontStyle: "italic",
          }}>
            {adults + children} {adults + children === 1 ? "guest" : "guests"} total
          </span>
        </motion.div>

        {/* CTA */}
        <motion.button
          onClick={handleConfirm}
          disabled={!canContinue}
          whileHover={canContinue ? { scale: 1.02 } : {}}
          whileTap={canContinue ? { scale: 0.97 } : {}}
          style={{
            width: "100%", padding: "20px",
            background: canContinue
              ? "linear-gradient(135deg, #c8a84b 0%, #a07830 100%)"
              : "rgba(255,255,255,0.05)",
            border: "none", borderRadius: "14px",
            color: canContinue ? "#000" : "rgba(255,255,255,0.2)",
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.1rem", fontStyle: "italic", fontWeight: 400,
            letterSpacing: "0.08em", cursor: canContinue ? "pointer" : "not-allowed",
            transition: "all 0.4s",
          }}
        >
          {canContinue ? "Continue to Dates →" : "Select at least 1 adult"}
        </motion.button>

        {/* Reset */}
        <div style={{ textAlign: "center", marginTop: "32px" }}>
          <button
            onClick={() => { resetBooking(); navigate("/") }}
            style={{
              background: "none", border: "none", cursor: "pointer",
              color: "rgba(255,255,255,0.2)", fontSize: "0.7rem",
              letterSpacing: "0.2em", textTransform: "uppercase",
              fontFamily: "sans-serif", transition: "color 0.3s",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "rgba(220,80,80,0.6)")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.2)")}
          >
            Cancel Reservation
          </button>
        </div>
      </div>
    </div>
  )
}
