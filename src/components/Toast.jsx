import { CheckCircle2, Info, X } from 'lucide-react'

export default function Toast({ toast, onClose }) {
  return (
    <div className="toast-region" aria-live="polite" aria-atomic="true">
      {toast && (
        <div className={`toast toast-${toast.tone}`} key={toast.id} role="status">
          <span className="toast-icon">
            {toast.tone === 'success' ? <CheckCircle2 size={19} /> : <Info size={19} />}
          </span>
          <p>{toast.message}</p>
          <button type="button" onClick={onClose} aria-label="Fechar aviso">
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  )
}
