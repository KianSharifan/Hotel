const BASE_URL = "http://localhost:5263/API/FrontDeskManager";

export async function getReservations() {

    const token = localStorage.getItem("token");
    const response = await fetch(
        `${BASE_URL}/Reservations`,
        {
            method: "GET",
            headers:{
                Authorization: `Bearer ${token}`
            }
        }
    );

    if (!response.ok) {
        throw new Error("Failed to load reservations.");
    }

    return await response.json();
}


export async function checkIn(data: {
    reservationDate: string;
    userName: string;
    nationality: string;
    passportNumber: string;
    firstName: string;
    lastName: string;
}) {

    const token = localStorage.getItem("token");
    const response = await fetch(
        `${BASE_URL}/CheckIn`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data)
        }
    );

    if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
    }

    return await response.json();
}



export async function checkOut(data: {
    reservationDate: string;
    roomNumber: number;
    discount: number;
    tax: number;
}) {

    const token = localStorage.getItem("token");
    const response = await fetch(
        `${BASE_URL}/Checkout`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data)
        }
    );

    if (!response.ok) {
        console.log("STATUS:", response.status);

        const text = await response.text();
        console.log("BODY:", text);

        throw new Error(text);
    }

    return await response.json();
}



export async function payInvoice(
    invoiceId: number,
    data: {
        paymentMethod: string;
        transactionId: string;
    }
) {

    const token = localStorage.getItem("token");
    const response = await fetch(
        `${BASE_URL}/Payment/${invoiceId}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data)
        }
    );

    if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
    }

    return true;
}