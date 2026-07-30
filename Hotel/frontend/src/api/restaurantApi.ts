const MENU_API = "http://localhost:5263/API/Restaurant/Menu"

export async function getMenu() {

    const token = localStorage.getItem("token")
    const response = await fetch(MENU_API, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })

    if (!response.ok)
        throw new Error("Could not load menu.")

    return await response.json()
}

export async function getCategories() {

    const token = localStorage.getItem("token")
    const response = await fetch("http://localhost:5263/API/Restaurant/Menu/Categories", {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    
    if (!response.ok)
        throw new Error("Failed to load categories.");

    return await response.json();

}


export async function createCategory(name: string) {

    const token = localStorage.getItem("token")
    const response = await fetch("http://localhost:5263/API/Restaurant/Menu/Categories", {

        method: "POST",

        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },

        body: JSON.stringify({
            name
        })

    });

    if (!response.ok)
        throw new Error("Failed to create category.");

}


export async function deleteCategory(name: string) {

    const token = localStorage.getItem("token")
    const response = await fetch("http://localhost:5263/API/Restaurant/Menu/Categories", {

        method: "DELETE",

        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },

        body: JSON.stringify({
            name
        })

    });

    if (!response.ok)
        throw new Error("Failed to delete category.");

}



export async function createMenuItem(
    category: string,
    item: {
        name: string;
        description: string;
        price: number;}
) {
    const token = localStorage.getItem("token")
    const response = await fetch(
        `http://localhost:5263/API/Restaurant/Menu/${category}/MenuItems`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(item)
        }
    );

    if (!response.ok) {
        const text = await response.text();
        console.log(text);
        throw new Error(text);
    }
}



export async function updateMenuItem(
    category: string,
    item: {
        name: string;
        description?: string;
        price?: number;
    }
) {
    const token = localStorage.getItem("token")
    const response = await fetch(
        `http://localhost:5263/API/Restaurant/Menu/${category}/MenuItems`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(item)
        }
    );

    if (!response.ok)
        throw new Error("Failed to update menu item.");
}

export async function deleteMenuItem(
    category: string,
    name: string
) {
    const token = localStorage.getItem("token")
    const response = await fetch(
        `http://localhost:5263/API/Restaurant/Menu/${category}/MenuItems`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({name})}
    );

    if (!response.ok)
        throw new Error("Failed to delete menu item.");
}





export async function getOrders() {
    const token = localStorage.getItem("token")
    const response = await fetch(
        "http://localhost:5263/API/Restaurant/Orders", {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })

    if (!response.ok)
        throw new Error("Failed to load orders.");

    return await response.json();
}




export async function getOrder(id: number) {
    const token = localStorage.getItem("token")
    const response = await fetch(
        `http://localhost:5263/API/Restaurant/Orders/${id}`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })

    if (!response.ok)
        throw new Error("Failed to load order.");

    return await response.json();
}




export async function getActiveOrders(): Promise<ActiveOrderResponse[]> {
    const token = localStorage.getItem("token")
    const response = await fetch(
        "http://localhost:5263/API/Restaurant/Orders/NotCompleted", {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    if (!response.ok)
        throw new Error("Failed to load current orders.");

    return await response.json();
}


export async function createOrder(order: {
    tableId: number;
    orderItems: {
        itemId: number;
        quantity: number;
    }[];
}) {
    
    const token = localStorage.getItem("token")
    const response = await fetch(
        "http://localhost:5263/API/Restaurant/Orders",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(order)
        }
    );

    if (!response.ok)
        throw new Error("Failed to create order.");

    return await response.json(); 
}


export async function deleteOrder(id: number) {

    const token = localStorage.getItem("token")
    const response = await fetch(
        `http://localhost:5263/API/Restaurant/Orders/${id}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    if (!response.ok)
        throw new Error("Failed to delete order.");
}


export async function updateOrder(
    orderId: number,
    dto: {
        status?: string;
        orderItems?: {
            itemId: number;
            quantity: number;
        }[];
    }
) {

    const token = localStorage.getItem("token")
    const response = await fetch(
        `http://localhost:5263/API/Restaurant/Orders/${orderId}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(dto)
        }
    );

    if (!response.ok)
        throw new Error("Failed to update order.");
}


interface ActiveOrderResponse {
    order: {
        id: number;
        tableId: number;
        status: string;
        createdAt: string;
    };

    orderItem: {
        itemId: number;
        quantity: number;
    };
}

