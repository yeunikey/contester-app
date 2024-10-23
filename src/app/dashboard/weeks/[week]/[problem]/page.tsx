
import Button from '@/components/button/Button';
import Container from '@/components/container/container';
import { IProblem, IWeek } from '@/core/entities';
import { cn, getTimeLeft } from '@/core/utils';

import ExitIcon from '../../../../../_assets/icons/login.svg';
import Attempts from './attempts/attempts';
import Info from './info/info';
import s from './styles.module.css';

function Page({ params }: { params: any }) {

    let week: IWeek = {
        id: params.week,
        name: "Week 1",
        deadline: new Date(),
        problems: 15
    }

    let problem: IProblem = {
        id: 'problem-1',
        name: "Problem 1. Problem name",
        attempts: 1,
        week: week,
        limits: {
            timeLimit: 2000,
            memoryLimit: 65000
        }
    }

    return (
        <Container
            parent={s.problem}
        >
            <div className={s.content}>
                <div className={s.actions}>
                    <Week week={week} completed={14}></Week>
                    <Button
                        text="Back"
                        href={`/dashboard/weeks/${week.id}`}
                        icon={<ExitIcon></ExitIcon>}
                    ></Button>
                </div>
                <Info problem={problem} week={week}></Info>
            </div>

            <Attempts></Attempts>
        </Container>
    );
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