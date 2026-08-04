import { useState } from "react"
import {createRestaurantTable, deleteRestaurantTable,
    getRestaurantTable, updateRestaurantTable
} from "../../../api/restaurantTablesApi"
import { useAuth } from "../../../context/AuthContext"

interface RestaurantTable{
    id: number
    capacity: number
    status?: string
}

interface CreateFormState {
    capacity: string;
}

const emptyCreateForm: CreateFormState = {
    capacity: "",
};

interface EditFormState {
    capacity: string;
    status: "Available" | "Maintenance";
}

const emptyEditForm: EditFormState = {
    capacity: "",
    status: "Available",
};


export default function RestaurantTables(){

    const [createForm, setCreateForm] = useState<CreateFormState>(emptyCreateForm);
    const [creating, setCreating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [searchId, setSearchId] = useState("");
    const [searchedTable, setSearchedTable] = useState<RestaurantTable| null>(null);
    const [searching, setSearching] = useState(false);

    const [editing, setEditing] = useState(false);
    const [editForm, setEditForm] = useState<EditFormState>(emptyEditForm);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);


    const { user, loading: authLoading  } = useAuth();

    if (authLoading) {
        return null; 
    }
    if (user?.role !== "HotelManager" && user?.role !== "RestaurantManager" && user?.role !== "Chef" && user?.role !== "Waiter") {
        return (
                <div className="mx-auto mt-4 max-w-3xl rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
                You don't have permission to access this page.
                </div>
            );
    }

    async function handleCreate(e: React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();

        setError(null);

        const capacity = Number(createForm.capacity);

        if (!createForm.capacity || Number.isNaN(capacity)) {
            setError("Capacity must be a number");
            return;
        }

        setCreating(true);

        try{
            await createRestaurantTable({capacity});
            setCreateForm(emptyCreateForm);

        }
        catch(err){
            setError(err instanceof Error? err.message : "Failed to create table");
        }
        finally{
            setCreating(false);
        }
    }


    async function handleSearch(){
        setError(null);
        const id = Number(searchId);

        if (!searchId || Number.isNaN(id)) {
            setError("Enter a valid table ID.");
            return;
        }

        setSearching(true);
        setEditing(false);

        try {
            const data = await getRestaurantTable(id);
            setSearchedTable(data);
            setEditForm({
                capacity: String(data.capacity),
                status: data.status === "Maintenance" ? "Maintenance" : "Available",
            });
        } 
        catch (err) {
            setSearchedTable(null);
            setError(err instanceof Error ? err.message : "Table not found");
        } 
        finally {
            setSearching(false);
        }
    }

    function startEdit() {
        if (!searchedTable) return;
        setEditForm({
            capacity: String(searchedTable.capacity),
            status: searchedTable.status === "Maintenance" ? "Maintenance" : "Available",
        });
        setEditing(true);
    }

    function cancelEdit() {
        setEditing(false);
    }

    async function handleSaveEdit() {
        if (!searchedTable) return;
        setError(null);

        const capacity = Number(editForm.capacity);
        if (!editForm.capacity || Number.isNaN(capacity)) {
            setError("Capacity must be a number");
            return;
        }

        setSaving(true);
        try {
            await updateRestaurantTable(searchedTable.id, {
                capacity,
                specialReq: editForm.status,
            });
            const refreshed = await getRestaurantTable(searchedTable.id);
            setSearchedTable(refreshed);
            setEditing(false);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to update table");
        } finally {
            setSaving(false);
        }
    }

    async function handleDelete() {
        if (!searchedTable) return;
        if (!window.confirm(`Delete table #${searchedTable.id}? This cannot be undone.`)) {
            return;
        }
        setError(null);
        setDeleting(true);
        try {
            await deleteRestaurantTable(searchedTable.id);
            setSearchedTable(null);
            setSearchId("");
            setEditing(false);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to delete table");
        } finally {
            setDeleting(false);
        }
    }



    return(
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Restaurant Tables</h1>

            {error && (
                <div className="mb-4 rounded border border-red-400 bg-red-50 text-red-700 px-4 py-2 text-sm">
                    {error}
                </div>
            )}

            <form onSubmit={handleCreate}
                className="mb-8 rounded border border-gray-300 p-4 bg-gray-50">

                <h2 className="font-semibold mb-3">Create new task</h2>
                <div className="flex flex-wrap gap-3 items-end">
                    <div>
                        <label className="block text-xs text-gray-600 mb-1">Capacity</label>
                        <input
                            type="number"
                            className="border rounded px-2 py-1 w-28"
                            value={createForm.capacity}
                            onChange={(e) =>
                                setCreateForm({ ...createForm, capacity: e.target.value })
                            }
                        />
                    </div>

                    <button type="submit" disabled={creating}
                        className="bg-blue-600 text-white px-4 py-1.5 rounded disabled:opacity-50">
                        {creating ? "Creating..." : "Create Table"}
                    </button>
                </div>

            </form>


            <form onSubmit={(e) => {e.preventDefault(); handleSearch();}} 
                className="flex items-end gap-2 mb-6">
                <div>
                    <label className="block text-xs text-gray-600 mb-1">Table ID</label>
                    <input
                        type="number"
                        className="border rounded px-2 py-1 w-40"
                        value={searchId}
                        onChange={(e)=>setSearchId(e.target.value)}
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
    
            {searchedTable && (
                <div className="border rounded p-4 bg-white mb-6">

                    <h3 className="font-bold mb-2">Table Information</h3>

                    {editing ? (
                        <div className="flex items-end gap-3">
                            <div>
                                <label className="block text-xs text-gray-600 mb-1">
                                    Capacity
                                </label>
                                <input
                                    type="number"
                                    className="border rounded px-2 py-1 w-28"
                                    value={editForm.capacity}
                                    onChange={(e) =>
                                        setEditForm({ ...editForm, capacity: e.target.value })
                                    }
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-gray-600 mb-1">
                                    Status
                                </label>
                                <select
                                    className="border rounded px-2 py-1"
                                    value={editForm.status}
                                    onChange={(e) =>
                                        setEditForm({
                                            ...editForm,
                                            status: e.target.value as "Available" | "Maintenance",
                                        })
                                    }
                                >
                                    <option value="Available">Available</option>
                                    <option value="Maintenance">Maintenance</option>
                                </select>
                            </div>
                            <button
                                onClick={handleSaveEdit}
                                disabled={saving}
                                className="bg-green-600 text-white px-3 py-1.5 rounded text-sm disabled:opacity-50"
                            >
                                {saving ? "Saving..." : "Save"}
                            </button>
                            <button
                                onClick={cancelEdit}
                                className="bg-gray-300 px-3 py-1.5 rounded text-sm"
                            >
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <>
                            <p>
                                <strong>ID:</strong> {searchedTable.id}
                            </p>

                            <p>
                                <strong>Capacity:</strong> {searchedTable.capacity}
                            </p>

                            <p>
                                <strong>Status:</strong> {searchedTable.status}
                            </p>

                            <div className="mt-3 space-x-2">
                                <button
                                    onClick={startEdit}
                                    className="bg-blue-600 text-white px-3 py-1.5 rounded text-sm"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={handleDelete}
                                    disabled={deleting}
                                    className="bg-red-600 text-white px-3 py-1.5 rounded text-sm disabled:opacity-50"
                                >
                                    {deleting ? "Deleting..." : "Delete"}
                                </button>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
   )
}
