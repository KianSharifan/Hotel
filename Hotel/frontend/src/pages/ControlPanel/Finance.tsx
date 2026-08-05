import { deleteInvoice,getAllInvoices, deletePayment,getHotelPayments,getRestaurantPayments } from "../../api/financeApi";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext"


interface Invoice {
    id: number;
    guestId: number;
    reservationId: number;
    issueDate: string;
    subTotal: number;
    discount: number;
    tax: number;
    total: number;
    status: string;
}


interface Payment {
    id: number;
    invoiceId?: number | null;
    orderId?: number | null;
    amount: number;
    status?: string | null;
    paymentDate: string;
    transactionId?: string | null;
    paymentMethod?: string | null;
}


type Tab = "hotel payments" | "restaurant payments" | "all invoices";



export default function Finance() {
    
    const [tab, setTab] = useState<Tab>("hotel payments")
    const tabs : {key:Tab; label: string}[]=[
        {key:"hotel payments", label: "Hotel Payments"},
        {key:"restaurant payments", label: "Restaurant Payments"},
        {key:"all invoices", label: "All Anvoices"}
    ];


    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Finance</h1>

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

            {tab === "hotel payments" && <HotelTab />}
            {tab === "restaurant payments" && <RestaurantTab />}
            {tab === "all invoices" && <InvoicesTab />}
        </div>
    );
}




