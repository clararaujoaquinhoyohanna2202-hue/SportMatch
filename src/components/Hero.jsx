import { ArrowUpRight, Plus, Star } from 'lucide-react'
import Logo from './Logo'
import PhonePreview from './PhonePreview'
import StoreBadges from './StoreBadges'

const AVATARS = [
  { initials: 'JP', className: 'avatar-a' },
  { initials: 'MA', className: 'avatar-b' },
  { initials: 'LC', className: 'avatar-c' },
]

export default function Hero({
  rachas,
  joinedIds,
  onJoin,
  onContact,
  onSignup,
  onCreate,
  onStore,
  onAppMenu,
}) {
  return (
    <section className="hero" id="top">
      <div className="hero-decor hero-decor-left" aria-hidden="true" />
      <div className="hero-decor hero-decor-right" aria-hidden="true" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="hero-brand">
            <Logo size={80} className="hero-logo" />
            <h1>
              Sport <em>Match</em>
            </h1>
          </div>

          <h2 className="hero-kicker">
            Atrás de treinos, mas não sabe como entrar?
          </h2>

          <p className="hero-lead">
            O Sport Match veio para resolver. <strong>Cadastre-se</strong>, comece suas buscas
            e <strong>divirta-se!</strong>
          </p>

          <p className="hero-description">
            Confirme presença, acompanhe as avaliações, entre na fila e procure rachas direto do
            celular ou do computador.{' '}
            <span>Se você organiza, crie a lista do seu treino em segundos.</span>
          </p>

          <div className="hero-actions">
            <button type="button" className="btn btn-lime btn-lg" onClick={onSignup}>
              Cadastre-se no Sport Match
              <ArrowUpRight size={19} aria-hidden="true" />
            </button>
            <button type="button" className="btn btn-soft btn-lg" onClick={onCreate}>
              <Plus size={18} aria-hidden="true" />
              Criar a lista dos treinos
            </button>
          </div>

          <div className="hero-trust">
            <div className="hero-proof">
              <div className="avatar-stack" aria-hidden="true">
                {AVATARS.map((avatar) => (
                  <span key={avatar.initials} className={`hero-avatar ${avatar.className}`}>
                    {avatar.initials}
                  </span>
                ))}
                <span className="hero-avatar avatar-more">+9k</span>
              </div>
              <p>
                <strong>12 mil jogadores</strong>
                <span>já encontraram seu racha</span>
              </p>
            </div>
            <div className="hero-rating">
              <span className="rating-stars" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((index) => (
                  <Star key={index} size={13} fill="currentColor" />
                ))}
              </span>
              <p>
                <strong>4,9/5</strong>
                <span>avaliação da comunidade</span>
              </p>
            </div>
          </div>

          <div className="hero-stores">
            <span className="hero-stores-label">Disponível em:</span>
            <StoreBadges onStore={onStore} />
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-court-ring" aria-hidden="true" />
          <PhonePreview
            rachas={rachas}
            joinedIds={joinedIds}
            onJoin={onJoin}
            onContact={onContact}
            onAppMenu={onAppMenu}
          />
          <div className="hero-floating-card hero-floating-top" aria-hidden="true">
            <span className="floating-dot" />
            <div>
              <strong>Vaga confirmada</strong>
              <small>Basquete Picui · 15h</small>
            </div>
          </div>
          <div className="hero-floating-card hero-floating-bottom" aria-hidden="true">
            <span className="floating-icon">✓</span>
            <div>
              <strong>Lista atualizada</strong>
              <small>agora mesmo</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
