import { motion, AnimatePresence } from "motion/react"
import { useEffect, useState } from "react"

interface MenuCategory {
  menuCategoryId: number
  name: string
}

interface MenuItem {
  id: number
  menuCategoryId: number
  name: string
  description: string
  price: number
}

function Menu() {
  const [categories, setCategories] = useState<MenuCategory[]>([])
  const [items, setItems] = useState<MenuItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)

  useEffect(() => {
    fetch("http://localhost:5263/API/Restaurant/Menu")
      .then(response => response.json())
      .then(data => {
        setCategories(data.menuCategories)
        setItems(data.menuItems)
        if (data.menuCategories.length > 0) {
          setSelectedCategory(data.menuCategories[0].menuCategoryId)
        }
      })
      .catch(error => console.log(error))
  }, [])

  const filteredItems = items.filter(
    item => item.menuCategoryId === selectedCategory
  )

  const selectedCategoryName = categories.find(
    c => c.menuCategoryId === selectedCategory
  )?.name ?? ""

  return (
    <div
      className="min-h-screen text-white"
      style={{ backgroundColor: "#0a0a0a" }}
    >

      <div className="relative overflow-hidden">
        {/* Ambient gold glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(212,175,55,0.08) 0%, transparent 70%)",
          }}
        />

        {/* Top thin gold rule */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, #D4AF37 30%, #D4AF37 70%, transparent)" }}
        />

        <div className="relative pt-44 pb-24 text-center px-4">

          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.2em" }}
            animate={{ opacity: 1, letterSpacing: "0.4em" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="uppercase text-xs mb-6"
            style={{ color: "#D4AF37", fontFamily: "'Cinzel', serif" }}
          >
            Noire Palace · Fine Dining
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="text-6xl md:text-8xl font-light leading-none tracking-tight"
            style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
          >
            The&nbsp;
            <span style={{ fontStyle: "italic", color: "#D4AF37" }}>Menu</span>
          </motion.h1>

          {/* Ornamental divider */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
            className="mt-10 flex items-center justify-center gap-4"
          >
            <div className="h-px w-24" style={{ background: "linear-gradient(90deg, transparent, #D4AF37)" }} />
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="6" y="0" width="2" height="14" fill="#D4AF37" />
              <rect x="0" y="6" width="14" height="2" fill="#D4AF37" />
            </svg>
            <div className="h-px w-24" style={{ background: "linear-gradient(90deg, #D4AF37, transparent)" }} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-8 text-sm tracking-widest uppercase"
            style={{ color: "#7a7a6a", fontFamily: "'Cinzel', serif" }}
          >
            Seasonal · Curated · Crafted
          </motion.p>
        </div>
      </div>

      <div
        className="sticky top-0 z-20 px-6"
        style={{
          backgroundColor: "rgba(10,10,10,0.92)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderBottom: "1px solid rgba(212,175,55,0.12)",
        }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="flex gap-0 overflow-x-auto scrollbar-hide"
            style={{
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",}}>
            {categories.map((category) => {
              const active = selectedCategory === category.menuCategoryId
              return (
                <button
                  key={category.menuCategoryId}
                  onClick={() => setSelectedCategory(category.menuCategoryId)}
                  className="relative whitespace-nowrap px-8 py-6 text-xs uppercase tracking-[3px] transition-all duration-500 flex-shrink-0"
                  style={{
                    fontFamily: "'Cinzel', serif",
                    color: active ? "#D4AF37" : "#5a5a4a",
                    background: "transparent",
                    border: "none",
                    outline: "none",
                  }}
                >
                  {category.name}
                  {active && (
                    <motion.div
                      layoutId="categoryUnderline"
                      className="absolute bottom-0 left-4 right-4 h-px"
                      style={{ background: "#D4AF37" }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-20">

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategoryName}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
            className="mb-16 flex items-center gap-6"
          >
            <span
              className="text-xs uppercase tracking-[4px]"
              style={{ color: "#D4AF37", fontFamily: "'Cinzel', serif" }}
            >
              {selectedCategoryName}
            </span>
            <div className="flex-1 h-px" style={{ background: "rgba(212,175,55,0.15)" }} />
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-0"
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.07, ease: "easeOut" }}
              >
                <div
                  className="group py-10 flex gap-8 transition-all duration-500 cursor-default"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
                >
                  <div
                    className="hidden md:block pt-1 text-xs tabular-nums flex-shrink-0 transition-colors duration-500"
                    style={{
                      fontFamily: "'Cinzel', serif",
                      color: "rgba(212,175,55,0.3)",
                      width: "2rem",
                    }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h2
                      className="text-2xl md:text-3xl font-light mb-3 leading-snug transition-colors duration-500 group-hover:text-white"
                      style={{
                        fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                        color: "#e8e8e0",
                      }}
                    >
                      {item.name}
                    </h2>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "#5a5a4a", letterSpacing: "0.02em" }}
                    >
                      {item.description}
                    </p>
                  </div>

                  <div className="flex-shrink-0 flex flex-col items-end justify-start pt-1">
                    <span
                      className="text-xl transition-colors duration-500"
                      style={{
                        fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                        color: "#D4AF37",
                        fontStyle: "italic",
                      }}
                    >
                      ${item.price}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}

            <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }} />
          </motion.div>
        </AnimatePresence>

        <div className="mt-24 text-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-16" style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.3))" }} />
            <svg width="6" height="6" viewBox="0 0 6 6"><circle cx="3" cy="3" r="3" fill="#D4AF37" opacity="0.4" /></svg>
            <div className="h-px w-16" style={{ background: "linear-gradient(90deg, rgba(212,175,55,0.3), transparent)" }} />
          </div>
          <p
            className="text-xs uppercase tracking-[4px]"
            style={{ color: "#3a3a2a", fontFamily: "'Cinzel', serif" }}
          >
            Please inform your server of any dietary requirements
          </p>
        </div>

      </div>
    </div>
  )
}

export default Menu


