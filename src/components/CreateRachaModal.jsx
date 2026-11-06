import { useState } from 'react'
import { AlertCircle, CalendarDays, ChevronDown, MapPin, Trophy, UserRound } from 'lucide-react'
import Modal from './Modal'
import { LEVELS, SPORTS, defaultRachaDate, todayISO } from '../data/rachaData'

const initialState = {
  sport: 'Futsal',
  title: '',
  date: defaultRachaDate(),
  start: '19:00',
  end: '20:30',
  venue: '',
  total: '12',
  level: 'Todos os níveis',
  price: 'R$ 10',
  organizer: '',
  phone: '',
}

export default function CreateRachaModal({ user, onClose, onCreate }) {
  const [form, setForm] = useState({
    ...initialState,
    organizer: user?.name ?? '',
  })
  const [error, setError] = useState('')

  const update = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const total = Number(form.total)

    if (form.title.trim().length < 3) {
      setError('Dê um nome ao racha com pelo menos 3 caracteres.')
      return
    }
    if (!form.date || form.date < todayISO()) {
      setError('Escolha uma data a partir de hoje.')
      return
    }
    if (!form.start || !form.end || form.end <= form.start) {
      setError('O horário de término precisa ser depois do início.')
      return
    }
    if (form.venue.trim().length < 2) {
      setError('Informe o local do racha.')
      return
    }
    if (!Number.isFinite(total) || total < 2 || total > 100) {
      setError('A lista precisa ter entre 2 e 100 vagas.')
      return
    }

    onCreate({
      sport: form.sport,
      title: form.title.trim(),
      date: form.date,
      start: form.start,
      end: form.end,
      venue: form.venue.trim(),
      slots: 0,
      total,
      level: form.level,
      price: form.price.trim() || 'Grátis',
      organizer: form.organizer.trim() || 'Organizador Sport Match',
      phone: form.phone.replace(/\D/g, ''),
    })
  }

  return (
    <Modal onClose={onClose} titleId="create-modal-title" className="create-modal">
      <div className="modal-head">
        <span className="eyebrow">
          <i /> Novo racha
        </span>
        <h2 id="create-modal-title">Criar a lista do treino</h2>
        <p>Preencha os detalhes, publique e compartilhe o link com a galera.</p>
      </div>

      <form className="modal-form" onSubmit={handleSubmit} noValidate>
        <div className="form-row">
          <label className="field">
            <span>Esporte</span>
            <div className="field-control field-select">
              <Trophy size={17} aria-hidden="true" />
              <select value={form.sport} onChange={update('sport')}>
                {SPORTS.map((sport) => (
                  <option key={sport} value={sport}>
                    {sport}
                  </option>
                ))}
              </select>
              <ChevronDown size={16} className="select-chevron" aria-hidden="true" />
            </div>
          </label>

          <label className="field">
            <span>Nível</span>
            <div className="field-control field-select">
              <select value={form.level} onChange={update('level')}>
                {LEVELS.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
              <ChevronDown size={16} className="select-chevron" aria-hidden="true" />
            </div>
          </label>
        </div>

        <label className="field">
          <span>Nome do racha</span>
          <div className="field-control">
            <input
              type="text"
              value={form.title}
              onChange={update('title')}
              placeholder="Ex.: Racha da firma, Vôlei de quinta..."
              maxLength={48}
              data-autofocus
            />
          </div>
        </label>

        <div className="form-row">
          <label className="field">
            <span>Data</span>
            <div className="field-control">
              <CalendarDays size={17} aria-hidden="true" />
              <input type="date" value={form.date} min={todayISO()} onChange={update('date')} />
            </div>
          </label>

          <label className="field">
            <span>Vagas na lista</span>
            <div className="field-control">
              <input
                type="number"
                min="2"
                max="100"
                value={form.total}
                onChange={update('total')}
                inputMode="numeric"
              />
            </div>
          </label>
        </div>

        <div className="form-row">
          <label className="field">
            <span>Início</span>
            <div className="field-control">
              <input type="time" value={form.start} onChange={update('start')} />
            </div>
          </label>
          <label className="field">
            <span>Término</span>
            <div className="field-control">
              <input type="time" value={form.end} onChange={update('end')} />
            </div>
          </label>
        </div>

        <label className="field">
          <span>Local</span>
          <div className="field-control">
            <MapPin size={17} aria-hidden="true" />
            <input
              type="text"
              value={form.venue}
              onChange={update('venue')}
              placeholder="Ginásio, quadra ou arena"
              maxLength={52}
            />
          </div>
        </label>

        <div className="form-row">
          <label className="field">
            <span>Valor por jogador</span>
            <div className="field-control">
              <input
                type="text"
                value={form.price}
                onChange={update('price')}
                placeholder="R$ 15 ou Grátis"
                maxLength={16}
              />
            </div>
          </label>
          <label className="field">
            <span>Organizador</span>
            <div className="field-control">
              <UserRound size={17} aria-hidden="true" />
              <input
                type="text"
                value={form.organizer}
                onChange={update('organizer')}
                placeholder="Seu nome ou grupo"
                maxLength={40}
              />
            </div>
          </label>
        </div>

        <label className="field">
          <span>WhatsApp do organizador (opcional)</span>
          <div className="field-control">
            <input
              type="tel"
              value={form.phone}
              onChange={update('phone')}
              placeholder="(11) 99999-9999"
              maxLength={20}
            />
          </div>
        </label>

        {error && (
          <p className="form-error" role="alert">
            <AlertCircle size={15} aria-hidden="true" />
            {error}
          </p>
        )}

        <button type="submit" className="btn btn-lime btn-block modal-submit">
          Publicar racha
        </button>

        <p className="demo-note">
          O racha é publicado na hora e fica salvo apenas neste navegador.
        </p>
      </form>
    </Modal>
  )
}
