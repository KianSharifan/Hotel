import { useEffect, useState } from "react";
import {
    getAllServices,
    createService,
    updateService,
    deleteService,
    getAllServiceUsages,
    getGuestServiceUsages,
    getUsersOfService,
    createGuestServiceUsage,
    updateGuestServiceUsage,
    deleteGuestServiceUsage,
} from "../../api/servicesApi";

import { useAuth } from "../../context/AuthContext"

interface Service {
    id: number;
    name: string;
    price: number;
    description?: string;
}

interface GuestServiceUsage {
    id: number;
    guestId: number;
    serviceId: number;
    reservationId: number;
    quantity: number;
    price: number;
    useDate: string;
}

interface GuestUsageRow {
    quantity: number;
    price: number;
    name: string; 
}

interface ServiceUserRow {
    quantity: number;
    price: number;
    username: string;
    firstName: string;
}

type Tab = "services" | "usage";

export default function ServiceManagement() {
    const [tab, setTab] = useState<Tab>("services");

    const { user, loading: authLoading  } = useAuth();

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

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Service Management</h1>

            <div className="flex border-b mb-6">
                <button
                    onClick={() => setTab("services")}
                    className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px ${
                        tab === "services"
                            ? "border-blue-600 text-blue-600"
                            : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                >
                    Services
                </button>
                <button
                    onClick={() => setTab("usage")}
                    className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px ${
                        tab === "usage"
                            ? "border-blue-600 text-blue-600"
                            : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                >
                    Guest Service Usage
                </button>
            </div>

            {tab === "services" && <ServicesTab />}
            {tab === "usage" && <UsageTab />}
        </div>
    );
}

interface ServiceFormState {
    name: string;
    price: string;
    description: string;
}

const emptyServiceForm: ServiceFormState = { name: "", price: "", description: "" };

function ServicesTab() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [createForm, setCreateForm] = useState<ServiceFormState>(emptyServiceForm);
    const [creating, setCreating] = useState(false);

    const [editingId, setEditingId] = useState<number | null>(null);
    const [editForm, setEditForm] = useState<ServiceFormState | null>(null);
    const [savingEdit, setSavingEdit] = useState(false);

    const [deletingId, setDeletingId] = useState<number | null>(null);

    async function loadServices() {
        setLoading(true);
        setError(null);
        try {
            const data = await getAllServices();
            setServices(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to load services");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadServices();
    }, []);

    async function handleCreate(e: React.FormEvent) {
        e.preventDefault();
        setError(null);

        const price = Number(createForm.price);
        if (!createForm.name.trim()) {
            setError("Service name is required");
            return;
        }
        if (!createForm.price || Number.isNaN(price)) {
            setError("Price is required and must be a number");
            return;
        }

        setCreating(true);
        try {
            await createService({
                name: createForm.name.trim(),
                price,
                description: createForm.description || undefined,
            });
            setCreateForm(emptyServiceForm);
            await loadServices();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to create service");
        } finally {
            setCreating(false);
        }
    }

    function startEdit(service: Service) {
        setEditingId(service.id);
        setEditForm({
            name: service.name,
            price: String(service.price),
            description: service.description ?? "",
        });
    }

    function cancelEdit() {
        setEditingId(null);
        setEditForm(null);
    }

    async function handleSaveEdit(id: number) {
        if (!editForm) return;
        setError(null);

        const price = Number(editForm.price);
        if (Number.isNaN(price)) {
            setError("Price must be a number");
            return;
        }

        setSavingEdit(true);
        try {
            await updateService(id, {
                name: editForm.name,
                price,
                description: editForm.description,
            });
            cancelEdit();
            await loadServices();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to update service");
        } finally {
            setSavingEdit(false);
        }
    }

    async function handleDelete(id: number) {
        if (!window.confirm("Delete this service?")) return;
        setError(null);
        setDeletingId(id);
        try {
            await deleteService(id);
            await loadServices();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to delete service");
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
                <p>Loading services...</p>
            ) : services.length === 0 ? (
                <p className="text-gray-500 mb-6">No services yet.</p>
            ) : (
                <table className="w-full border-collapse text-sm mb-6">
                    <thead>
                        <tr className="border-b bg-gray-100 text-left">
                            <th className="p-2">Name</th>
                            <th className="p-2">Price</th>
                            <th className="p-2">Description</th>
                            <th className="p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.map((service) => {
                            const isEditing = editingId === service.id;
                            return (
                                <tr key={service.id} className="border-b align-top">
                                    {isEditing && editForm ? (
                                        <>
                                            <td className="p-2">
                                                <input
                                                    type="text"
                                                    className="border rounded px-1 py-0.5"
                                                    value={editForm.name}
                                                    onChange={(e) =>
                                                        setEditForm({ ...editForm, name: e.target.value })
                                                    }
                                                />
                                            </td>
                                            <td className="p-2">
                                                <input
                                                    type="number"
                                                    className="border rounded px-1 py-0.5 w-24"
                                                    value={editForm.price}
                                                    onChange={(e) =>
                                                        setEditForm({ ...editForm, price: e.target.value })
                                                    }
                                                />
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
                                                    onClick={() => handleSaveEdit(service.id)}
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
                                            <td className="p-2">{service.name}</td>
                                            <td className="p-2">{service.price}</td>
                                            <td className="p-2">{service.description || "—"}</td>
                                            <td className="p-2 space-x-2 whitespace-nowrap">
                                                <button
                                                    onClick={() => startEdit(service)}
                                                    className="bg-blue-600 text-white px-2 py-1 rounded text-xs"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(service.id)}
                                                    disabled={deletingId === service.id}
                                                    className="bg-red-600 text-white px-2 py-1 rounded text-xs disabled:opacity-50"
                                                >
                                                    {deletingId === service.id ? "Deleting..." : "Delete"}
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
                <h2 className="font-semibold mb-3">Add service</h2>
                <div className="flex flex-wrap gap-3 items-end">
                    <div>
                        <label className="block text-xs text-gray-600 mb-1">Name</label>
                        <input
                            type="text"
                            className="border rounded px-2 py-1"
                            value={createForm.name}
                            onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-600 mb-1">Price</label>
                        <input
                            type="number"
                            className="border rounded px-2 py-1 w-28"
                            value={createForm.price}
                            onChange={(e) => setCreateForm({ ...createForm, price: e.target.value })}
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
                        {creating ? "Adding..." : "Add service"}
                    </button>
                </div>
            </form>
        </div>
    );
}


interface RegisterFormState {
    userName: string;
    roomNumber: string;
    serviceName: string;
    quantity: string;
    useDate: string;
}

const emptyRegisterForm: RegisterFormState = {
    userName: "",
    roomNumber: "",
    serviceName: "",
    quantity: "",
    useDate: "",
};

interface EditUsageFormState {
    quantity: string;
    useDate: string;
}

function UsageTab() {
    const [usages, setUsages] = useState<GuestServiceUsage[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [services, setServices] = useState<Service[]>([]);
    const [registerForm, setRegisterForm] = useState<RegisterFormState>(emptyRegisterForm);
    const [registering, setRegistering] = useState(false);

    const [editingId, setEditingId] = useState<number | null>(null);
    const [editForm, setEditForm] = useState<EditUsageFormState | null>(null);
    const [savingEdit, setSavingEdit] = useState(false);

    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [guestSearch, setGuestSearch] = useState("");
    const [guestResults, setGuestResults] = useState<GuestUsageRow[] | null>(null);
    const [guestSearchLoading, setGuestSearchLoading] = useState(false);
    const [guestSearchError, setGuestSearchError] = useState<string | null>(null);

    const [serviceSearch, setServiceSearch] = useState("");
    const [serviceResults, setServiceResults] = useState<ServiceUserRow[] | null>(null);
    const [serviceSearchLoading, setServiceSearchLoading] = useState(false);
    const [serviceSearchError, setServiceSearchError] = useState<string | null>(null);

    async function loadUsages() {
        setLoading(true);
        setError(null);
        try {
            const data = await getAllServiceUsages();
            setUsages(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to load usages");
        } finally {
            setLoading(false);
        }
    }

    async function loadServicesForDropdown() {
        try {
            const data = await getAllServices();
            setServices(data);
        } catch {
        }
    }

    useEffect(() => {
        loadUsages();
        loadServicesForDropdown();
    }, []);

    async function handleRegister(e: React.FormEvent) {
        e.preventDefault();
        setError(null);

        const roomNumber = Number(registerForm.roomNumber);
        const quantity = Number(registerForm.quantity);

        if (!registerForm.userName.trim()) {
            setError("Guest username is required");
            return;
        }
        if (!registerForm.serviceName) {
            setError("Service is required");
            return;
        }
        if (!registerForm.roomNumber || Number.isNaN(roomNumber)) {
            setError("Room number is required and must be a number");
            return;
        }
        if (!registerForm.quantity || Number.isNaN(quantity)) {
            setError("Quantity is required and must be a number");
            return;
        }
        if (!registerForm.useDate) {
            setError("Date is required");
            return;
        }

        setRegistering(true);
        try {
            await createGuestServiceUsage({
                userName: registerForm.userName.trim(),
                serviceName: registerForm.serviceName,
                roomNumber,
                quantity,
                useDate: registerForm.useDate,
            });
            setRegisterForm(emptyRegisterForm);
            await loadUsages();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to register usage");
        } finally {
            setRegistering(false);
        }
    }

    function startEdit(usage: GuestServiceUsage) {
        setEditingId(usage.id);
        setEditForm({
            quantity: String(usage.quantity),
            useDate: usage.useDate.slice(0, 10),
        });
    }

    function cancelEdit() {
        setEditingId(null);
        setEditForm(null);
    }

    async function handleSaveEdit(id: number) {
        if (!editForm) return;
        setError(null);

        const quantity = Number(editForm.quantity);
        if (Number.isNaN(quantity)) {
            setError("Quantity must be a number");
            return;
        }

        setSavingEdit(true);
        try {
            await updateGuestServiceUsage(id, {
                quantity,
                useDate: editForm.useDate,
            });
            cancelEdit();
            await loadUsages();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to update usage");
        } finally {
            setSavingEdit(false);
        }
    }

    async function handleDelete(id: number) {
        if (!window.confirm("Delete this usage record?")) return;
        setError(null);
        setDeletingId(id);
        try {
            await deleteGuestServiceUsage(id);
            await loadUsages();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to delete usage");
        } finally {
            setDeletingId(null);
        }
    }

    async function handleGuestSearch(e: React.FormEvent) {
        e.preventDefault();
        setGuestSearchError(null);
        if (!guestSearch.trim()) {
            setGuestSearchError("Enter a username");
            return;
        }
        setGuestSearchLoading(true);
        try {
            const data = await getGuestServiceUsages(guestSearch.trim());
            setGuestResults(data);
        } catch (err) {
            setGuestResults(null);
            setGuestSearchError(err instanceof Error ? err.message : "Guest not found");
        } finally {
            setGuestSearchLoading(false);
        }
    }

    async function handleServiceSearch(e: React.FormEvent) {
        e.preventDefault();
        setServiceSearchError(null);
        if (!serviceSearch.trim()) {
            setServiceSearchError("Enter a service name");
            return;
        }
        setServiceSearchLoading(true);
        try {
            //backend compares Service.Name.ToLower() against the raw route, we lowercase here 
            const data = await getUsersOfService(serviceSearch.trim().toLowerCase());
            setServiceResults(data);
        } catch (err) {
            setServiceResults(null);
            setServiceSearchError(err instanceof Error ? err.message : "Service not found");
        } finally {
            setServiceSearchLoading(false);
        }
    }

    return (
        <div>
            {error && (
                <div className="mb-4 rounded border border-red-400 bg-red-50 text-red-700 px-4 py-2 text-sm">
                    {error}
                </div>
            )}

            <h2 className="font-semibold mb-2">All service usages</h2>
            {loading ? (
                <p>Loading usages...</p>
            ) : usages.length === 0 ? (
                <p className="text-gray-500 mb-6">No usage records yet.</p>
            ) : (
                <table className="w-full border-collapse text-sm mb-8">
                    <thead>
                        <tr className="border-b bg-gray-100 text-left">
                            <th className="p-2">Guest</th>
                            <th className="p-2">Service</th>
                            <th className="p-2">Quantity</th>
                            <th className="p-2">Price</th>
                            <th className="p-2">Date</th>
                            <th className="p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usages.map((usage) => {
                            const isEditing = editingId === usage.id;
                            return (
                                <tr key={usage.id} className="border-b align-top">
                                    <td className="p-2">Guest #{usage.guestId}</td>
                                    <td className="p-2">Service #{usage.serviceId}</td>

                                    {isEditing && editForm ? (
                                        <>
                                            <td className="p-2">
                                                <input
                                                    type="number"
                                                    className="border rounded px-1 py-0.5 w-20"
                                                    value={editForm.quantity}
                                                    onChange={(e) =>
                                                        setEditForm({
                                                            ...editForm,
                                                            quantity: e.target.value,
                                                        })
                                                    }
                                                />
                                            </td>
                                            <td className="p-2">{usage.price}</td>
                                            <td className="p-2">
                                                <input
                                                    type="date"
                                                    className="border rounded px-1 py-0.5"
                                                    value={editForm.useDate}
                                                    onChange={(e) =>
                                                        setEditForm({
                                                            ...editForm,
                                                            useDate: e.target.value,
                                                        })
                                                    }
                                                />
                                            </td>
                                            <td className="p-2 space-x-2 whitespace-nowrap">
                                                <button
                                                    onClick={() => handleSaveEdit(usage.id)}
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
                                            <td className="p-2">{usage.quantity}</td>
                                            <td className="p-2">{usage.price}</td>
                                            <td className="p-2">{usage.useDate.slice(0, 10)}</td>
                                            <td className="p-2 space-x-2 whitespace-nowrap">
                                                <button
                                                    onClick={() => startEdit(usage)}
                                                    className="bg-blue-600 text-white px-2 py-1 rounded text-xs"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(usage.id)}
                                                    disabled={deletingId === usage.id}
                                                    className="bg-red-600 text-white px-2 py-1 rounded text-xs disabled:opacity-50"
                                                >
                                                    {deletingId === usage.id ? "Deleting..." : "Delete"}
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

   
            <form
                onSubmit={handleRegister}
                className="rounded border border-gray-300 p-4 bg-gray-50 mb-8"
            >
                <h2 className="font-semibold mb-3">Register service usage</h2>
                <div className="flex flex-wrap gap-3 items-end">
                    <div>
                        <label className="block text-xs text-gray-600 mb-1">
                            Guest username
                        </label>
                        <input
                            type="text"
                            className="border rounded px-2 py-1"
                            value={registerForm.userName}
                            onChange={(e) =>
                                setRegisterForm({ ...registerForm, userName: e.target.value })
                            }
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-600 mb-1">Room number</label>
                        <input
                            type="number"
                            className="border rounded px-2 py-1 w-28"
                            value={registerForm.roomNumber}
                            onChange={(e) =>
                                setRegisterForm({ ...registerForm, roomNumber: e.target.value })
                            }
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-600 mb-1">Service</label>
                        <select
                            className="border rounded px-2 py-1"
                            value={registerForm.serviceName}
                            onChange={(e) =>
                                setRegisterForm({ ...registerForm, serviceName: e.target.value })
                            }
                        >
                            <option value="">Select a service</option>
                            {services.map((s) => (
                                <option key={s.id} value={s.name}>
                                    {s.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs text-gray-600 mb-1">Quantity</label>
                        <input
                            type="number"
                            className="border rounded px-2 py-1 w-24"
                            value={registerForm.quantity}
                            onChange={(e) =>
                                setRegisterForm({ ...registerForm, quantity: e.target.value })
                            }
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-600 mb-1">Date</label>
                        <input
                            type="date"
                            className="border rounded px-2 py-1"
                            value={registerForm.useDate}
                            onChange={(e) =>
                                setRegisterForm({ ...registerForm, useDate: e.target.value })
                            }
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={registering}
                        className="bg-blue-600 text-white px-4 py-1.5 rounded disabled:opacity-50"
                    >
                        {registering ? "Registering..." : "Register usage"}
                    </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                    The room must have an active reservation for this guest covering the
                    selected date, or registration will fail.
                </p>
            </form>

         
            <div className="mb-8">
                <h2 className="font-semibold mb-2">Search by guest</h2>
                <form onSubmit={handleGuestSearch} className="flex items-end gap-2 mb-3">
                    <div>
                        <label className="block text-xs text-gray-600 mb-1">Username</label>
                        <input
                            type="text"
                            className="border rounded px-2 py-1"
                            value={guestSearch}
                            onChange={(e) => setGuestSearch(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={guestSearchLoading}
                        className="bg-blue-600 text-white px-4 py-1.5 rounded disabled:opacity-50"
                    >
                        {guestSearchLoading ? "Searching..." : "Search"}
                    </button>
                </form>
                {guestSearchError && (
                    <p className="text-red-700 text-sm mb-2">{guestSearchError}</p>
                )}
                {guestResults && (
                    guestResults.length === 0 ? (
                        <p className="text-gray-500 text-sm">
                            This guest hasn't used any services.
                        </p>
                    ) : (
                        <table className="w-full border-collapse text-sm">
                            <thead>
                                <tr className="border-b bg-gray-100 text-left">
                                    <th className="p-2">Service</th>
                                    <th className="p-2">Quantity</th>
                                    <th className="p-2">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {guestResults.map((row, i) => (
                                    <tr key={i} className="border-b">
                                        <td className="p-2">{row.name}</td>
                                        <td className="p-2">{row.quantity}</td>
                                        <td className="p-2">{row.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )
                )}
            </div>

           
            <div>
                <h2 className="font-semibold mb-2">Search by service</h2>
                <form onSubmit={handleServiceSearch} className="flex items-end gap-2 mb-3">
                    <div>
                        <label className="block text-xs text-gray-600 mb-1">Service name</label>
                        <input
                            type="text"
                            className="border rounded px-2 py-1"
                            value={serviceSearch}
                            onChange={(e) => setServiceSearch(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={serviceSearchLoading}
                        className="bg-blue-600 text-white px-4 py-1.5 rounded disabled:opacity-50"
                    >
                        {serviceSearchLoading ? "Searching..." : "Search"}
                    </button>
                </form>
                {serviceSearchError && (
                    <p className="text-red-700 text-sm mb-2">{serviceSearchError}</p>
                )}
                {serviceResults && (
                    serviceResults.length === 0 ? (
                        <p className="text-gray-500 text-sm">No guests have used this service.</p>
                    ) : (
                        <table className="w-full border-collapse text-sm">
                            <thead>
                                <tr className="border-b bg-gray-100 text-left">
                                    <th className="p-2">Guest</th>
                                    <th className="p-2">Quantity</th>
                                    <th className="p-2">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {serviceResults.map((row, i) => (
                                    <tr key={i} className="border-b">
                                        <td className="p-2">
                                            {row.firstName} ({row.username})
                                        </td>
                                        <td className="p-2">{row.quantity}</td>
                                        <td className="p-2">{row.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )
                )}
            </div>
        </div>
    );
}
