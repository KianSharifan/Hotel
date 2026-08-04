import { useEffect, useMemo, useState } from "react";
import {getEngineerMaintenance, updateMaintenanceRequest} from "../../../api/maintenanceApi"; 
import { useAuth } from "../../../context/AuthContext"

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

export default function EngineerMaintenance() {
    const [jobs, setJobs] = useState<MaintenanceRequest[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [detailStatus, setDetailStatus] = useState("Pending");
    const [detailDescription, setDetailDescription] = useState("");
    const [saving, setSaving] = useState(false);

    const { user, loading: authLoading  } = useAuth();

    const userName = user?.username ?? "";

    if (authLoading) {
        return null; 
    }
    if (user?.role !== "HotelManager" && user?.role !== "DirectorOfHR" && user?.role !== "Engineer") {
    return (
            <div className="mx-auto mt-4 max-w-3xl rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
            You don't have permission to access this page.
            </div>
        );
    }

    async function loadJobs() {
        if (!userName) return;
        setLoading(true);
        setError(null);
        try {
            const data = await getEngineerMaintenance(userName);
            setJobs(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to load your jobs");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadJobs();
    }, [userName]);

    const stats = useMemo(() => {
        return {
            assigned: jobs.length,
            pending: jobs.filter((j) => j.status === "Pending").length,
            completed: jobs.filter((j) => j.status === "Done").length,
        };
    }, [jobs]);

    const selectedJob = jobs.find((j) => j.id === selectedId) ?? null;

    function openDetails(job: MaintenanceRequest) {
        setSelectedId(job.id);
        setDetailStatus(job.status ?? "Pending");
        setDetailDescription(job.description ?? "");
    }

    function closeDetails() {
        setSelectedId(null);
    }

    async function handleUpdate() {
        if (!selectedJob) return;
        setError(null);
        setSaving(true);
        try {
            await updateMaintenanceRequest(selectedJob.id, {
                status: detailStatus,
                description: detailDescription,
            });
            closeDetails();
            await loadJobs();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to update job");
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">My Maintenance Jobs</h1>

            {error && (
                <div className="mb-4 rounded border border-red-400 bg-red-50 text-red-700 px-4 py-2 text-sm">
                    {error}
                </div>
            )}

            {!userName ? (
                <p className="text-gray-500">Unable to determine your username.</p>
            ) : loading ? (
                <p>Loading jobs...</p>
            ) : (
                <>
                    <div className="grid grid-cols-3 gap-3 mb-6">
                        <StatCard label="Assigned" value={stats.assigned} />
                        <StatCard label="Pending" value={stats.pending} />
                        <StatCard label="Completed" value={stats.completed} />
                    </div>

                    {jobs.length === 0 ? (
                        <p className="text-gray-500">No maintenance jobs assigned to you.</p>
                    ) : (
                        <table className="w-full border-collapse text-sm mb-6">
                            <thead>
                                <tr className="border-b bg-gray-100 text-left">
                                    <th className="p-2">Room</th>
                                    <th className="p-2">Priority</th>
                                    <th className="p-2">Description</th>
                                    <th className="p-2">Status</th>
                                    <th className="p-2">Created</th>
                                </tr>
                            </thead>
                            <tbody>
                                {jobs.map((job) => (
                                    <tr
                                        key={job.id}
                                        onClick={() => openDetails(job)}
                                        className="border-b cursor-pointer hover:bg-gray-50"
                                    >
                                        <td className="p-2">Room {job.roomId}</td>
                                        <td className="p-2">{job.priority ?? "-"}</td>
                                        <td className="p-2 max-w-xs truncate">
                                            {job.description || "-"}
                                        </td>
                                        <td className="p-2">{job.status ?? "-"}</td>
                                        <td className="p-2">
                                            {job.createdDate ? job.createdDate.slice(0, 10) : "-"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                    {selectedJob && (
                        <div className="border rounded p-4 bg-gray-50">
                            <h2 className="font-semibold mb-3">Room {selectedJob.roomId}</h2>

                            <div className="mb-3">
                                <label className="block text-xs text-gray-600 mb-1">
                                    Description
                                </label>
                                <textarea
                                    className="border rounded px-2 py-1 w-full"
                                    rows={3}
                                    value={detailDescription}
                                    onChange={(e) => setDetailDescription(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="block text-xs text-gray-600 mb-1">
                                    Priority
                                </label>
                                <p className="text-sm">{selectedJob.priority ?? "-"}</p>
                            </div>

                            <div className="mb-4">
                                <label className="block text-xs text-gray-600 mb-1">Status</label>
                                <select
                                    className="border rounded px-2 py-1"
                                    value={detailStatus}
                                    onChange={(e) => setDetailStatus(e.target.value)}
                                >
                                    {STATUS_OPTIONS.map((s) => (
                                        <option key={s} value={s}>
                                            {s}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-x-2">
                                <button
                                    onClick={handleUpdate}
                                    disabled={saving}
                                    className="bg-blue-600 text-white px-4 py-1.5 rounded disabled:opacity-50"
                                >
                                    {saving ? "Updating..." : "Update"}
                                </button>
                                <button
                                    onClick={closeDetails}
                                    className="bg-gray-300 px-4 py-1.5 rounded"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
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
