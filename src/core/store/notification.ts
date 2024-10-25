
import { create } from 'zustand';

interface NotificationState {
    content: string,
    type: 'green' | 'red',
    
    actions: {
        setNotification: (notification: { content: string, type: 'green' | 'red'}) => void
        resetNotification: () => void,
    }
}

export let useNotification = create<NotificationState>((set) => ({
    content: '',
    type: 'green',

    actions: {
        setNotification: (notification: any) => set((state) => {
            if (state.content !== '') {
                return state;
            }

            return notification;
        }),
        resetNotification: () => set(() => ({
            content: '',
            type: 'green'
        }))

    }
}))