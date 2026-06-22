import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "motion/react"
import { useBooking } from "../context/BookingContext"
import BookingHeader from "../components/BookingHeader"
import { CreditCard, Lock, CheckCircle } from "lucide-react"
import { reserveRoom } from "../api/reservationApi"

function fmt(d: string) {
  if (!d) return ""
  return new Date(d + "T12:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
}

function LuxInput({ label, placeholder, value, onChange, type = "text", maxLength }: {
  label: string; placeholder: string; value: string
  onChange: (v: string) => void; type?: string; maxLength?: number
}) {
  return (
    <div>
      <label className="block text-[0.6rem] tracking-[0.3em] uppercase text-[#c8a84b]/60 font-sans mb-2.5">
        {label}
      </label>
      <input
        type={type} placeholder={placeholder} value={value} maxLength={maxLength}
        onChange={e => onChange(e.target.value)}
        className="w-full px-5 py-4 bg-white/[0.03] border border-white/[0.08] focus:border-[#c8a84b]/50 rounded-xl text-white font-serif-lux text-base outline-none transition-colors duration-300 box-border"
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
    await reserveRoom({
      nAdults: booking.adults,
      nKids: booking.children,

      checkIn: booking.checkIn,
      checkOut: booking.checkOut,

      roomTypeId: booking.selectedRoom?.id,

      meals: 0,

      totalPrice: grandTotal,

      guestId: 1,

      specialRequest: ""
    })
    setLoading(false)
    setConfirmed(true)
  }

  if (confirmed) return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="text-center max-w-[500px] px-6"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
          className="mb-8"
        >
          <CheckCircle size={72} className="text-[#c8a84b] mx-auto" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <p className="text-[0.65rem] tracking-[0.45em] uppercase text-[#c8a84b]/60 font-sans mb-4">
            Reservation Confirmed
          </p>
          <h1 className="font-serif-lux text-5xl font-light italic text-white mb-4">
            Welcome to Noire Palace
          </h1>
          <div className="w-[60px] h-px bg-gradient-to-r from-transparent via-[#c8a84b] to-transparent mx-auto mb-6" />
          <p className="font-sans text-sm text-white/40 leading-loose mb-2">
            {booking.selectedRoom?.name}
          </p>
          <p className="font-sans text-sm text-white/30 leading-loose mb-10">
            {fmt(booking.checkIn)} → {fmt(booking.checkOut)} · {nights} nights
          </p>
          <p className="font-serif-lux text-3xl text-[#c8a84b] mb-12">
            ${grandTotal.toLocaleString()} charged
          </p>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => { resetBooking(); navigate("/") }}
            className="px-12 py-4.5 bg-gradient-to-br from-[#c8a84b] to-[#a07830] border-none rounded-2xl text-black font-serif-lux text-lg italic cursor-pointer"
          >
            Return Home
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#080808] pt-[120px]">
      <BookingHeader />

      <div className="max-w-[960px] mx-auto px-6 pt-16 pb-32 relative z-10">

        {/* Title */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          className="text-center mb-14">
          <p className="text-[0.65rem] tracking-[0.45em] uppercase text-[#c8a84b]/60 font-sans mb-4">Step 4 of 4</p>
          <h1 className="font-serif-lux text-5xl md:text-6xl font-light italic text-white leading-tight mb-4">
            Complete Your Reservation
          </h1>
          <div className="w-[60px] h-px bg-gradient-to-r from-transparent via-[#c8a84b] to-transparent mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_380px] gap-8 items-start">

          {/* Payment form */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.7 }}
            className="bg-white/[0.02] border border-[#c8a84b]/10 rounded-3xl p-11">

            <div className="flex items-center gap-2.5 mb-8">
              <CreditCard size={18} className="text-[#c8a84b]" />
              <span className="font-serif-lux text-xl italic text-white">
                Payment Details
              </span>
            </div>

            <div className="flex flex-col gap-5">
              <LuxInput label="Cardholder Name" placeholder="As it appears on card" value={cardName} onChange={setCardName} />
              <LuxInput label="Card Number" placeholder="0000 0000 0000 0000" value={cardNumber}
                onChange={v => setCardNumber(formatCard(v))} maxLength={19} />
              <div className="grid grid-cols-2 gap-4">
                <LuxInput label="Expiry Date" placeholder="MM/YY" value={expiry}
                  onChange={v => setExpiry(formatExpiry(v))} maxLength={5} />
                <LuxInput label="CVV" placeholder="•••" value={cvv}
                  onChange={v => setCvv(v.replace(/\D/g, "").slice(0, 4))} />
              </div>
            </div>

            <div className="flex items-center gap-2 mt-6 px-4.5 py-3.5 bg-white/[0.02] rounded-[10px] border border-white/[0.05]">
              <Lock size={12} className="text-[#c8a84b]/50" />
              <span className="text-[0.68rem] text-white/25 font-sans tracking-wide">
                Secured with 256-bit SSL encryption
              </span>
            </div>
          </motion.div>

          {/* Summary */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.7 }}>
            <div className="bg-white/[0.02] border border-[#c8a84b]/10 rounded-3xl p-9 mb-4">
              <p className="text-[0.6rem] tracking-[0.3em] uppercase text-[#c8a84b]/50 font-sans mb-5">
                Booking Summary
              </p>

              <h3 className="font-serif-lux text-2xl italic text-white mb-5">
                {booking.selectedRoom?.name}
              </h3>

              <div className="flex flex-col gap-3 pb-5 border-b border-white/[0.07] mb-5">
                {[
                  { label: "Check-in", value: fmt(booking.checkIn) },
                  { label: "Check-out", value: fmt(booking.checkOut) },
                  { label: "Guests", value: `${booking.adults + booking.children} guests` },
                  { label: "Duration", value: `${nights} nights` },
                ].map(row => (
                  <div key={row.label} className="flex justify-between items-center">
                    <span className="text-xs text-white/35 font-sans">{row.label}</span>
                    <span className="text-sm text-white/65 font-sans">{row.value}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-2.5 mb-5">
                <div className="flex justify-between">
                  <span className="text-xs text-white/35 font-sans">Subtotal</span>
                  <span className="text-sm text-white/55 font-sans">${total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-white/35 font-sans">Taxes &amp; fees (12%)</span>
                  <span className="text-sm text-white/55 font-sans">${taxes.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex justify-between items-baseline pt-4 border-t border-[#c8a84b]/15">
                <span className="text-[0.7rem] tracking-[0.2em] uppercase text-white/40 font-sans">Total</span>
                <span className="font-serif-lux text-3xl font-light text-[#c8a84b]">
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
              className={`w-full p-5 rounded-2xl font-serif-lux text-lg italic transition-all duration-400 border-none flex items-center justify-center gap-2.5 ${
                canPay
                  ? "bg-gradient-to-br from-[#c8a84b] to-[#a07830] text-black cursor-pointer"
                  : "bg-white/5 text-white/20 cursor-not-allowed"
              } ${loading ? "cursor-not-allowed" : ""}`}
            >
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div key="loading"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="flex items-center gap-2.5">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full"
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
        <div className="text-center mt-10">
          <button onClick={() => { resetBooking(); navigate("/") }}
            className="bg-none border-none cursor-pointer text-white/20 text-xs tracking-[0.2em] uppercase font-sans transition-colors duration-300 hover:text-red-400/60">
            Cancel Reservation
          </button>
        </div>
      </div>
    </div>
  )
}

