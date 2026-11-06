const ITEMS = [
  'Futsal',
  'Basquete',
  'Vôlei',
  'Handebol',
  'Beach Tennis',
  'Futevôlei',
  'Futsal',
  'Basquete',
  'Vôlei',
  'Handebol',
  'Beach Tennis',
  'Futevôlei',
]

export default function SportsMarquee() {
  return (
    <div className="sports-marquee" aria-hidden="true">
      <div className="marquee-track">
        {ITEMS.map((sport, index) => (
          <span key={`${sport}-${index}`}>
            {sport}
            <i>✦</i>
          </span>
        ))}
      </div>
    </div>
  )
}
