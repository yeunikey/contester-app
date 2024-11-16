import Submit from '../submit/submit'

import s from './info.module.css'
import { IProblem, ITest, IWeek } from '@/core/entities'
import { cn } from '@/core/utils'

function Info({
  problem,
  week,
  update,
  setUpdate
}: {
  problem: IProblem
  week: IWeek
  update: boolean
  setUpdate: Function
}) {
  return (
    <div className={s.info}>
      <div className={s.title}>{problem.title}</div>

      <Limits problem={problem} />

      <div className={s.contents}>
        <div
          className={s.lore}
          dangerouslySetInnerHTML={{ __html: problem.lore }}
        />

        <div className={cn(s.tests)}>
          <div className={s.tests__title}>Tests</div>
          <div className={s.tests__content}>
            {problem.tests.map((test: ITest, i) => {
              return (
                <Test
                  key={i}
                  i={i}
                  test={test}
                />
              )
            })}
          </div>
        </div>

        <Submit
          problem={problem}
          setUpdate={setUpdate}
        />
      </div>
    </div>
  )
}

function Test({ test, i }: { test: ITest; i: number }) {
  return (
    <div className={s.test}>
      <div className={s.test__decorate}>Test #{i + 1}</div>
      <div className={s.test__title}>
        <div>Input</div>
        <div>Output</div>
      </div>
      <div className={s.test__content}>
        <div className={s.test__item}>{test.input}</div>
        <div className={s.test__item}>{test.output}</div>
      </div>
    </div>
  )
}

function Limits({ problem }: { problem: IProblem }) {
  return (
    <div className={s.limits}>
      <div className={s.limit}>
        <div className={s.limit__key}>Time limit:</div>
        <div className={s.limit__value}>{problem.limits.timeLimit} ms.</div>
      </div>
      <div className={s.limit}>
        <div className={s.limit__key}>Memory limit:</div>
        <div className={s.limit__value}>{problem.limits.memoryLimit} kb.</div>
      </div>
    </div>
  )
}

export default Info
