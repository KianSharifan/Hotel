import { useEffect, useState, useCallback } from "react";
import { getAllUsers, getUser, deleteUser } from "../../../api/usersApi";
import type { AdminUser } from "../../../api/usersApi";
import { getRoles } from "../../../api/HrApi";
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


function RoleBadge({ label }: { label: string }) {
    return (
        <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
            {label}
        </span>
    );
}

function fmtDate(value: string) {
    if (!value) return "—";
    return new Date(value).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}


export default function UsersManagement() {
    const { showToast, toastContainer } = useInlineToast();

    const [users, setUsers] = useState<AdminUser[]>([]);
    const [roleNames, setRoleNames] = useState<Record<number, string>>({});
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState<string | null>(null);

    const [searchTerm, setSearchTerm] = useState("");
    const [searching, setSearching] = useState(false);

    const [deletingUsername, setDeletingUsername] = useState<string | null>(null);
    const { user, loading: authLoading  } = useAuth();

    async function loadUsers() {
        try {
            setLoading(true);
            setLoadError(null);
            const [userData, roleData] = await Promise.all([getAllUsers(), getRoles()]);
            setUsers(userData);
            const map: Record<number, string> = {};
            for (const r of roleData) map[r.roleId] = r.name;
            setRoleNames(map);
        } catch (err) {
            setLoadError(err instanceof Error ? err.message : "Failed to load users.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadUsers();
    }, []);


    if (authLoading) {
        return null; 
    }
    if (user?.role !== "HotelManager" && user?.role !== "FrontOfficeManager") {
    return (
            <div className="mx-auto mt-4 max-w-3xl rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
            You don't have permission to access this page.
            </div>
        );
    }

    async function handleSearch(e: React.FormEvent) {
        e.preventDefault();
        const term = searchTerm.trim();
        if (!term) {
            await loadUsers();
            return;
        }
        setSearching(true);
        try {
            const user = await getUser(term);
            setUsers([user]);
        } catch (err) {
            setUsers([]);
            showToast(err instanceof Error ? err.message : "User not found", "error");
        } finally {
            setSearching(false);
        }
    }

    function clearSearch() {
        setSearchTerm("");
        loadUsers();
    }

    async function handleDelete(username: string) {
        if (!window.confirm(`Delete user "${username}"? This cannot be undone.`)) return;
        setDeletingUsername(username);
        try {
            await deleteUser(username);
            showToast(`User "${username}" deleted`);
            setUsers((prev) => prev.filter((u) => u.username !== username));
        } catch (err) {
            showToast(err instanceof Error ? err.message : "Failed to delete user.", "error");
        } finally {
            setDeletingUsername(null);
        }
    }

    return (
        <div className="mx-auto max-w-6xl px-4 py-8">
            {toastContainer}

            <header className="mb-8">
                <h1 className="text-2xl font-semibold text-slate-900">User Management</h1>
                <p className="mt-1 text-sm text-slate-500">
                    View and manage every account in the system.
                </p>
            </header>

            <section className="mb-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <form onSubmit={handleSearch} className="flex items-end gap-3">
                    <div className="flex-1">
                        <label className="mb-1 block text-sm font-medium text-slate-700">
                            Search by username
                        </label>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={searching}
                        className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {searching ? "Searching…" : "Search"}
                    </button>
                    {searchTerm && (
                        <button
                            type="button"
                            onClick={clearSearch}
                            className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
                        >
                            Clear
                        </button>
                    )}
                </form>
            </section>

            <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
                {loading ? (
                    <div className="flex min-h-[30vh] items-center justify-center text-sm text-slate-500">
                        Loading users…
                    </div>
                ) : loadError ? (
                    <div className="m-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                        {loadError}
                    </div>
                ) : users.length === 0 ? (
                    <div className="flex min-h-[20vh] items-center justify-center text-sm text-slate-500">
                        No users found.
                    </div>
                ) : (
                    <table className="w-full border-collapse text-sm">
                        <thead>
                            <tr className="border-b bg-slate-50 text-left text-slate-500">
                                <th className="p-3 font-medium">ID</th>
                                <th className="p-3 font-medium">Name</th>
                                <th className="p-3 font-medium">Username</th>
                                <th className="p-3 font-medium">Email</th>
                                <th className="p-3 font-medium">Phone</th>
                                <th className="p-3 font-medium">Role</th>
                                <th className="p-3 font-medium">Joined</th>
                                <th className="p-3 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((u) => (
                                <tr key={u.id} className="border-b last:border-b-0">
                                    <td className="p-3 text-slate-500">{u.id}</td>
                                    <td className="p-3 font-medium text-slate-900">
                                        {u.firstName} {u.lastName}
                                    </td>
                                    <td className="p-3 text-slate-600">{u.username}</td>
                                    <td className="p-3 text-slate-600">{u.email}</td>
                                    <td className="p-3 text-slate-600">{u.phone}</td>
                                    <td className="p-3">
                                        <RoleBadge label={roleNames[u.roleId] ?? `Role #${u.roleId}`} />
                                    </td>
                                    <td className="p-3 text-slate-500">{fmtDate(u.createdAt)}</td>
                                    <td className="p-3">
                                        <button
                                            onClick={() => handleDelete(u.username)}
                                            disabled={deletingUsername === u.username}
                                            className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                                        >
                                            {deletingUsername === u.username ? "Deleting…" : "Delete"}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </section>
        </div>
    );
}





