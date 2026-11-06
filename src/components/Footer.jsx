import { Mail } from 'lucide-react'
import Logo from './Logo'
import StoreBadges from './StoreBadges'

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" />
    </svg>
  )
}

function YoutubeIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" stroke="currentColor" strokeWidth="1.8" />
      <path d="M10.2 9.3l5 2.7-5 2.7V9.3z" fill="currentColor" />
    </svg>
  )
}

export default function Footer({ onStore, onCreate, onInfo }) {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <a href="#top" className="footer-logo" aria-label="Sport Match — início">
            <Logo size={42} />
            <span>
              Sport <strong>Match</strong>
            </span>
          </a>
          <p>
            O ponto de encontro entre quem quer jogar e quem organiza. Menos bagunça, mais racha.
          </p>
          <div className="footer-socials">
            <a href="mailto:contato@sportmatch.com.br" aria-label="Enviar e-mail para o Sport Match">
              <Mail size={18} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram do Sport Match">
              <InstagramIcon />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube do Sport Match">
              <YoutubeIcon />
            </a>
          </div>
        </div>

        <nav className="footer-col" aria-label="Plataforma">
          <h3>Plataforma</h3>
          <a href="#rachas">Buscar rachas</a>
          <a href="#guia">Guia Sport Match</a>
          <a href="#funcionalidades">Funcionalidades</a>
          <button type="button" onClick={onCreate}>
            Criar racha
          </button>
        </nav>

        <nav className="footer-col" aria-label="Suporte">
          <h3>Suporte</h3>
          <a href="mailto:contato@sportmatch.com.br">Fale com a gente</a>
          <a href="mailto:contato@sportmatch.com.br?subject=Central%20de%20ajuda">
            Central de ajuda
          </a>
          <button type="button" onClick={() => onInfo('Termos de uso')}>
            Termos de uso
          </button>
          <button type="button" onClick={() => onInfo('Política de privacidade')}>
            Privacidade
          </button>
        </nav>

        <div className="footer-app">
          <h3>Baixe o app</h3>
          <p>Seu racha no bolso. Disponível para Android e iOS.</p>
          <StoreBadges onStore={onStore} />
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© 2026 Sport Match. Todos os direitos reservados.</span>
        <span>
          Feito para quem vive o esporte. <i>Protótipo front-end</i>
        </span>
      </div>
    </footer>
  )
}
