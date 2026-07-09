import { useState, useEffect } from "react"
import {getReservations, checkIn, checkOut, payInvoice} from "../../api/fdManagerApi";

export default function FrontDeskManager() {

  const [reservationDate, setReservationDate] = useState("")
  const [username, setUsername] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [passport, setPassport] = useState("")
  const [nationality, setNationality] = useState("")

  const [checkoutDate, setCheckoutDate] = useState("")
  const [roomNumber, setRoomNumber] = useState("")
  const [tax, setTax] = useState("")
  const [discount, setDiscount] = useState("")

  const [paymentMethod, setPaymentMethod] = useState("")
  const [transactionId, setTransactionId] = useState("")
  const [invoiceId,setInvoiceId]=useState<number|null>(null);

  const [reservations, setReservations] = useState<any[]>([]);


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
                {reservations.map((r) => (
                    <tr key={r.id} className="border-b">
                        <td className="p-4">{r.id}</td>
                        <td className="p-4">{r.guestId}</td>
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
              onChange={(e)=>setReservationDate(e.target.value)}
              placeholder="Reservation Date"
              className="border rounded-lg p-3"
            />

            <input
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
              placeholder="Username"
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

            <button
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

                        await loadReservations();

                    }

                    catch (err) {

                        console.log(err);
                        alert("Check In failed.");

                    }

                }}
                className="mt-6 bg-green-600 text-white px-8 py-3 rounded-lg"
            >
                Check In
            </button>

        </div>

        {/* Check Out */}

        <div className="bg-white rounded-xl shadow border p-8">

          <h2 className="text-2xl font-semibold mb-6">
            Check Out Guest
          </h2>

          <div className="grid grid-cols-2 gap-5">

            <input
              type="date"
              value={checkoutDate}
              onChange={(e)=>setCheckoutDate(e.target.value)}
              className="border rounded-lg p-3"
            />

            <input
              value={roomNumber}
              onChange={(e)=>setRoomNumber(e.target.value)}
              placeholder="Room Number"
              className="border rounded-lg p-3"
            />

            <input
              type="number"
              value={tax}
              onChange={(e)=>setTax(e.target.value)}
              placeholder="Tax (%)"
              className="border rounded-lg p-3"
            />

            <input
              type="number"
              value={discount}
              onChange={(e)=>setDiscount(e.target.value)}
              placeholder="Discount (%)"
              className="border rounded-lg p-3"
            />

            </div>

            <button
                onClick={async () => {

                    try {

                        const id = await checkOut({
                            reservationDate: checkoutDate,
                            roomNumber: Number(roomNumber),
                            tax: Number(tax),
                            discount: Number(discount)
                        });

                        setInvoiceId(id);

                        alert("Invoice generated.");

                        await loadReservations();

                    }

                    catch (err) {

                        console.log(err);
                        alert("Checkout failed.");

                    }

                }}
                className="mt-6 bg-orange-600 text-white px-8 py-3 rounded-lg"
            >
                Generate Invoice
            </button>

        </div>

        {/* Payment */}

        <div className="bg-white rounded-xl shadow border p-8">

          <h2 className="text-2xl font-semibold mb-6">
            Register Payment
          </h2>

          <div className="grid grid-cols-3 gap-5">

            <input
                type="number"
                value={invoiceId ?? ""}
                onChange={(e) => setInvoiceId(Number(e.target.value))}
                placeholder="Invoice ID"
                className="border rounded-lg p-3"
            />

            <select
              value={paymentMethod}
              onChange={(e)=>setPaymentMethod(e.target.value)}
              className="border rounded-lg p-3"
            >

              <option value="">
                Payment Method
              </option>

              <option>
                Cash
              </option>

              <option>
                Card
              </option>

              <option>
                Bank Transfer
              </option>

            </select>

            <input
              value={transactionId}
              onChange={(e)=>setTransactionId(e.target.value)}
              placeholder="Transaction ID"
              className="border rounded-lg p-3"
            />

          </div>

            <button
                onClick={async () => {

                    if (invoiceId == null) {
                        alert("Invoice ID required");
                        return;
                    }

                    try {

                        await payInvoice(
                            invoiceId,
                            {
                                paymentMethod,
                                transactionId
                            }
                        );

                        alert("Payment registered.");

                    }

                    catch (err) {

                        console.log(err);
                        alert("Payment failed.");

                    }

                }}
                className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-lg"
            >
                Register Payment
            </button>

        </div>

      </div>

    </div>
  )

}