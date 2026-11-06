export const SPORTS = [
  'Futsal',
  'Basquete',
  'Vôlei',
  'Handebol',
  'Beach Tennis',
  'Futevôlei',
]

export const LEVELS = ['Todos os níveis', 'Iniciante', 'Intermediário', 'Avançado']

export const INITIAL_RACHAS = [
  {
    id: 'racha-1',
    sport: 'Basquete',
    title: 'Basquete Picui',
    date: '2026-10-24',
    start: '15:00',
    end: '18:30',
    venue: 'Gin. Lordão',
    slots: 10,
    total: 15,
    level: 'Intermediário',
    price: 'R$ 15',
    organizer: 'Picui Basketball',
    phone: '5511998765432',
  },
  {
    id: 'racha-2',
    sport: 'Futsal',
    title: 'Treino dos gordos',
    date: '2026-10-26',
    start: '20:00',
    end: '21:00',
    venue: 'Gin. PS',
    slots: 12,
    total: 18,
    level: 'Iniciante',
    price: 'R$ 10',
    organizer: 'Gordos FC',
    phone: '5511987654321',
  },
  {
    id: 'racha-3',
    sport: 'Vôlei',
    title: 'Vôlei - Vila',
    date: '2026-10-28',
    start: '17:00',
    end: '19:00',
    venue: 'Gin. Vila',
    slots: 8,
    total: 12,
    level: 'Todos os níveis',
    price: 'Grátis',
    organizer: 'Vôlei Vila',
    phone: '5511976543210',
  },
  {
    id: 'racha-4',
    sport: 'Handebol',
    title: 'Handebol FITG',
    date: '2026-10-28',
    start: '18:00',
    end: '19:00',
    venue: 'Gin. FITG',
    slots: 10,
    total: 15,
    level: 'Avançado',
    price: 'R$ 12',
    organizer: 'FITG Handebol',
    phone: '5511965432109',
  },
  {
    id: 'racha-5',
    sport: 'Futsal',
    title: 'Racha quarta-feira',
    date: '2026-10-28',
    start: '19:00',
    end: '20:00',
    venue: 'Gin. FITG',
    slots: 14,
    total: 18,
    level: 'Intermediário',
    price: 'R$ 12',
    organizer: 'Racha FITG',
    phone: '5511954321098',
  },
  {
    id: 'racha-6',
    sport: 'Beach Tennis',
    title: 'Beach Tennis — Arena 003',
    date: '2026-10-31',
    start: '18:00',
    end: '20:00',
    venue: 'Arena 003',
    slots: 6,
    total: 8,
    level: 'Iniciante',
    price: 'R$ 25',
    organizer: 'Arena 003',
    phone: '5511943210987',
  },
  {
    id: 'racha-7',
    sport: 'Futevôlei',
    title: 'Futevôlei do pôr do sol',
    date: '2026-11-01',
    start: '16:30',
    end: '18:00',
    venue: 'Arena da Praia',
    slots: 5,
    total: 8,
    level: 'Todos os níveis',
    price: 'R$ 20',
    organizer: 'Sunset Beach',
    phone: '5511932109876',
  },
  {
    id: 'racha-8',
    sport: 'Basquete',
    title: 'Basquete 3x3 da leste',
    date: '2026-11-03',
    start: '19:30',
    end: '21:30',
    venue: 'Quadra do CEU',
    slots: 7,
    total: 12,
    level: 'Intermediário',
    price: 'R$ 8',
    organizer: 'Leste 3x3',
    phone: '5511921098765',
  },
]

export const SPORT_ACRONYMS = {
  Futsal: 'FS',
  Basquete: 'BK',
  'Vôlei': 'VL',
  Handebol: 'HB',
  'Beach Tennis': 'BT',
  'Futevôlei': 'FV',
}

const WEEKDAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

export function getDateParts(iso) {
  const [year, month, day] = iso.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  return {
    weekday: WEEKDAYS[date.getDay()],
    short: `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}`,
  }
}

export function todayISO() {
  const now = new Date()
  const offset = now.getTimezoneOffset()
  return new Date(now.getTime() - offset * 60000).toISOString().slice(0, 10)
}

export function defaultRachaDate() {
  const date = new Date()
  date.setDate(date.getDate() + 2)
  const offset = date.getTimezoneOffset()
  return new Date(date.getTime() - offset * 60000).toISOString().slice(0, 10)
}
