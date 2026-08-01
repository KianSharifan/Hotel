import { useEffect, useState } from "react";
import {getHouseKeeperTasks,updateHouseKeepingTask} from "../../../api/houseKeepingApi"; 
import { useAuth } from "../../../context/AuthContext"

interface HouseKeepingTask {
    id: number;
    roomId: number;
    scheduledDate: string;
    employeeId: number;
    notes?: string;
    status: boolean;
}

export default function HousekeeperTasks() {
    // TEMP: manually typed username instead of pulling from auth context
    const [userName, setUserName] = useState("");

    const [tasks, setTasks] = useState<HouseKeepingTask[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [completingId, setCompletingId] = useState<number | null>(null);

    const { user, loading: authLoading  } = useAuth();


    useEffect(() => {
        loadTasks();
    }, [userName]);

    
    if (authLoading) {
        return null; 
    }
    if (user?.role !== "HotelManager" && user?.role !== "DirectorOfHR" && user?.role !== "Housekeeper") {
    return (
            <div className="mx-auto mt-4 max-w-3xl rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
            You don't have permission to access this page.
            </div>
        );
    }

    async function loadTasks() {
        if (!userName) return;
        setLoading(true);
        setError(null);
        try {
            const data = await getHouseKeeperTasks(userName);
            setTasks(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to load your tasks");
        } finally {
            setLoading(false);
        }
    }


    async function handleMarkCompleted(task: HouseKeepingTask) {
        setError(null);
        setCompletingId(task.id);
        try {
            await updateHouseKeepingTask(task.id, { status: true });
            await loadTasks();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to update task");
        } finally {
            setCompletingId(null);
        }
    }

    const pending = tasks.filter((t) => !t.status);
    const completed = tasks.filter((t) => t.status);

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">My Housekeeping Tasks</h1>

            {/* TEMP: manual username input, remove once auth is wired back in */}
            <div className="mb-6 flex items-center gap-2">
                <label className="text-sm text-gray-600">Username:</label>
                <input
                    type="text"
                    className="border rounded px-2 py-1 text-sm"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="e.g. jdoe"
                />
            </div>

            {error && (
                <div className="mb-4 rounded border border-red-400 bg-red-50 text-red-700 px-4 py-2 text-sm">
                    {error}
                </div>
            )}

            {loading ? (
                <p>Loading your tasks...</p>
            ) : !userName ? (
                <p className="text-gray-500">Type a username above to load their tasks.</p>
            ) : tasks.length === 0 ? (
                <p className="text-gray-500">You have no assigned tasks.</p>
            ) : (
                <>
                    <h2 className="font-semibold mb-2">Pending ({pending.length})</h2>
                    {pending.length === 0 ? (
                        <p className="text-gray-500 mb-6">No pending tasks. Nice work.</p>
                    ) : (
                        <ul className="mb-6 space-y-2">
                            {pending.map((task) => (
                                <li
                                    key={task.id}
                                    className="border rounded p-3 flex items-center justify-between gap-4"
                                >
                                    <div>
                                        <div className="font-medium">Room {task.roomId}</div>
                                        <div className="text-sm text-gray-600">
                                            Scheduled: {task.scheduledDate.slice(0, 10)}
                                        </div>
                                        {task.notes && (
                                            <div className="text-sm text-gray-600">
                                                Notes: {task.notes}
                                            </div>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => handleMarkCompleted(task)}
                                        disabled={completingId === task.id}
                                        className="bg-green-600 text-white px-3 py-1.5 rounded text-sm disabled:opacity-50 whitespace-nowrap"
                                    >
                                        {completingId === task.id ? "Saving..." : "Mark completed"}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}

                    <h2 className="font-semibold mb-2">Completed ({completed.length})</h2>
                    {completed.length === 0 ? (
                        <p className="text-gray-500">No completed tasks yet.</p>
                    ) : (
                        <ul className="space-y-2">
                            {completed.map((task) => (
                                <li
                                    key={task.id}
                                    className="border rounded p-3 bg-gray-50 text-gray-500"
                                >
                                    <div className="font-medium">Room {task.roomId}</div>
                                    <div className="text-sm">
                                        Scheduled: {task.scheduledDate.slice(0, 10)}
                                    </div>
                                    {task.notes && <div className="text-sm">Notes: {task.notes}</div>}
                                </li>
                            ))}
                        </ul>
                    )}
                </>
            )}
        </div>
    );
}
