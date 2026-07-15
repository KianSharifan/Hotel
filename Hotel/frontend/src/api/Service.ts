const BASE_URL = "http://localhost:5263/API/Service";

export async function getAllServices() {
  const res = await fetch(BASE_URL);

  if (!res.ok)
    throw new Error(await res.text());

  return res.json();
}


export async function createService(dto: {
  name: string;
  description?: string;
  price: number;
}) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dto),
  });

  if (!res.ok)
    throw new Error(await res.text());
}



export async function updateService(
  id: number,
  dto: {
    name?: string;
    description?: string;
    price?: number;
  }
) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dto),
  });

  if (!res.ok)
    throw new Error(await res.text());
}



export async function deleteService(id: number) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok)
    throw new Error(await res.text());
}



export async function getAllServiceUsages() {
  const res = await fetch(`${BASE_URL}/AllServiceUsages`);

  if (!res.ok)
    throw new Error(await res.text());

  return res.json();
}



export async function getGuestServiceUsages(username: string) {
  const res = await fetch(`${BASE_URL}/GuestUsed/${username}`);

  if (!res.ok)
    throw new Error(await res.text());

  return res.json();
}



export async function getUsersOfService(serviceName: string) {
  const res = await fetch(
    `${BASE_URL}/ServiceUsers/${encodeURIComponent(serviceName)}`
  );

  if (!res.ok)
    throw new Error(await res.text());

  return res.json();
}



export async function createGuestServiceUsage(dto: {
  userName: string;
  serviceName: string;
  roomNumber: number;
  quantity: number;
  useDate: string;
}) {
  const res = await fetch(`${BASE_URL}/GuestUseService`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dto),
  });

  if (!res.ok)
    throw new Error(await res.text());
}



export async function updateGuestServiceUsage(
  id: number,
  dto: {
    userName?: string;
    serviceName?: string;
    roomNumber?: number;
    quantity?: number;
    useDate?: string;
  }
) {
  const res = await fetch(`${BASE_URL}/GuestUseService/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dto),
  });

  if (!res.ok)
    throw new Error(await res.text());
}



export async function deleteGuestServiceUsage(id: number) {
  const res = await fetch(`${BASE_URL}/GuestUseService/${id}`, {
    method: "DELETE",
  });

  if (!res.ok)
    throw new Error(await res.text());
}