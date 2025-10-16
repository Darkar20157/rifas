"use client"

import { useState, useEffect } from "react"
import { getPendingRequests, confirmTicket, rejectTicket } from "../utils/storage"

export default function Admin() {
  const [requests, setRequests] = useState([])

  useEffect(() => {
    const loadRequests = () => {
      setRequests(getPendingRequests())
    }

    loadRequests()
    window.addEventListener("storage", loadRequests)

    return () => {
      window.removeEventListener("storage", loadRequests)
    }
  }, [])

  const handleConfirm = (number) => {
    if (confirm(`¿Confirmar pago de la boleta ${number}?`)) {
      confirmTicket(number)
    }
  }

  const handleReject = (number) => {
    if (confirm(`¿Rechazar la boleta ${number}?`)) {
      rejectTicket(number)
    }
  }

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="container">
      <div className="admin-header">
        <h1>🔐 Panel de Administración</h1>
        <p>Gestiona las solicitudes de boletas pendientes</p>
      </div>

      <div className="requests-list">
        <h2 style={{ marginBottom: "20px", color: "#333" }}>Solicitudes Pendientes ({requests.length})</h2>

        {requests.length === 0 ? (
          <div className="empty-state">
            <h3>No hay solicitudes pendientes</h3>
            <p>Las nuevas reservas aparecerán aquí</p>
          </div>
        ) : (
          requests.map((request) => (
            <div key={request.number} className="request-card pending">
              <div className="request-header">
                <span className="request-number">Boleta #{request.number}</span>
                <span className="request-status pending">Pendiente</span>
              </div>

              <div className="request-info">
                <p>
                  <strong>Nombre:</strong> {request.name}
                </p>
                <p>
                  <strong>Celular:</strong> {request.phone}
                </p>
                <p>
                  <strong>Fecha:</strong> {formatDate(request.timestamp)}
                </p>
              </div>

              <div className="request-actions">
                <button className="btn-success" onClick={() => handleConfirm(request.number)}>
                  ✓ Confirmar Pago
                </button>
                <button className="btn-danger" onClick={() => handleReject(request.number)}>
                  ✗ Rechazar
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}