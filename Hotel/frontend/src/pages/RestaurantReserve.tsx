import { useState } from "react"
import restImg from "../assets/img2.png"


function RestaurantReservation() {

  const [date, setDate] = useState("")
  const [guests, setGuests] = useState(1)
  const [time, setTime] = useState("")
  const [email, setEmail] = useState("")
  const [specialRequest, setSpecialRequest] = useState("")
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

  const availableTimes = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
    "00:00",
  ]

  function isValidEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }


  function buildDateTime(date:string, time:string){
    return new Date(`${date}T${time}:00`).toISOString();
  }


  async function handleReservation() {
    setMessage(null);
    setIsSuccess(null);

    if (!date || !time || !email) {
      setMessage("Please complete all fields.");
      setIsSuccess(false);
      return;
    }

    if (!isValidEmail(email)) {
      setMessage("Invalid email format.");
      setIsSuccess(false);
      return;
    }

    setLoading(true);

    try {
      const payload = {
        email: email,
        specialReq: specialRequest,
        capacity: guests,
        time: buildDateTime(date, time)
      };

      console.log("PAYLOAD SENT:", JSON.stringify(payload, null, 2));
      const dt = buildDateTime(date, time);
      console.log("DATE:", date);
      console.log("TIME:", time);
      console.log("ISO:", dt);

      const res = await fetch(
        "http://localhost:5263/API/Restaurant/Tables/Reservations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        }
      );

      const text = await res.text();

      if (res.ok) {
        setIsSuccess(true);
        setMessage(text || "Reservation successful!");
      } 
      else {
        setIsSuccess(false);
        setMessage(text || "No available tables.");
      }

    } 
    
    catch (error) {
      setIsSuccess(false);
      setMessage("Server error. Please try again later.");
    }

    setLoading(false);
  }

  return (
    <div className="bg-black min-h-screen text-white">

      {/* Hero — kept as-is structurally, restyled for a richer luxury feel */}
      <section
        className="h-[70vh] relative flex items-center justify-center text-center bg-cover bg-center"
        style={{ backgroundImage: `url(${restImg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black"></div>

        <div className="relative z-10 max-w-4xl px-6">
          <p className="uppercase tracking-[12px] text-[#c8a84b] mb-6 text-sm font-medium">
            Fine Dining Experience
          </p>

          <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-tight">
            Reserve Your Table
          </h1>

          <div className="mx-auto mb-8 h-px w-24 bg-[#c8a84b]/60" />

          <p className="text-xl text-gray-300 font-light">
            Indulge in world-class dining at Noire Palace.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-8 py-24">
        <div className="bg-gradient-to-b from-[#141110] to-black rounded-3xl p-10 md:p-14 border border-[#c8a84b]/25 shadow-[0_0_60px_-15px_rgba(200,168,75,0.15)]">

          <div className="text-center mb-12">
            <p className="uppercase tracking-[6px] text-[#c8a84b] text-xs mb-3">
              Noire Palace
            </p>
            <h2 className="text-4xl font-bold">
              Table Reservation
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">

            <div>
              <label className="block mb-3 text-sm uppercase tracking-widest text-gray-400">
                Date
              </label>
              <input
                type="date"
                min={new Date().toISOString().split("T")[0]}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-black/40 border border-[#c8a84b]/20 rounded-xl px-5 py-4 text-white outline-none focus:border-[#c8a84b] transition-colors"
              />
            </div>

            <div>
              <label className="block mb-3 text-sm uppercase tracking-widest text-gray-400">
                Guests
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full bg-black/40 border border-[#c8a84b]/20 rounded-xl px-5 py-4 text-white outline-none focus:border-[#c8a84b] transition-colors"
              >
                {[1,2,3,4,5,6,7,8].map(n => (
                  <option key={n} value={n} className="bg-stone-900">
                    {n} Guest{n > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-3 text-sm uppercase tracking-widest text-gray-400">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/40 border border-[#c8a84b]/20 rounded-xl px-5 py-4 text-white outline-none focus:border-[#c8a84b] transition-colors"
              />
              {email && !isValidEmail(email) && (
                <p className="text-red-400 mt-2 text-sm">Invalid email format</p>
              )}
            </div>

            {/* SPECIAL REQUEST */}
            <div>
              <label className="block mb-3 text-sm uppercase tracking-widest text-gray-400">
                Special Request
              </label>
              <input
                type="text"
                value={specialRequest}
                onChange={(e) => setSpecialRequest(e.target.value)}
                className="w-full bg-black/40 border border-[#c8a84b]/20 rounded-xl px-5 py-4 text-white outline-none focus:border-[#c8a84b] transition-colors"
              />
            </div>
          </div>

          <div className="mt-14">
            <h3 className="text-sm uppercase tracking-widest text-gray-400 mb-6 text-center">
              Select Time
            </h3>

            <div className="flex flex-wrap justify-center gap-3">
              {availableTimes.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setTime(slot)}
                  className={`px-6 py-3 rounded-xl border transition-all duration-200 ${
                    time === slot
                      ? "bg-[#c8a84b] border-[#c8a84b] text-black font-semibold scale-105"
                      : "bg-black/30 border-[#c8a84b]/15 text-gray-300 hover:border-[#c8a84b]/60 hover:text-white"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-16 text-center">
            <button
              disabled={loading}
              onClick={handleReservation}
              className="bg-[#c8a84b] text-black px-12 py-5 rounded-2xl text-xl font-semibold tracking-wide hover:bg-[#d8ba62] hover:scale-[1.02] transition-all disabled:opacity-50 disabled:hover:scale-100"
            >
              {loading ? "Processing..." : "Reserve Table"}
            </button>
          </div>

          {message && (
            <div className="mt-10 text-center">
              <p className={isSuccess ? "text-emerald-400" : "text-red-400"}>
                {message}
              </p>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}

export default RestaurantReservation;
