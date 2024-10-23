import Button from '@/components/button/Button';
import Container from '@/components/container/container';
import { cn } from '@/core/utils';

import s from './styles.module.css';

function Settings() {
    return (
        <Container
            parent={s.settings}
            content={s.content}
        >
            <Account></Account>
            <ChangePassword></ChangePassword>
        </Container>
    );
}

function ChangePassword() {
    return (
        <div className={s.side}>
            <div className={s.title}>
                Change password
            </div>
            <div className={s.forms}>
                <Form
                    title="New password"
                    input={
                        <input className={s.form__item} type='password' placeholder='Your password' />
                    }
                ></Form>
                <Form
                    title="Password repeat"
                    input={
                        <input className={s.form__item} type='password' placeholder='Your password' />
                    }
                ></Form>
                <Button
                    text="Save password"
                    className={s.form__button}
                ></Button>
            </div>
        </div>
    )
}

function Account() {
    return (
        <div className={s.side}>
            <div className={s.title}>
                Account
            </div>
            <div className={s.forms}>
                <Form
                    title="Fullname"
                    input={
                        <div className={s.form__locked}>Ерасыл Унербек</div>
                    }
                ></Form>
                <Form
                    title="Group"
                    input={
                        <div className={s.form__locked}>SE-2402</div>
                    }
                ></Form>
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