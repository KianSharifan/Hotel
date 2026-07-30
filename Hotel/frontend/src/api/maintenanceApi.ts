const BASE_URL = "http://localhost:5263/API/Maintenance";

export async function getMaintenanceRequests() {

    const token = localStorage.getItem("token");
    const response = await fetch(
        `${BASE_URL}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return await response.json();
}

export async function getEngineerMaintenance(userName: string) {

    const token = localStorage.getItem("token");
    const response = await fetch(
        `${BASE_URL}/${userName}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return await response.json();
}

export async function createMaintenanceRequest(data: {
    roomId: number;
    reportedEmployeeId?: number;
    description?: string;
    status?: string;
    priority?: string;
    }) {

    const token = localStorage.getItem("token");
    const response = await fetch(
        `${BASE_URL}`,
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
        throw new Error(await response.text());
    }

    return true;
}


export async function updateMaintenanceRequest(
    id: number,
    data: {
        roomId?: number;
        reportedEmployeeId?: number;
        description?: string;
        status?: string;
        priority?: string;
    }
) {

    const token = localStorage.getItem("token");
    const response = await fetch(
        `${BASE_URL}/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data)
        }
    );

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return true;
}


export async function deleteMaintenanceRequest(id: number) {

    const token = localStorage.getItem("token");
    const response = await fetch(
        `${BASE_URL}/${id}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            },
        }
    );

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return true;
}


