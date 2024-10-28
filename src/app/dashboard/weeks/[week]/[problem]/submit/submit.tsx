'use client'

import { useRef, useState } from 'react';

import Button from '@/components/button/Button';
import { useTheme } from '@/core/store/theme';
import { cn } from '@/core/utils';

import s from './submit.module.css';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { a11yDark, a11yLight } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { relative } from 'path';
import style from 'react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark';
import { withAuthorization, xiorInstance } from '@/api/instance';
import { IProblem } from '@/core/entities';
import { randomUUID } from 'crypto';

function Submit({problem, setUpdate}: {problem: IProblem, setUpdate: Function}) {

    let darkMode = useTheme((state) => state.currentTheme);
    const [language, setLanguage] = useState('python');
    let codeRef = useRef<HTMLTextAreaElement>(null)

    const handleLanguageChange = (e: any) => {
        setLanguage(e.target.value);
    };

    const fetchData = () => {

        if (codeRef.current?.value == undefined) return;
        xiorInstance.post(
            '/problem/create-attempt', 
            {
                "problemId": problem.uniqueId,
                "language": "python",
                "code": codeRef.current.value.split('\n')
            },
            {
                headers: {
                    ...withAuthorization()
            },
        }).then((response) => {
            setUpdate(true);
        })
    }

    return (
        <div className={s.submit}>
            <div className={s.submit__title}>
                Submit your code
            </div>
            <textarea className={s.submit__editor} placeholder='Your code here' ref={codeRef}></textarea>
            <Form
                className={s.submit__form}
                title='Select language'
                input={
                    <select
                        id='select-2'
                        className={cn(s.select, darkMode ? s.select__dark : '')}
                        name='Language'
                        onChange={handleLanguageChange}
                    >
                        <option value='python'>python</option>
                    </select>
                }
            />
            <Button
                text='Submit'
                className={s.submit__button}
                action={fetchData}
            />
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