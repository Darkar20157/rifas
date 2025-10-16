"use client"

import { useState, useEffect } from "react"
import { getTickets } from "../utils/storage"

export default function RaffleBoard({ onTicketClick }) {
  const [tickets, setTickets] = useState({})
  const [zoom, setZoom] = useState(1)

  useEffect(() => {
    const loadTickets = () => {
      setTickets(getTickets())
    }

    loadTickets()
    window.addEventListener("storage", loadTickets)

    return () => {
      window.removeEventListener("storage", loadTickets)
    }
  }, [])

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.2, 2))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.2, 0.6))
  }

  const handleTicketClick = (ticket) => {
    if (ticket.status === "available") {
      onTicketClick(ticket)
    }
  }

  return (
    <div className="board-container">
      <div className="board-controls">
        <button onClick={handleZoomOut} disabled={zoom <= 0.6}>
          🔍 -
        </button>
        <span style={{ color: "#666", fontWeight: "bold" }}>Zoom: {Math.round(zoom * 100)}%</span>
        <button onClick={handleZoomIn} disabled={zoom >= 2}>
          🔍 +
        </button>
      </div>

      <div className="board-wrapper">
        <div className="board" style={{ transform: `scale(${zoom})` }}>
          {Object.values(tickets).map((ticket) => (
            <div
              key={ticket.number}
              className={`ticket ${ticket.status}`}
              onClick={() => handleTicketClick(ticket)}
              title={`Boleta ${ticket.number} - ${
                ticket.status === "available" ? "Disponible" : ticket.status === "pending" ? "Pendiente" : "Vendida"
              }`}
            >
              {ticket.number}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
