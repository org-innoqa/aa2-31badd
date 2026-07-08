interface LogoProps {
  className?: string
}

export default function Logo({ className = 'w-9 h-9' }: LogoProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="zosLogoGrad" x1="2" y1="2" x2="38" y2="38" gradientUnits="userSpaceOnUse">
          <stop stopColor="#e879f9" />
          <stop offset="0.5" stopColor="#a855f7" />
          <stop offset="1" stopColor="#6366f1" />
        </linearGradient>
        <linearGradient id="zosLogoInner" x1="8" y1="6" x2="30" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff" stopOpacity="0.95" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.55" />
        </linearGradient>
      </defs>

      {/* Chat bubble silhouette with a small tail, representing conversation */}
      <path
        d="M8 4h24a6 6 0 0 1 6 6v14a6 6 0 0 1-6 6H16.5L8 37v-7H8a6 6 0 0 1-6-6V10a6 6 0 0 1 6-6Z"
        fill="url(#zosLogoGrad)"
      />

      {/* Time-vortex swirl inside the bubble, representing traveling through history */}
      <path
        d="M20 10.5a6.5 6.5 0 1 1-6.13 8.62"
        stroke="url(#zosLogoInner)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M20 13.6a3.4 3.4 0 1 1-3.2 4.5"
        stroke="url(#zosLogoInner)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="20" cy="17" r="1.4" fill="#fde047" />

      {/* Sparkle accent, top-right */}
      <path
        d="M30.5 6.5l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9.9-2.1Z"
        fill="#fde047"
      />
    </svg>
  )
}
