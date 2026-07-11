import { useState, useEffect } from "react"
import {getReservations, checkIn, checkOut, payInvoice} from "../../../api/fdManagerApi";

export default function CheckIn() {

  const [reservationDate, setReservationDate] = useState("")
  const [username, setUsername] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [passport, setPassport] = useState("")
  const [nationality, setNationality] = useState("")
  const [reservations, setReservations] = useState<any[]>([]);
  const [selectedReservation, setSelectedReservation] = useState<any | null>(null);
  const [search, setSearch] = useState("");


    const loadReservations = async () => {
        try {
            const data = await getReservations();
            console.log(data);
            setReservations(data);
        }
        catch (err) {
            console.log(err);
            alert("Failed to load reservations.");
        }
    };

    useEffect(() => {
        loadReservations();
    }, []);

  return (

    <div className="min-h-screen bg-zinc-100">

      <div className="bg-blue-700 text-white px-10 py-8 shadow-lg">
        <h1 className="text-4xl font-bold">
          Front Desk Manager
        </h1>
      </div>

      <div className="max-w-7xl mx-auto p-10 space-y-10">

        {/* Reservations */}

        <div className="bg-white rounded-xl shadow border p-8">
          <div className="flex justify-between items-center mb-6">

            <h2 className="text-2xl font-semibold">
              Reservations
            </h2>

            <button
                onClick={loadReservations}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg"
            >
                Refresh Reservations
            </button>

          </div>

            <input
                placeholder="Search username..."
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
                className="border rounded-lg p-3 w-80 mb-6"
            />

          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">

                <th className="p-4 text-left">Reservation ID</th>
                <th className="p-4 text-left">Guest</th>
                <th className="p-4 text-left">Room</th>
                <th className="p-4 text-left">Check In</th>
                <th className="p-4 text-left">Check Out</th>

              </tr>
            </thead>

            <tbody>
                {reservations.filter(r =>(r.guest?.user?.username ?? "")
                                .toLowerCase()
                                .includes(search.toLowerCase()))
                                .map((r) => (
                                <tr
                                    key={r.id}
                                    className={`border-b cursor-pointer transition ${
                                        selectedReservation?.id === r.id ? "bg-blue-100": "hover:bg-gray-100"}`}
                                    onClick={() => {
                                        setSelectedReservation(r);
                                        setReservationDate(
                                            new Date(r.checkInDate)
                                                .toISOString()
                                                .split("T")[0]
                                        );
                                        setUsername(r.guest?.user?.username ?? "");
                                    }}>
                        <td className="p-4">{r.id}</td>
                        <td className="p-4">{r.guest?.user?.username ?? r.guestId}</td>
                        <td className="p-4">{r.roomId}</td>
                        <td className="p-4">
                            {new Date(r.checkInDate).toLocaleDateString()}
                        </td>
                        <td className="p-4">
                            {new Date(r.checkOutDate).toLocaleDateString()}
                        </td>
                    </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Check In */}

        <div className="bg-white rounded-xl shadow border p-8">
        {selectedReservation && (
            <div className="mb-6 rounded-lg bg-blue-50 p-4">
                <p className="font-semibold">
                    Selected Reservation
                </p>
                <p>
                    Reservation #
                    {selectedReservation.id}
                </p>
                <p>
                    Room:
                    {selectedReservation.roomId}
                </p>
            </div>
            )}
          <h2 className="text-2xl font-semibold mb-6">
            Check In Guest
          </h2>

          <div className="grid grid-cols-2 gap-5">
            <input
                type="date"
                value={reservationDate}
                readOnly
                className="border rounded-lg p-3 bg-gray-100"
            />

            <input
                value={username}
                readOnly
                className="border rounded-lg p-3 bg-gray-100"
            />

            <input
              value={firstName}
              onChange={(e)=>setFirstName(e.target.value)}
              placeholder="First Name"
              className="border rounded-lg p-3"
            />

            <input
              value={lastName}
              onChange={(e)=>setLastName(e.target.value)}
              placeholder="Last Name"
              className="border rounded-lg p-3"
            />

            <input
              value={passport}
              onChange={(e)=>setPassport(e.target.value)}
              placeholder="Passport Number"
              className="border rounded-lg p-3"
            />

            <input
              value={nationality}
              onChange={(e)=>setNationality(e.target.value)}
              placeholder="Nationality"
              className="border rounded-lg p-3"
            />

            </div>

            <button disabled={!selectedReservation}
                onClick={async () => {

                    try {
                        await checkIn({
                            reservationDate,
                            userName: username,
                            nationality,
                            passportNumber: passport,
                            firstName,
                            lastName
                        });

                        alert("Guest checked in!");
                        
                        setSelectedReservation(null);
                        setReservationDate("");
                        setUsername("");
                        setFirstName("");
                        setLastName("");
                        setPassport("");
                        setNationality("");
                        await loadReservations();
                    }

                    catch (err) {
                        console.log(err);
                        alert("Check In failed.");
                    }
                }}
                className={`mt-6 px-8 py-3 rounded-lg text-white transition
                            ${
                                selectedReservation
                                    ? "bg-green-600 hover:bg-green-700"
                                    : "bg-gray-400 cursor-not-allowed"
                            }`}
            >
                Check In
            </button>
        </div>
      </div>
    </div>
  )
}