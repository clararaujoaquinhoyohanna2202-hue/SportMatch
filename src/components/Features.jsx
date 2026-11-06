import {
  Bell,
  CreditCard,
  LayoutDashboard,
  ListChecks,
  Star,
  Users,
} from 'lucide-react'

const FEATURES = [
  {
    icon: Users,
    title: 'Lista em tempo real',
    text: 'Vagas atualizadas na hora. Você sabe exatamente quem confirmou e quantos ainda faltam para fechar o time.',
  },
  {
    icon: ListChecks,
    title: 'Fila de espera inteligente',
    text: 'Se a lista lotar, entre na fila e receba um aviso automático quando alguém abrir vaga.',
  },
  {
    icon: Star,
    title: 'Avaliações reais',
    text: 'Reputação de jogadores e organizadores construída a cada racha. Transparência para escolher bem.',
  },
  {
    icon: CreditCard,
    title: 'Pagamento integrado',
    text: 'Garanta sua vaga com Pix ou cartão. Sem dinheiro perdido e sem cobrança na porta da quadra.',
  },
  {
    icon: LayoutDashboard,
    title: 'Painel do organizador',
    text: 'Crie rachas, controle presenças, vagas e cobranças em um só lugar. Menos grupo, mais jogo.',
  },
  {
    icon: Bell,
    title: 'Notificações no ponto',
    text: 'Lembretes do racha, confirmação de vaga e avisos direto no seu celular. Nunca mais perca o horário.',
  },
]

export default function Features() {
  return (
    <section className="section features-section" id="funcionalidades">
      <div className="container">
        <div className="section-head features-head">
          <div>
            <span className="eyebrow">
              <i /> Funcionalidades
            </span>
            <h2>
              Tudo que um racha <em>precisa</em>
            </h2>
          </div>
          <p>
            Do primeiro “bora jogar?” à confirmação na quadra. Uma experiência pensada para quem
            joga e para quem organiza.
          </p>
        </div>

        <div className="features-grid">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon
            return (
              <article className="feature-card" key={feature.title}>
                <span className="feature-index" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="feature-icon">
                  <Icon size={23} aria-hidden="true" />
                </span>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
