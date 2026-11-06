import { ChevronRight, ListChecks, Search, UserPlus } from 'lucide-react'

const STEPS = [
  {
    icon: UserPlus,
    title: 'Crie sua conta',
    text: 'Cadastro rápido e gratuito. Monte seu perfil, escolha seus esportes e fique pronto para o próximo match.',
    action: 'Criar conta',
  },
  {
    icon: Search,
    title: 'Encontre seu racha',
    text: 'Busque por esporte, dia e local. Veja vagas, nível do treino, preço e a avaliação de quem já joga junto.',
    action: 'Ver rachas',
  },
  {
    icon: ListChecks,
    title: 'Entre na lista',
    text: 'Confirme presença em um clique. Se a lista lotar, entre na fila e seja avisado assim que abrir vaga.',
    action: 'Como funciona',
  },
]

export default function Guide({ onSignup, onExplore }) {
  return (
    <section className="section guide-section" id="guia">
      <div className="container">
        <div className="section-head section-head-center">
          <span className="eyebrow">
            <i /> Guia Sport Match
          </span>
          <h2>
            Do cadastro ao jogo <br />
            em <em>3 passos</em>
          </h2>
          <p>
            Sem grupo de WhatsApp perdido, sem planilha, sem dúvida na hora de fechar o time.
            O Sport Match organiza o caminho até a quadra.
          </p>
        </div>

        <div className="guide-grid">
          {STEPS.map((step, index) => {
            const Icon = step.icon
            return (
              <article className="guide-step" key={step.title}>
                <span className="guide-number" aria-hidden="true">
                  0{index + 1}
                </span>
                <span className="guide-icon">
                  <Icon size={23} aria-hidden="true" />
                </span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
                <button
                  type="button"
                  className="text-link"
                  onClick={index === 0 ? onSignup : onExplore}
                >
                  {step.action}
                  <ChevronRight size={15} aria-hidden="true" />
                </button>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
