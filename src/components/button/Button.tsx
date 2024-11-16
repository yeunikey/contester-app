'use client'

import { useRouter } from 'next/navigation'

import s from './button.module.css'
import { cn } from '@/core/utils'

interface ButtonProps {
  text?: string
  icon?: any
  action?: Function
  href?: string
  className?: string
}

function Button({ text, icon, action, href, className }: ButtonProps) {
  let router = useRouter()

  const onClick = () => {
    redirect()
    runAction()
  }

  const redirect = () => {
    if (!href) return
    router.push(href)
  }

  const runAction = () => {
    if (!action) return
    action()
  }

  return (
    <div className={cn(s.button, !className ? '' : className)} onClick={onClick}>
      {icon && <div className={s.button__icon}>{icon}</div>}
      {text && <div className={s.button__text}>{text}</div>}
    </div>
  )
}

export default Button
