export async function getUsers() {

    const token = localStorage.getItem("token");
    const response = await fetch(
        "http://localhost:5263/API/Users",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
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
        "http://localhost:5263/API/Users/Guests",
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

    return await response.text();
}

export async function deleteUser(username: string) {
    
    const token = localStorage.getItem("token");
    const response = await fetch(
        `http://localhost:5263/API/Users/${username}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
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
    position: string;
    departmentName: string;
    roleId: number;
    birthDate: string;
}) {
    const token = localStorage.getItem("token");

    const response = await fetch(
        "http://localhost:5263/API/Users/Employees",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(employee)
        }
    );

    if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "Failed to create employee.");
    }

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
        throw new Error(error || "Login failed.");
    }

    return await response.json();
}