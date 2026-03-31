import clsx from 'clsx'

interface StatusDotProps {
  status: 'online' | 'pending' | 'offline'
}

const colors = {
  online: 'bg-terminal-green',
  pending: 'bg-terminal-amber',
  offline: 'bg-terminal-red',
}

export default function StatusDot({ status }: StatusDotProps) {
  return (
    <span className="relative flex h-2.5 w-2.5">
      <span className={clsx('animate-ping absolute inline-flex h-full w-full rounded-full opacity-75', colors[status])} />
      <span className={clsx('relative inline-flex rounded-full h-2.5 w-2.5', colors[status])} />
    </span>
  )
}
