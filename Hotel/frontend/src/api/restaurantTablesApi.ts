const BASE_URL = "http://localhost:5263/API/Restaurant/Tables";

function getToken() {
    return localStorage.getItem("token");
}


export async function getRestaurantTable(id: number) {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return await response.json();
}



export async function createRestaurantTable(data: {
    id:number
    capacity: number
}) {
    const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return await response.json();
}



export async function updateRestaurantTable(
    id: number,
    data: {
        id?: number;
        capacity?: number;
        specialReq?: string;
    }
) {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return true;
}



export async function deleteRestaurantTable(id: number) {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return true;
}



export async function getRestaurantReservations() {
    const response = await fetch(`${BASE_URL}/Reservations`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return await response.json();
}



export async function getRestaurantReservation(id: number) {
    const response = await fetch(`${BASE_URL}/Reservations/${id}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return await response.json();
}