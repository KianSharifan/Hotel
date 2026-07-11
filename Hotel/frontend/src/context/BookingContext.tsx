import { createContext, useContext, useState } from "react"
import type { ReactNode } from "react"

export type BookingState = {
  adults: number
  children: number
  checkIn: string
  checkOut: string
  selectedRoom: { id: number; name: string; price: number } | null
  step: 1 | 2 | 3 | 4
}

type BookingContextType = {
  booking: BookingState
  setGuests: (adults: number, children: number) => void
  setDates: (checkIn: string, checkOut: string) => void
  setRoom: (room: { id: number; name: string; price: number }) => void
  resetBooking: () => void
  goToStep: (step: 1 | 2 | 3 | 4) => void
}

const defaultState: BookingState = {
  adults: 0,
  children: 0,
  checkIn: "",
  checkOut: "",
  selectedRoom: null,
  step: 1,
}

const BookingContext = createContext<BookingContextType | null>(null)

export function BookingProvider({ children }: { children: ReactNode }) {
  const [booking, setBooking] = useState<BookingState>(defaultState)

  const setGuests = (adults: number, children: number) => {
    setBooking((b) => ({ ...b, adults, children, step: Math.max(b.step, 2) as 1|2|3|4 }))
  }

  const setDates = (checkIn: string, checkOut: string) => {
    setBooking((b) => ({ ...b, checkIn, checkOut, step: Math.max(b.step, 3) as 1|2|3|4 }))
  }

  const setRoom = (room: { id: number; name: string; price: number }) => {
    setBooking((b) => ({ ...b, selectedRoom: room, step: 4 }))
  }

  const resetBooking = () => setBooking(defaultState)

  const goToStep = (step: 1 | 2 | 3 | 4) => {
    setBooking((b) => ({ ...b, step }))
  }

  return (
    <BookingContext.Provider value={{ booking, setGuests, setDates, setRoom, resetBooking, goToStep }}>
      {children}
    </BookingContext.Provider>
  )
}

export function useBooking() {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error("useBooking must be used within BookingProvider")
  return ctx
}
