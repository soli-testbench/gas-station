import { createConfig, http } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { getDefaultConfig } from 'connectkit'

export const config = createConfig(
  getDefaultConfig({
    chains: [mainnet, sepolia],
    transports: {
      [mainnet.id]: http(),
      [sepolia.id]: http(),
    },
    walletConnectProjectId: import.meta.env.VITE_WC_PROJECT_ID || 'demo',
    appName: 'Gas Station',
    appDescription: 'Gas Station — deposit & withdraw',
  }),
)

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
