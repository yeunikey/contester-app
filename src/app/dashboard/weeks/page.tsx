'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import Container from '@/components/container/container'

import { withAuthorization, xiorInstance } from '@/api/instance'

import s from './styles.module.css'
import { IWeek } from '@/core/entities'
import { useAuth } from '@/core/store/auth'
import { cn, getTimeLeft } from '@/core/utils'

function Weeks() {
  let [weeks, setWeeks] = useState<IWeek[]>([])
  let auth = useAuth()

  const fetchWeeks = async () => {
    await xiorInstance
      .get('/week/all', {
        headers: withAuthorization()
      })
      .then((response) => {
        let data = response.data

        if (data.status == 'ERROR') return

        const weeksData: IWeek[] = data.data.map((week: any) => ({
          uniqueId: week.uniqueId,
          name: week.name,
          closed: week.closed,
          startDate: new Date(week.startDate),
          deadlineDate: new Date(week.deadlineDate),
          problems: week.problems
        }))
        setWeeks(weeksData)
      })
  }

  useEffect(() => {
    fetchWeeks()
  }, [])

  return (
    <Container parent={s.weeks} content={s.content}>
      <div className={s.title}>Current weeks</div>

      <div className={s.list}>
        {weeks.map((week, i) => {
          return <Week key={i} week={week} completed={0}></Week>
        })}
        {auth.user?.role == 'ADMIN' && <CreateWeek></CreateWeek>}
      </div>
    </Container>
  )
}

function CreateWeek() {
  return (
    <Link href={'/dashboard/weeks/create'} className={s.create}>
      +
    </Link>
  )
}

function Week({ week, completed }: { week: IWeek; completed: number }) {
  let status = ''
  let [deadline, setDeadline] = useState('Calculating...')

  if (week.problems.length == completed) {
    status = s.week__green
  } else if (week.deadlineDate.getTime() - new Date().getTime() <= 0) {
    status = s.week__red
  }

  useEffect(() => {
    setDeadline(getTimeLeft(week.deadlineDate, week.startDate))
  }, [])

  return (
    <Link className={cn(s.week, status)} href={'/dashboard/weeks/' + week.uniqueId}>
      <div className={s.week__title}>{week.name}</div>
      <div className={s.week__deadline}>{deadline}</div>
      <div className={s.week__completed}>
        {completed} / {week.problems.length}
      </div>
    </Link>
  )
}

export default Weeks
