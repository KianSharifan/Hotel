import { useEffect, useState, useCallback } from "react";
import { getRestaurantSettings, updateRestaurantSettings } from "../../../api/restaurantApi";
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


type FormState = {
    name: string;
    address: string;
    openTime: string;
    closeTime: string;
};

interface Restaurant {
    name?: string;
    address?: string;
    openTime?: string;
    closeTime?: string;
}

interface RestaurantDto {
    name?: string;
    address?: string;
    openTime?: string;
    closeTime?: string;
}

const emptyForm: FormState = {
    name: "",
    address: "",
    openTime: "08:00",
    closeTime: "22:00",
};


function toTimeInputValue(value: string | undefined): string {
    if (!value) return "";
    return value.slice(0, 5);
}

function RestaurantSettings() {
    const { showToast, toastContainer } = useInlineToast();

    const [form, setForm] = useState<FormState>(emptyForm);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

    useEffect(() => {
        let cancelled = false;

        async function load() {
            try {
                setLoading(true);
                setLoadError(null);
                const restaurant: Restaurant = await getRestaurantSettings();
                if (cancelled) return;

                setForm({
                    name: restaurant.name ?? "",
                    address: restaurant.address ?? "",
                    openTime: toTimeInputValue(restaurant.openTime),
                    closeTime: toTimeInputValue(restaurant.closeTime),
                });
            } catch (err) {
                if (!cancelled) {
                    setLoadError(err instanceof Error ? err.message : "Failed to load restaurant.");
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

    function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
        setForm((prev) => ({ ...prev, [key]: value }));
        if (errors[key]) {
            setErrors((prev) => ({ ...prev, [key]: undefined }));
        }
    }

    function validate(): boolean {
        const next: Partial<Record<keyof FormState, string>> = {};

        if (!form.name.trim()) next.name = "Restaurant name is required.";
        if (!form.address.trim()) next.address = "Address is required.";
        if (!form.openTime) next.openTime = "Opening time is required.";
        if (!form.closeTime) next.closeTime = "Closing time is required.";

        setErrors(next);
        return Object.keys(next).length === 0;
    }

    async function handleSave() {
        if (!validate()) return;

        const dto: RestaurantDto = {
            name: form.name.trim(),
            address: form.address.trim(),
            openTime: form.openTime,
            closeTime: form.closeTime,
        };

        try {
            setSaving(true);
            await updateRestaurantSettings(dto);
            showToast("Restaurant updated successfully");
        } catch (err) {
            showToast(err instanceof Error ? err.message : "Failed to update restaurant.", "error");
        } finally {
            setSaving(false);
        }
    }

    if (loading) {
        return (
            <div className="flex min-h-[40vh] items-center justify-center text-sm text-slate-500">
                Loading restaurant settings…
            </div>
        );
    }

    if (loadError) {
        return (
            <div className="mx-auto mt-10 max-w-md rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                {loadError}
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-3xl px-4 py-8">
            {toastContainer}

            <header className="mb-8">
                <h1 className="text-2xl font-semibold text-slate-900">Restaurant Settings</h1>
                <p className="mt-1 text-sm text-slate-500">
                    Manage your restaurant's public information and operating hours.
                </p>
            </header>


            <section className="mb-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-base font-semibold text-slate-900">Restaurant Information</h2>

                <div className="grid gap-5 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                        <label className="mb-1 block text-sm font-medium text-slate-700">
                            Restaurant Name
                        </label>
                        <input
                            type="text"
                            value={form.name}
                            onChange={(e) => updateField("name", e.target.value)}
                            placeholder="e.g. Noire Palace Grill"
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
                        />
                        {errors.name && <p className="mt-1 text-xs text-red-600">⚠ {errors.name}</p>}
                    </div>

                    <div className="sm:col-span-2">
                        <label className="mb-1 block text-sm font-medium text-slate-700">
                            Address
                        </label>
                        <input
                            type="text"
                            value={form.address}
                            onChange={(e) => updateField("address", e.target.value)}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
                        />
                        {errors.address && (
                            <p className="mt-1 text-xs text-red-600">⚠ {errors.address}</p>
                        )}
                    </div>
                </div>
            </section>


            <section className="mb-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-base font-semibold text-slate-900">Operating Hours</h2>

                <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">
                            Opening Time
                        </label>
                        <input
                            type="time"
                            value={form.openTime}
                            onChange={(e) => updateField("openTime", e.target.value)}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
                        />
                        {errors.openTime && (
                            <p className="mt-1 text-xs text-red-600">⚠ {errors.openTime}</p>
                        )}
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">
                            Closing Time
                        </label>
                        <input
                            type="time"
                            value={form.closeTime}
                            onChange={(e) => updateField("closeTime", e.target.value)}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
                        />
                        {errors.closeTime && (
                            <p className="mt-1 text-xs text-red-600">⚠ {errors.closeTime}</p>
                        )}
                    </div>
                </div>
            </section>

            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={handleSave}
                    disabled={saving}
                    className="rounded-lg bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {saving ? "Saving…" : "Save Changes"}
                </button>
            </div>
        </div>
    );
}

export function RestaurantSettingsPage() {
    const { user } = useAuth();

    if (user?.role !== "RestaurantManager") {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
                <div className="text-4xl">🔒</div>
                <h1 className="mt-4 text-xl font-semibold text-slate-900">Access Denied</h1>
                <p className="mt-2 max-w-sm text-sm text-slate-500">
                    You don't have permission to access Restaurant Settings.
                </p>
            </div>
        );
    }

    return <RestaurantSettings />;
}

export default RestaurantSettings;
