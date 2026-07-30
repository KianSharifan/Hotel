const BASE_URL = "http://localhost:5263/API/Finance";

export async function getRestaurantPayments() {

    const token = localStorage.getItem("token");
    const response = await fetch(
        `${BASE_URL}/RestaurantPayments`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            },
        }
    );

    if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
    }

    return await response.json();
}



export async function getHotelPayments() {

    const token = localStorage.getItem("token");
    const response = await fetch(
        `${BASE_URL}/HotelPayments`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            },
        }
    );

    if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
    }

    return await response.json();
}



export async function deletePayment(paymentId: number) {

    const token = localStorage.getItem("token");
    const response = await fetch(
        `${BASE_URL}/DeletePayment/${paymentId}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            },
        }
    );

    if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
    }

    return true;
}



export async function getAllInvoices() {

    const token = localStorage.getItem("token");
    const response = await fetch(
        `${BASE_URL}/AllInvoices`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            },
        }
    );

    if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
    }

    return await response.json();
}


export async function deleteInvoice(invoiceId: number) {

    const token = localStorage.getItem("token");
    const response = await fetch(
        `${BASE_URL}/DeleteInvoice/${invoiceId}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            },
        }
    );

    if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
    }

    return true;
}