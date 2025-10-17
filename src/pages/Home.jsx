"use client"

import { useState, useEffect } from "react"
import RaffleBoard from "../components/RaffleBoard"
import TicketModal from "../components/TicketModal"
import { getTickets } from "../utils/api"

export default function Home() {
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [tickets, setTickets] = useState([]) // 🧩 ahora guardamos todos los tickets
  const [stats, setStats] = useState({ total: 0, available: 0, pending: 0, sold: 0 })

  const updateTickets = async () => {
    const data = await getTickets();
    setTickets(data);
    setStats({
      total: data.length,
      available: data.filter(t => t.status === "available").length,
      pending: data.filter(t => t.status === "pending").length,
      sold: data.filter(t => t.status === "sold").length,
    });
  }

  useEffect(() => {
    updateTickets()
  }, [])

  return (
    <div className="container">
      <div className="header">
        <h1>🎉 Rifa Oficial 2024</h1>
        <p>Selecciona tu número de la suerte del 000 al 999</p>
      </div>

      <div className="stats">
        <div className="stat-card">
          <h3>Total</h3>
          <p>{stats.total}</p>
        </div>
        <div className="stat-card available">
          <h3>Disponibles</h3>
          <p>{stats.available}</p>
        </div>
        <div className="stat-card pending">
          <h3>Pendientes</h3>
          <p>{stats.pending}</p>
        </div>
        <div className="stat-card sold">
          <h3>Vendidas</h3>
          <p>{stats.sold}</p>
        </div>
      </div>

      {/* 🔁 Pasamos los tickets actuales al tablero */}
      <RaffleBoard tickets={tickets} onTicketClick={setSelectedTicket} />

      {selectedTicket && (
        <TicketModal
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
          onUpdate={updateTickets} // 👈 callback para actualizar al reservar
        />
      )}
    </div>
  )
}