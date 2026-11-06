import { CalendarDays, Clock, Copy, MapPin, MessageCircle, Phone } from 'lucide-react'
import Modal from './Modal'
import { SPORT_ACRONYMS, getDateParts } from '../data/rachaData'

function formatPhone(digits) {
  const d = digits.replace(/\D/g, '')
  if (d.length === 13) return `+${d.slice(0, 2)} (${d.slice(2, 4)}) ${d.slice(4, 9)}-${d.slice(9)}`
  if (d.length === 12) return `+${d.slice(0, 2)} (${d.slice(2, 4)}) ${d.slice(4, 8)}-${d.slice(8)}`
  if (d.length === 11) return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
  return digits
}

export default function ContactModal({ racha, onClose, onNotify }) {
  const parts = getDateParts(racha.date)
  const digits = (racha.phone ?? '').replace(/\D/g, '')
  const hasPhone = digits.length >= 10
  const phone = formatPhone(digits)
  const message = encodeURIComponent(
    `Olá! Vi o racha "${racha.title}" no Sport Match e quero saber mais sobre a lista.`,
  )

  const copyPhone = async () => {
    try {
      await navigator.clipboard.writeText(phone)
      onNotify('Número copiado para a área de transferência.', 'success')
    } catch {
      onNotify(`Número do organizador: ${phone}`, 'info')
    }
  }

  return (
    <Modal onClose={onClose} titleId="contact-modal-title" className="contact-modal">
      <div className="modal-head">
        <span className="eyebrow">
          <i /> Contato do racha
        </span>
        <h2 id="contact-modal-title">Falar com o organizador</h2>
        <p>Tire dúvidas sobre nível, valores e a lista direto com quem organiza.</p>
      </div>

      <div className="contact-racha">
        <span className="sport-badge" aria-hidden="true">
          {SPORT_ACRONYMS[racha.sport] ?? racha.sport.slice(0, 2).toUpperCase()}
        </span>
        <div>
          <span className="contact-sport">{racha.sport}</span>
          <h3>{racha.title}</h3>
          <div className="contact-meta">
            <span>
              <CalendarDays size={14} aria-hidden="true" />
              {parts.weekday}, {parts.short}
            </span>
            <span>
              <Clock size={14} aria-hidden="true" />
              {racha.start} – {racha.end}
            </span>
            <span>
              <MapPin size={14} aria-hidden="true" />
              {racha.venue}
            </span>
          </div>
        </div>
      </div>

      <div className="organizer-card">
        <span className="organizer-avatar" aria-hidden="true">
          {racha.organizer.charAt(0).toUpperCase()}
        </span>
        <div className="organizer-info">
          <small>Organizador</small>
          <strong>{racha.organizer}</strong>
          <span>
            <Phone size={13} aria-hidden="true" />
            {hasPhone ? phone : 'WhatsApp não informado'}
          </span>
        </div>
        <span className="organizer-status">
          <i aria-hidden="true" /> Ativo
        </span>
      </div>

      {hasPhone ? (
        <div className="contact-actions">
          <a
            className="btn btn-lime btn-block"
            href={`https://wa.me/${digits}?text=${message}`}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={18} aria-hidden="true" />
            Chamar no WhatsApp
          </a>
          <button type="button" className="btn btn-ghost btn-block" onClick={copyPhone}>
            <Copy size={17} aria-hidden="true" />
            Copiar número
          </button>
        </div>
      ) : (
        <div className="contact-no-phone">
          <MessageCircle size={19} aria-hidden="true" />
          <p>
            Este organizador ainda não cadastrou um WhatsApp. Fale com a galera na lista do racha
            para combinar os detalhes.
          </p>
        </div>
      )}

      <p className="contact-note">
        {hasPhone
          ? 'Ao chamar, mencione o Sport Match. O organizador responde em nome do grupo.'
          : 'O contato por WhatsApp aparecerá aqui assim que o organizador cadastrar um número.'}
      </p>
    </Modal>
  )
}
