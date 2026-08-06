import { useEffect, useState, useRef } from "react"
import { motion, useAnimation } from "motion/react"


const RAYS = Array.from({ length: 36 }, (_, i) => {
  const angle = (i / 36) * 360
  const isTall = i % 2 === 0
  const length = isTall ? 28 + Math.random() * 22 : 10 + Math.random() * 12
  const width = isTall ? 1.5 : 0.8
  const delay = Math.random() * 2.5
  const duration = 1.2 + Math.random() * 1.4
  return { angle, length, width, delay, duration }
})

const SPARKLES = Array.from({ length: 18 }, (_, i) => {
  const angle = (i / 18) * 360 + 5
  const radius = 155 + Math.random() * 30
  const size = 2 + Math.random() * 3
  const delay = Math.random() * 3
  const duration = 1.5 + Math.random() * 2
  return { angle, radius, size, delay, duration }
})

function GoldenHalo() {
  const cx = 300
  const cy = 300
  const ringR = 130

  return (
    <svg
      width="600"
      height="600"
      viewBox="0 0 600 600"
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        zIndex: 1,
      }}
    >
      <defs>
        <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6b4f1a" stopOpacity="0.6" />
          <stop offset="35%" stopColor="#c8a84b" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#f5e09a" stopOpacity="1" />
          <stop offset="65%" stopColor="#c8a84b" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#6b4f1a" stopOpacity="0.6" />
        </linearGradient>
        
        <linearGradient id="rayGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f5e09a" stopOpacity="1" />
          <stop offset="100%" stopColor="#c8a84b" stopOpacity="0" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="softglow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>


      <circle
        cx={cx} cy={cy} r={ringR + 8}
        fill="none"
        stroke="rgba(200,168,75,0.08)"
        strokeWidth="22"
        filter="url(#softglow)"
      />


      <circle
        cx={cx} cy={cy} r={ringR}
        fill="none"
        stroke="url(#ringGrad)"
        strokeWidth="1"
        filter="url(#glow)"
      />


      {RAYS.map((ray, i) => {
        const rad = (ray.angle * Math.PI) / 180
        const x1 = cx + Math.cos(rad) * (ringR - 2)
        const y1 = cy + Math.sin(rad) * (ringR - 2)
        const x2 = cx + Math.cos(rad) * (ringR + ray.length)
        const y2 = cy + Math.sin(rad) * (ringR + ray.length)

        return (
          <motion.line
            key={i}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="url(#rayGrad)"
            strokeWidth={ray.width}
            strokeLinecap="round"
            filter="url(#glow)"
            initial={{ opacity: 0.2, scaleY: 0.5 }}
            animate={{
              opacity: [0.2, 1, 0.3, 0.9, 0.2],
              scaleY: [0.5, 1, 0.6, 1, 0.5],
            }}
            transition={{
              delay: ray.delay,
              duration: ray.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ transformOrigin: `${x1}px ${y1}px` }}
          />
        )
      })}


      {SPARKLES.map((sp, i) => {
        const rad = (sp.angle * Math.PI) / 180
        const x = cx + Math.cos(rad) * sp.radius
        const y = cy + Math.sin(rad) * sp.radius
        return (
          <motion.circle
            key={i}
            cx={x} cy={y} r={sp.size / 2}
            fill="#f5e09a"
            filter="url(#glow)"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              delay: sp.delay,
              duration: sp.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )
      })}


      <motion.circle
        cx={cx} cy={cy} r={ringR}
        fill="none"
        stroke="rgba(245,224,154,0.55)"
        strokeWidth="1.5"
        strokeDasharray="30 500"
        strokeLinecap="round"
        filter="url(#glow)"
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      />
      <motion.circle
        cx={cx} cy={cy} r={ringR}
        fill="none"
        stroke="rgba(245,224,154,0.3)"
        strokeWidth="1"
        strokeDasharray="15 500"
        strokeLinecap="round"
        filter="url(#glow)"
        animate={{ rotate: -360 }}
        transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      />
    </svg>
  )
}

