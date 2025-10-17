import { useState } from "react"
import { reserveTicket } from "../utils/api"

export default function TicketModal({ ticket, onClose, onUpdate }) {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [loading, setLoading] = useState(false)

  if (!ticket) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (name.trim() && phone.trim()) {
      setLoading(true)
      try {
        await reserveTicket(ticket.number, name, phone)

        alert(`✅ ¡Boleta ${ticket.number} reservada!`)
        onClose()

        // 🔁 Refrescamos tablero y estadísticas
        if (onUpdate) await onUpdate()
      } catch (err) {
        console.error(err)
        alert("❌ Error al reservar la boleta. Intenta de nuevo.")
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Boleta #{ticket.number}</h2>
        <p>Completa tus datos para reservar esta boleta</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre Completo</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ingresa tu nombre"
              required
            />
          </div>

          <div className="form-group">
            <label>Número de Celular</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Ingresa tu celular"
              required
            />
          </div>

          <div className="modal-buttons">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Enviando..." : "Reservar Boleta"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}