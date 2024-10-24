'use client'

import { useEffect, useState } from 'react';
import Select, { OptionsOrGroups, StylesConfig, ThemeConfig } from 'react-select';

import Button from '@/components/button/Button';
import { cn } from '@/core/utils';

import LoginIcon from '../../_assets/icons/login.svg';
import s from './styles.module.css';
import { useTheme } from '@/core/store/theme';

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

    let darkMode = useTheme((state) => state.currentTheme);

    return (
        <div className={s.forms}>

            <Row>
                <Form
                    title='Group'
                    className={'basis-[192px]'}
                    input={
                        <select id={'select-1'} className={cn(s.select, darkMode ? s.select__dark : '')} name={"Group"}>
                            <option>SE-2401</option>
                            <option>SE-2402</option>
                            <option>SE-2403</option>
                            <option>SE-2404</option>
                            <option>SE-2405</option>
                            <option>SE-2406</option>
                        </select>
                    }
                ></Form>
                <Form
                    title='Fullname'
                    input={
                        <select id={'select-2'} className={cn(s.select, darkMode ? s.select__dark : '')} name={"Fullname"}>
                            <option>Yerassyl Unerbek</option>
                            <option>Nursultan Nazarbaev</option>
                            <option>Bishimai Bekarys</option>
                        </select>
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