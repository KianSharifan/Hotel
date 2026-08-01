const API = "http://localhost:5263/API/RoomTypes"

export async function getAvailableRooms(
  adults: number,
  children: number,
  checkIn: string,
  checkOut: string,
) {
  const response = await fetch(
    `${API}/AvailableRoomTypes?NumberOfAdults=${adults}&NumberOfKids=${children}&CheckIn=${checkIn}&CheckOut=${checkOut}`
  )

  if (!response.ok)
    throw new Error("Failed to load rooms")

  return await response.json()
}



const BASE_URL = "http://localhost:5263/API";

function authHeaders() {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}



export async function getRooms() {
  const res = await fetch(`${BASE_URL}/Rooms`, {
    headers: authHeaders(),
  });

  if (!res.ok) throw new Error(await res.text());

  return await res.json();
}

export async function getRoom(id: number) {
  const res = await fetch(`${BASE_URL}/Rooms/${id}`, {
    headers: authHeaders(),
  });

  if (!res.ok) throw new Error(await res.text());

  return await res.json();
}

export async function createRoom(room: any) {
  const res = await fetch(`${BASE_URL}/Rooms`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(room),
  });

  if (!res.ok) throw new Error(await res.text());

  return await res.json();
}

export async function updateRoom(id: number, room: any) {
  const res = await fetch(`${BASE_URL}/Rooms/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(room),
  });

  if (!res.ok) throw new Error(await res.text());

  return await res.json();
}

export async function deleteRoom(roomNumber: number) {
  const res = await fetch(`${BASE_URL}/Rooms/${roomNumber}`, {
    method: "DELETE",
    headers: authHeaders(),
  });

  if (!res.ok) throw new Error(await res.text());
}



export async function getRoomTypes() {
  const res = await fetch(`${BASE_URL}/RoomTypes`);

  if (!res.ok) throw new Error(await res.text());

  return await res.json();
}

export async function getRoomType(id: number) {
  const res = await fetch(`${BASE_URL}/RoomTypes/${id}`, {
    headers: authHeaders(),
  });

  if (!res.ok) throw new Error(await res.text());

  return await res.json();
}

export async function createRoomType(roomType: any) {
  const res = await fetch(`${BASE_URL}/RoomTypes`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(roomType),
  });

  if (!res.ok) throw new Error(await res.text());

  return await res.json();
}

export async function updateRoomType(id: number, roomType: any) {
  const res = await fetch(`${BASE_URL}/RoomTypes/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(roomType),
  });

  if (!res.ok) throw new Error(await res.text());

  return await res.json();
}

export async function deleteRoomType(id: number) {
  const res = await fetch(`${BASE_URL}/RoomTypes/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });

  if (!res.ok) throw new Error(await res.text());
}



export async function getAmenities() {
  const res = await fetch(`${BASE_URL}/RoomTypes/Amenities`);

  if (!res.ok) throw new Error(await res.text());

  return await res.json();
}

export async function getAmenity(name: string) {
  const res = await fetch(
    `${BASE_URL}/RoomTypes/Amenities/${encodeURIComponent(name)}`,
    {
      headers: authHeaders(),
    }
  );

  if (!res.ok) throw new Error(await res.text());

  return await res.json();
}

export async function createAmenity(name: string) {
  const res = await fetch(`${BASE_URL}/RoomTypes/Amenities`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ name }),
  });

  if (!res.ok) throw new Error(await res.text());

  return await res.json();
}

export async function updateAmenity(id: number, name: string) {
  const res = await fetch(`${BASE_URL}/RoomTypes/Amenities/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify({ name }),
  });

  if (!res.ok) throw new Error(await res.text());

  return await res.json();
}

export async function deleteAmenity(id: number) {
  const res = await fetch(`${BASE_URL}/RoomTypes/Amenities/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });

  if (!res.ok) throw new Error(await res.text());
}



export async function addRoomAmenity(
  roomTypeId: number,
  amenityId: number
) {
  const res = await fetch(`${BASE_URL}/RoomTypes/RoomAmenity`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({
      roomTypeId,
      amenityId,
    }),
  });

  if (!res.ok) throw new Error(await res.text());

  return await res.json();
}

export async function deleteRoomAmenity(
  roomTypeId: number,
  amenityId: number
) {
  const res = await fetch(`${BASE_URL}/RoomTypes/RoomAmenity`, {
    method: "DELETE",
    headers: authHeaders(),
    body: JSON.stringify({
      roomTypeId,
      amenityId,
    }),
  });

  if (!res.ok) throw new Error(await res.text());
}