import { useEffect, useState } from 'react'
import { LogOut, Menu, UserRound, X } from 'lucide-react'
import Logo from './Logo'

const NAV_LINKS = [
  { label: 'Buscar Rachas', href: '#rachas' },
  { label: 'Guia Sport Match', href: '#guia' },
  { label: 'Funcionalidades', href: '#funcionalidades' },
]

export default function Header({ user, onOpenAuth, onLogout }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return undefined
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  const openAuth = (mode) => {
    closeMenu()
    onOpenAuth(mode)
  }

  return (
    <>
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="container header-inner">
          <a className="header-brand" href="#top" onClick={closeMenu} aria-label="Sport Match — início">
            <Logo size={42} />
            <span className="header-brand-text">
              Sport <strong>Match</strong>
            </span>
          </a>

          <nav className="main-nav" aria-label="Navegação principal">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>

          <div className="header-actions">
            {user ? (
              <div className="user-menu">
                <span className="user-avatar" aria-hidden="true">
                  {user.name.charAt(0).toUpperCase()}
                </span>
                <span className="user-greeting">
                  <small>Bem-vindo</small>
                  <strong>{user.name.split(' ')[0]}</strong>
                </span>
                <button type="button" className="user-logout" onClick={onLogout} title="Sair da conta">
                  <LogOut size={17} />
                  <span className="sr-only">Sair da conta</span>
                </button>
              </div>
            ) : (
              <button type="button" className="header-cta" onClick={() => openAuth('login')}>
                Entrar
              </button>
            )}

            <button
              type="button"
              className="menu-toggle"
              aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="mobile-menu-layer">
          <button
            type="button"
            className="mobile-menu-scrim"
            aria-label="Fechar menu"
            onClick={closeMenu}
          />
          <div className="mobile-menu" id="mobile-menu">
            <nav aria-label="Navegação mobile">
              {NAV_LINKS.map((link) => (
                <a key={link.href} href={link.href} onClick={closeMenu}>
                  {link.label}
                  <span aria-hidden="true">↗</span>
                </a>
              ))}
            </nav>
            <div className="mobile-menu-footer">
              {user ? (
                <>
                  <div className="mobile-user">
                    <span className="user-avatar" aria-hidden="true">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                    <div>
                      <small>Conectado como</small>
                      <strong>{user.name}</strong>
                    </div>
                  </div>
                  <button type="button" className="btn btn-ghost btn-block" onClick={() => { onLogout(); closeMenu() }}>
                    <LogOut size={17} /> Sair da conta
                  </button>
                </>
              ) : (
                <>
                  <button type="button" className="btn btn-lime btn-block" onClick={() => openAuth('signup')}>
                    <UserRound size={18} /> Criar conta grátis
                  </button>
                  <button type="button" className="btn btn-ghost btn-block" onClick={() => openAuth('login')}>
                    Já tenho conta
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
