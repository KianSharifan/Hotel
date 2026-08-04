import { useEffect, useState } from "react";
import {
    getRooms,
    createRoom,
    updateRoom,
    deleteRoom,
    getRoomTypes,
    createRoomType,
    updateRoomType,
    deleteRoomType,
    getAmenities,
    createAmenity,
    deleteAmenity,
    addRoomAmenity,
    deleteRoomAmenity,
} from "../../api/roomApi"; // adjust path to wherever roomApi.ts actually lives
import { useAuth } from "../../context/AuthContext"; // adjust path to your real AuthContext

// ---------- types matching the backend DTOs ----------

interface RoomItem {
    roomId: number;
    hotelId: number;
    roomNumber: number;
    floor: number;
    roomTypeId: number;
    status?: string;
    notes?: string;
}

// RoomsController's RoomDto uses "note" (not "notes") on the way in
interface RoomInput {
    hotelId?: number;
    floor?: number;
    roomNumber?: number;
    roomTypeId?: number;
    status?: string;
    note?: string;
}

interface RoomTypeItem {
    roomTypeId: number;
    name: string;
    maxGuests: number;
    numberDoubleBed: number;
    numberSofaBed: number;
    numberSingleBed: number;
    description?: string;
    picUrl?: string;
    price: number;
}

interface Amenity {
    id: number;
    name: string;
}

interface RoomTypeWithAmenities {
    roomType: RoomTypeItem;
    amenities: Amenity[];
}

// RoomTypesController's RoomTypeDto field names
interface RoomTypeInput {
    name?: string;
    maxGuests?: number;
    numberOfSingles?: number;
    numberOfDoubles?: number;
    numberOfSofa?: number;
    price?: number;
    description?: string;
    image?: string;
}

const ROOM_STATUSES = ["Available", "Occupied", "Maintenance", "OutOfService"];

type Tab = "rooms" | "roomTypes";

export default function RoomsManagement() {
    const { user, loading: authLoading } = useAuth();

    const [tab, setTab] = useState<Tab>("rooms");

    if (authLoading) {
        return null;
    }
    if (
        user?.role !== "HotelManager" &&
        user?.role !== "FrontOfficeManager" &&
        user?.role !== "DirectorOfRooms"
    ) {
        return (
            <div className="mx-auto mt-4 max-w-3xl rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
                You don't have permission to access this page.
            </div>
        );
    }

    const tabs: { key: Tab; label: string }[] = [
        { key: "rooms", label: "Rooms" },
        { key: "roomTypes", label: "Room Types" },
    ];

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Rooms Management</h1>

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

            {tab === "rooms" && <RoomsTab />}
            {tab === "roomTypes" && <RoomTypesTab />}
        </div>
    );
}



interface RoomFormState {
    hotelId: string;
    roomNumber: string;
    floor: string;
    roomTypeId: string;
    status: string;
    note: string;
}

const emptyRoomForm: RoomFormState = {
    hotelId: "",
    roomNumber: "",
    floor: "",
    roomTypeId: "",
    status: ROOM_STATUSES[0],
    note: "",
};

