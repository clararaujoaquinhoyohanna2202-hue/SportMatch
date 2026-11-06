import { useId } from 'react'

/**
 * Marca do Sport Match: elipse em movimento, bola e linhas de velocidade.
 * O gradiente usa um id único para permitir várias instâncias na página.
 */
export default function Logo({ size = 44, className = '', title = 'Sport Match' }) {
  const rawId = useId()
  const gradientId = `sm-logo-${rawId.replace(/[^a-zA-Z0-9]/g, '')}`

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      role="img"
      aria-label={title}
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="8"
          y1="54"
          x2="58"
          y2="8"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#17b56b" />
          <stop offset=".55" stopColor="#9bf000" />
          <stop offset="1" stopColor="#ddff56" />
        </linearGradient>
      </defs>
      <g transform="rotate(-18 32 33)">
        <ellipse
          cx="30"
          cy="35"
          rx="22.5"
          ry="11.5"
          stroke={`url(#${gradientId})`}
          strokeWidth="4.5"
        />
      </g>
      <circle cx="45" cy="18" r="9.5" fill="#fff" />
      <path d="M45 12.2l3.6 2.6-1.3 4.2h-4.6l-1.3-4.2 3.6-2.6z" fill="#14075f" />
      <path
        d="M41.4 14.8v-2.2M48.6 14.8v-2.2M42.6 19.1l-2.1 1.3M47.4 19.1l2.1 1.3"
        stroke="#14075f"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M10.5 27.5h7.5M7 32.5h6.5M11 37.5h6"
        stroke={`url(#${gradientId})`}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  )
}
