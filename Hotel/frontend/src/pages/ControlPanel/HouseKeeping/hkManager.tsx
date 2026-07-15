import { useEffect, useState } from "react";
import {getAllHouseKeepingTasks, createHouseKeepingTask, updateHouseKeepingTask, deleteHouseKeepingTask} from "../../../api/houseKeepingApi";

interface HouseKeepingTask {
    id: number;
    roomId: number;
    scheduledDate: string;
    employeeId: number;
    notes?: string;
    status: boolean;
}

interface CreateFormState {
    roomId: string;
    scheduledDate: string;
    notes: string;
}

interface EditFormState {
    roomId: string;
    scheduledDate: string;
    employeeId: string;
    notes: string;
    status: boolean;
}

const emptyCreateForm: CreateFormState = {
    roomId: "",
    scheduledDate: "",
    notes: "",
};

export default function HousekeepingManager() {
    const [tasks, setTasks] = useState<HouseKeepingTask[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [createForm, setCreateForm] = useState<CreateFormState>(emptyCreateForm);
    const [creating, setCreating] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editForm, setEditForm] = useState<EditFormState | null>(null);
    const [savingEdit, setSavingEdit] = useState(false);
    const [deletingId, setDeletingId] = useState<number | null>(null);

    async function loadTasks() {
        setLoading(true);
        setError(null);
        try {
            const data = await getAllHouseKeepingTasks();
            setTasks(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to load tasks");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadTasks();
    }, []);

    async function handleCreate(e: React.FormEvent) {
        e.preventDefault();
        setError(null);

        const roomId = Number(createForm.roomId);
        if (!createForm.roomId || Number.isNaN(roomId)) {
            setError("Room ID is required and must be a number");
            return;
        }
        if (!createForm.scheduledDate) {
            setError("Scheduled date is required");
            return;
        }

        setCreating(true);
        try{
            await createHouseKeepingTask({
                roomId,
                scheduledDate: createForm.scheduledDate,
                notes: createForm.notes || undefined,
            });
            setCreateForm(emptyCreateForm);
            await loadTasks();
        } 
        catch (err) {
            setError(err instanceof Error ? err.message : "Failed to create task");
        } 
        finally {
            setCreating(false);
        }
    }

    function startEdit(task: HouseKeepingTask) {
        setEditingId(task.id);
        setEditForm({
            roomId: String(task.roomId),
            scheduledDate: task.scheduledDate.slice(0, 10), // trim to yyyy-mm-dd for the date input
            employeeId: String(task.employeeId),
            notes: task.notes ?? "",
            status: task.status,
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
        const employeeId = Number(editForm.employeeId);
        if (Number.isNaN(roomId) || Number.isNaN(employeeId)) {
            setError("Room ID and Employee ID must be numbers");
            return;
        }

        setSavingEdit(true);
        try {
            await updateHouseKeepingTask(id, {
                roomId,
                scheduledDate: editForm.scheduledDate,
                employeeId,
                notes: editForm.notes,
                status: editForm.status,
            });
            cancelEdit();
            await loadTasks();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to update task");
        } finally {
            setSavingEdit(false);
        }
    }

    async function handleDelete(id: number) {
        if (!window.confirm(`Delete housekeeping task #${id}? This cannot be undone.`)) {
            return;
        }
        setError(null);
        setDeletingId(id);
        try {
            await deleteHouseKeepingTask(id);
            await loadTasks();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to delete task");
        } finally {
            setDeletingId(null);
        }
    }

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Housekeeping — Manager Panel</h1>

            {error && (
                <div className="mb-4 rounded border border-red-400 bg-red-50 text-red-700 px-4 py-2 text-sm">
                    {error}
                </div>
            )}

            <form
                onSubmit={handleCreate}
                className="mb-8 rounded border border-gray-300 p-4 bg-gray-50"
            >
                <h2 className="font-semibold mb-3">Create new task</h2>
                <div className="flex flex-wrap gap-3 items-end">
                    <div>
                        <label className="block text-xs text-gray-600 mb-1">Room ID</label>
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
                        <label className="block text-xs text-gray-600 mb-1">Scheduled date</label>
                        <input
                            type="date"
                            className="border rounded px-2 py-1"
                            value={createForm.scheduledDate}
                            onChange={(e) =>
                                setCreateForm({ ...createForm, scheduledDate: e.target.value })
                            }
                        />
                    </div>
                    <div className="flex-1 min-w-[200px]">
                        <label className="block text-xs text-gray-600 mb-1">Notes</label>
                        <input
                            type="text"
                            className="border rounded px-2 py-1 w-full"
                            value={createForm.notes}
                            onChange={(e) =>
                                setCreateForm({ ...createForm, notes: e.target.value })
                            }
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={creating}
                        className="bg-blue-600 text-white px-4 py-1.5 rounded disabled:opacity-50"
                    >
                        {creating ? "Creating..." : "Create task"}
                    </button>
                </div>
            </form>

            {loading ? (
                <p>Loading tasks...</p>
            ) : tasks.length === 0 ? (
                <p className="text-gray-500">No housekeeping tasks yet.</p>
            ) : (
                <table className="w-full border-collapse text-sm">
                    <thead>
                        <tr className="border-b bg-gray-100 text-left">
                            <th className="p-2">ID</th>
                            <th className="p-2">Room</th>
                            <th className="p-2">Scheduled date</th>
                            <th className="p-2">Employee ID</th>
                            <th className="p-2">Notes</th>
                            <th className="p-2">Status</th>
                            <th className="p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task) => {
                            const isEditing = editingId === task.id;
                            return (
                                <tr key={task.id} className="border-b align-top">
                                    <td className="p-2">{task.id}</td>

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
                                                    type="date"
                                                    className="border rounded px-1 py-0.5"
                                                    value={editForm.scheduledDate}
                                                    onChange={(e) =>
                                                        setEditForm({
                                                            ...editForm,
                                                            scheduledDate: e.target.value,
                                                        })
                                                    }
                                                />
                                            </td>
                                            <td className="p-2">
                                                <input
                                                    type="number"
                                                    className="border rounded px-1 py-0.5 w-20"
                                                    value={editForm.employeeId}
                                                    onChange={(e) =>
                                                        setEditForm({
                                                            ...editForm,
                                                            employeeId: e.target.value,
                                                        })
                                                    }
                                                />
                                            </td>
                                            <td className="p-2">
                                                <input
                                                    type="text"
                                                    className="border rounded px-1 py-0.5 w-full"
                                                    value={editForm.notes}
                                                    onChange={(e) =>
                                                        setEditForm({ ...editForm, notes: e.target.value })
                                                    }
                                                />
                                            </td>
                                            <td className="p-2">
                                                <input
                                                    type="checkbox"
                                                    checked={editForm.status}
                                                    onChange={(e) =>
                                                        setEditForm({
                                                            ...editForm,
                                                            status: e.target.checked,
                                                        })
                                                    }
                                                />{" "}
                                                Done
                                            </td>
                                            <td className="p-2 space-x-2 whitespace-nowrap">
                                                <button
                                                    onClick={() => handleSaveEdit(task.id)}
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
                                            <td className="p-2">{task.roomId}</td>
                                            <td className="p-2">{task.scheduledDate.slice(0, 10)}</td>
                                            <td className="p-2">{task.employeeId}</td>
                                            <td className="p-2">{task.notes || "—"}</td>
                                            <td className="p-2">
                                                {task.status ? (
                                                    <span className="text-green-700">Completed</span>
                                                ) : (
                                                    <span className="text-yellow-700">Pending</span>
                                                )}
                                            </td>
                                            <td className="p-2 space-x-2 whitespace-nowrap">
                                                <button
                                                    onClick={() => startEdit(task)}
                                                    className="bg-blue-600 text-white px-2 py-1 rounded text-xs"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(task.id)}
                                                    disabled={deletingId === task.id}
                                                    className="bg-red-600 text-white px-2 py-1 rounded text-xs disabled:opacity-50"
                                                >
                                                    {deletingId === task.id ? "Deleting..." : "Delete"}
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
        </div>
    );
}
