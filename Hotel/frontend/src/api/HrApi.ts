const BASE_URL = "http://localhost:5263/API/HR";


export async function getEmployeeStats(employeeId: number) {

    const response = await fetch(
        `${BASE_URL}/EmployeeStats/${employeeId}`
    );

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

    const response = await fetch(
        `${BASE_URL}/EmployeeSalaryPosition/${employeeId}`,
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


export async function getRoles() {

    const response = await fetch(
        `${BASE_URL}/Roles`
    );

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return await response.json();
}


export async function createRole(data: {
    name: string;
}) {

    const response = await fetch(
        `${BASE_URL}/Roles`,
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


export async function updateRole(
    roleId: number,
    data: {
        name: string;
    }
) {

    const response = await fetch(
        `${BASE_URL}/Roles/${roleId}`,
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


export async function deleteRole(roleId: number) {

    const response = await fetch(
        `${BASE_URL}/Roles/${roleId}`,
        {
            method: "DELETE"
        }
    );

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return true;
}



export async function getAllShifts() {

    const response = await fetch(
        `${BASE_URL}/AllShifts`
    );

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

    const response = await fetch(
        `${BASE_URL}/Shifts`,
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


export async function deleteShift(shiftId: number) {

    const response = await fetch(
        `${BASE_URL}/Shifts/${shiftId}`,
        {
            method: "DELETE"
        }
    );

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return true;
}



export async function getAllShiftAssignments() {

    const response = await fetch(
        `${BASE_URL}/ShiftsAssignments`
    );

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return await response.json();
}


export async function createShiftAssignment(data: {
    employeeId: number;
    shiftId: number;
}) {

    const response = await fetch(
        `${BASE_URL}/ShiftsAssignments`,
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


export async function deleteShiftAssignment(data: {
    employeeId: number;
    shiftId: number;
}) {

    const response = await fetch(
        `${BASE_URL}/ShiftsAssignments`,
        {
            method: "DELETE",
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