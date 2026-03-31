import { useAccount, useBalance } from 'wagmi'
import { formatUnits } from 'viem'
import { Link } from 'react-router-dom'
import { ArrowDownToLine, ArrowUpFromLine, Activity, Fuel, TrendingUp, Clock } from 'lucide-react'
import Card from '../components/Card'
import StatusDot from '../components/StatusDot'

const mockTxHistory = [
  { id: 1, type: 'deposit', amount: '0.5', time: '2 min ago', status: 'confirmed' as const },
  { id: 2, type: 'withdraw', amount: '0.12', time: '1 hr ago', status: 'confirmed' as const },
  { id: 3, type: 'deposit', amount: '1.0', time: '3 hr ago', status: 'confirmed' as const },
  { id: 4, type: 'deposit', amount: '0.25', time: '1 day ago', status: 'confirmed' as const },
]

export default function Dashboard() {
  const { address } = useAccount()
  const { data: balance } = useBalance({ address })

  const ethBalance = balance ? parseFloat(formatUnits(balance.value, balance.decimals)).toFixed(4) : '0.0000'

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-zinc-100">Dashboard</h2>
          <div className="flex items-center gap-2 mt-1">
            <StatusDot status="online" />
            <span className="text-sm text-zinc-500 font-mono">mainnet · live</span>
          </div>
        </div>
        <div className="flex gap-3">
          <Link
            to="/deposit"
            className="flex items-center gap-2 px-4 py-2 bg-terminal-green/10 text-terminal-green rounded-lg hover:bg-terminal-green/20 transition-colors text-sm font-medium border border-terminal-green/20"
          >
            <ArrowDownToLine className="w-4 h-4" />
            Deposit
          </Link>
          <Link
            to="/withdraw"
            className="flex items-center gap-2 px-4 py-2 bg-surface-2 text-zinc-300 rounded-lg hover:bg-surface-3 transition-colors text-sm font-medium border border-border-dim"
          >
            <ArrowUpFromLine className="w-4 h-4" />
            Withdraw
          </Link>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-3 gap-4">
        <Card glow="green">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-zinc-500 font-mono uppercase tracking-wider">Balance</p>
              <p className="text-3xl font-bold text-zinc-100 mt-2 font-mono">{ethBalance}</p>
              <p className="text-sm text-zinc-500 mt-1">ETH</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-terminal-green/10 flex items-center justify-center">
              <Fuel className="w-5 h-5 text-terminal-green" />
            </div>
          </div>
        </Card>

        <Card glow="cyan">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-zinc-500 font-mono uppercase tracking-wider">Gas Price</p>
              <p className="text-3xl font-bold text-zinc-100 mt-2 font-mono">24</p>
              <p className="text-sm text-zinc-500 mt-1">gwei</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-terminal-cyan/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-terminal-cyan" />
            </div>
          </div>
        </Card>

        <Card glow="amber">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-zinc-500 font-mono uppercase tracking-wider">Transactions</p>
              <p className="text-3xl font-bold text-zinc-100 mt-2 font-mono">47</p>
              <p className="text-sm text-zinc-500 mt-1">all time</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-terminal-amber/10 flex items-center justify-center">
              <Activity className="w-5 h-5 text-terminal-amber" />
            </div>
          </div>
        </Card>
      </div>

      {/* Transaction history */}
      <Card>
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-sm font-semibold text-zinc-200 flex items-center gap-2">
            <Clock className="w-4 h-4 text-zinc-500" />
            Recent Activity
          </h3>
          <span className="text-xs text-zinc-600 font-mono">last 24h</span>
        </div>

        <div className="space-y-1">
          {mockTxHistory.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-surface-2/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  tx.type === 'deposit' ? 'bg-terminal-green/10' : 'bg-terminal-amber/10'
                }`}>
                  {tx.type === 'deposit' ? (
                    <ArrowDownToLine className="w-4 h-4 text-terminal-green" />
                  ) : (
                    <ArrowUpFromLine className="w-4 h-4 text-terminal-amber" />
                  )}
                </div>
                <div>
                  <span className="text-sm text-zinc-200 font-medium capitalize">{tx.type}</span>
                  <span className="text-xs text-zinc-600 block font-mono">{tx.time}</span>
                </div>
              </div>
              <div className="text-right">
                <span className={`text-sm font-mono font-medium ${
                  tx.type === 'deposit' ? 'text-terminal-green' : 'text-terminal-amber'
                }`}>
                  {tx.type === 'deposit' ? '+' : '-'}{tx.amount} ETH
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