function HotelTab(){

    const [Hpayments, setHpayments] = useState<Payment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError]= useState<string| null>(null);
    const [deletingId, setDeletingId] = useState<number | null>(null);

    const { user, loading: authLoading  } = useAuth();

    useEffect(()=>{
        loadPayments();
    }, []);

    if (authLoading) {
        return null; 
    }
    if (user?.role !== "HotelManager" && user?.role !== "DirectorOfHR" && user?.role !== "DirectorOfFinance") {
    return (
            <div className="mx-auto mt-4 max-w-3xl rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
            You don't have permission to access this page.
            </div>
        );
    }

    async function loadPayments() {
        setLoading(true);
        setError(null);

        try{
            const data= await getHotelPayments();
            setHpayments(data);
        }
        catch(err){
            setError(err instanceof Error ? err.message : "Failed to load payments");
        }    
        finally{
            setLoading(false);
        }
    }



    async function handleDelete(paymentId:number) {
        if (!window.confirm("Delete this payment?")) return;
        setError(null);
        setDeletingId(paymentId);
        try{
            await deletePayment(paymentId);
            await loadPayments();
        }
        catch(err){
            setError(err instanceof Error ? err.message : "Failed to delete payment");
        }    
        finally{
            setDeletingId(null);
        }
    }

    return(
        <div>
            {error && (
                <div className="mb-4 rounded border border-red-400 bg-red-50 text-red-700 px-4 py-2 text-sm">
                    {error}
                </div>
            )}

            {loading ? (
                <p>Loading payments...</p>
            ) : Hpayments.length === 0 ? (
                <p className="text-gray-500 mb-6">No payments yet.</p>
            ) : (
                <table className="w-full border-collapse text-sm mb-6">
                    <thead>
                        <tr className="border-b bg-gray-100 text-left">
                            <th className="p-2">Payment ID</th>
                            <th className="p-2">Invoice ID</th>
                            <th className="p-2">Amount</th>
                            <th className="p-2">Payment Method</th>
                            <th className="p-2">Transaction ID</th>
                            <th className="p-2">Payment Date</th>
                            <th className="p-2">Status</th>
                            <th className="p-2">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {Hpayments.map((payment)=>{
                            return (
                                <tr key={payment.id} className="border-b">
                                    <td className="p-2">{payment.id}</td>

                                    <td className="p-2">
                                        {payment.invoiceId ?? "-"}
                                    </td>

                                    <td className="p-2">
                                        ${payment.amount}
                                    </td>

                                    <td className="p-2">
                                        {payment.paymentMethod ?? "-"}
                                    </td>

                                    <td className="p-2">
                                        {payment.transactionId ?? "-"}
                                    </td>

                                    <td className="p-2">
                                        {new Date(payment.paymentDate).toLocaleDateString()}
                                    </td>

                                    <td className="p-2">
                                        {payment.status ?? "-"}
                                    </td>

                                    <td className="p-2">
                                        <button
                                            onClick={() => handleDelete(payment.id)}
                                            disabled={deletingId === payment.id}
                                            className="bg-red-600 text-white px-2 py-1 rounded text-xs disabled:opacity-50"
                                        >
                                            {deletingId === payment.id
                                                ? "Deleting..."
                                                : "Delete"}
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
        </div>
    )
}


function RestaurantTab(){

    const [Rpayments, setRpayments] = useState<Payment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError]= useState<string| null>(null);

    async function loadPayments() {
        setLoading(true);
        setError(null);

        try{
            const data= await getRestaurantPayments();
            setRpayments(data);
        }
        catch(err){
            setError(err instanceof Error ? err.message : "Failed to load payments");
        }    
        finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        loadPayments();
    }, []);



    
    return(
        <div>
            {error && (
                <div className="mb-4 rounded border border-red-400 bg-red-50 text-red-700 px-4 py-2 text-sm">
                    {error}
                </div>
            )}

            {loading ? (
                <p>Loading payments...</p>
            ) : Rpayments.length === 0 ? (
                <p className="text-gray-500 mb-6">No payments yet.</p>
            ) : (
                <table className="w-full border-collapse text-sm mb-6">
                    <thead>
                        <tr className="border-b bg-gray-100 text-left">
                            <th className="p-2">Payment ID</th>
                            <th className="p-2">Invoice ID</th>
                            <th className="p-2">Amount</th>
                            <th className="p-2">Payment Method</th>
                            <th className="p-2">Transaction ID</th>
                            <th className="p-2">Payment Date</th>
                            <th className="p-2">Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {Rpayments.map((payment)=>{
                            return (
                                <tr key={payment.id} className="border-b">
                                    <td className="p-2">{payment.id}</td>

                                    <td className="p-2">
                                        {payment.orderId ?? "-"}
                                    </td>

                                    <td className="p-2">
                                        ${payment.amount}
                                    </td>

                                    <td className="p-2">
                                        {payment.paymentMethod ?? "-"}
                                    </td>

                                    <td className="p-2">
                                        {payment.transactionId ?? "-"}
                                    </td>

                                    <td className="p-2">
                                        {new Date(payment.paymentDate).toLocaleDateString()}
                                    </td>

                                    <td className="p-2">
                                        {payment.status ?? "-"}
                                    </td>

                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
        </div>
    )
}


function InvoicesTab(){

    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError]= useState<string| null>(null);
    const [deletingId, setDeletingId] = useState<number | null>(null);

    async function loadInvoices() {
        setLoading(true);
        setError(null);

        try{
            const data= await getAllInvoices();
            setInvoices(data);
        }
        catch(err){
            setError(err instanceof Error ? err.message : "Failed to load invoices");
        }    
        finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        loadInvoices();
    }, []);


    async function handleDelete(invoiceId:number) {
        if (!window.confirm("Delete this payment?")) return;
        setError(null);
        setDeletingId(invoiceId);
        try{
            await deleteInvoice(invoiceId);
            await loadInvoices();
        }
        catch(err){
            setError(err instanceof Error ? err.message : "Failed to delete invoice");
        }    
        finally{
            setDeletingId(null);
        }
    }


    return(
        <div>
            {error && (
                <div className="mb-4 rounded border border-red-400 bg-red-50 text-red-700 px-4 py-2 text-sm">
                    {error}
                </div>
            )}

            {loading ? (
                <p>Loading payments...</p>
            ) : invoices.length === 0 ? (
                <p className="text-gray-500 mb-6">No payments yet.</p>
            ) : (
                <table className="w-full border-collapse text-sm mb-6">
                    <thead>
                        <tr className="border-b bg-gray-100 text-left">
                            <th className="p-2">Invoice ID</th>
                            <th className="p-2">Guest ID</th>
                            <th className="p-2">Reservation ID</th>
                            <th className="p-2">Issue Date</th>
                            <th className="p-2">Subtotal</th>
                            <th className="p-2">Discount</th>
                            <th className="p-2">Tax</th>
                            <th className="p-2">Total</th>
                            <th className="p-2">Status</th>
                            <th className="p-2">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {invoices.map((invoice)=>{
                            return (
                                <tr key={invoice.id} className="border-b">
                                    <td className="p-2">{invoice.id}</td>

                                    <td className="p-2">
                                        {invoice.guestId}
                                    </td>

                                    <td className="p-2">
                                        {invoice.reservationId}
                                    </td>

                                    <td className="p-2">
                                        {new Date(invoice.issueDate).toLocaleDateString()}
                                    </td>

                                    <td className="p-2">
                                        ${invoice.subTotal}
                                    </td>

                                    <td className="p-2">
                                        {invoice.discount}%
                                    </td>

                                    <td className="p-2">
                                        {invoice.tax}%
                                    </td>

                                    <td className="p-2">
                                        ${invoice.total}
                                    </td>

                                    <td className="p-2">
                                        {invoice.status}
                                    </td>

                                    <td className="p-2">
                                        <button
                                            onClick={() => handleDelete(invoice.id)}
                                            disabled={deletingId === invoice.id}
                                            className="bg-red-600 text-white px-2 py-1 rounded text-xs disabled:opacity-50"
                                        >
                                            {deletingId === invoice.id
                                                ? "Deleting..."
                                                : "Delete"}
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
        </div>
    )
}