import { div } from "motion/react-client"
import { useState } from "react"
import restImg from "../assets/img2.png"


function RestaurantReservation() {

  const [date, setDate] = useState("")
  const [guests, setGuests] = useState(1)
  const [time, setTime] = useState("")
  const [email, setEmail] = useState("")
  const [success, setSuccess] = useState(false)

  const availableTimes = [
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00"
  ]

  function isValidEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  function handleReservation() {
    if (!date || !time || !email) {
      alert("Please complete all fields");
      return;
    }

    if (!isValidEmail(email)) {
      alert("Invalid email format");
      return;
    }

    setSuccess(true);
  }

  return (
    <div className="bg-black min-h-screen text-white">

      {/* HERO */}

      <section
        className="
          h-[70vh]
          relative
          flex
          items-center
          justify-center
          text-center
          bg-cover
          bg-center
        "
        style={{
          backgroundImage: `url(${restImg})`
        }}
      >

        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 max-w-4xl px-6">

          <p className="uppercase tracking-[12px] text-gray-300 mb-6">

            Fine Dining Experience

          </p>

          <h1 className="text-6xl md:text-8xl font-bold mb-8">

            Reserve Your Table

          </h1>

          <p className="text-xl text-gray-200 leading-relaxed">

            Indulge in exceptional cuisine,
            world-class service,
            and unforgettable evenings at Noire Palace.

          </p>

        </div>

      </section>


      {/* FORM */}

      <section className="max-w-6xl mx-auto px-8 py-24">

        <div
          className="
            bg-stone-900
            rounded-3xl
            p-10
            shadow-2xl
            border
            border-amber-700/30
          "
        >

          <h2 className="text-4xl font-bold mb-10 text-center">
            Reservation Table
          </h2>


          <div className="grid md:grid-cols-2 gap-10">

            {/* DATE */}

            <div>

              <label className="block mb-3 text-lg">

                Reservation Date

              </label>

              <input
                type="date"
                min={new Date().toISOString().split("T")[0]}
                value={date}
                onChange={(e)=>setDate(e.target.value)}

                className="
                  w-full
                  bg-stone-700
                  border
                  border-gray-700
                  rounded-xl
                  px-5
                  py-4
                "
              />


            </div>



            {/* GUESTS */}

            <div>

              <label className="block mb-3 text-lg">
                Number Of Guests
              </label>

              <select

                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))
                }

                className="
                  w-full
                  bg-stone-700
                  border
                  border-gray-700
                  rounded-xl
                  px-5
                  py-4
                "
              >

                <option value={1}>1 Guest</option>
                <option value={2}>2 Guests</option>
                <option value={3}>3 Guests</option>
                <option value={4}>4 Guests</option>
                <option value={5}>5 Guests</option>
                <option value={6}>6 Guests</option>
                <option value={7}>7 Guests</option>
                <option value={8}>8 Guests</option>

              </select>

            </div>

            <div className="md:col-span-2 flex justify-center">
              <div className="w-full md:w-1/2">
              <label className="block mb-3 text-lg">Email</label>
              <input type="email"
              value={email}
              required
              onChange={(e)=>setEmail(e.target.value)}
                className="
                  w-full
                  bg-stone-700
                  border
                  border-gray-700
                  rounded-xl
                  px-5
                  py-4
                "/>
              {email && !isValidEmail(email) && (
                <p className="text-red-400 mt-2">Invalid email format</p>
              )}
              
              </div>
            </div>

          </div>


          {/* TIME SLOTS */}

          <div className="mt-12">

            <h3 className="text-2xl font-bold mb-6">

              Select Time

            </h3>

            <div className="flex flex-wrap gap-4">

              {availableTimes.map((slot) => (

                <button

                  key={slot}

                  onClick={() =>
                    setTime(slot)
                  }

                  className={`px-8 py-4
                    rounded-xl
                    transition-all
                    duration-500
                    ${time === slot ? "bg-amber-600 text-black" : "bg-stone-700 border border-gray-700 hover:border-amber-500"}
                  `}
                >
                  {slot}

                </button>

              ))}

            </div>

          </div>


          {/* BUTTON */}

          <div className="mt-14 text-center">

            <button

              onClick={handleReservation}

              className="
                bg-amber-600
                text-black
                px-12
                py-5
                rounded-2xl
                text-xl
                font-semibold
                hover:bg-amber-500
                hover:scale-105
                transition-all
                duration-500
              "
            >
              Reserve Table
            </button>

          </div>

        </div>

      </section>



      {/* SUCCESS MODAL */}

      {success && (

        <div
          className="
            fixed
            inset-0
            bg-black/80
            flex
            items-center
            justify-center
            z-50
          "
        >

          <div
            className="
              bg-stone-900
              p-10
              rounded-3xl
              text-center
              max-w-lg
              mx-6
            "
          >

            <h2 className="text-4xl font-bold mb-6 text-amber-500">

              Reservation Confirmed

            </h2>

            <p className="text-gray-300 mb-8">

              Thank you for choosing Noire Palace.
              We look forward to providing you
              with an unforgettable dining experience.

            </p>

            <button

              onClick={() =>
                setSuccess(false)
              }

              className="
                bg-amber-600
                text-black
                px-8
                py-4
                rounded-xl
              "
            >

              Close

            </button>

          </div>

        </div>

      )}

    </div>

  )
}

export default RestaurantReservation