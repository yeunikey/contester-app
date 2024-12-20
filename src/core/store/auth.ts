import { create } from 'zustand'

import { IUser } from '../entities'

interface AuthState {
  authenticated: boolean
  user: IUser | null

  actions: {
    setAuthenticated: (authenticated: boolean) => void
    setUser: (user: IUser) => void
  }
}

export let useAuth = create<AuthState>((set) => ({
  authenticated: false,
  user: null,

  actions: {
    setAuthenticated: (authenticated) =>
      set(() => ({
        authenticated: authenticated
      })),
    setUser: (user) =>
      set(() => ({
        user: user
      }))
  }
}))
