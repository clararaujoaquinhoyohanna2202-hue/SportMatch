import { useState } from 'react'
import { AlertCircle, Eye, EyeOff, LockKeyhole, Mail, UserRound } from 'lucide-react'
import Modal from './Modal'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function nameFromEmail(email) {
  const raw = email.split('@')[0].replace(/[._-]+/g, ' ').replace(/[0-9]+/g, '').trim()
  if (!raw) return 'Jogador'
  return raw
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export default function AuthModal({ initialMode = 'login', onClose, onSuccess, onInfo }) {
  const [mode, setMode] = useState(initialMode)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const switchMode = (nextMode) => {
    setMode(nextMode)
    setError('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const cleanEmail = email.trim().toLowerCase()
    const cleanName = name.trim()

    if (mode === 'signup' && cleanName.length < 2) {
      setError('Informe seu nome para criar a conta.')
      return
    }
    if (!EMAIL_RE.test(cleanEmail)) {
      setError('Digite um e-mail válido.')
      return
    }
    if (password.length < 6) {
      setError('A senha precisa ter pelo menos 6 caracteres.')
      return
    }

    onSuccess({
      name: mode === 'signup' ? cleanName : nameFromEmail(cleanEmail),
      email: cleanEmail,
    })
  }

  return (
    <Modal onClose={onClose} titleId="auth-modal-title" className="auth-modal">
      <div className="modal-head">
        <span className="eyebrow">
          <i /> Sua conta
        </span>
        <h2 id="auth-modal-title">
          {mode === 'login' ? 'Entrar no Sport Match' : 'Criar sua conta'}
        </h2>
        <p>
          {mode === 'login'
            ? 'Bem-vindo de volta. Seu próximo racha está esperando.'
            : 'É grátis, rápido e direto ao ponto. Bora entrar em campo?'}
        </p>
      </div>

      <div className="auth-tabs">
        <button
          type="button"
          className={mode === 'login' ? 'is-active' : ''}
          aria-pressed={mode === 'login'}
          onClick={() => switchMode('login')}
        >
          Entrar
        </button>
        <button
          type="button"
          className={mode === 'signup' ? 'is-active' : ''}
          aria-pressed={mode === 'signup'}
          onClick={() => switchMode('signup')}
        >
          Criar conta
        </button>
      </div>

      <form className="modal-form" onSubmit={handleSubmit} noValidate>
        {mode === 'signup' && (
          <label className="field">
            <span>Nome completo</span>
            <div className="field-control">
              <UserRound size={17} aria-hidden="true" />
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Como podemos te chamar?"
                autoComplete="name"
                data-autofocus
              />
            </div>
          </label>
        )}

        <label className="field">
          <span>E-mail</span>
          <div className="field-control">
            <Mail size={17} aria-hidden="true" />
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="voce@email.com"
              autoComplete="email"
              data-autofocus={mode === 'login' ? true : undefined}
            />
          </div>
        </label>

        <label className="field">
          <span>Senha</span>
          <div className="field-control">
            <LockKeyhole size={17} aria-hidden="true" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Mínimo de 6 caracteres"
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword((visible) => !visible)}
              aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
            >
              {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>
        </label>

        {mode === 'login' && (
          <button
            type="button"
            className="forgot-link"
            onClick={() => onInfo('Recuperação de senha')}
          >
            Esqueci minha senha
          </button>
        )}

        {error && (
          <p className="form-error" role="alert">
            <AlertCircle size={15} aria-hidden="true" />
            {error}
          </p>
        )}

        <button type="submit" className="btn btn-lime btn-block modal-submit">
          {mode === 'login' ? 'Entrar' : 'Criar conta grátis'}
        </button>

        {mode === 'signup' && (
          <p className="form-terms">
            Ao criar sua conta, você concorda com os{' '}
            <button type="button" onClick={() => onInfo('Termos de uso')}>
              Termos de uso
            </button>{' '}
            e a{' '}
            <button type="button" onClick={() => onInfo('Política de privacidade')}>
              Política de privacidade
            </button>
            .
          </p>
        )}

        <p className="demo-note">
          Demonstração front-end: seus dados ficam salvos apenas neste navegador.
        </p>
      </form>
    </Modal>
  )
}
