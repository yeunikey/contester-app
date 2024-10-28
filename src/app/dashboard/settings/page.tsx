'use client'

import Button from '@/components/button/Button';
import Container from '@/components/container/container';
import { cn } from '@/core/utils';

import s from './styles.module.css';
import { useAuth } from '@/core/store/auth';
import { IStudent } from '@/core/entities';
import { useRef } from 'react';
import { baseUrl, withAuthorization, xiorInstance } from '@/api/instance';
import { useNotification } from '@/core/store/notification';

import Cookies from 'js-cookie';
import xior from 'xior';

function Settings() {
    return (
        <Container
            parent={s.settings}
            content={s.content}
        >
            <Account></Account>
            <ChangePassword></ChangePassword>
            <Exit></Exit>

        </Container>
    );
}

function Exit() {

    const exit = () => {
        Cookies.remove('token');
        window.location.href = '/';
    }

    return (
        <div className={s.side}>
            <div className={s.title}>
                Account
            </div>
            <Button
                text='Exit from Account'
                className={s.exit}
                action={exit}
            ></Button>
        </div>
    )
}

function ChangePassword() {

    let passwordRef = useRef<HTMLInputElement>(null);
    let repeatRef = useRef<HTMLInputElement>(null);

    let notification = useNotification();

    const fetchChanges = () => {

        if (passwordRef.current?.value == '' || repeatRef.current?.value == '') {
            notification.actions.setNotification({
                type: 'red',
                content: "Password cannot be empty"
            })
            return;
        }
        if (passwordRef.current?.value != repeatRef.current?.value) {
            notification.actions.setNotification({
                type: 'red',
                content: "Passwords are different from each other"
            })
            return;
        }

        xiorInstance.post('/user/change-password', {
            "newPassword": passwordRef.current?.value
        }, {
            headers: withAuthorization()
        }).then((response) => {
            notification.actions.setNotification({
                type: 'green',
                content: "Your password was changed"
            })
        });

    }

    return (
        <div className={s.side}>
            <div className={s.title}>
                Change password
            </div>
            <div className={s.forms}>
                <form className={s.formclass}>
                    <Form
                        title="New password"
                        input={
                            <input ref={passwordRef} className={s.form__item} type='password' placeholder='Your password' />
                        }
                    ></Form>
                    <Form
                        title="Password repeat"
                        input={
                            <input ref={repeatRef} className={s.form__item} type='password' placeholder='Your password' />
                        }
                    ></Form>
                </form>
                <Button
                    text="Save password"
                    className={s.form__button}
                    action={fetchChanges}
                ></Button>
            </div>
        </div>
    )
}

function Account() {

    let auth = useAuth();

    return (
        <div className={s.side}>
            <div className={s.title}>
                Account
            </div>
            <div className={s.forms}>
                <Form
                    title="Fullname"
                    input={
                        <div className={s.form__locked}>{auth.user?.profile.name + " " + auth.user?.profile.surname}</div>
                    }
                ></Form>
                {auth.user?.type == "STUDENT" && (
                    <Form
                        title="Group"
                        input={
                            <div className={s.form__locked}>{(auth.user?.profile as IStudent).group}</div>
                        }
                    ></Form>
                )}
                <Form
                    title="Teacher"
                    input={
                        <div className={s.form__locked}>Имя Фамилия</div>
                    }
                ></Form>
            </div>
        </div>
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

export default Settings;