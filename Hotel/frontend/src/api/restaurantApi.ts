const MENU_API = "http://localhost:5263/API/Restaurant/Menu"

export async function getMenu() {

    const response = await fetch(MENU_API)

    if (!response.ok)
        throw new Error("Could not load menu.")

    return await response.json()
}