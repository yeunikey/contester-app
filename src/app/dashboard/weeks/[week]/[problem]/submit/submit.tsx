'use client'

import { useEffect, useState } from 'react';
import Select, { StylesConfig, ThemeConfig } from 'react-select';

import Button from '@/components/button/Button';
import { useTheme } from '@/core/store/theme';
import { cn } from '@/core/utils';

import s from './submit.module.css';

function Submit() {

    let darkMode = useTheme((state) => state.currentTheme);

    return (
        <div className={s.submit}>
            <div className={s.submit__title}>
                Submit your code
            </div>
            <div className={s.submit__box}></div>
            <Form
                className={s.submit__form}
                title='Select language'
                input={
                    <select id={'select-2'} className={cn(s.select, darkMode ? s.select__dark : '')} name={"Language"}>
                        <option>C++</option>
                        <option>python</option>
                        <option>Java</option>
                    </select>
                }
            ></Form>
            <Button
                text='Submit'
                className={s.submit__button}
            ></Button>
        </div>
    );
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


export default Submit;