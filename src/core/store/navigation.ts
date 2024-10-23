import { create } from 'zustand';

interface NavigationState {
    currentPage: string | null,
    dispatch: {
        setPage: (page: string) => void
    }
}

export let useNavigation = create<NavigationState>((set) => ({
    currentPage: null,
    dispatch: {
        setPage: (page) => set(() => ({
            currentPage: page
        }))
    }
}))