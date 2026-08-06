const BASE_URL = "http://localhost:5263/API/Users";

function getToken() {
    return localStorage.getItem("token");
}

export interface AdminUser {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    roleId: number;
    phone: string;
    username: string;
    createdAt: string;
}

export async function getAllUsers(): Promise<AdminUser[]> {
    const token = getToken();
    const response = await fetch(BASE_URL, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return await response.json();
}


export async function getUser(userName: string): Promise<AdminUser> {
    const token = getToken();
    const response = await fetch(`${BASE_URL}/${encodeURIComponent(userName)}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return await response.json();
}


export async function deleteUser(userName: string): Promise<boolean> {
    const token = getToken();
    const response = await fetch(`${BASE_URL}/${encodeURIComponent(userName)}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return true;
}
