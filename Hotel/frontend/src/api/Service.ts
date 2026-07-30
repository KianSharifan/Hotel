const BASE_URL = "http://localhost:5263/API/Service";

export async function getAllServices() {

  const token = localStorage.getItem("token");
  const res = await fetch(BASE_URL, {
        headers:{
          Authorization: `Bearer ${token}`
        }
    })

  if (!res.ok)
    throw new Error(await res.text());

  return res.json();
}


export async function createService(dto: {
  name: string;
  description?: string;
  price: number;
}) {

  const token = localStorage.getItem("token");
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
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

  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(dto),
  });

  if (!res.ok)
    throw new Error(await res.text());
}



export async function deleteService(id: number) {

  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
        headers:{
          Authorization: `Bearer ${token}`
        }
  });

  if (!res.ok)
    throw new Error(await res.text());
}



export async function getAllServiceUsages() {

  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/AllServiceUsages`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })

  if (!res.ok)
    throw new Error(await res.text());

  return res.json();
}



export async function getGuestServiceUsages(username: string) {

  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/GuestUsed/${username}`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })

  if (!res.ok)
    throw new Error(await res.text());

  return res.json();
}



export async function getUsersOfService(serviceName: string) {

  const token = localStorage.getItem("token");
  const res = await fetch(
    `${BASE_URL}/ServiceUsers/${encodeURIComponent(serviceName)}`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })

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

  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/GuestUseService`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
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

  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/GuestUseService/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(dto),
  });

  if (!res.ok)
    throw new Error(await res.text());
}



export async function deleteGuestServiceUsage(id: number) {

  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/GuestUseService/${id}`, {
    method: "DELETE",
        headers:{
          Authorization: `Bearer ${token}`
        }
  });

  if (!res.ok)
    throw new Error(await res.text());
}