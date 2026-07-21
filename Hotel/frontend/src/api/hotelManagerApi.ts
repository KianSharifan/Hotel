// const BASE_URL = "http://localhost:5263/API";

// export interface Hotel {
//     name: string;
//     starRating: number;
//     checkinTime: string;
//     checkoutTime: string;
//     email: string;
//     phone: string;
//     country: string;
//     city: string;
//     address: string;
// }

// export interface HotelDto {
//     name?: string;
//     starRating?: number;
//     checkinTime?: string;
//     checkoutTime?: string;
//     email?: string;
//     phone?: string;
//     country?: string;
//     city?: string;
//     address?: string;
// }

// export interface Department {
//     id: number;
//     name: string;
// }

// export interface DepartmentDto {
//     name: string;
// }


// export async function getHotel(): Promise<Hotel> {
//     const response = await fetch(BASE_URL);

//     if (!response.ok) {
//         const error = await response.text();
//         throw new Error(error || "Failed to load hotel.");
//     }

//     return await response.json();
// }



// export async function updateHotel(dto: HotelDto) {
//     const token = localStorage.getItem("token");

//     const response = await fetch(BASE_URL, {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify(dto)
//     });

//     if (!response.ok) {
//         const error = await response.text();
//         throw new Error(error || "Failed to update hotel.");
//     }
// }



// export async function getDepartments(): Promise<Department[]> {
//     const token = localStorage.getItem("token");

//     const response = await fetch(`${BASE_URL}/Departments`, {
//         headers: {
//             Authorization: `Bearer ${token}`
//         }
//     });

//     if (!response.ok) {
//         const error = await response.text();
//         throw new Error(error || "Failed to load departments.");
//     }

//     return await response.json();
// }



// export async function createDepartment(dto: DepartmentDto) {
//     const token = localStorage.getItem("token");

//     const response = await fetch(`${BASE_URL}/Departments`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify(dto)
//     });

//     if (!response.ok) {
//         const error = await response.text();
//         throw new Error(error || "Failed to create department.");
//     }

//     return await response.json();
// }



// export async function updateDepartment(
//     id: number,
//     dto: DepartmentDto
// ) {
//     const token = localStorage.getItem("token");

//     const response = await fetch(`${BASE_URL}/Departments/${id}`, {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify(dto)
//     });

//     if (!response.ok) {
//         const error = await response.text();
//         throw new Error(error || "Failed to update department.");
//     }
// }



// export async function deleteDepartment(id: number) {
//     const token = localStorage.getItem("token");

//     const response = await fetch(`${BASE_URL}/Departments/${id}`, {
//         method: "DELETE",
//         headers: {
//             Authorization: `Bearer ${token}`
//         }
//     });

//     if (!response.ok) {
//         const error = await response.text();
//         throw new Error(error || "Failed to delete department.");
//     }
// }


const BASE_URL = "http://localhost:5263/API";

export interface Hotel {
    name: string;
    starRating: number;
    checkinTime: string;
    checkoutTime: string;
    email: string;
    phone: string;
    country: string;
    city: string;
    address: string;
}

export interface HotelDto {
    name?: string;
    starRating?: number;
    checkinTime?: string;
    checkoutTime?: string;
    email?: string;
    phone?: string;
    country?: string;
    city?: string;
    address?: string;
}

export interface Department {
    id: number;
    name: string;
}

export interface DepartmentDto {
    name: string;
}


export async function getHotel(): Promise<Hotel> {
    const response = await fetch(BASE_URL);

    if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "Failed to load hotel.");
    }

    return await response.json();
}



export async function updateHotel(dto: HotelDto) {
    const token = localStorage.getItem("token");

    const response = await fetch(BASE_URL, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(dto)
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "Failed to update hotel.");
    }
}



export async function getDepartments(): Promise<Department[]> {
    const token = localStorage.getItem("token");

    const response = await fetch(`${BASE_URL}/Departments`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "Failed to load departments.");
    }

    return await response.json();
}



export async function createDepartment(dto: DepartmentDto): Promise<Department> {
    const token = localStorage.getItem("token");

    const response = await fetch(`${BASE_URL}/Departments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(dto)
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "Failed to create department.");
    }

    return await response.json();
}



export async function updateDepartment(
    id: number,
    dto: DepartmentDto
) {
    const token = localStorage.getItem("token");

    const response = await fetch(`${BASE_URL}/Departments/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(dto)
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "Failed to update department.");
    }
}



export async function deleteDepartment(id: number) {
    const token = localStorage.getItem("token");

    const response = await fetch(`${BASE_URL}/Departments/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "Failed to delete department.");
    }
}
