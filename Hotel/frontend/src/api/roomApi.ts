const API = "https://localhost:5001/API/RoomTypes"

export async function getAvailableRooms(
  adults: number,
  children: number,
  checkIn: string,
  checkOut: string
) {
  const response = await fetch(
    `${API}/AvailableRoomTypes?NumberOfAdults=${adults}&NumberOfKids=${children}&CheckIn=${checkIn}&CheckOut=${checkOut}`
  )

  if (!response.ok)
    throw new Error("Failed to load rooms")

  return await response.json()
}