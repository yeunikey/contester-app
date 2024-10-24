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

export let storedTheme = () => {
    if (typeof window !== 'undefined') {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
            return true;
        } else {
            document.documentElement.classList.remove('dark');
            return false;
        }
    }
    return false;
}