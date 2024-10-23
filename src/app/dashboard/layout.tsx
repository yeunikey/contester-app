'use client'

import { useEffect } from 'react';

import { useTheme } from '@/core/store/theme';

import Navigation from './navigation/navigation';

export default function Layout({ children }: { children: any }) {

  let dispatch = useTheme((state) => state.dispatch);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (!savedTheme) return;
      dispatch.changeTheme(savedTheme == 'dark');
      let themeColorMeta = document.querySelector('meta[name="theme-color"]');
      if (!themeColorMeta) return;
      themeColorMeta.setAttribute('content', savedTheme == 'dark' ? '#363636' : '#FFFFFF');
    }

  }, [])

  return (
    <>
      <Navigation></Navigation>

      {children}
    </>
  );
}