function RoomsTab() {
    const [rooms, setRooms] = useState<RoomItem[]>([]);
    const [roomTypes, setRoomTypes] = useState<RoomTypeItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [createForm, setCreateForm] = useState<RoomFormState>(emptyRoomForm);
    const [creating, setCreating] = useState(false);

    const [editingId, setEditingId] = useState<number | null>(null);
    const [editForm, setEditForm] = useState<RoomFormState | null>(null);
    const [savingEdit, setSavingEdit] = useState(false);

    const [deletingRoomNumber, setDeletingRoomNumber] = useState<number | null>(null);

    async function loadAll() {
        setLoading(true);
        setError(null);
        try {
            const [roomsData, roomTypesData] = await Promise.all([getRooms(), getRoomTypes()]);
            setRooms(roomsData);
            setRoomTypes(
                (roomTypesData as RoomTypeWithAmenities[]).map((rt) => rt.roomType)
            );
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to load rooms");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadAll();
    }, []);

    function roomTypeName(id: number) {
        return roomTypes.find((rt) => rt.roomTypeId === id)?.name ?? `#${id}`;
    }

    async function handleCreate(e: React.FormEvent) {
        e.preventDefault();
        setError(null);

        const hotelId = Number(createForm.hotelId);
        const roomNumber = Number(createForm.roomNumber);
        const floor = Number(createForm.floor);
        const roomTypeId = Number(createForm.roomTypeId);

        if (
            !createForm.hotelId ||
            !createForm.roomNumber ||
            !createForm.floor ||
            !createForm.roomTypeId ||
            Number.isNaN(hotelId) ||
            Number.isNaN(roomNumber) ||
            Number.isNaN(floor) ||
            Number.isNaN(roomTypeId)
        ) {
            setError("Hotel ID, Room Number, Floor, and Room Type are required");
            return;
        }

        const payload: RoomInput = {
            hotelId,
            roomNumber,
            floor,
            roomTypeId,
            status: createForm.status,
            note: createForm.note || undefined,
        };

        setCreating(true);
        try {
            await createRoom(payload);
            setCreateForm(emptyRoomForm);
            await loadAll();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to create room");
        } finally {
            setCreating(false);
        }
    }

    function startEdit(room: RoomItem) {
        setEditingId(room.roomId);
        setEditForm({
            hotelId: String(room.hotelId),
            roomNumber: String(room.roomNumber),
            floor: String(room.floor),
            roomTypeId: String(room.roomTypeId),
            status: room.status ?? ROOM_STATUSES[0],
            note: room.notes ?? "",
        });
    }

    function cancelEdit() {
        setEditingId(null);
        setEditForm(null);
    }

    async function handleSaveEdit(room: RoomItem) {
        if (!editForm) return;
        setError(null);

        const payload: RoomInput = {
            hotelId: Number(editForm.hotelId),
            roomNumber: Number(editForm.roomNumber),
            floor: Number(editForm.floor),
            roomTypeId: Number(editForm.roomTypeId),
            status: editForm.status,
            note: editForm.note,
        };

        setSavingEdit(true);
        try {
            await updateRoom(room.roomId, payload);
            cancelEdit();
            await loadAll();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to update room");
        } finally {
            setSavingEdit(false);
        }
    }

    async function handleDelete(room: RoomItem) {
        if (!window.confirm(`Delete room ${room.roomNumber}? This cannot be undone.`)) {
            return;
        }
        setError(null);
        setDeletingRoomNumber(room.roomNumber);
        try {
            await deleteRoom(room.roomNumber);
            await loadAll();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to delete room");
        } finally {
            setDeletingRoomNumber(null);
        }
    }

    return (
        <div>
            {error && (
                <div className="mb-4 rounded border border-red-400 bg-red-50 text-red-700 px-4 py-2 text-sm">
                    {error}
                </div>
            )}

            <form
                onSubmit={handleCreate}
                className="mb-8 rounded border border-gray-300 p-4 bg-gray-50"
            >
                <h2 className="font-semibold mb-3">Create new room</h2>
                <div className="flex flex-wrap gap-3 items-end">
                    <div>
                        <label className="block text-xs text-gray-600 mb-1">Hotel ID</label>
                        <input
                            type="number"
                            className="border rounded px-2 py-1 w-24"
                            value={createForm.hotelId}
                            onChange={(e) =>
                                setCreateForm({ ...createForm, hotelId: e.target.value })
                            }
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-600 mb-1">Room Number</label>
                        <input
                            type="number"
                            className="border rounded px-2 py-1 w-28"
                            value={createForm.roomNumber}
                            onChange={(e) =>
                                setCreateForm({ ...createForm, roomNumber: e.target.value })
                            }
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-600 mb-1">Floor</label>
                        <input
                            type="number"
                            className="border rounded px-2 py-1 w-20"
                            value={createForm.floor}
                            onChange={(e) =>
                                setCreateForm({ ...createForm, floor: e.target.value })
                            }
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-600 mb-1">Room Type</label>
                        <select
                            className="border rounded px-2 py-1"
                            value={createForm.roomTypeId}
                            onChange={(e) =>
                                setCreateForm({ ...createForm, roomTypeId: e.target.value })
                            }
                        >
                            <option value="">Select...</option>
                            {roomTypes.map((rt) => (
                                <option key={rt.roomTypeId} value={rt.roomTypeId}>
                                    {rt.name}
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
                            {ROOM_STATUSES.map((s) => (
                                <option key={s} value={s}>
                                    {s}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex-1 min-w-[200px]">
                        <label className="block text-xs text-gray-600 mb-1">Notes</label>
                        <input
                            type="text"
                            className="border rounded px-2 py-1 w-full"
                            value={createForm.note}
                            onChange={(e) =>
                                setCreateForm({ ...createForm, note: e.target.value })
                            }
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={creating}
                        className="bg-blue-600 text-white px-4 py-1.5 rounded disabled:opacity-50"
                    >
                        {creating ? "Creating..." : "Create room"}
                    </button>
                </div>
            </form>

            {loading ? (
                <p>Loading rooms...</p>
            ) : rooms.length === 0 ? (
                <p className="text-gray-500">No rooms yet.</p>
            ) : (
                <table className="w-full border-collapse text-sm">
                    <thead>
                        <tr className="border-b bg-gray-100 text-left">
                            <th className="p-2">ID</th>
                            <th className="p-2">Hotel</th>
                            <th className="p-2">Room #</th>
                            <th className="p-2">Floor</th>
                            <th className="p-2">Room Type</th>
                            <th className="p-2">Status</th>
                            <th className="p-2">Notes</th>
                            <th className="p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rooms.map((room) => {
                            const isEditing = editingId === room.roomId;
                            return (
                                <tr key={room.roomId} className="border-b align-top">
                                    <td className="p-2">{room.roomId}</td>

                                    {isEditing && editForm ? (
                                        <>
                                            <td className="p-2">
                                                <input
                                                    type="number"
                                                    className="border rounded px-1 py-0.5 w-16"
                                                    value={editForm.hotelId}
                                                    onChange={(e) =>
                                                        setEditForm({
                                                            ...editForm,
                                                            hotelId: e.target.value,
                                                        })
                                                    }
                                                />
                                            </td>
                                            <td className="p-2">
                                                <input
                                                    type="number"
                                                    className="border rounded px-1 py-0.5 w-20"
                                                    value={editForm.roomNumber}
                                                    onChange={(e) =>
                                                        setEditForm({
                                                            ...editForm,
                                                            roomNumber: e.target.value,
                                                        })
                                                    }
                                                />
                                            </td>
                                            <td className="p-2">
                                                <input
                                                    type="number"
                                                    className="border rounded px-1 py-0.5 w-16"
                                                    value={editForm.floor}
                                                    onChange={(e) =>
                                                        setEditForm({
                                                            ...editForm,
                                                            floor: e.target.value,
                                                        })
                                                    }
                                                />
                                            </td>
                                            <td className="p-2">
                                                <select
                                                    className="border rounded px-1 py-0.5"
                                                    value={editForm.roomTypeId}
                                                    onChange={(e) =>
                                                        setEditForm({
                                                            ...editForm,
                                                            roomTypeId: e.target.value,
                                                        })
                                                    }
                                                >
                                                    {roomTypes.map((rt) => (
                                                        <option
                                                            key={rt.roomTypeId}
                                                            value={rt.roomTypeId}
                                                        >
                                                            {rt.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </td>
                                            <td className="p-2">
                                                <select
                                                    className="border rounded px-1 py-0.5"
                                                    value={editForm.status}
                                                    onChange={(e) =>
                                                        setEditForm({
                                                            ...editForm,
                                                            status: e.target.value,
                                                        })
                                                    }
                                                >
                                                    {ROOM_STATUSES.map((s) => (
                                                        <option key={s} value={s}>
                                                            {s}
                                                        </option>
                                                    ))}
                                                </select>
                                            </td>
                                            <td className="p-2">
                                                <input
                                                    type="text"
                                                    className="border rounded px-1 py-0.5 w-full"
                                                    value={editForm.note}
                                                    onChange={(e) =>
                                                        setEditForm({
                                                            ...editForm,
                                                            note: e.target.value,
                                                        })
                                                    }
                                                />
                                            </td>
                                            <td className="p-2 space-x-2 whitespace-nowrap">
                                                <button
                                                    onClick={() => handleSaveEdit(room)}
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
                                            <td className="p-2">{room.hotelId}</td>
                                            <td className="p-2">{room.roomNumber}</td>
                                            <td className="p-2">{room.floor}</td>
                                            <td className="p-2">
                                                {roomTypeName(room.roomTypeId)}
                                            </td>
                                            <td className="p-2">{room.status || "—"}</td>
                                            <td className="p-2">{room.notes || "—"}</td>
                                            <td className="p-2 space-x-2 whitespace-nowrap">
                                                <button
                                                    onClick={() => startEdit(room)}
                                                    className="bg-blue-600 text-white px-2 py-1 rounded text-xs"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(room)}
                                                    disabled={
                                                        deletingRoomNumber === room.roomNumber
                                                    }
                                                    className="bg-red-600 text-white px-2 py-1 rounded text-xs disabled:opacity-50"
                                                >
                                                    {deletingRoomNumber === room.roomNumber
                                                        ? "Deleting..."
                                                        : "Delete"}
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



interface RoomTypeFormState {
    name: string;
    maxGuests: string;
    numberOfSingles: string;
    numberOfDoubles: string;
    numberOfSofa: string;
    price: string;
    description: string;
    image: string;
}

const emptyRoomTypeForm: RoomTypeFormState = {
    name: "",
    maxGuests: "",
    numberOfSingles: "",
    numberOfDoubles: "",
    numberOfSofa: "",
    price: "",
    description: "",
    image: "",
};

function RoomTypesTab() {
    const [roomTypes, setRoomTypes] = useState<RoomTypeWithAmenities[]>([]);
    const [amenities, setAmenities] = useState<Amenity[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [createForm, setCreateForm] = useState<RoomTypeFormState>(emptyRoomTypeForm);
    const [creating, setCreating] = useState(false);

    const [editingId, setEditingId] = useState<number | null>(null);
    const [editForm, setEditForm] = useState<RoomTypeFormState | null>(null);
    const [savingEdit, setSavingEdit] = useState(false);

    const [deletingId, setDeletingId] = useState<number | null>(null);

    // amenity-to-room-type linking, per row
    const [addAmenitySelection, setAddAmenitySelection] = useState<Record<number, string>>({});
    const [linkingRoomTypeId, setLinkingRoomTypeId] = useState<number | null>(null);

    // global amenity management
    const [newAmenityName, setNewAmenityName] = useState("");
    const [creatingAmenity, setCreatingAmenity] = useState(false);
    const [deletingAmenityId, setDeletingAmenityId] = useState<number | null>(null);

    async function loadAll() {
        setLoading(true);
        setError(null);
        try {
            const [roomTypesData, amenitiesData] = await Promise.all([
                getRoomTypes(),
                getAmenities(),
            ]);
            setRoomTypes(roomTypesData);
            setAmenities(amenitiesData);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to load room types");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadAll();
    }, []);

    async function handleCreate(e: React.FormEvent) {
        e.preventDefault();
        setError(null);

        const maxGuests = Number(createForm.maxGuests);
        const numberOfSingles = Number(createForm.numberOfSingles);
        const numberOfDoubles = Number(createForm.numberOfDoubles);
        const numberOfSofa = Number(createForm.numberOfSofa);
        const price = Number(createForm.price);

        if (
            !createForm.name ||
            !createForm.maxGuests ||
            !createForm.price ||
            Number.isNaN(maxGuests) ||
            Number.isNaN(price)
        ) {
            setError("Name, Max Guests, and Price are required");
            return;
        }

        const payload: RoomTypeInput = {
            name: createForm.name,
            maxGuests,
            numberOfSingles: numberOfSingles || 0,
            numberOfDoubles: numberOfDoubles || 0,
            numberOfSofa: numberOfSofa || 0,
            price,
            description: createForm.description || undefined,
            image: createForm.image || undefined,
        };

        setCreating(true);
        try {
            await createRoomType(payload);
            setCreateForm(emptyRoomTypeForm);
            await loadAll();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to create room type");
        } finally {
            setCreating(false);
        }
    }

    function startEdit(rt: RoomTypeItem) {
        setEditingId(rt.roomTypeId);
        setEditForm({
            name: rt.name ?? "",
            maxGuests: String(rt.maxGuests),
            numberOfSingles: String(rt.numberSingleBed),
            numberOfDoubles: String(rt.numberDoubleBed),
            numberOfSofa: String(rt.numberSofaBed),
            price: String(rt.price),
            description: rt.description ?? "",
            image: rt.picUrl ?? "",
        });
    }

    function cancelEdit() {
        setEditingId(null);
        setEditForm(null);
    }

    async function handleSaveEdit(rt: RoomTypeItem) {
        if (!editForm) return;
        setError(null);

        const payload: RoomTypeInput = {
            name: editForm.name,
            maxGuests: Number(editForm.maxGuests),
            numberOfSingles: Number(editForm.numberOfSingles),
            numberOfDoubles: Number(editForm.numberOfDoubles),
            numberOfSofa: Number(editForm.numberOfSofa),
            price: Number(editForm.price),
            description: editForm.description,
            image: editForm.image,
        };

        setSavingEdit(true);
        try {
            await updateRoomType(rt.roomTypeId, payload);
            cancelEdit();
            await loadAll();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to update room type");
        } finally {
            setSavingEdit(false);
        }
    }

    async function handleDelete(rt: RoomTypeItem) {
        if (!window.confirm(`Delete room type "${rt.name}"? This cannot be undone.`)) {
            return;
        }
        setError(null);
        setDeletingId(rt.roomTypeId);
        try {
            await deleteRoomType(rt.roomTypeId);
            await loadAll();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to delete room type");
        } finally {
            setDeletingId(null);
        }
    }

    async function handleAddAmenity(roomTypeId: number) {
        const amenityId = Number(addAmenitySelection[roomTypeId]);
        if (!amenityId || Number.isNaN(amenityId)) return;

        setError(null);
        setLinkingRoomTypeId(roomTypeId);
        try {
            await addRoomAmenity(roomTypeId, amenityId);
            setAddAmenitySelection((prev) => ({ ...prev, [roomTypeId]: "" }));
            await loadAll();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to add amenity");
        } finally {
            setLinkingRoomTypeId(null);
        }
    }

    async function handleRemoveAmenity(roomTypeId: number, amenityId: number) {
        setError(null);
        setLinkingRoomTypeId(roomTypeId);
        try {
            await deleteRoomAmenity(roomTypeId, amenityId);
            await loadAll();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to remove amenity");
        } finally {
            setLinkingRoomTypeId(null);
        }
    }

    async function handleCreateAmenity(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        if (!newAmenityName.trim()) {
            setError("Amenity name is required");
            return;
        }
        setCreatingAmenity(true);
        try {
            await createAmenity(newAmenityName.trim());
            setNewAmenityName("");
            await loadAll();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to create amenity");
        } finally {
            setCreatingAmenity(false);
        }
    }

    async function handleDeleteAmenity(amenity: Amenity) {
        if (!window.confirm(`Delete amenity "${amenity.name}"? This cannot be undone.`)) {
            return;
        }
        setError(null);
        setDeletingAmenityId(amenity.id);
        try {
            await deleteAmenity(amenity.id);
            await loadAll();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to delete amenity");
        } finally {
            setDeletingAmenityId(null);
        }
    }

    return (
        <div>
            {error && (
                <div className="mb-4 rounded border border-red-400 bg-red-50 text-red-700 px-4 py-2 text-sm">
                    {error}
                </div>
            )}

            <div className="mb-8 rounded border border-gray-300 p-4 bg-gray-50">
                <h2 className="font-semibold mb-3">Amenities</h2>
                <div className="flex flex-wrap gap-2 mb-3">
                    {amenities.map((a) => (
                        <span
                            key={a.id}
                            className="inline-flex items-center gap-1 rounded-full bg-white border px-3 py-1 text-xs"
                        >
                            {a.name}
                            <button
                                onClick={() => handleDeleteAmenity(a)}
                                disabled={deletingAmenityId === a.id}
                                className="text-red-600 hover:text-red-800 disabled:opacity-50"
                                aria-label={`Delete ${a.name}`}
                            >
                                ✕
                            </button>
                        </span>
                    ))}
                    {amenities.length === 0 && (
                        <span className="text-sm text-gray-500">No amenities yet.</span>
                    )}
                </div>
                <form onSubmit={handleCreateAmenity} className="flex items-end gap-2">
                    <div>
                        <label className="block text-xs text-gray-600 mb-1">
                            New amenity name
                        </label>
                        <input
                            type="text"
                            className="border rounded px-2 py-1"
                            value={newAmenityName}
                            onChange={(e) => setNewAmenityName(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={creatingAmenity}
                        className="bg-blue-600 text-white px-4 py-1.5 rounded disabled:opacity-50"
                    >
                        {creatingAmenity ? "Adding..." : "Add amenity"}
                    </button>
                </form>
            </div>

         
            <form
                onSubmit={handleCreate}
                className="mb-8 rounded border border-gray-300 p-4 bg-gray-50"
            >
                <h2 className="font-semibold mb-3">Create new room type</h2>
                <div className="flex flex-wrap gap-3 items-end">
                    <div>
                        <label className="block text-xs text-gray-600 mb-1">Name</label>
                        <input
                            type="text"
                            className="border rounded px-2 py-1"
                            value={createForm.name}
                            onChange={(e) =>
                                setCreateForm({ ...createForm, name: e.target.value })
                            }
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-600 mb-1">Max Guests</label>
                        <input
                            type="number"
                            className="border rounded px-2 py-1 w-20"
                            value={createForm.maxGuests}
                            onChange={(e) =>
                                setCreateForm({ ...createForm, maxGuests: e.target.value })
                            }
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-600 mb-1">Single beds</label>
                        <input
                            type="number"
                            className="border rounded px-2 py-1 w-20"
                            value={createForm.numberOfSingles}
                            onChange={(e) =>
                                setCreateForm({
                                    ...createForm,
                                    numberOfSingles: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-600 mb-1">Double beds</label>
                        <input
                            type="number"
                            className="border rounded px-2 py-1 w-20"
                            value={createForm.numberOfDoubles}
                            onChange={(e) =>
                                setCreateForm({
                                    ...createForm,
                                    numberOfDoubles: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-600 mb-1">Sofa beds</label>
                        <input
                            type="number"
                            className="border rounded px-2 py-1 w-20"
                            value={createForm.numberOfSofa}
                            onChange={(e) =>
                                setCreateForm({ ...createForm, numberOfSofa: e.target.value })
                            }
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-600 mb-1">Price</label>
                        <input
                            type="number"
                            className="border rounded px-2 py-1 w-24"
                            value={createForm.price}
                            onChange={(e) =>
                                setCreateForm({ ...createForm, price: e.target.value })
                            }
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-600 mb-1">Image URL</label>
                        <input
                            type="text"
                            className="border rounded px-2 py-1"
                            value={createForm.image}
                            onChange={(e) =>
                                setCreateForm({ ...createForm, image: e.target.value })
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
                        {creating ? "Creating..." : "Create room type"}
                    </button>
                </div>
            </form>

         
            {loading ? (
                <p>Loading room types...</p>
            ) : roomTypes.length === 0 ? (
                <p className="text-gray-500">No room types yet.</p>
            ) : (
                <div className="space-y-4">
                    {roomTypes.map(({ roomType: rt, amenities: rtAmenities }) => {
                        const isEditing = editingId === rt.roomTypeId;
                        const availableToAdd = amenities.filter(
                            (a) => !rtAmenities.some((rta) => rta.id === a.id)
                        );

                        return (
                            <div key={rt.roomTypeId} className="border rounded p-4">
                                {isEditing && editForm ? (
                                    <div className="flex flex-wrap gap-3 items-end mb-3">
                                        <div>
                                            <label className="block text-xs text-gray-600 mb-1">
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                className="border rounded px-2 py-1"
                                                value={editForm.name}
                                                onChange={(e) =>
                                                    setEditForm({
                                                        ...editForm,
                                                        name: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-600 mb-1">
                                                Max Guests
                                            </label>
                                            <input
                                                type="number"
                                                className="border rounded px-2 py-1 w-20"
                                                value={editForm.maxGuests}
                                                onChange={(e) =>
                                                    setEditForm({
                                                        ...editForm,
                                                        maxGuests: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-600 mb-1">
                                                Single
                                            </label>
                                            <input
                                                type="number"
                                                className="border rounded px-2 py-1 w-16"
                                                value={editForm.numberOfSingles}
                                                onChange={(e) =>
                                                    setEditForm({
                                                        ...editForm,
                                                        numberOfSingles: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-600 mb-1">
                                                Double
                                            </label>
                                            <input
                                                type="number"
                                                className="border rounded px-2 py-1 w-16"
                                                value={editForm.numberOfDoubles}
                                                onChange={(e) =>
                                                    setEditForm({
                                                        ...editForm,
                                                        numberOfDoubles: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-600 mb-1">
                                                Sofa
                                            </label>
                                            <input
                                                type="number"
                                                className="border rounded px-2 py-1 w-16"
                                                value={editForm.numberOfSofa}
                                                onChange={(e) =>
                                                    setEditForm({
                                                        ...editForm,
                                                        numberOfSofa: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-600 mb-1">
                                                Price
                                            </label>
                                            <input
                                                type="number"
                                                className="border rounded px-2 py-1 w-24"
                                                value={editForm.price}
                                                onChange={(e) =>
                                                    setEditForm({
                                                        ...editForm,
                                                        price: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-600 mb-1">
                                                Image URL
                                            </label>
                                            <input
                                                type="text"
                                                className="border rounded px-2 py-1"
                                                value={editForm.image}
                                                onChange={(e) =>
                                                    setEditForm({
                                                        ...editForm,
                                                        image: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div className="flex-1 min-w-[200px]">
                                            <label className="block text-xs text-gray-600 mb-1">
                                                Description
                                            </label>
                                            <input
                                                type="text"
                                                className="border rounded px-2 py-1 w-full"
                                                value={editForm.description}
                                                onChange={(e) =>
                                                    setEditForm({
                                                        ...editForm,
                                                        description: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <button
                                            onClick={() => handleSaveEdit(rt)}
                                            disabled={savingEdit}
                                            className="bg-green-600 text-white px-3 py-1.5 rounded text-sm disabled:opacity-50"
                                        >
                                            {savingEdit ? "Saving..." : "Save"}
                                        </button>
                                        <button
                                            onClick={cancelEdit}
                                            className="bg-gray-300 px-3 py-1.5 rounded text-sm"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                                        <div>
                                            <h3 className="font-semibold">
                                                {rt.name}{" "}
                                                <span className="text-gray-500 font-normal">
                                                    — ${rt.price}/night
                                                </span>
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                Max guests: {rt.maxGuests} · Single:{" "}
                                                {rt.numberSingleBed} · Double:{" "}
                                                {rt.numberDoubleBed} · Sofa: {rt.numberSofaBed}
                                            </p>
                                            {rt.description && (
                                                <p className="text-sm text-gray-500 mt-1">
                                                    {rt.description}
                                                </p>
                                            )}
                                        </div>
                                        <div className="space-x-2 whitespace-nowrap">
                                            <button
                                                onClick={() => startEdit(rt)}
                                                className="bg-blue-600 text-white px-2 py-1 rounded text-xs"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(rt)}
                                                disabled={deletingId === rt.roomTypeId}
                                                className="bg-red-600 text-white px-2 py-1 rounded text-xs disabled:opacity-50"
                                            >
                                                {deletingId === rt.roomTypeId
                                                    ? "Deleting..."
                                                    : "Delete"}
                                            </button>
                                        </div>
                                    </div>
                                )}

                               
                                <div className="border-t pt-3">
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        {rtAmenities.map((a) => (
                                            <span
                                                key={a.id}
                                                className="inline-flex items-center gap-1 rounded-full bg-gray-100 border px-3 py-1 text-xs"
                                            >
                                                {a.name}
                                                <button
                                                    onClick={() =>
                                                        handleRemoveAmenity(rt.roomTypeId, a.id)
                                                    }
                                                    disabled={
                                                        linkingRoomTypeId === rt.roomTypeId
                                                    }
                                                    className="text-red-600 hover:text-red-800 disabled:opacity-50"
                                                    aria-label={`Remove ${a.name}`}
                                                >
                                                    ✕
                                                </button>
                                            </span>
                                        ))}
                                        {rtAmenities.length === 0 && (
                                            <span className="text-xs text-gray-500">
                                                No amenities linked.
                                            </span>
                                        )}
                                    </div>

                                    {availableToAdd.length > 0 && (
                                        <div className="flex items-end gap-2">
                                            <select
                                                className="border rounded px-2 py-1 text-sm"
                                                value={addAmenitySelection[rt.roomTypeId] ?? ""}
                                                onChange={(e) =>
                                                    setAddAmenitySelection((prev) => ({
                                                        ...prev,
                                                        [rt.roomTypeId]: e.target.value,
                                                    }))
                                                }
                                            >
                                                <option value="">Add amenity...</option>
                                                {availableToAdd.map((a) => (
                                                    <option key={a.id} value={a.id}>
                                                        {a.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <button
                                                onClick={() => handleAddAmenity(rt.roomTypeId)}
                                                disabled={linkingRoomTypeId === rt.roomTypeId}
                                                className="bg-blue-600 text-white px-3 py-1 rounded text-xs disabled:opacity-50"
                                            >
                                                Link
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
