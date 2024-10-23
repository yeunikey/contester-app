import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import Button from '@/components/button/Button';
import Container from '@/components/container/container';
import { IProblem, IWeek } from '@/core/entities';
import { cn, getTimeLeft } from '@/core/utils';

import ExitIcon from '../../../../_assets/icons/login.svg';
import s from './styles.module.css';

function Page({ params }: { params: any }) {

    let week: IWeek = {
        id: params.week,
        name: "Week 1",
        deadline: new Date(),
        problems: 15
    }

    let problems: IProblem[] = [
        {
            id: 'problem-1',
            name: "Problem 1. Problem name",
            attempts: 1,
            week: week,
            limits: {
                timeLimit: 2000,
                memoryLimit: 65000
            }
        },
        {
            id: 'problem-2',
            name: "Problem 2. Problem name",
            attempts: 3,
            week: week,
            limits: {
                timeLimit: 2000,
                memoryLimit: 65000
            }
        },
        {
            id: 'problem-3',
            name: "Problem 3. Problem name",
            attempts: 1,
            week: week,
            limits: {
                timeLimit: 2000,
                memoryLimit: 65000
            }
        },
        {
            id: 'problem-4',
            name: "Problem 4. Problem name",
            attempts: 5,
            week: week,
            limits: {
                timeLimit: 2000,
                memoryLimit: 65000
            }
        }
    ]

    return (
        <Container
            parent={s.page}
            content={s.content}
        >
            <div className={s.actions}>
                <Week week={week} completed={14}></Week>
                <Button
                    text="Back"
                    href="/dashboard/weeks"
                    icon={<ExitIcon></ExitIcon>}
                ></Button>
            </div>
            <div className={s.problems}>
                <div className={s.problems__title}>
                    Problems list
                </div>
                <div className={s.problems__list}>
                    {problems.map((problem, i) => {
                        return (<Problem key={i} problem={problem} i={i + 1} completed={false}></Problem>)
                    })}
                </div>
            </div>
        </Container>
    );
}

function Problem({ problem, completed, i }: { problem: IProblem, completed: boolean, i: number }) {
    return (
        <Link className={s.problem} href={`/dashboard/weeks/${problem.week.id}/${problem.id}`}>
            <div className={s.problem__number}>#{i}</div>
            <div className={s.problem__name}>{problem.name}</div>
        </Link>
    )
}

function Week({ week, completed }: { week: IWeek, completed: number }) {

    let status = '';

    if (week.problems == completed) {
        status = s.week__green;
    } else if (week.deadline.getTime() - new Date().getTime() <= 0) {
        status = s.week__red;
    }

    return (
        <div className={cn(s.week, status)}>
            <div className={s.week__title}>
                {week.name}
            </div>
            <div className={s.week__deadline}>
                {getTimeLeft(week.deadline)}
            </div>
            <div className={s.week__completed}>
                {completed} / {week.problems}
            </div>
        </div>
    )
}

export default Page;