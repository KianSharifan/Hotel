const API = "http://localhost:5263/API/Rooms/Reservation"

// export async function reserveRoom(data: any) {
//   const response = await fetch(API, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(data)
//   })

//   if (!response.ok)
//     throw new Error("Reservation failed")

//   return await response.json()
// }

export async function reserveRoom(data: any) {
  const response = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

  const text = await response.text()

  console.log("STATUS:", response.status)
  console.log("RESPONSE:", text)

  if (!response.ok)
    throw new Error(text)

  return text ? JSON.parse(text) : null
}