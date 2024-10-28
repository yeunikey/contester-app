'use client'

import { useNotification } from '@/core/store/notification';
import s from './notification.module.css';
import { cn } from '@/core/utils';
import { useEffect, useState } from 'react';

import CloseIcon from './../../_assets/icons/close.svg';

function Notification() {

    let [visible, setVisible] = useState(false);
    let notification = useNotification();

    useEffect(() => {

        if (notification.content != '') return;

        let timer = setTimeout(() => {
            reset()
        }, 5000);

    }, [notification.content])

    const reset = () => {
        notification.actions.resetNotification()
    }

    if (notification.content == '') {
        return (<></>)
    }

    return (
        <div className={s.notification} onClick={reset}>
            <div className={cn(s.content, notification.type == 'green' ? s.green : s.red)}>
                {notification.content}
            </div>
        </div>
    );
}

export default Notification;