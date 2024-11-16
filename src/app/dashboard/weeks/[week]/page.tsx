'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import Button from '@/components/button/Button'
import Container from '@/components/container/container'
import Loading from '@/components/loading/loading'

import { withAuthorization, xiorInstance } from '@/api/instance'

import ExitIcon from '../../../../_assets/icons/login.svg'

import s from './styles.module.css'
import { IProblem, IWeek } from '@/core/entities'
import { useAuth } from '@/core/store/auth'
import { useNavigation } from '@/core/store/navigation'
import { useNotification } from '@/core/store/notification'
import { cn, getTimeLeft } from '@/core/utils'

function Page({ params }: { params: any }) {
  let [fetching, setFetching] = useState(true)
  let [week, setWeek] = useState<IWeek | null>(null)

  const fetchData = async () => {
    await xiorInstance
      .get('/week/get', {
        params: {
          weekId: params.week,
          detailed: true
        },
        headers: withAuthorization()
      })
      .then((response) => {
        if (response.data.status == 'ERROR') {
          setFetching(false)
          return
        }
        let data = response.data.data

        const weekData: IWeek = {
          uniqueId: data.uniqueId,
          name: data.name,
          closed: data.closed,
          startDate: new Date(data.startDate),
          deadlineDate: new Date(data.deadlineDate),
          problems: data.problems
        }
        setWeek(weekData)

        console.log(weekData)

        setFetching(false)
      })
      .catch((err) => {
        setFetching(false)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (fetching) {
    return <Loading className='h-[40vh]'/>
  }

  return (
    <Container parent={s.page} content={s.content}>
      {!week ? <NotFound /> : <FoundedWeek week={week}/>}
    </Container>
  )
}

function NotFound() {
  let navigation = useNavigation()

  return (
    <div className={s.notfound}>
      <div className={s.notfound__text}>Week not found :(</div>

      <Button
        text='Back'
        href='/dashboard/weeks'
        action={() => navigation.actions.setPage('weeks')}
        icon={<ExitIcon />}
      ></Button>
    </div>
  )
}

function FoundedWeek({ week }: { week: IWeek }) {
  let auth = useAuth()

  return (
    <>
      <div className={s.actions}>
        <Week week={week} completed={0}/>
        <Button text='Back' href='/dashboard/weeks' icon={<ExitIcon />}></Button>

        {auth.user?.role == 'ADMIN' && <Admin week={week}/>}
      </div>
      <div className={s.problems}>
        <div className={s.problems__title}>Problems list</div>
        <div className={s.problems__list}>
          {week &&
            (week?.problems as IProblem[]).map((problem, i) => {
              return <Problem key={i} problem={problem} i={i + 1} completed={false}/>
            })}
        </div>
      </div>
    </>
  )
}

function Admin({ week }: { week: IWeek }) {
  let router = useRouter()

  const fetchDelete = () => {
    xiorInstance
      .delete('/week/delete', {
        headers: withAuthorization(),
        params: {
          weekId: week.uniqueId
        }
      })
      .then((response) => {
        window.location.href = '/'
      })
  }

  return (
    <div className={s.admin}>
      <Button
        text='Create Problem'
        className={s.createproblem}
        action={() => {
          router.push('/dashboard/weeks/' + week.uniqueId + '/create')
        }}
      ></Button>
      <Button text='Edit Week'/>
      <Button text='Delete week' className={s.removeweek} action={fetchDelete}/>
    </div>
  )
}

function Problem({ problem, completed, i }: { problem: IProblem; completed: boolean; i: number }) {
  return (
    <Link className={s.problem} href={`/dashboard/weeks/${problem.weekId}/${problem.uniqueId}`}>
      <div className={s.problem__number}>#{i}</div>
      <div className={s.problem__name}>{problem.title}</div>
    </Link>
  )
}

function Week({ week, completed }: { week: IWeek | null; completed: number }) {
  let status = ''

  if (week?.problems.length == completed) {
    status = s.week__green
  } else if (week && week.deadlineDate.getTime() - new Date().getTime() <= 0) {
    status = s.week__red
  }

  return (
    <div className={cn(s.week, status)}>
      <div className={s.week__title}>{week?.name}</div>
      <div className={s.week__deadline}>{week && getTimeLeft(week.deadlineDate, week.startDate)}</div>
      <div className={s.week__completed}>
        {completed} / {week?.problems.length}
      </div>
    </div>
  )
}

export default Page
