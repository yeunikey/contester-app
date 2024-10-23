'use client'

import { useEffect, useState } from 'react';
import Select, { OptionsOrGroups, StylesConfig, ThemeConfig } from 'react-select';

import Button from '@/components/button/Button';
import {
    darkSelectStyles, darkSelectTheme, selectStyles, selectTheme
} from '@/core/constants/select';
import { cn } from '@/core/utils';

import LoginIcon from '../../_assets/icons/login.svg';
import s from './styles.module.css';

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

                        <div className={s.button}>
                            <Button
                                text='Login'
                                icon={<LoginIcon></LoginIcon>}
                            ></Button>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
}

function Forms() {

    const [darkMode, setDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'dark') {
                document.documentElement.classList.add('dark');
                return true;
            } else {
                document.documentElement.classList.remove('dark');
                return false;
            }
        }
    });

    return (
        <div className={s.forms}>

            <Row>
                <Form
                    title='Group'
                    className={'basis-[192px]'}
                    input={
                        <Select
                            options={[
                                { value: "test", label: "SE-2402" },
                                { value: "test2", label: "SE-2403" },
                            ]}
                            placeholder="Group"

                            theme={darkMode ? darkSelectTheme : selectTheme}
                            styles={darkMode ? darkSelectStyles : selectStyles}
                        ></Select>
                    }
                ></Form>
                <Form
                    title='Fullname'
                    input={
                        <Select
                            className={s.select}
                            options={[
                                { value: "test", label: "Yerassyl Unerbek" }
                            ]}
                            placeholder="Fullname"

                            theme={darkMode ? darkSelectTheme : selectTheme}
                            styles={darkMode ? darkSelectStyles : selectStyles}
                        ></Select>
                    }
                ></Form>
            </Row>
            <Row>
                <Form
                    title='Password'
                    input={
                        <input className={s.form__item} type='password' placeholder='Your password' />
                    }
                ></Form>
            </Row>

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

function Row({ className, children }: { className?: any, children: any }) {
    return (
        <div className={cn(s.forms__row, className)}>
            {children}
        </div>
    )
}

export default Auth;