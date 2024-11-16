'use client'

import { useEffect, useState } from 'react'

import Button from '@/components/button/Button'
import Container from '@/components/container/container'
import Loading from '@/components/loading/loading'

import { withAuthorization, xiorInstance } from '@/api/instance'

import ExitIcon from '../../../../../_assets/icons/login.svg'

import Attempts from './attempts/attempts'
import Info from './info/info'
import s from './styles.module.css'
import { IProblem, IWeek } from '@/core/entities'
import { useNavigation } from '@/core/store/navigation'
import { cn, getTimeLeft } from '@/core/utils'

function Page({ params }: { params: any }) {
  let [fetching, setFetching] = useState(true)

  let [week, setWeek] = useState<IWeek | null>(null)
  let [problem, setProblem] = useState<IProblem | null>(null)

  const fetchWeek = async () => {
    await xiorInstance
      .get('/week/get', {
        params: {
          weekId: params.week,
          detailed: false
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
      })
  }

  const fetchProblem = async () => {
    await xiorInstance
      .get('/problem/get', {
        params: {
          problemId: params.problem
        },
        headers: withAuthorization()
      })
      .then((response) => {
        if (response.data.status == 'ERROR') {
          setFetching(false)
          return
        }
        let data = response.data.data
        setProblem(data)
      })
  }

  useEffect(() => {
    Promise.all([fetchWeek(), fetchProblem()])
      .then(() => {
        setFetching(false)
      })
      .catch(() => {
        setFetching(false)
      })
  }, [])

  if (fetching) {
    return <Loading className='h-[40vh]'/>
  }

  return (
    <Container parent={s.problem}>
      {week == null || problem == null ? (
        <NotFound />
      ) : (
        <ProblemFound week={week} problem={problem}/>
      )}
    </Container>
  )
}

function NotFound() {
  let navigation = useNavigation()

  return (
    <div className={s.notfound}>
      <div className={s.notfound__text}>Problem not found :(</div>

      <Button
        text='Back'
        href='/dashboard/weeks'
        action={() => navigation.actions.setPage('weeks')}
        icon={<ExitIcon />}
      ></Button>
    </div>
  )
}

function ProblemFound({ week, problem }: { week: IWeek; problem: IProblem }) {
  let [update, setUpdate] = useState(false)

  return (
    <>
      <div className={s.content}>
        <div className={s.actions}>
          <Week week={week} completed={14}/>
          <Button text='Back' href={`/dashboard/weeks/${week?.uniqueId}`} icon={<ExitIcon />}></Button>
        </div>
        <Info problem={problem} week={week} update={update} setUpdate={setUpdate}/>
      </div>

      <Attempts problem={problem} update={update} setUpdate={setUpdate}/>
    </>
  )
}

function Week({ week, completed }: { week: IWeek; completed: number }) {
  let status = ''

  if (week?.problems.length == completed) {
    status = s.week__green
  } else if (week && week?.deadlineDate.getTime() - new Date().getTime() <= 0) {
    status = s.week__red
  }

  return (
    <div className={cn(s.week, status)}>
      <div className={s.week__title}>{week?.name}</div>
      <div className={s.week__deadline}>{week && getTimeLeft(week.startDate, week?.deadlineDate)}</div>
      <div className={s.week__completed}>
        {completed} / {week?.problems.length}
      </div>
    </div>
  )
}

export default Page
