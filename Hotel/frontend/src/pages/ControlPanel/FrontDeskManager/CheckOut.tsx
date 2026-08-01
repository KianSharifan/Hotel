import { useState, useEffect } from "react"
import {getReservations, checkOut, payInvoice} from "../../../api/fdManagerApi";
import { useAuth } from "../../../context/AuthContext"

export default function CheckOut() {

  const [reservationDate, setReservationDate] = useState("");
  const [roomNumber, setRoomNumber] = useState("")
  const [tax, setTax] = useState("")
  const [discount, setDiscount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("")
  const [transactionId, setTransactionId] = useState("")
  const [invoice,setInvoice]=useState<number|null>(null);
  const [reservations, setReservations] = useState<any[]>([]);
  const [search, setSearch] = useState("");

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
                {reservations.filter(r => r.id.toString().includes(search)).map((r) => (
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


        <div className="bg-white rounded-xl shadow border p-8">

          <h2 className="text-2xl font-semibold mb-6">
            Check Out Guest
          </h2>

          <div className="grid grid-cols-2 gap-5">

            <input
              type="date"
              value={reservationDate}
              onChange={(e)=>setReservationDate(e.target.value)}
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
                  try{
                      if (
                        !reservationDate ||
                        !roomNumber ||
                        !tax ||
                        !discount
                      ){
                        alert("Please complete all fields.");
                        return;
                      }
                      const invoice = await checkOut({
                        reservationDate: reservationDate,
                        roomNumber: Number(roomNumber),
                        tax: Number(tax),
                        discount: Number(discount)
                      });

                      setInvoice(invoice);
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


        <div className="bg-white rounded-xl shadow border p-8">

          <h2 className="text-2xl font-semibold mb-6">
            Register Payment
          </h2>

          <div className="grid grid-cols-3 gap-5">

            <input
              type="number"
              value={invoice ?? ""}
              // onChange={(e)=>setInvoice(e.target.value)}
              // readOnly
              className="border rounded-lg p-3 bg-gray-100"
            />

            <select
              value={paymentMethod}
              onChange={(e)=>setPaymentMethod(e.target.value)}
              className="border rounded-lg p-3"
            >

                <option value="">Payment Method</option>
                <option value="Cash">Cash</option>
                <option value="Card">Card</option>
                <option value="Bank Transfer">Bank Transfer</option>
            </select>

            <input
              value={transactionId}
              onChange={(e)=>setTransactionId(e.target.value)}
              placeholder="Transaction ID"
              className="border rounded-lg p-3"
            />

          </div>

            <button disabled={invoice == null}
                onClick={async () => {
                  if (invoice == null) {
                    alert("Invoice ID required");
                    return;
                  }

                  try{
                      if(!paymentMethod){
                        alert("Select a payment method.");
                        return;
                      }

                      if(!transactionId){
                        alert("Transaction ID required.");
                        return;
                      }
                      await payInvoice(
                        invoice,
                        {
                          paymentMethod,
                          transactionId
                        }
                      );

                      alert("Payment registered.");
                      setInvoice(null);
                      setReservationDate("");
                      setRoomNumber("");
                      setTax("");
                      setDiscount("");
                      setPaymentMethod("");
                      setTransactionId("");
                      setSearch("");

                      await loadReservations();

                  }

                  catch (err) {
                    console.log(err);
                    alert("Payment failed.");
                  }
                }}
                className={`mt-6 px-8 py-3 rounded-lg text-white
                            ${
                            invoice!= null
                            ? "bg-blue-600 hover:bg-blue-700"
                            : "bg-gray-400 cursor-not-allowed"
                            }`}
            >
                Register Payment
            </button>

        </div>
      </div>
    </div>
  )
}