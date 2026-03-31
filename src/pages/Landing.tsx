import { ConnectKitButton } from 'connectkit'
import { useAccount } from 'wagmi'
import { useAuth } from '../auth'
import { Fuel, Terminal, Zap, Shield } from 'lucide-react'

export default function Landing() {
  const { isConnected } = useAccount()
  const { signIn, isSigningIn } = useAuth()

  return (
    <div className="min-h-screen bg-surface-0 flex flex-col">
      {/* Header */}
      <header className="border-b border-border-dim bg-surface-1/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-terminal-green/10 flex items-center justify-center glow-green">
              <Fuel className="w-5 h-5 text-terminal-green" />
            </div>
            <span className="text-lg font-semibold text-zinc-100">Gas Station</span>
          </div>
          <ConnectKitButton />
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-2xl text-center space-y-10 animate-fade-in">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-terminal-green/20 bg-terminal-green/5 text-terminal-green text-sm font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-terminal-green cursor-blink" />
              SYSTEM ONLINE
            </div>

            <h1 className="text-5xl sm:text-6xl font-bold text-zinc-100 leading-[1.1] tracking-tight">
              Fuel your
              <br />
              <span className="text-terminal-green">transactions</span>
            </h1>

            <p className="text-lg text-zinc-400 max-w-md mx-auto leading-relaxed">
              Deposit ETH, manage gas reserves, and withdraw on demand.
              Terminal-grade control for your wallet.
            </p>
          </div>

          {/* CTA */}
          <div className="space-y-4">
            {!isConnected ? (
              <ConnectKitButton.Custom>
                {({ show }) => (
                  <button
                    onClick={show}
                    className="px-8 py-3.5 bg-terminal-green text-black font-semibold rounded-lg hover:brightness-110 transition-all glow-green text-base"
                  >
                    Connect Wallet
                  </button>
                )}
              </ConnectKitButton.Custom>
            ) : (
              <button
                onClick={signIn}
                disabled={isSigningIn}
                className="px-8 py-3.5 bg-terminal-green text-black font-semibold rounded-lg hover:brightness-110 transition-all glow-green text-base disabled:opacity-50"
              >
                {isSigningIn ? 'Signing...' : 'Sign In with Ethereum'}
              </button>
            )}
            <p className="text-xs text-zinc-600 font-mono">
              EIP-4361 · SIWE Authentication
            </p>
          </div>

          {/* Feature grid */}
          <div className="grid grid-cols-3 gap-4 pt-8 border-t border-border-dim">
            {[
              { icon: Terminal, label: 'Terminal UI', desc: 'Dark, focused interface' },
              { icon: Zap, label: 'Instant', desc: 'Real-time gas tracking' },
              { icon: Shield, label: 'Secure', desc: 'Sign-in with Ethereum' },
            ].map(({ icon: Icon, label, desc }) => (
              <div key={label} className="p-4 rounded-lg bg-surface-1 border border-border-dim text-left">
                <Icon className="w-5 h-5 text-terminal-green mb-3" />
                <div className="text-sm font-medium text-zinc-200">{label}</div>
                <div className="text-xs text-zinc-500 mt-0.5">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border-dim py-6 text-center">
        <span className="text-xs text-zinc-600 font-mono">gas-station v0.1.0 · powered by ethereum</span>
      </footer>
    </div>
  )
}
