const BASE_URL = "http://localhost:5263/API/Services";


export async function getAllServices() {
  const token = localStorage.getItem("token");

  const res = await fetch(BASE_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error(await res.text());

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
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(dto),
  });

  if (!res.ok) throw new Error(await res.text());

  return res.json();
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
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(dto),
  });

  if (!res.ok) throw new Error(await res.text());

  return res.json();
}


export async function deleteService(id: number) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error(await res.text());
}


export async function getAllServiceUsages() {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/Usages`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error(await res.text());

  return res.json();
}


export async function getGuestServiceUsages(userName: string) {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `${BASE_URL}/GuestUsed/${encodeURIComponent(userName)}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) throw new Error(await res.text());

  return res.json();
}


export async function getUsersOfService(serviceName: string) {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `${BASE_URL}/Users/${encodeURIComponent(serviceName.toLowerCase())}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) throw new Error(await res.text());

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

  const res = await fetch(`${BASE_URL}/Usages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(dto),
  });

  if (!res.ok) throw new Error(await res.text());

  return res.json();
}


export async function updateGuestServiceUsage(
  id: number,
  dto: {
    quantity?: number;
    useDate?: string;
  }
) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/Usages/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(dto),
  });

  if (!res.ok) throw new Error(await res.text());

  return res.json();
}


export async function deleteGuestServiceUsage(id: number) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/Usages/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error(await res.text());
}