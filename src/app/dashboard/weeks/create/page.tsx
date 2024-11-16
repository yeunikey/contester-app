'use client'

import { useRef, useState } from 'react'

import Button from '@/components/button/Button'
import Container from '@/components/container/container'
import Loading from '@/components/loading/loading'

import { withAuthorization, xiorInstance } from '@/api/instance'

import ExitIcon from './../../../../_assets/icons/login.svg'
import s from './styles.module.css'
import { useAuth } from '@/core/store/auth'
import { useNavigation } from '@/core/store/navigation'
import { cn } from '@/core/utils'

function Page() {
  let auth = useAuth()
  let [fetching, setFetching] = useState(false)

  let nameRef = useRef<HTMLInputElement>(null)
  let closedRef = useRef<HTMLInputElement>(null)
  let startRef = useRef<HTMLInputElement>(null)
  let deadlineRef = useRef<HTMLInputElement>(null)

  const fetchData = () => {
    if (fetching) return

    if (nameRef.current?.value == '' || deadlineRef.current?.value == '' || startRef.current?.value == '') return

    setFetching(true)

    xiorInstance
      .post(
        '/week/create',
        {
          name: nameRef.current?.value,
          closed: closedRef.current?.checked,
          createdDate: startRef.current?.value,
          deadlineDate: deadlineRef.current?.value
        },
        {
          headers: withAuthorization()
        }
      )
      .then((response) => {
        window.location.href = '/'
      })
  }

  if (auth.user == null) {
    return <Loading className='min-h-[40vh] w-full' />
  }

  if (auth.user.role != 'ADMIN') {
    return <NotAdmin />
  }

  return (
    <Container parent={s.settings} content={s.content}>
      <General nameRef={nameRef} closedRef={closedRef} createWeek={fetchData} />
      <Deadline deadlineRef={deadlineRef} startRef={startRef} />
    </Container>
  )
}

function NotAdmin() {
  let navigation = useNavigation()

  return (
    <div className={s.notfound}>
      <div className={s.notfound__text}>Not enough permissions</div>

      <Button
        text='Back'
        href='/dashboard/weeks'
        action={() => navigation.actions.setPage('weeks')}
        icon={<ExitIcon />}
      ></Button>
    </div>
  )
}

function Deadline({ deadlineRef, startRef }: { deadlineRef: any; startRef: any }) {
  return (
    <Side title='Deadline'>
      <Form title='Start date' input={<input ref={startRef} className={s.form__item} type='datetime-local' />}></Form>
      <Form
        title='Deadline date'
        input={<input ref={deadlineRef} className={s.form__item} type='datetime-local' />}
      ></Form>
    </Side>
  )
}

function General({ nameRef, closedRef, createWeek }: { nameRef: any; closedRef: any; createWeek: Function }) {
  return (
    <Side title='General'>
      <Form
        title='Week name'
        input={<input ref={nameRef} className={s.form__item} type='text' placeholder='Week name' />}
      ></Form>

      <div className={s.checkbox}>
        <input ref={closedRef} type='checkbox' id='horns' name='horns' />
        <label>is closed?</label>
      </div>

      <Button text='Create week' className={cn(s.form__button, s.create__button)} action={createWeek} />
    </Side>
  )
}

function Side({ title, children }: { title: string; children: any }) {
  return (
    <div className={s.side}>
      <div className={s.title}>{title}</div>
      <div className={s.side__content}>{children}</div>
    </div>
  )
}

function Form({ className, title, input }: { title: string; input: any; className?: any }) {
  return (
    <div className={cn(s.form, className)}>
      <div className={s.form__title}>{title}</div>
      {input}
    </div>
  )
}

export default Page
