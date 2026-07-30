const BASE_URL = "http://localhost:5263/API/HouseKeeping";

export async function getAllHouseKeepingTasks() {

    const token = localStorage.getItem("token");
    const response = await fetch(BASE_URL, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return await response.json();
}


export async function getHouseKeeperTasks(userName: string) {

    const token = localStorage.getItem("token");
    const response = await fetch(
        `${BASE_URL}/Employee/${encodeURIComponent(userName)}`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return await response.json();
}


export async function createHouseKeepingTask(data: {
    roomId: number;
    scheduledDate: string;
    notes?: string;
}) {

    const token = localStorage.getItem("token");
    const response = await fetch(
        BASE_URL,
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


export async function updateHouseKeepingTask(
    id: number,
    data: {
        roomId?: number;
        scheduledDate?: string;
        employeeId?: number;
        notes?: string;
        status?: boolean;
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


export async function deleteHouseKeepingTask(id: number) {

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