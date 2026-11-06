import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import SportsMarquee from './components/SportsMarquee'
import ListingSection from './components/ListingSection'
import Guide from './components/Guide'
import Features from './components/Features'
import CallToAction from './components/CallToAction'
import Footer from './components/Footer'
import AuthModal from './components/AuthModal'
import ContactModal from './components/ContactModal'
import CreateRachaModal from './components/CreateRachaModal'
import Toast from './components/Toast'
import { INITIAL_RACHAS } from './data/rachaData'

const STORAGE_KEYS = {
  customRachas: 'sportmatch:custom-rachas',
  joined: 'sportmatch:joined',
  user: 'sportmatch:user',
}

function readStorage(key, fallback) {
  try {
    const value = window.localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

function readJoined() {
  const stored = readStorage(STORAGE_KEYS.joined, [])
  return Array.isArray(stored) ? stored : []
}

function readCustomRachas() {
  const stored = readStorage(STORAGE_KEYS.customRachas, [])
  return Array.isArray(stored) ? stored : []
}

export default function App() {
  const [customRachas, setCustomRachas] = useState(readCustomRachas)
  const [joinedIds, setJoinedIds] = useState(readJoined)
  const [user, setUser] = useState(() => readStorage(STORAGE_KEYS.user, null))
  const [modal, setModal] = useState(null)
  const [toast, setToast] = useState(null)
  const [query, setQuery] = useState('')
  const [sport, setSport] = useState('Todos')

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEYS.customRachas, JSON.stringify(customRachas))
  }, [customRachas])

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEYS.joined, JSON.stringify(joinedIds))
  }, [joinedIds])

  useEffect(() => {
    if (user) {
      window.localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user))
    } else {
      window.localStorage.removeItem(STORAGE_KEYS.user)
    }
  }, [user])

  useEffect(() => {
    if (!toast) return undefined
    const timer = window.setTimeout(() => setToast(null), 4600)
    return () => window.clearTimeout(timer)
  }, [toast])

  const notify = (message, tone = 'success') => {
    setToast({ id: Date.now(), message, tone })
  }

  const rachas = useMemo(() => [...customRachas, ...INITIAL_RACHAS], [customRachas])

  const filteredRachas = useMemo(() => {
    const term = query.trim().toLowerCase()
    return rachas.filter((racha) => {
      const matchesSport = sport === 'Todos' || racha.sport === sport
      const matchesQuery =
        !term ||
        [racha.title, racha.sport, racha.venue, racha.organizer]
          .join(' ')
          .toLowerCase()
          .includes(term)
      return matchesSport && matchesQuery
    })
  }, [rachas, query, sport])

  const toggleJoin = (racha) => {
    const isJoined = joinedIds.includes(racha.id)
    setJoinedIds((current) =>
      isJoined ? current.filter((id) => id !== racha.id) : [...current, racha.id],
    )
    notify(
      isJoined
        ? `Você saiu da lista de ${racha.title}.`
        : `Presença confirmada em ${racha.title}. Bora jogar!`,
      isJoined ? 'info' : 'success',
    )
  }

  const openAuth = (mode = 'login') => setModal({ type: 'auth', mode })
  const openContact = (racha) => setModal({ type: 'contact', racha })
  const openCreate = () => setModal({ type: 'create' })
  const closeModal = () => setModal(null)

  const handleAuthSuccess = (nextUser) => {
    setUser(nextUser)
    setModal(null)
    notify(`Bem-vindo, ${nextUser.name.split(' ')[0]}! Sua conta está pronta.`)
  }

  const handleLogout = () => {
    setUser(null)
    notify('Você saiu da sua conta. Até o próximo racha!', 'info')
  }

  const handleCreate = (data) => {
    const newRacha = {
      ...data,
      id: `custom-${Date.now()}`,
    }
    setCustomRachas((current) => [newRacha, ...current])
    setModal(null)
    setQuery('')
    setSport('Todos')
    notify('Racha publicado! Ele já aparece na lista abaixo.', 'success')
    window.setTimeout(() => {
      document.getElementById('rachas')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 120)
  }

  const clearFilters = () => {
    setQuery('')
    setSport('Todos')
  }

  const handleStore = (store) => {
    notify(`O app para ${store} está chegando. Enquanto isso, use a versão web.`, 'info')
  }

  const handleInfo = (label) => {
    notify(`${label} estará disponível em breve nesta demonstração.`, 'info')
  }

  const scrollToRachas = () => {
    document.getElementById('rachas')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <a className="skip-link" href="#rachas">
        Ir para os rachas
      </a>

      <Header user={user} onOpenAuth={openAuth} onLogout={handleLogout} />

      <main>
        <Hero
          rachas={rachas}
          joinedIds={joinedIds}
          onJoin={toggleJoin}
          onContact={openContact}
          onSignup={() => openAuth('signup')}
          onCreate={openCreate}
          onStore={handleStore}
          onAppMenu={() =>
            notify('Este é só um preview. Explore os rachas completos logo abaixo.', 'info')
          }
        />
        <SportsMarquee />
        <ListingSection
          rachas={filteredRachas}
          joinedIds={joinedIds}
          query={query}
          onQueryChange={setQuery}
          sport={sport}
          onSportChange={setSport}
          onJoin={toggleJoin}
          onContact={openContact}
          onCreate={openCreate}
          onClearFilters={clearFilters}
        />
        <Guide onSignup={() => openAuth('signup')} onExplore={scrollToRachas} />
        <Features />
        <CallToAction
          user={user}
          onSignup={() => openAuth('signup')}
          onLogin={() => openAuth('login')}
          onExplore={scrollToRachas}
          onCreate={openCreate}
        />
      </main>

      <Footer onStore={handleStore} onCreate={openCreate} onInfo={handleInfo} />

      {modal?.type === 'auth' && (
        <AuthModal
          initialMode={modal.mode}
          onClose={closeModal}
          onSuccess={handleAuthSuccess}
          onInfo={handleInfo}
        />
      )}

      {modal?.type === 'contact' && (
        <ContactModal racha={modal.racha} onClose={closeModal} onNotify={notify} />
      )}

      {modal?.type === 'create' && (
        <CreateRachaModal user={user} onClose={closeModal} onCreate={handleCreate} />
      )}

      <Toast toast={toast} onClose={() => setToast(null)} />
    </>
  )
}
