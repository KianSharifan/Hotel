const BASE_URL = "http://localhost:5263/API/HR";


export async function getEmployeeStats(employeeId: number) {

    const token = localStorage.getItem("token");
    const response = await fetch(
        `${BASE_URL}/EmployeeStats/${employeeId}`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return await response.json();
}


export async function updateEmployeeSalaryPosition(
    employeeId: number,
    data: {
        position?: string;
        salary?: number;
    }
) {

    const token = localStorage.getItem("token");
    const response = await fetch(
        `${BASE_URL}/EmployeeSalaryPosition/${employeeId}`,
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


export async function getRoles() {

    const token = localStorage.getItem("token");
    const response = await fetch(
        `${BASE_URL}/Roles`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return await response.json();
}


export async function createRole(data: {
    name: string;
}) {

    const token = localStorage.getItem("token");
    const response = await fetch(
        `${BASE_URL}/Roles`,
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


export async function updateRole(
    roleId: number,
    data: {
        name: string;
    }
) {

    const token = localStorage.getItem("token");
    const response = await fetch(
        `${BASE_URL}/Roles/${roleId}`,
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


export async function deleteRole(roleId: number) {

    const token = localStorage.getItem("token");
    const response = await fetch(
        `${BASE_URL}/Roles/${roleId}`,
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



export async function getAllShifts() {

    const token = localStorage.getItem("token");
    const response = await fetch(
        `${BASE_URL}/Shifts`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    if (!response.ok) {
        throw new Error(await response.text());
    }

    return await response.json();
}


export async function createShift(data: {
    day: string;
    start: string;
    end: string;
}) {

    const token = localStorage.getItem("token");
    const response = await fetch(
        `${BASE_URL}/Shifts`,
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


export async function deleteShift(shiftId: number) {

    const token = localStorage.getItem("token");
    const response = await fetch(
        `${BASE_URL}/Shifts/${shiftId}`,
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



export async function getAllShiftAssignments() {

    const token = localStorage.getItem("token");
    const response = await fetch(
        `${BASE_URL}/ShiftsAssignments`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return await response.json();
}


export async function createShiftAssignment(data: {
    employeeId: number;
    shiftId: number;
}) {

    const token = localStorage.getItem("token");
    const response = await fetch(
        `${BASE_URL}/ShiftsAssignments`,
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


export async function deleteShiftAssignment(data: {
    employeeId: number;
    shiftId: number;
}) {

    const token = localStorage.getItem("token");
    const params = new URLSearchParams({
        EmployeeId: String(data.employeeId),
        ShiftId: String(data.shiftId),
    });
    const response = await fetch(
        `${BASE_URL}/ShiftsAssignments?${params.toString()}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return true;
}





export type Position = {
    id: number;
    title: string;
    baseSalary: number;
};

export async function getPositions(): Promise<Position[]> {

    const token = localStorage.getItem("token");
    const response = await fetch(
        `${BASE_URL}/Positions`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return await response.json();
}


export async function createPositions(data: {
    title: string;
    baseSalary: number;
}) {

    const token = localStorage.getItem("token");
    const response = await fetch(
        `${BASE_URL}/Positions`,
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


export async function updatePositions(
    positionId: number,
    data: {
        title: string;
        baseSalary: number;
    }
) {

    const token = localStorage.getItem("token");
    const response = await fetch(
        `${BASE_URL}/Positions/${positionId}`,
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


export async function deletePositions(positionId: number) {

    const token = localStorage.getItem("token");
    const response = await fetch(
        `${BASE_URL}/Positions/${positionId}`,
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
