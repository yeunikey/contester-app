'use client'

import { useEffect, useRef, useState } from 'react';
import Select, { OptionsOrGroups, StylesConfig, ThemeConfig } from 'react-select';

import Button from '@/components/button/Button';
import { cn } from '@/core/utils';

import LoginIcon from '../../_assets/icons/login.svg';
import s from './styles.module.css';
import { useTheme } from '@/core/store/theme';
import { baseUrl, xiorInstance } from '@/api/instance';
import { log } from 'console';
import xior from 'xior';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useNotification } from '@/core/store/notification';

function Auth() {

    return (
        <div className="container">

            <div className={s.auth}>
                <div className={s.content}>
                    <div className={s.module}>

                        <div className={s.title}>
                            Authorization
                        </div>
                        <div className={s.subtitle}>
                            Enter your account
                        </div>

                        <Forms></Forms>

                    </div>
                </div>
            </div>

        </div>
    );
}

function Forms() {

    let darkMode = useTheme((state) => state.currentTheme);
    let notification = useNotification();

    let [groups, setGroups] = useState<string[]>([]);
    let groupRef = useRef<HTMLSelectElement>(null);

    let [students, setStudents] = useState<
        {
            uniqueId: string,
            name: string,
            surname: string
        }[]
    >([])
    let studentRef = useRef<HTMLSelectElement>(null);

    let passwordRef = useRef<HTMLInputElement>(null);

    const fetchGroups = async () => {
        await xiorInstance.get('/auth/groups')
            .then((response) => {
                setGroups(response.data.data)
            });
    }

    const fetchStudents = async () => {
        await xiorInstance.get('/auth/students',
            {
                params: {
                    group: groupRef.current?.value
                }
            }
        ).then((response) => {
            setStudents(response.data.data)
        })
    }

    const onGroupChange = () => {
        fetchStudents()
    }

    useEffect(() => {
        fetchGroups();
    }, [])

    useEffect(() => {

        if (groups.length == 0) return;
        if (!groupRef.current) return;

        groupRef.current.value = groups[0];
        fetchStudents();

    }, [groups])

    const login = async () => {

        if (passwordRef.current?.value == '' 
            || studentRef.current?.value == '' 
            || groupRef.current?.value == '') {
                notification.actions.setNotification({
                    type: 'red',
                    content: "Not all fields are filled in"
                });
                return
            }

        await xior.post(baseUrl + '/auth/login', {
                "uniqueId": studentRef.current?.value,
                "password": passwordRef.current?.value
            }).then(async (response) => {

                if (response.data.status == 'ERROR') {
                    notification.actions.setNotification({
                        type: 'red',
                        content: "Incorrect password"
                    });
                    return;
                }

                Cookies.set('token', response.data.data.token);
                window.location.href = '/';
            })
    }

    return (
        <>
            <div className={s.forms}>

                <Row>
                    <Form
                        title='Group'
                        className={'basis-[192px]'}
                        input={
                            <select ref={groupRef} onChange={onGroupChange} className={cn(s.select, darkMode ? s.select__dark : '')} name={"Group"}>
                                {groups.map((group, i) => {
                                    return <option key={i} value={group}>{group}</option>
                                })}
                            </select>
                        }
                    ></Form>
                    <Form
                        title='Fullname'
                        input={
                            <select ref={studentRef} className={cn(s.select, darkMode ? s.select__dark : '')} name={"Fullname"}>
                                {students.map((student, i) => {
                                    return <option key={i} value={student.uniqueId}>{student.name + ' ' + student.surname}</option>
                                })}
                            </select>
                        }
                    ></Form>
                </Row>
                <Row>
                    <form className={s.formclass}>
                        <Form
                            title='Password'
                            input={
                                <input ref={passwordRef} className={s.form__item} type='password' placeholder='Your password' />
                            }
                        ></Form>
                    </form>
                </Row>

            </div>
            <div className={s.button}>
                <Button
                    text='Login'
                    icon={<LoginIcon></LoginIcon>}
                    action={login}
                ></Button>
            </div>
        </>
    )
}

function Form({ className, title, input }: { title: string, input: any, className?: any }) {
    return (
        <div className={cn(s.form, className)}>
            <div className={s.form__title}>
                {title}
            </div>
            {input}
        </div>
    )
}

function Row({ className, children }: { className?: any, children: any }) {
    return (
        <div className={cn(s.forms__row, className)}>
            {children}
        </div>
    )
}

export default Auth;