'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { MouseEventHandler, useState } from 'react'

import Button from '@/components/button/Button'

import CloseIcon from '../../../_assets/icons/close.svg'
import LoginIcon from '../../../_assets/icons/login.svg'
import ThemeIcon from '../../../_assets/icons/theme.svg'

import s from './sidebar.module.css'
import { pages } from '@/core/constants/pages'
import { useAuth } from '@/core/store/auth'
import { useNavigation } from '@/core/store/navigation'
import { storedTheme, useTheme } from '@/core/store/theme'

function Sidebar({ toggle }: { toggle: any }) {
  const [darkMode, setDarkMode] = useState(() => storedTheme())
  let dispatch = useTheme((state) => state.dispatch)
  let auth = useAuth()
  let navigation = useNavigation()

  const toggleDark = () => {
    if (typeof window !== 'undefined') {
      const isDark = !darkMode
      setDarkMode(isDark)
      dispatch.changeTheme(isDark)
      let themeColorMeta = document.querySelector('meta[name="theme-color"]')

      if (isDark) {
        document.documentElement.classList.add('dark')
        localStorage.setItem('theme', 'dark')
        if (!themeColorMeta) return
        themeColorMeta.setAttribute('content', '#363636')
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('theme', 'light')
        if (!themeColorMeta) return
        themeColorMeta.setAttribute('content', '#FFFFFF')
      }
    }
  }

  const exit = () => {
    toggle()
  }

  const nothing = (event: any) => {
    event.stopPropagation()
  }

  return (
    <div
      className={s.sidebar}
      onClick={exit}
    >
      <div
        className={s.content}
        onClick={(event) => nothing(event)}
      >
        <div className={s.sidebar__upper}>
          <div className={s.sidebar__title}>Sidebar</div>
          <div
            className={s.sidebar__close}
            onClick={toggle}
          >
            <CloseIcon className={s.sidebar__close__icon} />
          </div>
        </div>

        <div className={s.sidebar__items}>
          {pages.map((page, i) => {
            return (
              <Item
                key={i}
                text={page.page}
                href={page.href}
              />
            )
          })}
        </div>

        <div className={s.sidebar__actions}>
          <div
            className={s.theme}
            onClick={toggleDark}
          >
            <ThemeIcon
              className={s.theme__icon}
              alt='theme'
            />
          </div>

          {auth.authentificated && (
            <Link
              href={'/dashboard/settings'}
              className={s.logged}
              onClick={() => navigation.actions.setPage('settings')}
            >
              {auth.user?.profile.name + ' ' + auth.user?.profile.surname}
            </Link>
          )}

          {!auth.authentificated && (
            <Button
              text='Login'
              className={s.button}
              icon={<LoginIcon alt='login' />}
              href='/auth'
            ></Button>
          )}
        </div>
      </div>
    </div>
  )
}

function Item({ text, href }: { text: string; href?: string }) {
  let router = useRouter()
  let navigation = useNavigation((state) => state.actions)

  const push = () => {
    if (!href) return
    router.push(href)
    navigation.setPage(href)
  }

  return (
    <div
      className={s.sidebar__item}
      onClick={push}
    >
      {text}
    </div>
  )
}

export default Sidebar
