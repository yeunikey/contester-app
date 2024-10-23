import { IProblem, IWeek } from '@/core/entities';
import { cn } from '@/core/utils';

import Submit from '../submit/submit';
import s from './info.module.css';

function Info({ problem, week }: { problem: IProblem, week: IWeek }) {
    return (
        <div className={s.info}>
            <div className={s.title}>
                {problem.name}
            </div>
            
            <Limits problem={problem}></Limits>
            
            <div className={s.contents}>
                <div className={s.lore}>
                    Given three real numbers <b>x, y, z</b>. Output the minimum and the maximum values of them. First output the minimum, then the maximum value
                </div>

                <div className={cn(s.tests)}>
                    <div className={s.tests__title}>Tests</div>
                    <div className={s.tests__content}>
                        <Test></Test>
                        <Test></Test>
                        <Test></Test>
                    </div>
                </div>

                <Submit></Submit>

            </div>
        </div>
    )
}

function Test({}) {
    return (
        <div className={s.test}>
            <div className={s.test__decorate}>Test #1</div>
            <div className={s.test__title}>
                <div>Input</div>
                <div>Output</div>
            </div>
            <div className={s.test__content}>
                <div className={s.test__item}>
                    3.1 4.1 5.1
                </div>
                <div className={s.test__item}>
                    5.2 4.1 1.0
                </div>
            </div>
        </div>
    )
}

function Limits({problem}: {problem: IProblem}) {
    return (
        <div className={s.limits}>
            <div className={s.limit}>
                <div className={s.limit__key}>
                    Time limit:
                </div>
                <div className={s.limit__value}>
                    {problem.limits.timeLimit} ms.
                </div>
            </div>
            <div className={s.limit}>
                <div className={s.limit__key}>
                    Memory limit:
                </div>
                <div className={s.limit__value}>
                    {problem.limits.memoryLimit} kb.
                </div>
            </div>
        </div>
    )
}

export default Info;