'use client'

import { useEffect } from 'react'

import AuthProvider from '@/components/auth/auth'

import Navigation from './navigation/navigation'
import { storedTheme, useTheme } from '@/core/store/theme'

export default function Layout({ children }: { children: any }) {
  let dispatch = useTheme((state) => state.dispatch)

  useEffect(() => {
    let saved = storedTheme()
    dispatch.changeTheme(saved)

    let themeColorMeta = document.querySelector('meta[name="theme-color"]')
    if (!themeColorMeta) return
    themeColorMeta.setAttribute('content', saved ? '#363636' : '#FFFFFF')
  }, [])

  return (
    <AuthProvider>
      <Navigation></Navigation>

      {children}
    </AuthProvider>
  )
}
