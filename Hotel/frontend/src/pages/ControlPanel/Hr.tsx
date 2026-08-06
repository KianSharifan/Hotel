import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext"
import {
    getEmployeeStats,
    updateEmployeeSalaryPosition,
    getRoles,
    createRole,
    updateRole,
    deleteRole,
    getAllShifts,
    createShift,
    deleteShift,
    getAllShiftAssignments,
    createShiftAssignment,
    deleteShiftAssignment,
    createPositions,
    deletePositions,
    getPositions
} from "../../api/HrApi"; 

interface Employee {
    id: number;
    salary?: number;
    hireDate?: string;
    positionId?: number;
    position?: {
        id: number;
        title: string;
        baseSalary: number;
    };
    [key: string]: any;
}

interface Role {
    roleId: number;
    name: string;
}

interface Position {
    id: number;
    title: string;
    baseSalary: number;
}

interface Shift {
    id: number;
    day: string;
    startTime: string;
    endTime: string;
}

interface ShiftAssignment {
    employeeId: number;
    shiftId: number;
}

type Tab = "employees" | "roles" | "positions" | "shifts" | "assignments";

const DAYS = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
];


export default function HRManagement() {
    const [tab, setTab] = useState<Tab>("employees");

    const { user, loading } = useAuth();

    if (loading) {
        return null; 
    }
    if (user?.role !== "HotelManager" && user?.role !== "DirectorOfHR") {
        return (
            <div className="mx-auto mt-4 max-w-3xl rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
                You don't have permission to access this page.
            </div>
        );
    }

    const tabs: { key: Tab; label: string }[] = [
        { key: "employees", label: "Employees" },
        { key: "roles", label: "Roles" },
        { key: "positions", label: "Positions" },
        { key: "shifts", label: "Shifts" },
        { key: "assignments", label: "Assignments" },
    ];

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">HR Management</h1>

            <div className="flex border-b mb-6">
                {tabs.map((t) => (
                    <button
                        key={t.key}
                        onClick={() => setTab(t.key)}
                        className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px ${
                            tab === t.key
                                ? "border-blue-600 text-blue-600"
                                : "border-transparent text-gray-500 hover:text-gray-700"
                        }`}
                    >
                        {t.label}
                    </button>
                ))}
            </div>

            {tab === "employees" && <EmployeesTab />}
            {tab === "roles" && <RolesTab />}
            {tab === "positions" && <PositionsTab />}
            {tab === "shifts" && <ShiftsTab />}
            {tab === "assignments" && <AssignmentsTab />}
        </div>
    );
}


function EmployeesTab() {
    const [searchId, setSearchId] = useState("");
    const [employee, setEmployee] = useState<Employee | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [newPosition, setNewPosition] = useState("");
    const [newSalary, setNewSalary] = useState("");
    const [updating, setUpdating] = useState(false);
    const [updateMessage, setUpdateMessage] = useState<string | null>(null);

    async function handleSearch(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setUpdateMessage(null);
        const id = Number(searchId);
        if (!searchId || Number.isNaN(id)) {
            setError("Enter a valid employee ID");
            return;
        }
        setLoading(true);
        try {
            const data = await getEmployeeStats(id);
            setEmployee(data);
            setNewPosition("");
            setNewSalary("");
        } catch (err) {
            setEmployee(null);
            setError(err instanceof Error ? err.message : "Employee not found");
        } finally {
            setLoading(false);
        }
    }

    async function handleUpdate(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setUpdateMessage(null);

        if (!employee) return;
        if (!newPosition && !newSalary) {
            setError("Enter a new position and/or a new salary");
            return;
        }

        const payload: { position?: string; salary?: number } = {};
        if (newPosition) payload.position = newPosition;
        if (newSalary) {
            const salaryNum = Number(newSalary);
            if (Number.isNaN(salaryNum)) {
                setError("Salary must be a number");
                return;
            }
            payload.salary = salaryNum;
        }

        setUpdating(true);
        try {
            await updateEmployeeSalaryPosition(employee.id, payload);
            setUpdateMessage("Employee updated successfully");
            const refreshed = await getEmployeeStats(employee.id);
            setEmployee(refreshed);
            setNewPosition("");
            setNewSalary("");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to update employee");
        } finally {
            setUpdating(false);
        }
    }

    return (
        <div>
            <form onSubmit={handleSearch} className="flex items-end gap-2 mb-6">
                <div>
                    <label className="block text-xs text-gray-600 mb-1">Employee ID</label>
                    <input
                        type="number"
                        className="border rounded px-2 py-1 w-40"
                        value={searchId}
                        onChange={(e) => setSearchId(e.target.value)}
                    />
                </div>
                
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white px-4 py-1.5 rounded disabled:opacity-50"
                >
                    {loading ? "Searching..." : "Search"}
                </button>
            </form>

            {error && (
                <div className="mb-4 rounded border border-red-400 bg-red-50 text-red-700 px-4 py-2 text-sm">
                    {error}
                </div>
            )}
            {updateMessage && (
                <div className="mb-4 rounded border border-green-400 bg-green-50 text-green-700 px-4 py-2 text-sm">
                    {updateMessage}
                </div>
            )}

            {employee && (
                <div className="border rounded p-4 mb-6">
                    <h2 className="font-semibold mb-3">Employee #{employee.id}</h2>
                    <dl className="grid grid-cols-2 gap-y-2 text-sm mb-6">
                        <dt className="text-gray-500">Position</dt>
                        <dd>{employee.position?.title ?? "N/A"}</dd>

                        <dt className="text-gray-500">Salary</dt>
                        <dd>{employee.salary ?? "N/A"}</dd>

                        <dt className="text-gray-500">Hire date</dt>
                        <dd>{employee.hireDate ? employee.hireDate.slice(0, 10) : "N/A"}</dd>
                    </dl>

                    <form onSubmit={handleUpdate} className="flex flex-wrap items-end gap-3">
                        <div>
                            <label className="block text-xs text-gray-600 mb-1">
                                New position
                            </label>
                            <input
                                type="text"
                                className="border rounded px-2 py-1"
                                placeholder="e.g. Manager"
                                value={newPosition}
                                onChange={(e) => setNewPosition(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-600 mb-1">
                                New salary
                            </label>
                            <input
                                type="number"
                                className="border rounded px-2 py-1 w-32"
                                value={newSalary}
                                onChange={(e) => setNewSalary(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={updating}
                            className="bg-blue-600 text-white px-4 py-1.5 rounded disabled:opacity-50"
                        >
                            {updating ? "Updating..." : "Update employee"}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}


function RolesTab() {
    const [roles, setRoles] = useState<Role[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [newRoleName, setNewRoleName] = useState("");
    const [creating, setCreating] = useState(false);

    const [editingId, setEditingId] = useState<number | null>(null);
    const [editName, setEditName] = useState("");
    const [savingEdit, setSavingEdit] = useState(false);

    const [deletingId, setDeletingId] = useState<number | null>(null);

    async function loadRoles() {
        setLoading(true);
        setError(null);
        try {
            const data = await getRoles();
            setRoles(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to load roles");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadRoles();
    }, []);

    async function handleCreate(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        if (!newRoleName.trim()) {
            setError("Role name is required");
            return;
        }
        setCreating(true);
        try {
            await createRole({ name: newRoleName.trim() });
            setNewRoleName("");
            await loadRoles();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to create role");
        } finally {
            setCreating(false);
        }
    }

    function startEdit(role: Role) {
        setEditingId(role.roleId);
        setEditName(role.name);
    }

    function cancelEdit() {
        setEditingId(null);
        setEditName("");
    }

    async function handleSaveEdit(roleId: number) {
        setError(null);
        if (!editName.trim()) {
            setError("Role name is required");
            return;
        }
        setSavingEdit(true);
        try {
            await updateRole(roleId, { name: editName.trim() });
            cancelEdit();
            await loadRoles();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to update role");
        } finally {
            setSavingEdit(false);
        }
    }

    async function handleDelete(roleId: number) {
        if (!window.confirm("Delete this role?")) return;
        setError(null);
        setDeletingId(roleId);
        try {
            await deleteRole(roleId);
            await loadRoles();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to delete role");
        } finally {
            setDeletingId(null);
        }
    }

    return (
        <div>
            {error && (
                <div className="mb-4 rounded border border-red-400 bg-red-50 text-red-700 px-4 py-2 text-sm">
                    {error}
                </div>
            )}

            {loading ? (
                <p>Loading roles...</p>
            ) : roles.length === 0 ? (
                <p className="text-gray-500 mb-6">No roles yet.</p>
            ) : (
                <table className="w-full border-collapse text-sm mb-6">
                    <thead>
                        <tr className="border-b bg-gray-100 text-left">
                            <th className="p-2">ID</th>
                            <th className="p-2">Name</th>
                            <th className="p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roles.map((role) => {
                            const isEditing = editingId === role.roleId;
                            return (
                                <tr key={role.roleId} className="border-b">
                                    <td className="p-2">{role.roleId}</td>
                                    <td className="p-2">
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                className="border rounded px-1 py-0.5"
                                                value={editName}
                                                onChange={(e) => setEditName(e.target.value)}
                                            />
                                        ) : (
                                            role.name
                                        )}
                                    </td>
                                    <td className="p-2 space-x-2 whitespace-nowrap">
                                        {isEditing ? (
                                            <>
                                                <button
                                                    onClick={() => handleSaveEdit(role.roleId)}
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
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    onClick={() => startEdit(role)}
                                                    className="bg-blue-600 text-white px-2 py-1 rounded text-xs"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(role.roleId)}
                                                    disabled={deletingId === role.roleId}
                                                    className="bg-red-600 text-white px-2 py-1 rounded text-xs disabled:opacity-50"
                                                >
                                                    {deletingId === role.roleId
                                                        ? "Deleting..."
                                                        : "Delete"}
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}

            <form onSubmit={handleCreate} className="flex items-end gap-2">
                <div>
                    <label className="block text-xs text-gray-600 mb-1">Role name</label>
                    <input
                        type="text"
                        className="border rounded px-2 py-1"
                        value={newRoleName}
                        onChange={(e) => setNewRoleName(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    disabled={creating}
                    className="bg-blue-600 text-white px-4 py-1.5 rounded disabled:opacity-50"
                >
                    {creating ? "Creating..." : "Create role"}
                </button>
            </form>
        </div>
    );
}


function PositionsTab() {
    const [positions, setPositions] = useState<Position[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [newPositionTitle, setNewPositionTitle] = useState("");
    const [newBaseSalary, setNewBaseSalary] = useState<number>(0);
    const [creating, setCreating] = useState(false);

    const [deletingId, setDeletingId] = useState<number | null>(null);

    async function loadPositions() {
        setLoading(true);
        setError(null);
        try {
            const data = await getPositions();
            setPositions(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to load roles");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadPositions();
    }, []);

    async function handleCreate(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        if (!newPositionTitle.trim()) {
            setError("Position name is required");
            return;
        }
        if (newBaseSalary <= 0) {
            setError("Base salary must be greater than 0");
            return;
        }
        setCreating(true);
        try {
            await createPositions({
                title: newPositionTitle.trim(),
                baseSalary: newBaseSalary,
            });
            setNewPositionTitle("");
            setNewBaseSalary(0);
            await loadPositions();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to create position");
        } finally {
            setCreating(false);
        }
    }

    async function handleDelete(positionId: number) {
        if (!window.confirm("Delete this position?")) return;
        setError(null);
        setDeletingId(positionId);
        try {
            await deletePositions(positionId);
            await loadPositions();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to delete position");
        } finally {
            setDeletingId(null);
        }
    }

    return (
        <div>
            {error && (
                <div className="mb-4 rounded border border-red-400 bg-red-50 text-red-700 px-4 py-2 text-sm">
                    {error}
                </div>
            )}

            {loading ? (
                <p>Loading positions...</p>
            ) : positions.length === 0 ? (
                <p className="text-gray-500 mb-6">No positions yet.</p>
            ) : (
                <table className="w-full border-collapse text-sm mb-6">
                    <thead>
                        <tr className="border-b bg-gray-100 text-left">
                            <th className="p-2">ID</th>
                            <th className="p-2">Name</th>
                            <th className="p-2">Base Salary</th>
                            <th className="p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {positions.map((position) => (
                            <tr key={position.id} className="border-b">
                                <td className="p-2">{position.id}</td>
                                <td className="p-2">{position.title}</td>
                                <td className="p-2">
                                    ${position.baseSalary.toLocaleString()}
                                </td>
                                <td className="p-2 space-x-2 whitespace-nowrap">
                                    <button
                                        onClick={() => handleDelete(position.id)}
                                        disabled={deletingId === position.id}
                                        className="bg-red-600 text-white px-2 py-1 rounded text-xs disabled:opacity-50"
                                    >
                                        {deletingId === position.id
                                            ? "Deleting..."
                                            : "Delete"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <form onSubmit={handleCreate} className="flex items-end gap-2">
                <div>
                    <label className="block text-xs text-gray-600 mb-1">Position name</label>
                    <input
                        type="text"
                        className="border rounded px-2 py-1"
                        value={newPositionTitle}
                        onChange={(e) => setNewPositionTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-xs text-gray-600 mb-1">Base salary</label>
                    <input
                        type="number"
                        min={0}
                        step={100}
                        className="border rounded px-2 py-1 w-32"
                        value={newBaseSalary}
                        onChange={(e) => setNewBaseSalary(Number(e.target.value))}
                    />
                </div>
                <button
                    type="submit"
                    disabled={creating}
                    className="bg-blue-600 text-white px-4 py-1.5 rounded disabled:opacity-50"
                >
                    {creating ? "Creating..." : "Create position"}
                </button>
            </form>
        </div>
    );
}


function ShiftsTab() {
    const [shifts, setShifts] = useState<Shift[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [day, setDay] = useState(DAYS[0]);
    const [start, setStart] = useState("08:00");
    const [end, setEnd] = useState("16:00");
    const [creating, setCreating] = useState(false);

    const [deletingId, setDeletingId] = useState<number | null>(null);

    async function loadShifts() {
        setLoading(true);
        setError(null);
        try {
            const data = await getAllShifts();
            console.log("SHIFTS FROM API:", data);
            setShifts(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to load shifts");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadShifts();
    }, []);

    async function handleCreate(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        if (!day || !start || !end) {
            setError("Day, start, and end are required");
            return;
        }
        setCreating(true);
        try {
            await createShift({ day, start, end });
            await loadShifts();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to create shift");
        } finally {
            setCreating(false);
        }
    }

    async function handleDelete(id: number) {
        if (!window.confirm("Delete this shift?")) return;
        setError(null);
        setDeletingId(id);
        try {
            await deleteShift(id);
            await loadShifts();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to delete shift");
        } finally {
            setDeletingId(null);
        }
    }

    return (
        <div>
            {error && (
                <div className="mb-4 rounded border border-red-400 bg-red-50 text-red-700 px-4 py-2 text-sm">
                    {error}
                </div>
            )}

            {loading ? (
                <p>Loading shifts...</p>
            ) : shifts.length === 0 ? (
                <p className="text-gray-500 mb-6">No shifts yet.</p>
            ) : (
                <table className="w-full border-collapse text-sm mb-6">
                    <thead>
                        <tr className="border-b bg-gray-100 text-left">
                            <th className="p-2">ID</th>
                            <th className="p-2">Day</th>
                            <th className="p-2">Start</th>
                            <th className="p-2">End</th>
                            <th className="p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {shifts.map((shift) => (
                            <tr key={shift.id} className="border-b">
                                <td className="p-2">{shift.id}</td>
                                <td className="p-2">{shift.day}</td>
                                <td className="p-2">{shift.startTime}</td>
                                <td className="p-2">{shift.endTime}</td>
                                <td className="p-2">
                                    <button
                                        onClick={() => handleDelete(shift.id)}
                                        disabled={deletingId === shift.id}
                                        className="bg-red-600 text-white px-2 py-1 rounded text-xs disabled:opacity-50"
                                    >
                                        {deletingId === shift.id ? "Deleting..." : "Delete"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <form onSubmit={handleCreate} className="flex flex-wrap items-end gap-3">
                <div>
                    <label className="block text-xs text-gray-600 mb-1">Day</label>
                    <select
                        className="border rounded px-2 py-1"
                        value={day}
                        onChange={(e) => setDay(e.target.value)}
                    >
                        {DAYS.map((d) => (
                            <option key={d} value={d}>
                                {d}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-xs text-gray-600 mb-1">Start</label>
                    <input
                        type="time"
                        className="border rounded px-2 py-1"
                        value={start}
                        onChange={(e) => setStart(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-xs text-gray-600 mb-1">End</label>
                    <input
                        type="time"
                        className="border rounded px-2 py-1"
                        value={end}
                        onChange={(e) => setEnd(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    disabled={creating}
                    className="bg-blue-600 text-white px-4 py-1.5 rounded disabled:opacity-50"
                >
                    {creating ? "Adding..." : "Add shift"}
                </button>
            </form>
        </div>
    );
}


function AssignmentsTab() {
    const [assignments, setAssignments] = useState<ShiftAssignment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [employeeId, setEmployeeId] = useState("");
    const [shiftId, setShiftId] = useState("");
    const [assigning, setAssigning] = useState(false);

    const [deletingKey, setDeletingKey] = useState<string | null>(null);

    async function loadAssignments() {
        setLoading(true);
        setError(null);
        try {
            const data = await getAllShiftAssignments();
            setAssignments(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to load assignments");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadAssignments();
    }, []);

    async function handleAssign(e: React.FormEvent) {
        e.preventDefault();
        setError(null);

        const empId = Number(employeeId);
        const shId = Number(shiftId);
        if (!employeeId || !shiftId || Number.isNaN(empId) || Number.isNaN(shId)) {
            setError("Employee ID and Shift ID are required and must be numbers");
            return;
        }

        setAssigning(true);
        try {
            await createShiftAssignment({ employeeId: empId, shiftId: shId });
            setEmployeeId("");
            setShiftId("");
            await loadAssignments();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to assign shift");
        } finally {
            setAssigning(false);
        }
    }

    async function handleDelete(assignment: ShiftAssignment) {
        if (!window.confirm("Remove this shift assignment?")) return;
        setError(null);
        const key = `${assignment.employeeId}-${assignment.shiftId}`;
        setDeletingKey(key);
        try {
            await deleteShiftAssignment({
                employeeId: assignment.employeeId,
                shiftId: assignment.shiftId,
            });
            await loadAssignments();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to remove assignment");
        } finally {
            setDeletingKey(null);
        }
    }

    return (
        <div>
            {error && (
                <div className="mb-4 rounded border border-red-400 bg-red-50 text-red-700 px-4 py-2 text-sm">
                    {error}
                </div>
            )}

            {loading ? (
                <p>Loading assignments...</p>
            ) : assignments.length === 0 ? (
                <p className="text-gray-500 mb-6">No shift assignments yet.</p>
            ) : (
                <table className="w-full border-collapse text-sm mb-6">
                    <thead>
                        <tr className="border-b bg-gray-100 text-left">
                            <th className="p-2">Employee</th>
                            <th className="p-2">Shift</th>
                            <th className="p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assignments.map((a) => {
                            const key = `${a.employeeId}-${a.shiftId}`;
                            return (
                                <tr key={key} className="border-b">
                                    <td className="p-2">Employee #{a.employeeId}</td>
                                    <td className="p-2">Shift #{a.shiftId}</td>
                                    <td className="p-2">
                                        <button
                                            onClick={() => handleDelete(a)}
                                            disabled={deletingKey === key}
                                            className="bg-red-600 text-white px-2 py-1 rounded text-xs disabled:opacity-50"
                                        >
                                            {deletingKey === key ? "Removing..." : "Delete"}
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}

            <form onSubmit={handleAssign} className="flex flex-wrap items-end gap-3">
                <div>
                    <label className="block text-xs text-gray-600 mb-1">Employee ID</label>
                    <input
                        type="number"
                        className="border rounded px-2 py-1 w-32"
                        value={employeeId}
                        onChange={(e) => setEmployeeId(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-xs text-gray-600 mb-1">Shift ID</label>
                    <input
                        type="number"
                        className="border rounded px-2 py-1 w-32"
                        value={shiftId}
                        onChange={(e) => setShiftId(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    disabled={assigning}
                    className="bg-blue-600 text-white px-4 py-1.5 rounded disabled:opacity-50"
                >
                    {assigning ? "Assigning..." : "Assign"}
                </button>
            </form>
        </div>
    );
}
