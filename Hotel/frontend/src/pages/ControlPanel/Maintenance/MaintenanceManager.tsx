import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../../context/AuthContext"
import {
    getMaintenanceRequests,
    createMaintenanceRequest,
    updateMaintenanceRequest,
    deleteMaintenanceRequest,
} from "../../../api/maintenanceApi";

interface MaintenanceRequest {
    id: number;
    roomId: number;
    reportedEmployeeId: number;
    description?: string;
    status?: string;
    priority?: string;
    createdDate?: string;
    modifiedDate?: string;
}

const STATUS_OPTIONS = ["Pending", "In Progress", "Done"];
const PRIORITY_OPTIONS = ["Low", "Medium", "High"];

interface CreateFormState {
    roomId: string;
    priority: string;
    status: string;
    reportedEmployeeId: string;
    description: string;
}

interface EditFormState {
    roomId: string;
    priority: string;
    status: string;
    reportedEmployeeId: string;
    description: string;
}

const emptyCreateForm: CreateFormState = {
    roomId: "",
    priority: "Low",
    status: "Pending",
    reportedEmployeeId: "",
    description: "",
};

export default function MaintenanceManager() {
    const [requests, setRequests] = useState<MaintenanceRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [searchRoom, setSearchRoom] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const [filterPriority, setFilterPriority] = useState("");
    const [filterEngineer, setFilterEngineer] = useState("");

    const [createForm, setCreateForm] = useState<CreateFormState>(emptyCreateForm);
    const [creating, setCreating] = useState(false);

    const [editingId, setEditingId] = useState<number | null>(null);
    const [editForm, setEditForm] = useState<EditFormState | null>(null);
    const [savingEdit, setSavingEdit] = useState(false);
    const [deletingId, setDeletingId] = useState<number | null>(null);


    const { user, loading: authLoading  } = useAuth();

    useEffect(() => {
        loadRequests();
    }, []);

    const stats = useMemo(() => {
        return {
            pending: requests.filter((r) => r.status === "Pending").length,
            inProgress: requests.filter((r) => r.status === "In Progress").length,
            completed: requests.filter((r) => r.status === "Done").length,
            highPriority: requests.filter((r) => r.priority === "High").length,
        };
    }, [requests]);

    const filteredRequests = useMemo(() => {
        return requests.filter((r) => {
            if (searchRoom && !String(r.roomId).includes(searchRoom.trim())) return false;
            if (filterStatus && r.status !== filterStatus) return false;
            if (filterPriority && r.priority !== filterPriority) return false;
            if (filterEngineer && String(r.reportedEmployeeId) !== filterEngineer.trim())
                return false;
            return true;
        });
    }, [requests, searchRoom, filterStatus, filterPriority, filterEngineer]);


    if (authLoading) {
        return null; 
    }
    if (user?.role !== "HotelManager" && user?.role !== "Engineer" && user?.role !== "DirectorOfRooms") {
    return (
            <div className="mx-auto mt-4 max-w-3xl rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
            You don't have permission to access this page.
            </div>
        );
    }


    async function loadRequests() {
        setLoading(true);
        setError(null);
        try {
            const data = await getMaintenanceRequests();
            setRequests(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to load maintenance requests");
        } finally {
            setLoading(false);
        }
    }



    async function handleCreate(e: React.FormEvent) {
        e.preventDefault();
        setError(null);

        const roomId = Number(createForm.roomId);
        if (!createForm.roomId || Number.isNaN(roomId)) {
            setError("Room number is required and must be a number");
            return;
        }

        const payload: {
            roomId: number;
            reportedEmployeeId?: number;
            description?: string;
            status?: string;
            priority?: string;
        } = {
            roomId,
            status: createForm.status,
            priority: createForm.priority,
        };
        if (createForm.description) payload.description = createForm.description;
        if (createForm.reportedEmployeeId) {
            const empId = Number(createForm.reportedEmployeeId);
            if (Number.isNaN(empId)) {
                setError("Engineer ID must be a number");
                return;
            }
            payload.reportedEmployeeId = empId;
        }

        setCreating(true);
        try {
            await createMaintenanceRequest(payload);
            setCreateForm(emptyCreateForm);
            await loadRequests();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to create request");
        } finally {
            setCreating(false);
        }
    }

    function startEdit(req: MaintenanceRequest) {
        setEditingId(req.id);
        setEditForm({
            roomId: String(req.roomId),
            priority: req.priority ?? "Low",
            status: req.status ?? "Pending",
            reportedEmployeeId: String(req.reportedEmployeeId ?? ""),
            description: req.description ?? "",
        });
    }

    function cancelEdit() {
        setEditingId(null);
        setEditForm(null);
    }

    async function handleSaveEdit(id: number) {
        if (!editForm) return;
        setError(null);

        const roomId = Number(editForm.roomId);
        const empId = Number(editForm.reportedEmployeeId);
        if (Number.isNaN(roomId) || Number.isNaN(empId)) {
            setError("Room number and Engineer ID must be numbers");
            return;
        }

        setSavingEdit(true);
        try {
            await updateMaintenanceRequest(id, {
                roomId,
                reportedEmployeeId: empId,
                description: editForm.description,
                status: editForm.status,
                priority: editForm.priority,
            });
            cancelEdit();
            await loadRequests();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to update request");
        } finally {
            setSavingEdit(false);
        }
    }

    async function handleDelete(id: number) {
        if (!window.confirm(`Delete maintenance request #${id}?`)) return;
        setError(null);
        setDeletingId(id);
        try {
            await deleteMaintenanceRequest(id);
            await loadRequests();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to delete request");
        } finally {
            setDeletingId(null);
        }
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Maintenance Manager</h1>

            {error && (
                <div className="mb-4 rounded border border-red-400 bg-red-50 text-red-700 px-4 py-2 text-sm">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                <StatCard label="Pending" value={stats.pending} />
                <StatCard label="In Progress" value={stats.inProgress} />
                <StatCard label="Completed" value={stats.completed} />
                <StatCard label="High Priority" value={stats.highPriority} />
            </div>

            <div className="mb-6 flex flex-wrap gap-3 items-end border rounded p-3 bg-gray-50">
                <div>
                    <label className="block text-xs text-gray-600 mb-1">Search room</label>
                    <input
                        type="text"
                        className="border rounded px-2 py-1 w-28"
                        value={searchRoom}
                        onChange={(e) => setSearchRoom(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-xs text-gray-600 mb-1">Status</label>
                    <select
                        className="border rounded px-2 py-1"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="">All</option>
                        {STATUS_OPTIONS.map((s) => (
                            <option key={s} value={s}>
                                {s}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-xs text-gray-600 mb-1">Priority</label>
                    <select
                        className="border rounded px-2 py-1"
                        value={filterPriority}
                        onChange={(e) => setFilterPriority(e.target.value)}
                    >
                        <option value="">All</option>
                        {PRIORITY_OPTIONS.map((p) => (
                            <option key={p} value={p}>
                                {p}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-xs text-gray-600 mb-1">Engineer ID</label>
                    <input
                        type="text"
                        className="border rounded px-2 py-1 w-28"
                        value={filterEngineer}
                        onChange={(e) => setFilterEngineer(e.target.value)}
                    />
                </div>
                {(searchRoom || filterStatus || filterPriority || filterEngineer) && (
                    <button
                        onClick={() => {
                            setSearchRoom("");
                            setFilterStatus("");
                            setFilterPriority("");
                            setFilterEngineer("");
                        }}
                        className="text-sm text-blue-600 underline"
                    >
                        Clear filters
                    </button>
                )}
            </div>

            {loading ? (
                <p>Loading requests...</p>
            ) : filteredRequests.length === 0 ? (
                <p className="text-gray-500 mb-6">No maintenance requests match.</p>
            ) : (
                <table className="w-full border-collapse text-sm mb-8">
                    <thead>
                        <tr className="border-b bg-gray-100 text-left">
                            <th className="p-2">ID</th>
                            <th className="p-2">Room</th>
                            <th className="p-2">Engineer</th>
                            <th className="p-2">Priority</th>
                            <th className="p-2">Status</th>
                            <th className="p-2">Created</th>
                            <th className="p-2">Completed</th>
                            <th className="p-2">Description</th>
                            <th className="p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRequests.map((req) => {
                            const isEditing = editingId === req.id;
                            return (
                                <tr key={req.id} className="border-b align-top">
                                    <td className="p-2">#{req.id}</td>

                                    {isEditing && editForm ? (
                                        <>
                                            <td className="p-2">
                                                <input
                                                    type="number"
                                                    className="border rounded px-1 py-0.5 w-20"
                                                    value={editForm.roomId}
                                                    onChange={(e) =>
                                                        setEditForm({ ...editForm, roomId: e.target.value })
                                                    }
                                                />
                                            </td>
                                            <td className="p-2">
                                                <input
                                                    type="number"
                                                    className="border rounded px-1 py-0.5 w-24"
                                                    value={editForm.reportedEmployeeId}
                                                    onChange={(e) =>
                                                        setEditForm({
                                                            ...editForm,
                                                            reportedEmployeeId: e.target.value,
                                                        })
                                                    }
                                                />
                                            </td>
                                            <td className="p-2">
                                                <select
                                                    className="border rounded px-1 py-0.5"
                                                    value={editForm.priority}
                                                    onChange={(e) =>
                                                        setEditForm({ ...editForm, priority: e.target.value })
                                                    }
                                                >
                                                    {PRIORITY_OPTIONS.map((p) => (
                                                        <option key={p} value={p}>
                                                            {p}
                                                        </option>
                                                    ))}
                                                </select>
                                            </td>
                                            <td className="p-2">
                                                <select
                                                    className="border rounded px-1 py-0.5"
                                                    value={editForm.status}
                                                    onChange={(e) =>
                                                        setEditForm({ ...editForm, status: e.target.value })
                                                    }
                                                >
                                                    {STATUS_OPTIONS.map((s) => (
                                                        <option key={s} value={s}>
                                                            {s}
                                                        </option>
                                                    ))}
                                                </select>
                                            </td>
                                            <td className="p-2">
                                                {req.createdDate ? req.createdDate.slice(0, 10) : "-"}
                                            </td>
                                            <td className="p-2">
                                                {req.modifiedDate ? req.modifiedDate.slice(0, 10) : "-"}
                                            </td>
                                            <td className="p-2">
                                                <input
                                                    type="text"
                                                    className="border rounded px-1 py-0.5 w-full"
                                                    value={editForm.description}
                                                    onChange={(e) =>
                                                        setEditForm({
                                                            ...editForm,
                                                            description: e.target.value,
                                                        })
                                                    }
                                                />
                                            </td>
                                            <td className="p-2 space-x-2 whitespace-nowrap">
                                                <button
                                                    onClick={() => handleSaveEdit(req.id)}
                                                    disabled={savingEdit}
                                                    className="bg-green-600 text-white px-2 py-1 rounded text-xs disabled:opacity-50"
                                                >
                                                    {savingEdit ? "Saving..." : "Save"}
                                                </button>
                                                <button
                                                    onClick={cancelEdit}
                                                    className="bg-gray-300 px-2 py-1 rounded text-xs"
                                                >
                                                    Cancel
                                                </button>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td className="p-2">Room {req.roomId}</td>
                                            <td className="p-2">Engineer #{req.reportedEmployeeId}</td>
                                            <td className="p-2">{req.priority ?? "-"}</td>
                                            <td className="p-2">{req.status ?? "-"}</td>
                                            <td className="p-2">
                                                {req.createdDate ? req.createdDate.slice(0, 10) : "-"}
                                            </td>
                                            <td className="p-2">
                                                {req.modifiedDate ? req.modifiedDate.slice(0, 10) : "-"}
                                            </td>
                                            <td className="p-2 max-w-xs truncate">
                                                {req.description || "-"}
                                            </td>
                                            <td className="p-2 space-x-2 whitespace-nowrap">
                                                <button
                                                    onClick={() => startEdit(req)}
                                                    className="bg-blue-600 text-white px-2 py-1 rounded text-xs"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(req.id)}
                                                    disabled={deletingId === req.id}
                                                    className="bg-red-600 text-white px-2 py-1 rounded text-xs disabled:opacity-50"
                                                >
                                                    {deletingId === req.id ? "Deleting..." : "Delete"}
                                                </button>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}

            
            <form onSubmit={handleCreate} className="rounded border border-gray-300 p-4 bg-gray-50">
                <h2 className="font-semibold mb-3">Create maintenance request</h2>
                <div className="flex flex-wrap gap-3 items-end">
                    <div>
                        <label className="block text-xs text-gray-600 mb-1">Room Number</label>
                        <input
                            type="number"
                            className="border rounded px-2 py-1 w-28"
                            value={createForm.roomId}
                            onChange={(e) =>
                                setCreateForm({ ...createForm, roomId: e.target.value })
                            }
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-600 mb-1">Priority</label>
                        <select
                            className="border rounded px-2 py-1"
                            value={createForm.priority}
                            onChange={(e) =>
                                setCreateForm({ ...createForm, priority: e.target.value })
                            }
                        >
                            {PRIORITY_OPTIONS.map((p) => (
                                <option key={p} value={p}>
                                    {p}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs text-gray-600 mb-1">Status</label>
                        <select
                            className="border rounded px-2 py-1"
                            value={createForm.status}
                            onChange={(e) =>
                                setCreateForm({ ...createForm, status: e.target.value })
                            }
                        >
                            {STATUS_OPTIONS.map((s) => (
                                <option key={s} value={s}>
                                    {s}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        {/* TODO: no GET Engineers endpoint — free ID input instead of dropdown */}
                        <label className="block text-xs text-gray-600 mb-1">
                            Assign engineer (optional)
                        </label>
                        <input
                            type="number"
                            className="border rounded px-2 py-1 w-32"
                            placeholder="auto-assign if blank"
                            value={createForm.reportedEmployeeId}
                            onChange={(e) =>
                                setCreateForm({
                                    ...createForm,
                                    reportedEmployeeId: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="flex-1 min-w-[200px]">
                        <label className="block text-xs text-gray-600 mb-1">Description</label>
                        <input
                            type="text"
                            className="border rounded px-2 py-1 w-full"
                            value={createForm.description}
                            onChange={(e) =>
                                setCreateForm({ ...createForm, description: e.target.value })
                            }
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={creating}
                        className="bg-blue-600 text-white px-4 py-1.5 rounded disabled:opacity-50"
                    >
                        {creating ? "Creating..." : "Create request"}
                    </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                    If engineer is left empty, the backend automatically assigns one.
                </p>
            </form>
        </div>
    );
}

function StatCard({ label, value }: { label: string; value: number }) {
    return (
        <div className="border rounded p-3 text-center bg-white">
            <div className="text-2xl font-bold">{value}</div>
            <div className="text-xs text-gray-500">{label}</div>
        </div>
    );
}
