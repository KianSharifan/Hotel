const BASE_URL = "http://localhost:5263/API/Maintenance";

export async function getMaintenanceRequests() {
    const response = await fetch(
        `${BASE_URL}`,
        {
            method: "GET"
        }
    );

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return await response.json();
}

export async function getEngineerMaintenance(userName: string) {
    const response = await fetch(
        `${BASE_URL}/${userName}`,
        {
            method: "GET"
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
    const response = await fetch(
        `${BASE_URL}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
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
    const response = await fetch(
        `${BASE_URL}/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
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
    const response = await fetch(
        `${BASE_URL}/${id}`,
        {
            method: "DELETE"
        }
    );

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return true;
}


