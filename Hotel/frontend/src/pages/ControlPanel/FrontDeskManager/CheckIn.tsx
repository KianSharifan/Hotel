import { useState, useEffect } from "react"
import {getReservations, checkIn} from "../../../api/fdManagerApi";
import { useAuth } from "../../../context/AuthContext"

export default function CheckIn() {

  const [reservationDate, setReservationDate] = useState("")
  const [username, setUsername] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [passport, setPassport] = useState("")
  const [nationality, setNationality] = useState("")
  const [reservations, setReservations] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [assignedRoom, setAssignedRoom] = useState<number | null>(null);

  const { user, loading } = useAuth();

  if (loading) {
    return null; 
  }
  if (user?.role !== "HotelManager" && user?.role !== "FrontOfficeManager") {
    return (
      <div className="mx-auto mt-4 max-w-3xl rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
        You don't have permission to access this page.
      </div>
    );
  }

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
                placeholder="Search id..."
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
                {reservations.filter(r => r.id.toString().includes(search))
                                .map((r) => (
                                <tr
                                    key={r.id}
                                    className="border-b"
                                    >
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
          <h2 className="text-2xl font-semibold mb-6">
            Check In Guest
          </h2>

          <div className="grid grid-cols-2 gap-5">
            <input
                type="date"
                value={reservationDate}
                onChange={(e)=>{setAssignedRoom(null);
                    setReservationDate(e.target.value)}}
                className="border rounded-lg p-3"
            />

            <input
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
              placeholder="User Name"
              className="border rounded-lg p-3"
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

            {assignedRoom !== null && (
                <div className="mt-6 rounded-lg border border-green-300 bg-green-50 p-4">
                    <p className="text-lg font-semibold text-green-800">
                        Guest assigned to Room {assignedRoom}
                    </p>
                </div>
            )}

            <button 
                onClick={async () => {

                    try {
                        const roomNumber = await checkIn({
                            reservationDate,
                            userName: username,
                            nationality,
                            passportNumber: passport,
                            firstName,
                            lastName
                        });

                        setAssignedRoom(roomNumber);

                        alert("Guest checked in!");
                        
                        setReservationDate("");
                        setUsername("");
                        setFirstName("");
                        setLastName("");
                        setPassport("");
                        setNationality("");
                        // setAssignedRoom(null);
                        await loadReservations();
                    }

                    catch (err) {
                        console.log(err);
                        alert("Check In failed.");
                    }
                }}
                className="mt-6 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg"
            >
                Check In
            </button>
        </div>
      </div>
    </div>
  )
}