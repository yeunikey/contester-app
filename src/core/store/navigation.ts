import { create } from 'zustand'

interface NavigationState {
  currentPage: string | null
  actions: {
    setPage: (page: string) => void
  }
}

export let useNavigation = create<NavigationState>((set) => ({
  currentPage: null,
  actions: {
    setPage: (page) =>
      set(() => ({
        currentPage: page
      }))
  }
}))
