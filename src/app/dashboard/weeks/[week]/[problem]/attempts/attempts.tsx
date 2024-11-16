'use client'

import { useEffect, useState } from 'react'

import Loading from '@/components/loading/loading'

import { withAuthorization, xiorInstance } from '@/api/instance'

import s from './attempts.module.css'
import { IAttempt, ICode, IProblem } from '@/core/entities'
import { cn, formatDate } from '@/core/utils'

function Attempts({ problem, update, setUpdate }: { problem: IProblem; update: boolean; setUpdate: Function }) {
  let [attempts, setAttempts] = useState<IAttempt[]>([])

  const fetchAttempts = async () => {
    await xiorInstance
      .get('/user/attempts', {
        headers: withAuthorization(),
        params: {
          problemId: problem.uniqueId
        }
      })
      .then((response) => {
        if (response.data.status == 'ERROR') return

        let fetchedAttempts: IAttempt[] = response.data.data.map((attempt: any) => ({
          attemptId: attempt.attemptId,
          userId: attempt.userId,
          problemId: attempt.problemId,
          createdDate: new Date(attempt.createdDate),
          code: attempt.code as ICode
        }))

        fetchedAttempts.sort((a, b) => b.createdDate.getTime() - a.createdDate.getTime())

        setAttempts(fetchedAttempts)
        setUpdate(false)
      })
  }

  useEffect(() => {
    fetchAttempts()
  }, [])

  useEffect(() => {
    if (update == false) return
    fetchAttempts()
  }, [update])

  useEffect(() => {
    let timer = setInterval(() => {
      fetchAttempts()
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className={s.attempts}>
      <div className={s.attempts__title}>Your attempts {attempts.length}</div>

      <div className={s.attempts__content}>
        {attempts.map((attempt: IAttempt, i) => {
          return <Attempt key={i} attempt={attempt}></Attempt>
        })}
      </div>
    </div>
  )
}

function Attempt({ attempt }: { attempt: IAttempt }) {
  let [show, setShow] = useState(false)
  let status = ''
  let [codeFetched, setFetched] = useState(false)
  let [code, setCode] = useState([])

  if (attempt.code.status == 'ACCEPTED') {
    status = s.attempt__accepted
  } else if (attempt.code.status == 'WRONG_ANSWER') {
    status = s.attempt__wrong
  }

  const formatted = {
    ACCEPTED: 'Accepted',
    WRONG_ANSWER: 'Wrong Answer :(',
    NOT_CHECKED: 'In queue'
  }

  const fetchCode = async () => {
    xiorInstance
      .get('/problem/attempt-code', {
        headers: withAuthorization(),
        params: {
          attemptId: attempt.attemptId
        }
      })
      .then((response) => {
        setCode(response.data.data)
        setFetched(true)
      })
  }

  useEffect(() => {
    if (!codeFetched && show) {
      fetchCode()
    }
  }, [show])

  return (
    <div className={s.attempt}>
      <div className={cn(s.attempt__upper, status)} onClick={() => setShow(!show)}>
        {formatted[attempt.code.status as 'ACCEPTED' | 'WRONG_ANSWER' | 'NOT_CHECKED']}
        <div className={s.attempt__date}>{formatDate(attempt.createdDate)}</div>
      </div>

      {show && (
        <div className={s.attempt__content}>
          <div className={s.attempt__title}>Submitted code</div>

          {codeFetched ? (
            <div className={s.attempt__code}>
              {code.map((code, i) => {
                return <p key={i}>{code}</p>
              })}
            </div>
          ) : (
            <Loading className='h-32 w-full'></Loading>
          )}
        </div>
      )}
    </div>
  )
}

export default Attempts
