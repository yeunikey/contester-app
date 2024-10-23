'use client'

import { stat } from 'fs';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import Container from '@/components/container/container';
import { IWeek } from '@/core/entities';
import { useNavigation } from '@/core/store/navigation';
import { cn, getTimeLeft } from '@/core/utils';

import s from './styles.module.css';

function Weeks() {

    const getDate = (hours: number) => {
        let date = new Date();
        date.setHours(date.getHours() + hours);
        return date;
    }

    return (
        <Container
            parent={s.weeks}
            content={s.content}
        >
            <div className={s.title}>
                Current weeks
            </div>

            <div className={s.list}>
                <Week
                    week={{
                        id: 'week-1',
                        name: "Week 1",
                        problems: 14,
                        deadline: getDate(-10)
                    }}
                    completed={13}
                ></Week>
                <Week
                    week={{
                        id: 'week-2',
                        name: "Week 2",
                        problems: 19,
                        deadline: getDate(3)
                    }}
                    completed={19}
                ></Week>
                <Week
                    week={{
                        id: 'week-3',
                        name: "Week 3",
                        problems: 21,
                        deadline: getDate(48)
                    }}
                    completed={18}
                ></Week>
            </div>
        </Container>
    );
}

function Week({ week, completed }: { week: IWeek, completed: number }) {

    let status = '';
    let [deadline, setDeadline] = useState('Calculating...');

    if (week.problems == completed) {
        status = s.week__green;
    } else if (week.deadline.getTime() - new Date().getTime() <= 0) {
        status = s.week__red;
    }

    useEffect(() => {
        setDeadline(getTimeLeft(week.deadline));
    }, [])

    return (
        <Link className={cn(s.week, status)} href={'/dashboard/weeks/' + week.id}>
            <div className={s.week__title}>
                {week.name}
            </div>
            <div className={s.week__deadline}>
                {deadline}
            </div>
            <div className={s.week__completed}>
                {completed} / {week.problems}
            </div>
        </Link>
    )
}

export default Weeks;