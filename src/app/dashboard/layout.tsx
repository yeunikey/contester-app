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
    }
  }, [])

  return (
    <>
      <Navigation></Navigation>

      {children}
    </>
  );
}
