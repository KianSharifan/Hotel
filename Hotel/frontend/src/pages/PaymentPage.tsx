import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "motion/react"
import { useBooking } from "../context/BookingContext"
import BookingHeader from "../components/BookingHeader"
import { CreditCard, Lock, CheckCircle } from "lucide-react"

function fmt(d: string) {
  if (!d) return ""
  return new Date(d + "T12:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
}

function LuxInput({ label, placeholder, value, onChange, type = "text", maxLength }: {
  label: string; placeholder: string; value: string
  onChange: (v: string) => void; type?: string; maxLength?: number
}) {
  const [focused, setFocused] = useState(false)
  return (
    <div>
      <label style={{ display: "block", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(200,168,75,0.6)", fontFamily: "sans-serif", marginBottom: "10px" }}>
        {label}
      </label>
      <input
        type={type} placeholder={placeholder} value={value} maxLength={maxLength}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: "100%", padding: "16px 20px",
          background: "rgba(255,255,255,0.03)",
          border: `1px solid ${focused ? "rgba(200,168,75,0.5)" : "rgba(255,255,255,0.08)"}`,
          borderRadius: "12px", color: "#fff",
          fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem",
          outline: "none", transition: "border-color 0.3s",
          boxSizing: "border-box",
        }}
      />
    </div>
  )
}

export default function PaymentPage() {
  const { booking, resetBooking } = useBooking()
  const navigate = useNavigate()
  const [cardName, setCardName] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [expiry, setExpiry] = useState("")
  const [cvv, setCvv] = useState("")
  const [confirmed, setConfirmed] = useState(false)
  const [loading, setLoading] = useState(false)

  const nights = booking.checkIn && booking.checkOut
    ? Math.round((new Date(booking.checkOut).getTime() - new Date(booking.checkIn).getTime()) / 86400000)
    : 0

  const total = booking.selectedRoom ? booking.selectedRoom.price * nights : 0
  const taxes = Math.round(total * 0.12)
  const grandTotal = total + taxes

  function formatCard(v: string) {
    const digits = v.replace(/\D/g, "").slice(0, 16)
    return digits.replace(/(.{4})/g, "$1 ").trim()
  }
  function formatExpiry(v: string) {
    const digits = v.replace(/\D/g, "").slice(0, 4)
    if (digits.length >= 3) return digits.slice(0, 2) + "/" + digits.slice(2)
    return digits
  }

  const canPay = cardName && cardNumber.replace(/\s/g, "").length === 16 && expiry.length === 5 && cvv.length >= 3

  async function handlePay() {
    if (!canPay) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 2200))
    setLoading(false)
    setConfirmed(true)
  }

  if (confirmed) return (
    <div style={{ minHeight: "100vh", background: "#080808", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        style={{ textAlign: "center", maxWidth: "500px", padding: "0 24px" }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
          style={{ marginBottom: "32px" }}
        >
          <CheckCircle size={72} color="#c8a84b" style={{ margin: "0 auto" }} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <p style={{ fontSize: "0.65rem", letterSpacing: "0.45em", textTransform: "uppercase", color: "rgba(200,168,75,0.6)", fontFamily: "sans-serif", marginBottom: "16px" }}>
            Reservation Confirmed
          </p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3rem", fontWeight: 300, fontStyle: "italic", color: "#fff", marginBottom: "16px" }}>
            Welcome to Noire Palace
          </h1>
          <div style={{ width: "60px", height: "1px", background: "linear-gradient(90deg, transparent, #c8a84b, transparent)", margin: "0 auto 24px" }} />
          <p style={{ fontFamily: "sans-serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.8, marginBottom: "8px" }}>
            {booking.selectedRoom?.name}
          </p>
          <p style={{ fontFamily: "sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.3)", lineHeight: 1.8, marginBottom: "40px" }}>
            {fmt(booking.checkIn)} → {fmt(booking.checkOut)} · {nights} nights
          </p>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", color: "#c8a84b", marginBottom: "48px" }}>
            ${grandTotal.toLocaleString()} charged
          </p>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => { resetBooking(); navigate("/") }}
            style={{
              padding: "18px 48px",
              background: "linear-gradient(135deg, #c8a84b, #a07830)",
              border: "none", borderRadius: "14px",
              color: "#000", fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.1rem", fontStyle: "italic", cursor: "pointer",
            }}
          >
            Return Home
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  )

  return (
    <div style={{ minHeight: "100vh", background: "#080808", paddingTop: "120px" }}>
      <BookingHeader />

      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "60px 24px 120px", position: "relative", zIndex: 1 }}>

        {/* Title */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          style={{ textAlign: "center", marginBottom: "56px" }}>
          <p style={{ fontSize: "0.65rem", letterSpacing: "0.45em", textTransform: "uppercase", color: "rgba(200,168,75,0.6)", fontFamily: "sans-serif", marginBottom: "16px" }}>Step 4 of 4</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 300, fontStyle: "italic", color: "#fff", lineHeight: 1.1, marginBottom: "16px" }}>
            Complete Your Reservation
          </h1>
          <div style={{ width: "60px", height: "1px", background: "linear-gradient(90deg, transparent, #c8a84b, transparent)", margin: "0 auto" }} />
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "32px", alignItems: "start" }}>

          {/* Payment form */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.7 }}
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(200,168,75,0.1)", borderRadius: "24px", padding: "44px" }}>

            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "32px" }}>
              <CreditCard size={18} color="#c8a84b" />
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", fontStyle: "italic", color: "#fff" }}>
                Payment Details
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <LuxInput label="Cardholder Name" placeholder="As it appears on card" value={cardName} onChange={setCardName} />
              <LuxInput label="Card Number" placeholder="0000 0000 0000 0000" value={cardNumber}
                onChange={v => setCardNumber(formatCard(v))} maxLength={19} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <LuxInput label="Expiry Date" placeholder="MM/YY" value={expiry}
                  onChange={v => setExpiry(formatExpiry(v))} maxLength={5} />
                <LuxInput label="CVV" placeholder="•••" value={cvv}
                  onChange={v => setCvv(v.replace(/\D/g, "").slice(0, 4))} />
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "24px", padding: "14px 18px", background: "rgba(255,255,255,0.02)", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.05)" }}>
              <Lock size={12} color="rgba(200,168,75,0.5)" />
              <span style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.25)", fontFamily: "sans-serif", letterSpacing: "0.08em" }}>
                Secured with 256-bit SSL encryption
              </span>
            </div>
          </motion.div>

          {/* Summary */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.7 }}>
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(200,168,75,0.1)", borderRadius: "24px", padding: "36px", marginBottom: "16px" }}>
              <p style={{ fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(200,168,75,0.5)", fontFamily: "sans-serif", marginBottom: "20px" }}>
                Booking Summary
              </p>

              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontStyle: "italic", color: "#fff", marginBottom: "20px" }}>
                {booking.selectedRoom?.name}
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px", paddingBottom: "20px", borderBottom: "1px solid rgba(255,255,255,0.07)", marginBottom: "20px" }}>
                {[
                  { label: "Check-in", value: fmt(booking.checkIn) },
                  { label: "Check-out", value: fmt(booking.checkOut) },
                  { label: "Guests", value: `${booking.adults + booking.children} guests` },
                  { label: "Duration", value: `${nights} nights` },
                ].map(row => (
                  <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.35)", fontFamily: "sans-serif" }}>{row.label}</span>
                    <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.65)", fontFamily: "sans-serif" }}>{row.value}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.35)", fontFamily: "sans-serif" }}>Subtotal</span>
                  <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.55)", fontFamily: "sans-serif" }}>${total.toLocaleString()}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.35)", fontFamily: "sans-serif" }}>Taxes & fees (12%)</span>
                  <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.55)", fontFamily: "sans-serif" }}>${taxes.toLocaleString()}</span>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", paddingTop: "16px", borderTop: "1px solid rgba(200,168,75,0.15)" }}>
                <span style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", fontFamily: "sans-serif" }}>Total</span>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 300, color: "#c8a84b" }}>
                  ${grandTotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Pay button */}
            <motion.button
              onClick={handlePay}
              disabled={!canPay || loading}
              whileHover={canPay && !loading ? { scale: 1.02 } : {}}
              whileTap={canPay && !loading ? { scale: 0.97 } : {}}
              style={{
                width: "100%", padding: "20px",
                background: canPay ? "linear-gradient(135deg, #c8a84b 0%, #a07830 100%)" : "rgba(255,255,255,0.05)",
                border: "none", borderRadius: "14px",
                color: canPay ? "#000" : "rgba(255,255,255,0.2)",
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.1rem", fontStyle: "italic",
                cursor: canPay && !loading ? "pointer" : "not-allowed",
                transition: "all 0.4s",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
              }}
            >
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div key="loading"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      style={{ width: "16px", height: "16px", border: "2px solid rgba(0,0,0,0.3)", borderTopColor: "#000", borderRadius: "50%" }}
                    />
                    Processing...
                  </motion.div>
                ) : (
                  <motion.span key="pay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    {canPay ? `Confirm & Pay $${grandTotal.toLocaleString()}` : "Enter payment details"}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </div>

        {/* Cancel */}
        <div style={{ textAlign: "center", marginTop: "40px" }}>
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
