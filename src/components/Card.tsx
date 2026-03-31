import clsx from 'clsx'
import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  glow?: 'green' | 'amber' | 'cyan'
}

export default function Card({ children, className, glow }: CardProps) {
  return (
    <div
      className={clsx(
        'relative rounded-xl border border-border-dim bg-surface-1 p-6 scanlines overflow-hidden',
        glow === 'green' && 'glow-green',
        glow === 'amber' && 'glow-amber',
        glow === 'cyan' && 'glow-cyan',
        className
      )}
    >
      {children}
    </div>
  )
}
