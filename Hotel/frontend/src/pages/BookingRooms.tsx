import { useNavigate } from "react-router-dom"
import { motion } from "motion/react"
import { useBooking } from "../context/BookingContext"
import BookingHeader from "../components/BookingHeader"
import { amenityIcons } from "../data/amenityIcons"
import rooms from "../data/rooms"

export default function BookingRooms() {
  const { booking, setRoom, resetBooking } = useBooking()
  const navigate = useNavigate()

  const totalGuests = booking.adults + booking.children
  const filteredRooms = rooms.filter(r => r.maxGuests >= totalGuests)

  function nights() {
    if (!booking.checkIn || !booking.checkOut) return 1
    return Math.round((new Date(booking.checkOut).getTime() - new Date(booking.checkIn).getTime()) / 86400000)
  }

  function handleSelect(room: typeof rooms[0]) {
    setRoom({ id: room.id, name: room.name, price: room.price })
    navigate("/reservation/payment")
  }

  return (
    <div style={{ minHeight: "100vh", background: "#080808", paddingTop: "120px" }}>
      <BookingHeader />

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "60px 24px 120px", position: "relative", zIndex: 1 }}>

        {/* Title */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          style={{ textAlign: "center", marginBottom: "64px" }}>
          <p style={{ fontSize: "0.65rem", letterSpacing: "0.45em", textTransform: "uppercase", color: "rgba(200,168,75,0.6)", fontFamily: "sans-serif", marginBottom: "16px" }}>Step 3 of 4</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 300, fontStyle: "italic", color: "#fff", lineHeight: 1.1, marginBottom: "16px" }}>
            Choose Your Suite
          </h1>
          <div style={{ width: "60px", height: "1px", background: "linear-gradient(90deg, transparent, #c8a84b, transparent)", margin: "0 auto 16px" }} />
          <p style={{ fontFamily: "sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em" }}>
            {filteredRooms.length} suite{filteredRooms.length !== 1 ? "s" : ""} available for {totalGuests} guest{totalGuests !== 1 ? "s" : ""} · {nights()} night{nights() !== 1 ? "s" : ""}
          </p>
        </motion.div>

        {/* Room cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          {filteredRooms.map((room, index) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.12, duration: 0.7, ease: "easeOut" }}
              style={{
                display: "grid", gridTemplateColumns: "420px 1fr",
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(200,168,75,0.1)",
                borderRadius: "24px", overflow: "hidden",
                transition: "border-color 0.4s, box-shadow 0.4s",
              }}
              whileHover={{
                borderColor: "rgba(200,168,75,0.28)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
              }}
            >
              {/* Image */}
              <div style={{ position: "relative", overflow: "hidden", height: "340px" }}>
                <motion.img
                  src={room.image}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.7 }}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(90deg, transparent 60%, rgba(8,8,8,0.4) 100%)",
                }} />
              </div>

              {/* Content */}
              <div style={{ padding: "40px 44px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <h2 style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "2rem", fontWeight: 300, fontStyle: "italic",
                    color: "#fff", marginBottom: "12px",
                  }}>{room.name}</h2>

                  <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.7, fontFamily: "sans-serif", fontWeight: 300, marginBottom: "24px" }}>
                    {room.description}
                  </p>

                  {/* Stats */}
                  <div style={{ display: "flex", gap: "12px", marginBottom: "20px", flexWrap: "wrap" }}>
                    {[
                      { label: `${room.maxGuests} Guests` },
                      { label: `${room.beds} Beds` },
                      { label: room.size },
                    ].map(tag => (
                      <span key={tag.label} style={{
                        padding: "6px 16px", borderRadius: "20px",
                        border: "1px solid rgba(200,168,75,0.2)",
                        fontSize: "0.72rem", color: "rgba(200,168,75,0.75)",
                        fontFamily: "sans-serif", letterSpacing: "0.05em",
                      }}>{tag.label}</span>
                    ))}
                  </div>

                  {/* Amenities */}
                  <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "32px" }}>
                    {room.amenities.slice(0, 5).map((amenity: string) => {
                      const Icon = amenityIcons[amenity]
                      return (
                        <div key={amenity} style={{
                          display: "flex", alignItems: "center", gap: "6px",
                          padding: "5px 12px", borderRadius: "20px",
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.07)",
                          fontSize: "0.7rem", color: "rgba(255,255,255,0.45)",
                          fontFamily: "sans-serif",
                        }}>
                          {Icon && <Icon size={12} color="rgba(200,168,75,0.6)" />}
                          {amenity}
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Price + CTA */}
                <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
                  <div>
                    <p style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", fontFamily: "sans-serif", marginBottom: "6px" }}>
                      Per Night
                    </p>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.8rem", fontWeight: 300, color: "#c8a84b", lineHeight: 1 }}>
                        ${room.price.toLocaleString()}
                      </span>
                    </div>
                    {nights() > 1 && (
                      <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.25)", fontFamily: "sans-serif", marginTop: "4px" }}>
                        ${(room.price * nights()).toLocaleString()} for {nights()} nights
                      </p>
                    )}
                  </div>

                  <motion.button
                    onClick={() => handleSelect(room)}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    style={{
                      padding: "16px 36px",
                      background: "linear-gradient(135deg, #c8a84b 0%, #a07830 100%)",
                      border: "none", borderRadius: "12px",
                      color: "#000", fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1rem", fontStyle: "italic",
                      cursor: "pointer", letterSpacing: "0.05em",
                      boxShadow: "0 8px 24px rgba(200,168,75,0.2)",
                      transition: "box-shadow 0.3s",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 12px 36px rgba(200,168,75,0.4)")}
                    onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 8px 24px rgba(200,168,75,0.2)")}
                  >
                    Select Suite →
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Reset */}
        <div style={{ textAlign: "center", marginTop: "48px" }}>
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
