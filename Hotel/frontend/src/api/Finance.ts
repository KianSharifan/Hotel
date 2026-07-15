const BASE_URL = "http://localhost:5263/API/Finance";

export async function getRestaurantPayments() {
    const response = await fetch(
        `${BASE_URL}/RestaurantPayments`,
        {
            method: "GET",
        }
    );

    if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
    }

    return await response.json();
}



export async function getHotelPayments() {
    const response = await fetch(
        `${BASE_URL}/HotelPayments`,
        {
            method: "GET",
        }
    );

    if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
    }

    return await response.json();
}



export async function deletePayment(paymentId: number) {
    const response = await fetch(
        `${BASE_URL}/DeletePayment/${paymentId}`,
        {
            method: "DELETE",
        }
    );

    if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
    }

    return true;
}



export async function getAllInvoices() {
    const response = await fetch(
        `${BASE_URL}/AllInvoices`,
        {
            method: "GET",
        }
    );

    if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
    }

    return await response.json();
}


export async function deleteInvoice(invoiceId: number) {
    const response = await fetch(
        `${BASE_URL}/DeleteInvoice/${invoiceId}`,
        {
            method: "DELETE",
        }
    );

    if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
    }

    return true;
}