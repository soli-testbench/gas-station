import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'
import { useAccount, useSignMessage, useDisconnect } from 'wagmi'
import { SiweMessage } from './siwe'

interface AuthState {
  isAuthenticated: boolean
  address: string | undefined
  signIn: () => Promise<void>
  signOut: () => void
  isSigningIn: boolean
}

const AuthContext = createContext<AuthState>({
  isAuthenticated: false,
  address: undefined,
  signIn: async () => {},
  signOut: () => {},
  isSigningIn: false,
})

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const { address, isConnected, chain } = useAccount()
  const { signMessageAsync } = useSignMessage()
  const { disconnect } = useDisconnect()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isSigningIn, setIsSigningIn] = useState(false)

  useEffect(() => {
    if (!isConnected) {
      setIsAuthenticated(false)
    }
  }, [isConnected])

  const signIn = useCallback(async () => {
    if (!address || !chain) return
    setIsSigningIn(true)
    try {
      const nonce = crypto.randomUUID()
      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: 'Sign in to Gas Station',
        uri: window.location.origin,
        version: '1',
        chainId: chain.id,
        nonce,
      })

      const messageStr = message.prepareMessage()
      await signMessageAsync({ message: messageStr })
      setIsAuthenticated(true)
    } catch {
      setIsAuthenticated(false)
    } finally {
      setIsSigningIn(false)
    }
  }, [address, chain, signMessageAsync])

  const signOut = useCallback(() => {
    setIsAuthenticated(false)
    disconnect()
  }, [disconnect])

  return (
    <AuthContext.Provider value={{ isAuthenticated, address, signIn, signOut, isSigningIn }}>
      {children}
    </AuthContext.Provider>
  )
}
