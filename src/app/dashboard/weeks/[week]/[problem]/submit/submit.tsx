'use client'

import { useEffect, useState } from 'react';
import Select, { StylesConfig, ThemeConfig } from 'react-select';

import Button from '@/components/button/Button';
import { useTheme } from '@/core/store/theme';
import { cn } from '@/core/utils';

import s from './submit.module.css';

export const selectTheme: ThemeConfig = (theme) => ({
    ...theme,
    borderRadius: 5,
    colors: {
        ...theme.colors,
        primary25: '#FFFFFF',
        primary: '#3563E9',
        neutral0: "#FFFFFF",
        primary50: "#FFFFFF"
    },
});

export const selectStyles: StylesConfig = {
    control: (provided) => ({
        ...provided,
        backgroundColor: "#FFFFFF",
        border: "none",
        padding: "6px",
        fontSize: "14px"
    })
};

const darkSelectTheme: ThemeConfig = (theme) => ({
    ...theme,
    borderRadius: 5,
    colors: {
        ...theme.colors,
        primary25: '#363636',
        primary: '#3563E9',
        neutral0: "#363636",
        primary50: "#363636",
    },
});

const darkSelectStyles: StylesConfig = {
    control: (provided) => ({
        ...provided,
        backgroundColor: "#363636",
        border: "none",
        padding: "6px",
        fontSize: "14px",
        color: "#FFF"
    }),
    input: (styles) => ({
        ...styles,
        color: "#FFF"
    }),
    placeholder: (styles) => ({
        ...styles,
        color: "#999"
    }),
    singleValue: (styles) => ({
        ...styles,
        color: "#FFF"
    }),
    option: (styles, state) => ({
        ...styles,
        color: "#FFF"
    })
};

function Submit() {

    let theme = useTheme((state) => state.currentTheme);

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
                        <Select
                            options={[
                                { value: "C++", label: "python" }
                            ]}
                            placeholder="Language"

                            theme={theme ? darkSelectTheme : selectTheme}
                            styles={theme ? darkSelectStyles : selectStyles}
                        ></Select>
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