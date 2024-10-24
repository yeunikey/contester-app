'use client'

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { pages } from '@/core/constants/pages';
import { storedTheme, useTheme } from '@/core/store/theme';

import LoginIcon from '../../_assets/icons/login.svg';
import ThemeIcon from '../../_assets/icons/theme.svg';
import logo from '../../_assets/logo.png';
import Button from '../button/Button';
import Container from '../container/container';
import Burger from './burger/burger';
import s from './header.module.css';
import { useNavigation } from '@/core/store/navigation';

function Header() {
    return (
        <Container
            parent={s.header}
            content={s.content}
        >
            <Side>
                <Company></Company>
                <Links></Links>
            </Side>

            <Side>
                <Action></Action>
            </Side>
        </Container>
    );
}

function Side({ children }: { children: any }) {
    return (
        <div className={s.side}>
            {children}
        </div>
    )
}

/* First side */

function Company() {
    return (
        <Link className={s.company} href={'/'}>
            <Image className={s.company__logo} src={logo} alt='logo'></Image>
            <div className={s.company__name}>
                CONTESTER
            </div>
        </Link>
    )
}

function Links() {
    return (
        <div className={s.links}>
            {pages.map((page, i) => {
                return (<LinkItem key={i} id={page.key} text={page.page} href={page.href} />)
            })}
        </div>
    )
}

function LinkItem({ text, href, id }: { text: string, id: string, href: string }) {
    
    let navigation = useNavigation((state) => state.actions);

    return (
        <Link className={s.link} href={href} onClick={() => navigation.setPage(id)}>
            {text}
        </Link>
    )
}

function Action() {

    const [darkMode, setDarkMode] = useState(() => storedTheme());

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

    return (
        <>
            <Burger></Burger>

            <div className={s.theme} onClick={toggleDark}>
                <ThemeIcon className={s.theme__icon} alt='theme'></ThemeIcon>
            </div>
            <Button text='Login'
                className={s.button}
                icon={<LoginIcon alt='login'></LoginIcon>}
                href='/auth'
            ></Button>
        </>
    )
}

export default Header;