'use client'

import Image from 'next/image'
import Link from 'next/link'

import logo from '../../_assets/logo.png'
import Container from '../container/container'

import s from './footer.module.css'
import { useNavigation } from '@/core/store/navigation'

function Footer() {
  return (
    <Container
      parent={s.footer}
      content={s.content}
    >
      <Side>
        <Company />
        <div className={s.company__lore}>
          Official website of Contester <br />
          Astana IT University
        </div>
      </Side>

      <Side>
        <Links />
      </Side>
    </Container>
  )
}

function Links() {
  return (
    <>
      <div className={s.links}>
        <div className={s.links__title}>General</div>
        <div className={s.links__items}>
          <Item
            text='Weeks'
            href='/dashboard/weeks'
            id='weeks'
          />
        </div>
      </div>
      <div className={s.links}>
        <div className={s.links__title}>Account</div>
        <div className={s.links__items}>
          <Item
            text='Settings'
            href='/dashboard/settings'
            id={'settings'}
          />
        </div>
      </div>
    </>
  )
}

function Item({ text, id, href }: { text: string; id: string; href: string }) {
  let navigation = useNavigation((state) => state.actions)
  return (
    <Link
      className={s.links__item}
      href={href}
      onClick={() => navigation.setPage(id)}
    >
      {text}
    </Link>
  )
}

function Side({ children }: { children: any }) {
  return <div className={s.side}>{children}</div>
}

function Company() {
  let navigation = useNavigation()

  return (
    <Link
      className={s.company}
      href={'/'}
      onClick={() => navigation.actions.setPage('weeks')}
    >
      <Image
        className={s.company__logo}
        src={logo}
        alt='logo'
      />
      <div className={s.company__name}>CONTESTER</div>
    </Link>
  )
}

export default Footer
