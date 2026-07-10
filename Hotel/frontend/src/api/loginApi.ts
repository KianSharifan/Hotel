export async function getUsers() {
    const response = await fetch(
        "http://localhost:5263/API/Users"
    );

    if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "Failed to load users.");
    }

    return await response.json();
}

export async function createGuest(guest: {
    username: string;
    email: string;
    password: string;
}) {
    const response = await fetch(
        "http://localhost:5263/API/Users/CreateGuest",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(guest)
        }
    );

    if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "Failed to create guest.");
    }

    return await response.json();
}

export async function deleteUser(username: string) {

    const response = await fetch(
        `http://localhost:5263/API/Users/Delete/${username}`,
        {
            method: "DELETE"
        }
    );

    if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "Failed to delete user.");
    }

    return;
}

export async function createEmployee(employee: {
    userName: string;
    email: string;
    password: string;
    salary: number;
    positionId: number;
    departmentId: number;
    roleId: number;
    birthDate: string;
}) {

    const response = await fetch(
        "http://localhost:5263/API/Users/CreateEmployee",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(employee)
        }
    );

    if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "Failed to create employee.");
    }

    // Controller currently returns Ok() with no JSON body.
    return;
}


export async function login(credentials: {
    username: string;
    password: string;
}) {

    const response = await fetch(
        "http://localhost:5263/API/Login",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials)
        }
    );

    if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
    }

    return await response.json();
}