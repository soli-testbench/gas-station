import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '../auth'
import { Fuel, LayoutDashboard, ArrowDownToLine, ArrowUpFromLine, LogOut } from 'lucide-react'
import clsx from 'clsx'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/deposit', label: 'Deposit', icon: ArrowDownToLine },
  { to: '/withdraw', label: 'Withdraw', icon: ArrowUpFromLine },
]

export default function Shell() {
  const { address, signOut } = useAuth()
  const location = useLocation()
  const shortAddr = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : ''

  return (
    <div className="min-h-screen bg-surface-0 flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border-dim bg-surface-1 flex flex-col fixed h-full">
        <div className="p-6 border-b border-border-dim">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-terminal-green/10 flex items-center justify-center glow-green">
              <Fuel className="w-5 h-5 text-terminal-green" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-zinc-100 font-display leading-tight">Gas Station</h1>
              <span className="text-xs text-zinc-500 font-mono">v0.1.0</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={clsx(
                'flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-150',
                location.pathname === to
                  ? 'bg-terminal-green/10 text-terminal-green glow-green'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-surface-2'
              )}
            >
              <Icon className="w-4 h-4" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-border-dim space-y-3">
          <div className="px-4 py-2 bg-surface-2 rounded-lg">
            <span className="text-xs text-zinc-500 block mb-0.5">Connected</span>
            <span className="text-sm font-mono text-terminal-cyan">{shortAddr}</span>
          </div>
          <button
            onClick={signOut}
            className="flex items-center gap-2 px-4 py-2 w-full text-sm text-zinc-400 hover:text-terminal-red transition-colors rounded-lg hover:bg-surface-2"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-64">
        <div className="p-8 max-w-5xl mx-auto animate-fade-in">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
