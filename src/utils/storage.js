// const STORAGE_KEY = "raffle_tickets"

// export const getTickets = () => {
//   const data = localStorage.getItem(STORAGE_KEY)
//   if (!data) {
//     // Inicializar todos los tickets como disponibles
//     const tickets = {}
//     for (let i = 0; i <= 999; i++) {
//       tickets[i.toString().padStart(3, "0")] = {
//         number: i.toString().padStart(3, "0"),
//         status: "available",
//         name: null,
//         phone: null,
//         timestamp: null,
//       }
//     }
//     console.log(tickets);
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets))
//     return tickets
//   }
//   return JSON.parse(data)
// }

// export const saveTickets = (tickets) => {
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets))
//   window.dispatchEvent(new Event("storage"))
// }

// export const reserveTicket = (number, name, phone) => {
//   const tickets = getTickets()
//   tickets[number] = {
//     ...tickets[number],
//     status: "pending",
//     name,
//     phone,
//     timestamp: new Date().toISOString(),
//   }
//   saveTickets(tickets)
// }

// export const confirmTicket = (number) => {
//   const tickets = getTickets()
//   tickets[number] = {
//     ...tickets[number],
//     status: "sold",
//   }
//   saveTickets(tickets)
// }

// export const rejectTicket = (number) => {
//   const tickets = getTickets()
//   tickets[number] = {
//     ...tickets[number],
//     status: "available",
//     name: null,
//     phone: null,
//     timestamp: null,
//   }
//   saveTickets(tickets)
// }

// export const getStats = () => {
//   const tickets = getTickets()
//   const values = Object.values(tickets)
//   return {
//     total: 1000,
//     available: values.filter((t) => t.status === "available").length,
//     pending: values.filter((t) => t.status === "pending").length,
//     sold: values.filter((t) => t.status === "sold").length,
//   }
// }

// export const getPendingRequests = () => {
//   const tickets = getTickets()
//   return Object.values(tickets)
//     .filter((t) => t.status === "pending")
//     .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
// }
