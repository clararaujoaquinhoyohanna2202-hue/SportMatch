import { useMemo, useState } from 'react'
import { Check, Info, Menu, Search, Users } from 'lucide-react'
import Logo from './Logo'
import { getDateParts } from '../data/rachaData'

function StatusBar() {
  return (
    <div className="phone-status" aria-hidden="true">
      <span className="phone-time">9:41</span>
      <span className="phone-status-icons">
        <svg width="17" height="11" viewBox="0 0 17 11" fill="none">
          <rect x="0" y="6.5" width="3" height="4.5" rx="1" fill="currentColor" />
          <rect x="4.6" y="4.5" width="3" height="6.5" rx="1" fill="currentColor" />
          <rect x="9.2" y="2.5" width="3" height="8.5" rx="1" fill="currentColor" />
          <rect x="13.8" y="0" width="3" height="11" rx="1" fill="currentColor" />
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path d="M1 4.2C3 2.5 5.4 1.6 8 1.6s5 .9 7 2.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M3.4 6.9c1.4-1.1 2.9-1.7 4.6-1.7s3.2.6 4.6 1.7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="8" cy="10" r="1.5" fill="currentColor" />
        </svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect x=".7" y=".7" width="20" height="10.6" rx="3" stroke="currentColor" strokeWidth="1.2" opacity=".5" />
          <rect x="2.5" y="2.5" width="15" height="7" rx="1.6" fill="currentColor" />
          <path d="M22.5 4.2v3.6c1-.3 1.6-1 1.6-1.8s-.6-1.5-1.6-1.8z" fill="currentColor" opacity=".6" />
        </svg>
      </span>
    </div>
  )
}

export default function PhonePreview({ rachas, joinedIds, onJoin, onContact, onAppMenu }) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return rachas
    return rachas.filter((racha) =>
      [racha.title, racha.sport, racha.venue, racha.organizer]
        .join(' ')
        .toLowerCase()
        .includes(term),
    )
  }, [query, rachas])

  return (
    <div className="phone-wrap">
      <div className="phone-glow" aria-hidden="true" />
      <div className="phone" role="group" aria-label="Prévia do aplicativo Sport Match">
        <div className="phone-buttons" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="phone-screen">
          <StatusBar />
          <div className="phone-appbar">
            <Logo size={30} className="phone-logo" />
            <label className="phone-search">
              <Search size={15} aria-hidden="true" />
              <span className="sr-only">Buscar treinos na prévia do app</span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar treinos..."
              />
            </label>
            <button type="button" className="phone-menu" aria-label="Menu do aplicativo" onClick={onAppMenu}>
              <Menu size={19} />
            </button>
          </div>

          <div className="phone-subhead">
            <span>
              <i aria-hidden="true" /> Rachas perto de você
            </span>
            <b>{filtered.length}</b>
          </div>

          <div className="phone-list">
            {filtered.map((racha) => {
              const parts = getDateParts(racha.date)
              const joined = joinedIds.includes(racha.id)
              const count = racha.slots + (joined ? 1 : 0)

              return (
                <article className={`phone-card ${joined ? 'is-joined' : ''}`} key={racha.id}>
                  <div className="phone-card-top">
                    <div className="phone-players">
                      <Users size={20} aria-hidden="true" />
                      <span>
                        Jogadores
                        <b>
                          {count}/{racha.total}
                        </b>
                      </span>
                    </div>
                    <div className="phone-card-event">
                      <div className="phone-card-event-title">
                        <button
                          type="button"
                          className="phone-info"
                          onClick={() => onContact(racha)}
                          aria-label={`Falar com o organizador de ${racha.title}`}
                        >
                          <Info size={12} />
                        </button>
                        <strong>{racha.title}</strong>
                      </div>
                      <small>
                        {parts.weekday} {parts.short} · {racha.venue}
                      </small>
                    </div>
                  </div>
                  <p className="phone-time">
                    {racha.start}
                    <span>–</span>
                    {racha.end}
                  </p>
                  <div className="phone-actions">
                    <button
                      type="button"
                      className={`phone-btn-primary ${joined ? 'is-joined' : ''}`}
                      onClick={() => onJoin(racha)}
                      title={joined ? 'Clique para sair da lista' : 'Entrar na lista'}
                    >
                      {joined && <Check size={11} strokeWidth={3} aria-hidden="true" />}
                      {joined ? 'NA LISTA' : 'ENTRAR NA LISTA'}
                    </button>
                    <button type="button" className="phone-btn-secondary" onClick={() => onContact(racha)}>
                      FALAR COM O ORG.
                    </button>
                  </div>
                </article>
              )
            })}

            {filtered.length === 0 && (
              <div className="phone-empty">
                <Search size={22} aria-hidden="true" />
                <strong>Nada por aqui</strong>
                <span>Tente outro esporte ou local.</span>
                <button type="button" onClick={() => setQuery('')}>
                  Limpar busca
                </button>
              </div>
            )}
          </div>

          <div className="phone-homebar" aria-hidden="true">
            <span />
          </div>
        </div>
      </div>
    </div>
  )
}
