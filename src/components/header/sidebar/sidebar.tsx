'use client'

import { useRouter } from 'next/navigation';
import { MouseEventHandler, useState } from 'react';

import Button from '@/components/button/Button';
import { pages } from '@/core/constants/pages';

import CloseIcon from '../../../_assets/icons/close.svg';
import LoginIcon from '../../../_assets/icons/login.svg';
import ThemeIcon from '../../../_assets/icons/theme.svg';
import s from './sidebar.module.css';
import { useTheme } from '@/core/store/theme';

function Sidebar({ toggle }: { toggle: any }) {
    
    const [darkMode, setDarkMode] = useState(() => {
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
    });
    let dispatch = useTheme((state) => state.dispatch)

    const toggleDark = () => {
        if (typeof window !== 'undefined') {
            const isDark = !darkMode;
            setDarkMode(isDark);
            dispatch.changeTheme(isDark)
            let themeColorMeta = document.querySelector('meta[name="theme-color"]');
            
            if (isDark) {
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
                if (!themeColorMeta) return;
                themeColorMeta.setAttribute('content', '#363636');
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
                if (!themeColorMeta) return;
                themeColorMeta.setAttribute('content', '#FFFFFF');
            }
        }
    };

    const exit = () => {
        toggle()
    }

    const nothing = (event: any) => {
        event.stopPropagation();
    }

    return (
        <div className={s.sidebar} onClick={exit}>

            <div className={s.content} onClick={(event) => nothing(event)}>
                <div className={s.sidebar__upper}>
                    <div className={s.sidebar__title}>
                        Sidebar
                    </div>
                    <div className={s.sidebar__close} onClick={toggle}>
                        <CloseIcon className={s.sidebar__close__icon}></CloseIcon>
                    </div>
                </div>

                <div className={s.sidebar__items}>
                    {pages.map((page, i) => {
                        return (<Item key={i} text={page.page} href={page.href}></Item>)
                    })}
                </div>

                <div className={s.sidebar__actions}>
                    <div className={s.theme} onClick={toggleDark}>
                        <ThemeIcon className={s.theme__icon} alt='theme'></ThemeIcon>
                    </div>
                    <Button text='Login'
                        className={s.button}
                        icon={<LoginIcon alt='login'></LoginIcon>}
                        href='/auth'
                    ></Button>
                </div>
            </div>

        </div>
    )
}

function Item({ text, href }: { text: string, href?: string }) {

    let router = useRouter();

    const push = () => {
        if (!href) return;
        router.push(href);
    }

    return (
        <div className={s.sidebar__item} onClick={push}>
            {text}
        </div>
    )
}

export default Sidebar;