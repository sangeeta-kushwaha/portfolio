import { useState } from 'react'
import { profile } from '../data/profile'
import { cn } from '../utils/cn'

function initials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')
}

export function Portrait({ className }) {
  const [failed, setFailed] = useState(false)
  const photo = profile.photo?.trim()
  const showPhoto = Boolean(photo) && !failed

  return (
    <div className={cn('relative mx-auto w-full max-w-sm lg:mx-0', className)}>
      <div
        aria-hidden="true"
        className="absolute -top-5 -right-4 h-28 w-28 rounded-full border border-brand-500/30 motion-safe:animate-drift"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-brand-400/25 blur-2xl"
      />
      <div className="panel relative aspect-[4/5] overflow-hidden rounded-[2rem]">
        {showPhoto ? (
          <img
            src={photo}
            alt={`Portrait of ${profile.name}`}
            className="h-full w-full object-cover"
            width="640"
            height="800"
            decoding="async"
            fetchPriority="high"
            onError={() => setFailed(true)}
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgba(196,181,253,0.55),transparent_42%),linear-gradient(165deg,#221b45,#12122a)] text-white">
            <span className="font-display text-6xl font-bold tracking-tight">{initials(profile.name)}</span>
            <span className="mt-4 text-sm tracking-[0.16em] text-white/75 uppercase">{profile.title}</span>
          </div>
        )}
      </div>
    </div>
  )
}
