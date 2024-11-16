import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import localFont from 'next/font/local'

import Footer from '@/components/footer/footer'
import Header from '@/components/header/header'
import Notification from '@/components/notification/notification'

import './globals.css'
import { cn } from '@/core/utils'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Contester',
  description: 'Generated by create next app'
}

const setInitialThemeScript = `
  (function() {
    if (typeof window !== 'undefined') {
        const theme = localStorage.getItem('theme');
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  })();
`

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <head>
        <meta name='theme-color' content='#FFFFF' />
        <script dangerouslySetInnerHTML={{ __html: setInitialThemeScript }} />
      </head>
      <body>
        <div className='App'>
          <Header />

          <div className={cn('flex-grow', 'min-h-[70vh]', 'relative', jakarta.className)}>
            <Notification />

            {children}
          </div>

          <Footer />
        </div>
      </body>
    </html>
  )
}
