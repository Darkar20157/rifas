"use client"
import { useEffect, useState } from "react"
import { getTickets } from "../utils/api"

export default function RaffleBoard({ onTicketClick }) {
  const [tickets, setTickets] = useState({})
  const [zoom, setZoom] = useState(1)

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getTickets()
        const mapped = {}
        data.forEach(ticket => {
          mapped[ticket.number] = ticket
        })
        setTickets(mapped)
      } catch (err) {
        console.error("Error al cargar tickets", err)
      }
    }
    load()
  }, [])

  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.2, 2))
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.2, 0.6))
  const handleTicketClick = (ticket) => ticket.status === "available" && onTicketClick(ticket)

  return (
    <div className="board-container">
      <div className="board-controls">
        <button onClick={handleZoomOut} disabled={zoom <= 0.6}>🔍 -</button>
        <span style={{ color: "#666", fontWeight: "bold" }}>Zoom: {Math.round(zoom * 100)}%</span>
        <button onClick={handleZoomIn} disabled={zoom >= 2}>🔍 +</button>
      </div>

      <div className="board-wrapper">
        <div className="board" style={{ transform: `scale(${zoom})` }}>
          {Object.values(tickets).map((ticket) => (
            <div
              key={ticket.number}
              className={`ticket ${ticket.status}`}
              onClick={() => handleTicketClick(ticket)}
              title={`Boleta ${ticket.number} - ${ticket.status}`}
            >
              {ticket.number}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}