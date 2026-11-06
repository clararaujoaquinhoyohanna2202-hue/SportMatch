import { ArrowRight, ArrowUpRight, Plus } from 'lucide-react'
import Logo from './Logo'

export default function CallToAction({ user, onSignup, onLogin, onExplore, onCreate }) {
  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-panel">
          <div className="cta-decor" aria-hidden="true">
            <span className="cta-ball" />
            <span className="cta-line" />
            <span className="cta-word">JOGUE</span>
          </div>

          <div className="cta-content">
            <span className="cta-eyebrow">
              <Logo size={26} /> A quadra está esperando
            </span>
            <h2>
              Bora pro próximo <em>racha?</em>
            </h2>
            <p>
              {user
                ? `${user.name.split(' ')[0]}, seu próximo match está a um clique. Confira quem está jogando perto de você.`
                : 'Crie sua conta grátis, encontre um racha com vaga aberta e entre na lista. A resenha começa aqui.'}
            </p>
            <div className="cta-actions">
              {user ? (
                <>
                  <button type="button" className="btn btn-dark btn-lg" onClick={onExplore}>
                    Ver rachas abertos
                    <ArrowRight size={18} aria-hidden="true" />
                  </button>
                  <button type="button" className="btn btn-dark-ghost btn-lg" onClick={onCreate}>
                    <Plus size={18} aria-hidden="true" />
                    Criar um racha
                  </button>
                </>
              ) : (
                <>
                  <button type="button" className="btn btn-dark btn-lg" onClick={onSignup}>
                    Criar conta grátis
                    <ArrowUpRight size={19} aria-hidden="true" />
                  </button>
                  <button type="button" className="btn btn-dark-ghost btn-lg" onClick={onLogin}>
                    Já tenho conta
                  </button>
                </>
              )}
            </div>
            <span className="cta-note">Sem mensalidade para jogadores. Sempre.</span>
          </div>
        </div>
      </div>
    </section>
  )
}
