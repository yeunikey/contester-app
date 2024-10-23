'use client'

import { useState } from 'react';

import { cn } from '@/core/utils';

import s from './attempts.module.css';

function Attempts() {
    return (
        <div className={s.attempts}>
            <div className={s.attempts__title}>
                Your attempts
            </div>

            <div className={s.attempts__content}>
                <Attempt></Attempt>
                <Attempt></Attempt>
                <Attempt></Attempt>
            </div>
        </div>
    );
}

function Attempt() {
    
    let [show, setShow] = useState(false);

    return (
        <div className={s.attempt}>
            <div className={cn(s.attempt__upper, (show ? s.attempt__upper__show : ''))} onClick={() => setShow(!show)}>
                Accepted
            </div>

            {show && (
                <div className={s.attempt__content}>
                    
                    <div className={s.attempt__title}>
                        Submitted code
                    </div>

                    <div className={s.attempt__code}>

                    </div>

                </div>
            )}
            
        </div>
    )
}

export default Attempts;