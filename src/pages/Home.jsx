"use client"

import { useState, useEffect } from "react"
import RaffleBoard from "../components/RaffleBoard"
import TicketModal from "../components/TicketModal"
import { getTickets } from "../utils/api" // ✅ tu helper centralizado

export default function Home() {
  const [tickets, setTickets] = useState([])
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [videoModal, setVideoModal] = useState(null)
  const [stats, setStats] = useState({
    total: 0,
    available: 0,
    pending: 0,
    sold: 0,
  })

  // ✅ Cargar tickets desde backend
  const updateTickets = async () => {
    try {
      const data = await getTickets()
      setTickets(data)
      setStats({
        total: data.length,
        available: data.filter(t => t.status === "available").length,
        pending: data.filter(t => t.status === "pending").length,
        sold: data.filter(t => t.status === "sold").length,
      })
    } catch (error) {
      console.error("Error fetching tickets:", error)
    }
  }

  useEffect(() => {
    updateTickets()
  }, [])

  return (
    <div className="container">
      <div className="header">
        <div className="header-top">
          <a
            href="https://www.instagram.com/cabanaselmiradorjuntas"
            target="_blank"
            rel="noopener noreferrer"
            className="instagram-link"
          >
            <img
              width={20}
              src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
              alt="Instagram"
              className="instagram-img"
            />
            @cabanaselmiradorjuntas
          </a>
        </div>
        <h1>🎟️ Rifa Glamping Romántico</h1>
        <p>¡Participa y gana una noche inolvidable!</p>
      </div>

      {/* 🏕️ Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h2>Gana una Noche Mágica en Glamping</h2>
            <p>
              Participa en nuestra rifa y podrás ganar una experiencia única: una noche romántica en glamping para dos
              personas, donde también podrás llevar a tu bebé.
            </p>

            <div className="prize-highlight">
              <h3>🎁 Premio</h3>
              <p>
                Una noche completa en glamping de lujo con todas las comodidades para una pareja y su bebé. Disfruta de
                la naturaleza, el confort y momentos inolvidables.
              </p>
            </div>

            <div className="raffle-details">
              <h4>📋 Detalles de la Rifa</h4>
              <div className="detail-item">
                <span className="detail-icon">💵</span>
                <strong>Valor de la boleta:</strong> $10.000 pesos
              </div>
              <div className="detail-item">
                <span className="detail-icon">🎲</span>
                <strong>Juega con:</strong> Lotería de Medellín
              </div>
              <div className="detail-item">
                <span className="detail-icon">📅</span>
                <strong>Fecha del sorteo:</strong> 28 de Noviembre de 2025
              </div>
              <div className="detail-item">
                <span className="detail-icon">🔢</span>
                <strong>Gana con:</strong> Las últimas 3 cifras
              </div>
            </div>
          </div>

          <div className="hero-image">
            <img src="/assets/img/img-1.jpg" alt="Glamping romántico" />
          </div>
        </div>
      </div>

      {/* 🌄 Galería */}
      <div className="glamping-gallery">
        <h2>✨ Conoce el Glamping</h2>
        <div className="gallery-grid">
          {["/assets/img/img-4.jpg", "/assets/img/img-3.jpg", "/assets/img/img-5.jpg"].map((src, i) => (
            <div key={i} className="gallery-item">
              <img src={src} alt={`Vista del glamping ${i + 1}`} />
            </div>
          ))}

          {["/assets/video/video-1.mp4", "/assets/video/video-2.mp4"].map((src, i) => (
            <div key={i} className="gallery-item video-item" onClick={() => setVideoModal(src)}>
              <video src={src} muted loop playsInline></video>
              <div className="video-overlay">▶ Ver video</div>
            </div>
          ))}
        </div>

        {/* ✅ Modal para reproducir el video */}
        {videoModal && (
          <div className="video-modal-overlay" onClick={() => setVideoModal(null)}>
            <div className="video-modal">
              <video src={videoModal} controls autoPlay></video>
            </div>
          </div>
        )}

      </div>

      {/* 💬 Historia Personal */}
      <div className="personal-story">
        <div className="story-content">
          <div className="profile-section">
            <div className="profile-photo-placeholder">
              <img
                style={{ borderRadius: "50%", objectFit: "cover" }}
                width={170}
                height={170}
                src="/assets/img/danny.jpg"
                alt="Foto de perfil"
              />
            </div>
            <div className="profile-name">Danny Alejandro Rojas</div>
            <a href="tel:3204594935" className="profile-contact">
              <span>📱</span>
              <span>320 459 4935</span>
            </a>
          </div>

          <div className="story-text">
            <h2>💙 Una Nota Personal</h2>
            <p>
              Esta rifa representa más que un simple sorteo para mí. Estoy pasando por un momento económico difícil y
              hace poco sufrí un accidente que ha complicado aún más mi situación.
            </p>
            <p>
              Tu participación en esta rifa no solo te da la oportunidad de ganar una experiencia maravillosa en el
              glamping, sino que también representa un apoyo invaluable para mí y mi familia en este momento tan
              complicado.
            </p>
            <div className="thank-you">
              <p>
                🙏 Cada boleta que compres es una bendición. Gracias de corazón por tu apoyo y solidaridad. ¡Que Dios te
                bendiga!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 📊 Estadísticas */}
      <div className="stats">
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

      {/* 🎟️ Tablero de Boletas */}
      <RaffleBoard tickets={tickets} onTicketClick={setSelectedTicket} />

      {/* 🧾 Modal */}
      {selectedTicket && (
        <TicketModal
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
          onUpdate={updateTickets} // 👈 recarga el tablero después de reservar
        />
      )}
    </div>
  )
}
