
import { create } from 'zustand';
import { IUser } from '../entities';

interface AuthState {
    authentificated: boolean,
    user: IUser | null,
    
    actions: {
        setAuthentificated: (authentificated: boolean) => void
        setUser: (user: IUser) => void
    }
}

export let useAuth = create<AuthState>((set) => ({
    authentificated: false,
    user: null,

    actions: {
        setAuthentificated: (authentificated) => set(() => ({
            authentificated: authentificated
        })),
        setUser: (user) => set(() => ({
            user: user
        }))
    }
}))