function IntroScreen({ onDone }: { onDone: () => void }) {
  const controls = useAnimation()
  const [visible, setVisible] = useState(true)
  const touchStartY = useRef<number | null>(null)
  const dismissing = useRef(false)

  const dismiss = async () => {
    if (dismissing.current) return
    dismissing.current = true
    await controls.start({
      y: "-100%",
      transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1] },
    })
    setVisible(false)
    onDone()
  }

  useEffect(() => {
    
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      if (e.deltaY > 0) dismiss()
    }

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY
    }

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      if (touchStartY.current === null) return
      const deltaY = touchStartY.current - e.touches[0].clientY
      if (deltaY > 40) dismiss()
    }

    window.addEventListener("wheel", handleWheel, { passive: false })
    window.addEventListener("touchstart", handleTouchStart, { passive: false })
    window.addEventListener("touchmove", handleTouchMove, { passive: false })

    return () => {
      window.removeEventListener("wheel", handleWheel)
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchmove", handleTouchMove)
    }
  }, [])

  if (!visible) return null

  return (
    <motion.div
      animate={controls}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#080808",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      
      <div style={{
        position: "absolute",
        width: "520px",
        height: "520px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(180,140,60,0.1) 0%, transparent 65%)",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        animation: "ambientPulse 4s ease-in-out infinite",
      }} />


      <GoldenHalo />


      <div style={{
        position: "relative",
        zIndex: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}>
        
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 1.2, ease: "easeOut" }}
          style={{
            width: "80px",
            height: "1px",
            background: "linear-gradient(90deg, transparent, #c8a84b, transparent)",
            marginBottom: "18px",
          }}
        />


        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.2em" }}
          animate={{ opacity: 1, letterSpacing: "0.5em" }}
          transition={{ delay: 0.6, duration: 1.4, ease: "easeOut" }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "0.7rem",
            color: "rgba(200,168,75,0.75)",
            textTransform: "uppercase",
            marginBottom: "16px",
          }}
        >
          Welcome to
        </motion.p>


        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1.3, ease: "easeOut" }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2.8rem, 8vw, 5.5rem)",
            fontWeight: 300,
            fontStyle: "italic",
            letterSpacing: "0.08em",
            lineHeight: 1.05,
            background: "linear-gradient(105deg, #7a5e20 0%, #c8a84b 28%, #f5e09a 50%, #c8a84b 72%, #7a5e20 100%)",
            backgroundSize: "250% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "shine 3.5s linear infinite",
            margin: 0,
          }}
        >
          Noire Palace
        </motion.h1>


        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1.4 }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(0.65rem, 1.5vw, 0.85rem)",
            color: "rgba(200,168,75,0.5)",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            marginTop: "14px",
          }}
        >
          Luxury Resort &amp; Spa
        </motion.p>


        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 1.2, ease: "easeOut" }}
          style={{
            width: "80px",
            height: "1px",
            background: "linear-gradient(90deg, transparent, #c8a84b, transparent)",
            marginTop: "18px",
          }}
        />
      </div>


      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.6, 0] }}
        transition={{ delay: 2.2, duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          bottom: "44px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
          zIndex: 2,
        }}
      >
        <span style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "0.6rem",
          color: "rgba(200,168,75,0.45)",
          letterSpacing: "0.45em",
          textTransform: "uppercase",
        }}>
          Scroll to enter
        </span>
        <svg width="14" height="20" viewBox="0 0 14 20" fill="none">
          <rect x="0.5" y="0.5" width="13" height="19" rx="6.5" stroke="rgba(200,168,75,0.35)" />
          <motion.rect
            x="6" y="3" width="2" height="4" rx="1"
            fill="rgba(200,168,75,0.55)"
            animate={{ y: [3, 9, 3] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </motion.div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');

        @keyframes shine {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }

        @keyframes ambientPulse {
          0%, 100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          50%       { opacity: 0.6; transform: translate(-50%, -50%) scale(1.12); }
        }
      `}</style>
    </motion.div>
  )
}

export default IntroScreen
