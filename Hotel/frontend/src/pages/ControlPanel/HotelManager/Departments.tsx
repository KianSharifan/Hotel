import { useEffect, useState, useCallback } from "react";
import {
    getDepartments,
    createDepartment,
    updateDepartment,
    deleteDepartment
} from "../../../api/hotelManagerApi";
import type { Department} from "../../../api/hotelManagerApi";
import { useAuth } from "../../../context/AuthContext";


type ToastType = "success" | "error";
interface ToastItem {
    id: number;
    type: ToastType;
    message: string;
}

function useInlineToast() {
    const [toasts, setToasts] = useState<ToastItem[]>([]);

    const showToast = useCallback((message: string, type: ToastType = "success") => {
        const id = Date.now() + Math.random();
        setToasts((prev) => [...prev, { id, type, message }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 3500);
    }, []);

    const toastContainer = (
        <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2">
            {toasts.map((t) => (
                <div
                    key={t.id}
                    role="status"
                    className={`flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-white shadow-lg ${
                        t.type === "success" ? "bg-emerald-600" : "bg-red-600"
                    }`}
                >
                    <span>{t.type === "success" ? "✓" : "⚠"}</span>
                    <span>{t.message}</span>
                </div>
            ))}
        </div>
    );

    return { showToast, toastContainer };
}


interface ConfirmModalProps {
    open: boolean;
    title: string;
    description?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

function ConfirmModal({
    open,
    title,
    description,
    confirmLabel = "Confirm",
    cancelLabel = "Cancel",
    onConfirm,
    onCancel,
}: ConfirmModalProps) {
    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
            onClick={onCancel}
        >
            <div
                className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
            >
                <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
                {description && <p className="mt-2 text-sm text-slate-500">{description}</p>}

                <div className="mt-6 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
                    >
                        {cancelLabel}
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                    >
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}


function Departments() {
    const { showToast, toastContainer } = useInlineToast();

    const [departments, setDepartments] = useState<Department[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState<string | null>(null);

    const [newName, setNewName] = useState("");
    const [addError, setAddError] = useState<string | null>(null);
    const [adding, setAdding] = useState(false);

    const [editingId, setEditingId] = useState<number | null>(null);
    const [editValue, setEditValue] = useState("");
    const [editError, setEditError] = useState<string | null>(null);
    const [savingEdit, setSavingEdit] = useState(false);

    const [pendingDelete, setPendingDelete] = useState<Department | null>(null);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        let cancelled = false;

        async function load() {
            try {
                setLoading(true);
                setLoadError(null);
                const data = await getDepartments();
                if (!cancelled) setDepartments(data);
            } catch (err) {
                if (!cancelled) {
                    setLoadError(err instanceof Error ? err.message : "Failed to load departments.");
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        load();
        return () => {
            cancelled = true;
        };
    }, []);

    function nameExists(name: string, excludeId?: number) {
        const normalized = name.trim().toLowerCase();
        return departments.some(
            (d) => d.id !== excludeId && d.name.trim().toLowerCase() === normalized
        );
    }

    async function handleAdd() {
        const trimmed = newName.trim();

        if (!trimmed) {
            setAddError("Department name is required.");
            return;
        }
        if (nameExists(trimmed)) {
            setAddError("Department already exists.");
            return;
        }

        setAddError(null);

        // Optimistic insert with a temporary negative id, replaced once the
        // backend confirms and returns the real record.
        const tempId = -Date.now();
        const optimisticDept: Department = { id: tempId, name: trimmed };
        setDepartments((prev) => [...prev, optimisticDept]);
        setNewName("");
        setAdding(true);

        try {
            const created = await createDepartment({ name: trimmed });
            setDepartments((prev) => prev.map((d) => (d.id === tempId ? created : d)));
            showToast("Department added successfully");
        } catch (err) {
            setDepartments((prev) => prev.filter((d) => d.id !== tempId));
            showToast(err instanceof Error ? err.message : "Failed to add department.", "error");
        } finally {
            setAdding(false);
        }
    }

    function startEdit(dept: Department) {
        setEditingId(dept.id);
        setEditValue(dept.name);
        setEditError(null);
    }

    function cancelEdit() {
        setEditingId(null);
        setEditValue("");
        setEditError(null);
    }

    async function handleSaveEdit(dept: Department) {
        const trimmed = editValue.trim();

        if (!trimmed) {
            setEditError("Department name is required.");
            return;
        }
        if (nameExists(trimmed, dept.id)) {
            setEditError("Department already exists.");
            return;
        }

        const previousName = dept.name;
        setDepartments((prev) =>
            prev.map((d) => (d.id === dept.id ? { ...d, name: trimmed } : d))
        );
        setSavingEdit(true);

        try {
            await updateDepartment(dept.id, { name: trimmed });
            showToast("Department updated successfully");
            setEditingId(null);
            setEditValue("");
            setEditError(null);
        } catch (err) {
            setDepartments((prev) =>
                prev.map((d) => (d.id === dept.id ? { ...d, name: previousName } : d))
            );
            showToast(err instanceof Error ? err.message : "Failed to update department.", "error");
        } finally {
            setSavingEdit(false);
        }
    }

    async function handleConfirmDelete() {
        if (!pendingDelete) return;
        const dept = pendingDelete;

        setDeleting(true);
        setDepartments((prev) => prev.filter((d) => d.id !== dept.id));

        try {
            await deleteDepartment(dept.id);
            showToast("Department deleted successfully");
        } catch (err) {
            setDepartments((prev) => [...prev, dept].sort((a, b) => a.id - b.id));
            showToast(err instanceof Error ? err.message : "Failed to delete department.", "error");
        } finally {
            setDeleting(false);
            setPendingDelete(null);
        }
    }

    return (
        <div className="mx-auto max-w-2xl px-4 py-8">
            {toastContainer}

            <header className="mb-8">
                <h1 className="text-2xl font-semibold text-slate-900">Departments</h1>
                <p className="mt-1 text-sm text-slate-500">Manage hotel departments.</p>
            </header>

            {/* Add department */}
            <section className="mb-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="mb-3 text-base font-semibold text-slate-900">New Department</h2>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start">
                    <div className="flex-1">
                        <input
                            type="text"
                            value={newName}
                            onChange={(e) => {
                                setNewName(e.target.value);
                                if (addError) setAddError(null);
                            }}
                            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                            placeholder="Department name"
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
                        />
                        {addError && <p className="mt-1 text-xs text-red-600">⚠ {addError}</p>}
                    </div>
                    <button
                        type="button"
                        onClick={handleAdd}
                        disabled={adding}
                        className="rounded-lg bg-slate-900 px-5 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        + Add
                    </button>
                </div>
            </section>

            {/* Existing departments */}
            {loading && (
                <div className="py-10 text-center text-sm text-slate-500">Loading departments…</div>
            )}

            {loadError && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                    {loadError}
                </div>
            )}

            {!loading && !loadError && departments.length === 0 && (
                <div className="rounded-xl border border-dashed border-slate-300 py-10 text-center text-sm text-slate-500">
                    No departments yet. Add your first one above.
                </div>
            )}

            {!loading && !loadError && departments.length > 0 && (
                <ul className="flex flex-col gap-3">
                    {departments.map((dept) => (
                        <li
                            key={dept.id}
                            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                        >
                            {editingId === dept.id ? (
                                <div>
                                    <input
                                        type="text"
                                        autoFocus
                                        value={editValue}
                                        onChange={(e) => {
                                            setEditValue(e.target.value);
                                            if (editError) setEditError(null);
                                        }}
                                        onKeyDown={(e) => e.key === "Enter" && handleSaveEdit(dept)}
                                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
                                    />
                                    {editError && (
                                        <p className="mt-1 text-xs text-red-600">⚠ {editError}</p>
                                    )}
                                    <div className="mt-3 flex justify-end gap-2">
                                        <button
                                            type="button"
                                            onClick={cancelEdit}
                                            className="rounded-lg px-4 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleSaveEdit(dept)}
                                            disabled={savingEdit}
                                            className="rounded-lg bg-slate-900 px-4 py-1.5 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                    <span className="font-medium text-slate-900">{dept.name}</span>
                                    <div className="flex gap-4 text-sm">
                                        <button
                                            type="button"
                                            onClick={() => startEdit(dept)}
                                            className="font-medium text-slate-600 hover:text-slate-900"
                                        >
                                            ✏ Edit
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setPendingDelete(dept)}
                                            className="font-medium text-red-600 hover:text-red-700"
                                        >
                                            🗑 Delete
                                        </button>
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}

            <ConfirmModal
                open={!!pendingDelete}
                title="Delete department?"
                description={
                    pendingDelete
                        ? `"${pendingDelete.name}" will be permanently removed. This cannot be undone.`
                        : undefined
                }
                confirmLabel={deleting ? "Deleting…" : "Delete"}
                onConfirm={handleConfirmDelete}
                onCancel={() => setPendingDelete(null)}
            />
        </div>
    );
}

export function DepartmentsPage() {
    const { user } = useAuth();

    if (user?.role !== "HotelManager") {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
                <div className="text-4xl">🔒</div>
                <h1 className="mt-4 text-xl font-semibold text-slate-900">Access Denied</h1>
                <p className="mt-2 max-w-sm text-sm text-slate-500">
                    You don't have permission to access Departments.
                </p>
            </div>
        );
    }

    return <Departments />;
}

export default Departments;
