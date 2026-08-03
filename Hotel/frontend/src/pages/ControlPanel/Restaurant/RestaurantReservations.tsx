import { useEffect, useState } from "react"
import { getRestaurantReservation, getRestaurantReservations } from "../../../api/restaurantTablesApi"
import { useAuth } from "../../../context/AuthContext"

interface TableReservation {
    id: number;
    tableId: number;
    time: string;
    description?: string;
    email?: string;
}

export default function RestaurantReservations() {
    const [reservations, setReservations] = useState<TableReservation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [searchId, setSearchId] = useState("");
    const [searchedReservation, setSearchedReservation] = useState<TableReservation | null>(null);
    const [searching, setSearching] = useState(false);

    const { user, loading: authLoading } = useAuth();

    useEffect(() => {
        loadReservations();
    }, []);

    if (authLoading) {
        return null;
    }
    if (user?.role !== "HotelManager" && user?.role !== "RestaurantManager" && user?.role !== "Waiter") 
    {
        return (
            <div className="mx-auto mt-4 max-w-3xl rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
                You don't have permission to access this page.
            </div>
        );
    }

    async function loadReservations() {
        setLoading(true);
        setError(null);
        try {
            const data = await getRestaurantReservations();
            setReservations(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to load reservations");
        } finally {
            setLoading(false);
        }
    }



    async function handleSearch(e: React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);

        const id = Number(searchId);
        if (!searchId || Number.isNaN(id)) {
            setError("Enter a valid reservation ID.");
            return;
        }

        setSearching(true);
        try {
            const data = await getRestaurantReservation(id);
            setSearchedReservation(data);
        } catch (err) {
            setSearchedReservation(null);
            setError(err instanceof Error ? err.message : "Reservation not found");
        } finally {
            setSearching(false);
        }
    }

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Restaurant Reservations</h1>

            {error && (
                <div className="mb-4 rounded border border-red-400 bg-red-50 text-red-700 px-4 py-2 text-sm">
                    {error}
                </div>
            )}

            <form onSubmit={handleSearch} className="flex items-end gap-2 mb-6">
                <div>
                    <label className="block text-xs text-gray-600 mb-1">Reservation ID</label>
                    <input
                        type="number"
                        className="border rounded px-2 py-1 w-40"
                        value={searchId}
                        onChange={(e) => setSearchId(e.target.value)}
                    />
                </div>

                <button
                    type="submit"
                    disabled={searching}
                    className="bg-blue-600 text-white px-4 py-1.5 rounded disabled:opacity-50"
                >
                    {searching ? "Searching..." : "Search"}
                </button>
            </form>

            {searchedReservation && (
                <div className="border rounded p-4 bg-white mb-6">
                    <h3 className="font-bold mb-2">Reservation Information</h3>
                    <p>
                        <strong>ID:</strong> {searchedReservation.id}
                    </p>
                    <p>
                        <strong>Table:</strong> {searchedReservation.tableId}
                    </p>
                    <p>
                        <strong>Time:</strong> {searchedReservation.time}
                    </p>
                    <p>
                        <strong>Email:</strong> {searchedReservation.email || "—"}
                    </p>
                    <p>
                        <strong>Special request:</strong>{" "}
                        {searchedReservation.description || "—"}
                    </p>
                </div>
            )}

            <h2 className="font-semibold mb-3">All reservations</h2>
            {loading ? (
                <p>Loading reservations...</p>
            ) : reservations.length === 0 ? (
                <p className="text-gray-500">No reservations yet.</p>
            ) : (
                <table className="w-full border-collapse text-sm">
                    <thead>
                        <tr className="border-b bg-gray-100 text-left">
                            <th className="p-2">ID</th>
                            <th className="p-2">Table</th>
                            <th className="p-2">Time</th>
                            <th className="p-2">Email</th>
                            <th className="p-2">Special request</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.map((r) => (
                            <tr key={r.id} className="border-b">
                                <td className="p-2">{r.id}</td>
                                <td className="p-2">{r.tableId}</td>
                                <td className="p-2">{r.time}</td>
                                <td className="p-2">{r.email || "—"}</td>
                                <td className="p-2">{r.description || "—"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
