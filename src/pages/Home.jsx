"use client"

import { useState, useEffect } from "react"
import RaffleBoard from "../components/RaffleBoard"
import TicketModal from "../components/TicketModal"
import { getStats } from "../utils/storage"

export default function Home() {
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [stats, setStats] = useState({ total: 1000, available: 1000, pending: 0, sold: 0 })

  useEffect(() => {
    const updateStats = () => {
      setStats(getStats())
    }

    updateStats()
    window.addEventListener("storage", updateStats)

    return () => {
      window.removeEventListener("storage", updateStats)
    }
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

      <RaffleBoard onTicketClick={setSelectedTicket} />

      {selectedTicket && <TicketModal ticket={selectedTicket} onClose={() => setSelectedTicket(null)} />}
    </div>
  )
}