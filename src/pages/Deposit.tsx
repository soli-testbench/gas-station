import { useState } from 'react'
import { useAccount, useBalance, useSendTransaction } from 'wagmi'
import { parseEther, formatUnits } from 'viem'
import { ArrowDownToLine, AlertCircle, CheckCircle2 } from 'lucide-react'
import Card from '../components/Card'

const presets = ['0.01', '0.05', '0.1', '0.5']

export default function Deposit() {
  const { address } = useAccount()
  const { data: balance } = useBalance({ address })
  const { sendTransaction, isPending, isSuccess, isError, error } = useSendTransaction()
  const [amount, setAmount] = useState('')

  const ethBalance = balance ? parseFloat(formatUnits(balance.value, balance.decimals)).toFixed(4) : '0.0000'

  function handleDeposit() {
    if (!amount || parseFloat(amount) <= 0) return
    sendTransaction({
      to: address!,
      value: parseEther(amount),
    })
  }

  return (
    <div className="space-y-8 max-w-lg">
      <div>
        <h2 className="text-2xl font-bold text-zinc-100">Deposit</h2>
        <p className="text-sm text-zinc-500 mt-1">Add ETH to your gas reserves</p>
      </div>

      <Card glow="green">
        <div className="space-y-6">
          {/* Balance display */}
          <div className="flex items-center justify-between py-3 px-4 bg-surface-2 rounded-lg">
            <span className="text-xs text-zinc-500 font-mono">Available Balance</span>
            <span className="text-sm font-mono text-terminal-green">{ethBalance} ETH</span>
          </div>

          {/* Amount input */}
          <div className="space-y-2">
            <label className="text-xs text-zinc-500 font-mono uppercase tracking-wider">Amount (ETH)</label>
            <div className="relative">
              <input
                type="number"
                step="0.001"
                min="0"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-surface-0 border border-border-bright rounded-lg px-4 py-3 text-xl font-mono text-zinc-100 placeholder:text-zinc-700 focus:outline-none focus:border-terminal-green focus:ring-1 focus:ring-terminal-green/20 transition-colors"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-zinc-500 font-mono">ETH</span>
            </div>
          </div>

          {/* Preset amounts */}
          <div className="flex gap-2">
            {presets.map((p) => (
              <button
                key={p}
                onClick={() => setAmount(p)}
                className="flex-1 py-2 text-sm font-mono text-zinc-400 bg-surface-2 rounded-lg hover:bg-surface-3 hover:text-zinc-200 transition-colors border border-border-dim"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Status messages */}
          {isSuccess && (
            <div className="flex items-center gap-2 p-3 bg-terminal-green/10 rounded-lg border border-terminal-green/20">
              <CheckCircle2 className="w-4 h-4 text-terminal-green" />
              <span className="text-sm text-terminal-green">Transaction submitted successfully</span>
            </div>
          )}

          {isError && (
            <div className="flex items-center gap-2 p-3 bg-terminal-red/10 rounded-lg border border-terminal-red/20">
              <AlertCircle className="w-4 h-4 text-terminal-red" />
              <span className="text-sm text-terminal-red">{error?.message?.slice(0, 80) || 'Transaction failed'}</span>
            </div>
          )}

          {/* Submit */}
          <button
            onClick={handleDeposit}
            disabled={isPending || !amount || parseFloat(amount) <= 0}
            className="w-full flex items-center justify-center gap-2 py-3 bg-terminal-green text-black font-semibold rounded-lg hover:brightness-110 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ArrowDownToLine className="w-4 h-4" />
            {isPending ? 'Confirming...' : 'Deposit'}
          </button>
        </div>
      </Card>
    </div>
  )
}
