import { useMemo, useState } from 'react'
import { cn } from '../utils/cn'

function hash(value) {
  return [...value].reduce((sum, char) => sum + char.charCodeAt(0), 0)
}

function GeneratedCover({ id }) {
  const n = hash(id || 'project')
  const palettes = [
    ['#ebe7ff', '#6d5ef5', '#17142e'],
    ['#f3e8ff', '#7c3aed', '#1a1030'],
    ['#e0e7ff', '#4f46e5', '#101426'],
    ['#fae8ff', '#8b5cf6', '#241433']
  ]
  const [ink, accent, ground] = palettes[n % palettes.length]
  const layout = n % 4

  return (
    <svg viewBox="0 0 640 400" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect width="640" height="400" fill={ground} />
      {layout === 0 && (
        <>
          <circle cx="500" cy="70" r="150" fill={accent} />
          <circle cx="70" cy="340" r="150" fill={ink} opacity="0.28" />
          <rect x="48" y="56" width="168" height="10" rx="5" fill={ink} />
          <rect x="48" y="80" width="112" height="8" rx="4" fill={ink} opacity="0.5" />
        </>
      )}
      {layout === 1 && (
        <>
          <circle cx="120" cy="80" r="90" fill={accent} />
          <rect x="280" y="70" width="280" height="18" rx="9" fill={ink} opacity="0.8" />
          <rect x="280" y="110" width="200" height="12" rx="6" fill={ink} opacity="0.4" />
          <rect x="48" y="230" width="544" height="110" rx="24" fill="#ffffff" opacity="0.08" />
        </>
      )}
      {layout === 2 && (
        <>
          <rect x="360" y="-40" width="220" height="480" fill={accent} opacity="0.85" transform="rotate(18 470 200)" />
          <circle cx="150" cy="200" r="70" fill="none" stroke={ink} strokeWidth="10" />
          <rect x="48" y="300" width="140" height="10" rx="5" fill={ink} />
        </>
      )}
      {layout === 3 && (
        <>
          <circle cx="540" cy="300" r="180" fill={accent} opacity="0.9" />
          <rect x="48" y="64" width="90" height="90" rx="22" fill={ink} opacity="0.85" />
          <rect x="156" y="64" width="90" height="90" rx="22" fill="#ffffff" opacity="0.12" />
          <rect x="48" y="172" width="198" height="12" rx="6" fill={ink} opacity="0.55" />
        </>
      )}
    </svg>
  )
}

export function ProjectCover({ project, className }) {
  const [failed, setFailed] = useState(false)
  const image = project.image?.trim()
  const showImage = Boolean(image) && !failed
  const cover = useMemo(() => <GeneratedCover id={project.id} />, [project.id])

  return (
    <div className={cn('relative aspect-[16/10] overflow-hidden bg-[#141226]', className)} aria-hidden="true">
      {showImage ? (
        <img
          src={image}
          alt=""
          loading="lazy"
          decoding="async"
          width="640"
          height="400"
          className="h-full w-full object-cover motion-safe:transition motion-safe:duration-500 motion-safe:group-hover:scale-[1.03]"
          onError={() => setFailed(true)}
        />
      ) : (
        cover
      )}
    </div>
  )
}
