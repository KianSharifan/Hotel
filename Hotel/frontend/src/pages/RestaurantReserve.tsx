import { useState } from "react"

function RestaurantReserve() {

    const [date, setDate] = useState("")
    const [guests, setGuests] = useState(1)
    const [time, setTime] = useState("")
    // const [success, ]
    return(
        <div className="pt-40 text-center font-5xl font-bold">
            Restaurant Reservation
        </div>    
        )
}

export default RestaurantReserve