import { Check, Clock, MapPin, MessageCircle, Plus, Search, Trophy, Users, Wallet, X } from 'lucide-react'
import { SPORT_ACRONYMS, SPORTS, getDateParts } from '../data/rachaData'

function RachaCard({ racha, joined, onJoin, onContact }) {
  const parts = getDateParts(racha.date)
  const count = Math.min(racha.slots + (joined ? 1 : 0), racha.total)
  const rawCount = racha.slots + (joined ? 1 : 0)
  const percent = Math.min(Math.round((rawCount / racha.total) * 100), 100)
  const remaining = Math.max(racha.total - rawCount, 0)
  const isCustom = racha.id.startsWith('custom-')

  return (
    <article className={`racha-card ${joined ? 'is-joined' : ''}`}>
      <div className="racha-card-head">
        <span className="sport-badge" aria-hidden="true">
          {SPORT_ACRONYMS[racha.sport] ?? racha.sport.slice(0, 2).toUpperCase()}
        </span>
        <div className="racha-heading">
          <div className="racha-labels">
            <span>{racha.sport}</span>
            {isCustom && <b className="tag-new">Novo</b>}
            {joined && (
              <b className="tag-joined">
                <Check size={11} strokeWidth={3} /> Na lista
              </b>
            )}
          </div>
          <h3>{racha.title}</h3>
        </div>
        <div className="racha-date">
          <strong>{parts.weekday}</strong>
          <span>{parts.short}</span>
        </div>
      </div>

      <div className="racha-meta">
        <span>
          <Clock size={15} aria-hidden="true" />
          {racha.start} – {racha.end}
        </span>
        <span>
          <MapPin size={15} aria-hidden="true" />
          {racha.venue}
        </span>
        <span>
          <Trophy size={15} aria-hidden="true" />
          {racha.level}
        </span>
        <span>
          <Wallet size={15} aria-hidden="true" />
          {racha.price}
        </span>
      </div>

      <div className="racha-slots">
        <div className="slots-labels">
          <span>
            <Users size={15} aria-hidden="true" />
            {Math.min(count, racha.total)}/{racha.total} jogadores
          </span>
          <strong className={remaining === 0 ? 'is-full' : ''}>
            {remaining === 0 ? 'Lista cheia' : `${remaining} ${remaining === 1 ? 'vaga' : 'vagas'}`}
          </strong>
        </div>
        <div
          className="slots-track"
          role="progressbar"
          aria-label={`Ocupação da lista de ${racha.title}`}
          aria-valuemin="0"
          aria-valuemax={racha.total}
          aria-valuenow={Math.min(rawCount, racha.total)}
        >
          <span style={{ width: `${percent}%` }} />
        </div>
      </div>

      <div className="racha-actions">
        <button
          type="button"
          className={`btn btn-lime racha-join ${joined ? 'is-joined' : ''}`}
          onClick={() => onJoin(racha)}
        >
          {joined ? <Check size={16} strokeWidth={3} aria-hidden="true" /> : <Plus size={16} aria-hidden="true" />}
          {joined ? 'Você está na lista' : 'Entrar na lista'}
        </button>
        <button type="button" className="btn btn-ghost racha-contact" onClick={() => onContact(racha)}>
          <MessageCircle size={16} aria-hidden="true" />
          Falar com o organizador
        </button>
      </div>
    </article>
  )
}

export default function ListingSection({
  rachas,
  joinedIds,
  query,
  onQueryChange,
  sport,
  onSportChange,
  onJoin,
  onContact,
  onCreate,
  onClearFilters,
}) {
  return (
    <section className="section listing-section" id="rachas">
      <div className="container">
        <div className="section-head listing-head">
          <div>
            <span className="eyebrow">
              <i /> Buscar rachas
            </span>
            <h2>
              Escolha seu próximo <em>match</em>
            </h2>
            <p>
              Rachas perto de você, com vaga aberta e gente pronta para jogar. Filtre por esporte
              e entre na lista.
            </p>
          </div>
          <button type="button" className="btn btn-outline" onClick={onCreate}>
            <Plus size={18} aria-hidden="true" />
            Criar racha
          </button>
        </div>

        <div className="listing-toolbar">
          <label className="search-field">
            <Search size={18} aria-hidden="true" />
            <span className="sr-only">Buscar racha por nome, local ou organizador</span>
            <input
              type="search"
              placeholder="Buscar por nome, local ou organizador..."
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
            />
            {query && (
              <button
                type="button"
                className="search-clear"
                aria-label="Limpar busca"
                onClick={() => onQueryChange('')}
              >
                <X size={15} />
              </button>
            )}
          </label>

          <div className="filter-chips" role="group" aria-label="Filtrar rachas por esporte">
            <button
              type="button"
              className={`filter-chip ${sport === 'Todos' ? 'is-active' : ''}`}
              onClick={() => onSportChange('Todos')}
            >
              Todos
            </button>
            {SPORTS.map((item) => (
              <button
                type="button"
                key={item}
                className={`filter-chip ${sport === item ? 'is-active' : ''}`}
                onClick={() => onSportChange(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="listing-meta">
          <span>
            <strong>{rachas.length}</strong> {rachas.length === 1 ? 'racha encontrado' : 'rachas encontrados'}
          </span>
          <span className="listing-live">
            <i aria-hidden="true" /> Atualizado agora
          </span>
        </div>

        {rachas.length > 0 ? (
          <div className="rachas-grid">
            {rachas.map((racha) => (
              <RachaCard
                key={racha.id}
                racha={racha}
                joined={joinedIds.includes(racha.id)}
                onJoin={onJoin}
                onContact={onContact}
              />
            ))}
          </div>
        ) : (
          <div className="listing-empty">
            <span className="empty-icon">
              <Search size={26} aria-hidden="true" />
            </span>
            <h3>Nenhum racha por aqui… ainda.</h3>
            <p>
              Não encontramos rachas com esses filtros. Tente outro esporte, local ou crie o seu
              próprio racha.
            </p>
            <div className="empty-actions">
              <button type="button" className="btn btn-lime" onClick={onClearFilters}>
                Limpar filtros
              </button>
              <button type="button" className="btn btn-ghost" onClick={onCreate}>
                <Plus size={17} /> Criar racha
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
