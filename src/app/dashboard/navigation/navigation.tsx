'use client'

import Link from 'next/link'
import { useEffect } from 'react'

import Container from '@/components/container/container'

import s from './navigation.module.css'

import { pages } from '@/core/constants/pages'
import { useNavigation } from '@/core/store/navigation'
import { cn } from '@/core/utils'

function Navigation() {
  let currentPage = useNavigation((state) => state.currentPage)
  let dispatch = useNavigation((state) => state.actions)

  useEffect(() => {
    let paths = window.location.pathname.split('/')

    if (paths.length < 3) return

    dispatch.setPage(paths[2])
  }, [])

  return (
    <Container parent={s.navigation}>
      <div className={s.title}>Dashboard</div>

      <div className={s.content}>
        {pages.map((page, i) => {
          return (
            <Link
              key={i}
              href={page.href}
              className={cn(s.link, currentPage == page.key ? s.link__selected : '')}
              onClick={() => dispatch.setPage(page.key)}
            >
              {page.page}
            </Link>
          )
        })}
      </div>
    </Container>
  )
}

export default Navigation
