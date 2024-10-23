import { create } from 'zustand';

interface ThemeState {
    currentTheme: boolean,
    dispatch: {
        changeTheme: (theme: boolean) => void
    }
}

export let useTheme = create<ThemeState>((set) => ({
    currentTheme: false,
    dispatch: {
        changeTheme: (theme) => set(() => ({
            currentTheme: theme
        }))
    }
}))