export default function StoreBadges({ onStore, className = '' }) {
  return (
    <div className={`store-badges ${className}`}>
      <button type="button" className="store-badge" onClick={() => onStore('Google Play')}>
        <svg viewBox="0 0 24 24" width="21" height="21" aria-hidden="true">
          <path d="M3.6 1.8c-.3.3-.5.8-.5 1.4v17.6c0 .6.2 1.1.5 1.4l.1.1 9.9-9.9v-.2L3.6 1.8z" fill="#00d3ff" />
          <path d="M16.9 15.7l-3.3-3.3v-.2l3.3-3.3.1.1 3.9 2.2c1.1.6 1.1 1.6 0 2.3l-4 2.2z" fill="#ffcf00" />
          <path d="M17 15.6l-3.4-3.4L3.6 22.2c.4.4 1 .4 1.7 0L17 15.6z" fill="#ff3a44" />
          <path d="M17 8.4L5.3.2c-.7-.4-1.3-.3-1.7 0l10 10.1L17 8.4z" fill="#00e676" />
        </svg>
        <span>
          <small>Disponível no</small>
          <strong>Google Play</strong>
        </span>
      </button>
      <button type="button" className="store-badge" onClick={() => onStore('App Store')}>
        <svg viewBox="0 0 24 24" width="21" height="21" fill="currentColor" aria-hidden="true">
          <path d="M16.37 1.43c0 1.14-.46 2.16-1.22 2.95-.83.86-2.18 1.52-3.29 1.42-.14-1.11.43-2.27 1.17-3.02.83-.86 2.25-1.47 3.34-1.35zM20.94 17.1c-.57 1.3-.85 1.88-1.59 3.03-1.02 1.6-2.47 3.6-4.26 3.61-1.6.02-2.01-1.04-4.18-1.03-2.16.01-2.61 1.06-4.21 1.04-1.79-.02-3.16-1.82-4.18-3.42C-.28 15.77-.6 10.3 1.23 7.43c1.3-2.03 3.35-3.22 5.28-3.22 1.96 0 3.2 1.08 4.82 1.08 1.57 0 2.53-1.08 4.8-1.08 1.71 0 3.52.93 4.81 2.54-4.23 2.32-3.54 8.36 0 10.35z" />
        </svg>
        <span>
          <small>Baixe na</small>
          <strong>App Store</strong>
        </span>
      </button>
    </div>
  )
}
