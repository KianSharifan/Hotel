import { useEffect, useState, useCallback } from "react";
import { getHotel, updateHotel } from "../../../api/hotelManagerApi";
import type { Hotel, HotelDto } from "../../../api/hotelManagerApi";
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


function StarRating({ value, onChange }: { value: number; onChange: (v: number) => void }) {
    return (
        <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    onClick={() => onChange(star)}
                    aria-label={`${star} star${star > 1 ? "s" : ""}`}
                    className="rounded text-2xl leading-none transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
                >
                    <span className={star <= value ? "text-amber-400" : "text-slate-300"}>★</span>
                </button>
            ))}
            <span className="ml-2 text-sm text-slate-500">{value} / 5</span>
        </div>
    );
}


type FormState = {
    name: string;
    starRating: number;
    country: string;
    city: string;
    address: string;
    phone: string;
    email: string;
    checkinTime: string;
    checkoutTime: string;
};

const emptyForm: FormState = {
    name: "",
    starRating: 0,
    country: "",
    city: "",
    address: "",
    phone: "",
    email: "",
    checkinTime: "15:00",
    checkoutTime: "11:00",
};

// The backend may send "15:00:00" — <input type="time"> needs "HH:MM"
function toTimeInputValue(value: string | undefined): string {
    if (!value) return "";
    return value.slice(0, 5);
}

function HotelSettings() {
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
                const hotel: Hotel = await getHotel();
                if (cancelled) return;

                setForm({
                    name: hotel.name ?? "",
                    starRating: hotel.starRating ?? 0,
                    country: hotel.country ?? "",
                    city: hotel.city ?? "",
                    address: hotel.address ?? "",
                    phone: hotel.phone ?? "",
                    email: hotel.email ?? "",
                    checkinTime: toTimeInputValue(hotel.checkinTime),
                    checkoutTime: toTimeInputValue(hotel.checkoutTime),
                });
            } catch (err) {
                if (!cancelled) {
                    setLoadError(err instanceof Error ? err.message : "Failed to load hotel.");
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

        if (!form.name.trim()) next.name = "Hotel name is required.";
        if (!form.starRating) next.starRating = "Select a star rating.";
        if (!form.country.trim()) next.country = "Country is required.";
        if (!form.city.trim()) next.city = "City is required.";
        if (!form.address.trim()) next.address = "Address is required.";
        if (!form.phone.trim()) next.phone = "Phone number is required.";
        if (!form.email.trim()) {
            next.email = "Email is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            next.email = "Enter a valid email address.";
        }
        if (!form.checkinTime) next.checkinTime = "Check-in time is required.";
        if (!form.checkoutTime) next.checkoutTime = "Check-out time is required.";

        setErrors(next);
        return Object.keys(next).length === 0;
    }

    async function handleSave() {
        if (!validate()) return;

        const dto: HotelDto = {
            name: form.name.trim(),
            starRating: form.starRating,
            country: form.country.trim(),
            city: form.city.trim(),
            address: form.address.trim(),
            phone: form.phone.trim(),
            email: form.email.trim(),
            checkinTime: form.checkinTime,
            checkoutTime: form.checkoutTime,
        };

        try {
            setSaving(true);
            await updateHotel(dto);
            showToast("Hotel updated successfully");
        } catch (err) {
            showToast(err instanceof Error ? err.message : "Failed to update hotel.", "error");
        } finally {
            setSaving(false);
        }
    }

    if (loading) {
        return (
            <div className="flex min-h-[40vh] items-center justify-center text-sm text-slate-500">
                Loading hotel settings…
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
                <h1 className="text-2xl font-semibold text-slate-900">Hotel Settings</h1>
                <p className="mt-1 text-sm text-slate-500">
                    Manage your hotel's public information and operating hours.
                </p>
            </header>

          
            <section className="mb-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-base font-semibold text-slate-900">Hotel Information</h2>

                <div className="grid gap-5 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                        <label className="mb-1 block text-sm font-medium text-slate-700">
                            Hotel Name
                        </label>
                        <input
                            type="text"
                            value={form.name}
                            onChange={(e) => updateField("name", e.target.value)}
                            placeholder="e.g. Noire Palace"
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
                        />
                        {errors.name && <p className="mt-1 text-xs text-red-600">⚠ {errors.name}</p>}
                    </div>

                    <div className="sm:col-span-2">
                        <label className="mb-1 block text-sm font-medium text-slate-700">
                            Star Rating
                        </label>
                        <StarRating
                            value={form.starRating}
                            onChange={(v) => updateField("starRating", v)}
                        />
                        {errors.starRating && (
                            <p className="mt-1 text-xs text-red-600">⚠ {errors.starRating}</p>
                        )}
                    </div>
                </div>
            </section>

           
            <section className="mb-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-base font-semibold text-slate-900">Operating Hours</h2>

                <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">
                            Check-in
                        </label>
                        <input
                            type="time"
                            value={form.checkinTime}
                            onChange={(e) => updateField("checkinTime", e.target.value)}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
                        />
                        {errors.checkinTime && (
                            <p className="mt-1 text-xs text-red-600">⚠ {errors.checkinTime}</p>
                        )}
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">
                            Check-out
                        </label>
                        <input
                            type="time"
                            value={form.checkoutTime}
                            onChange={(e) => updateField("checkoutTime", e.target.value)}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
                        />
                        {errors.checkoutTime && (
                            <p className="mt-1 text-xs text-red-600">⚠ {errors.checkoutTime}</p>
                        )}
                    </div>
                </div>
            </section>

          
            <section className="mb-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-base font-semibold text-slate-900">
                    Contact Information
                </h2>

                <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">
                            Phone
                        </label>
                        <input
                            type="tel"
                            value={form.phone}
                            onChange={(e) => updateField("phone", e.target.value)}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
                        />
                        {errors.phone && <p className="mt-1 text-xs text-red-600">⚠ {errors.phone}</p>}
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">
                            Email
                        </label>
                        <input
                            type="email"
                            value={form.email}
                            onChange={(e) => updateField("email", e.target.value)}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
                        />
                        {errors.email && <p className="mt-1 text-xs text-red-600">⚠ {errors.email}</p>}
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

                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">
                            City
                        </label>
                        <input
                            type="text"
                            value={form.city}
                            onChange={(e) => updateField("city", e.target.value)}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
                        />
                        {errors.city && <p className="mt-1 text-xs text-red-600">⚠ {errors.city}</p>}
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">
                            Country
                        </label>
                        <input
                            type="text"
                            value={form.country}
                            onChange={(e) => updateField("country", e.target.value)}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
                        />
                        {errors.country && (
                            <p className="mt-1 text-xs text-red-600">⚠ {errors.country}</p>
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

export function HotelSettingsPage() {
    const { user } = useAuth();

    if (user?.role !== "HotelManager") {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
                <div className="text-4xl">🔒</div>
                <h1 className="mt-4 text-xl font-semibold text-slate-900">Access Denied</h1>
                <p className="mt-2 max-w-sm text-sm text-slate-500">
                    You don't have permission to access Hotel Settings.
                </p>
            </div>
        );
    }

    return <HotelSettings />;
}

export default HotelSettings;
