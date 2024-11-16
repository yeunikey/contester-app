'use client'

import { useEffect, useRef, useState } from 'react'

import Button from '@/components/button/Button'
import Container from '@/components/container/container'

import s from './style.module.css'
import { ITest } from '@/core/entities'
import { cn } from '@/core/utils'

function CreateProblem() {
  return (
    <Container parent={s.settings} content={s.content}>
      <General></General>
      <Tests></Tests>
      <Lore></Lore>
    </Container>
  )
}

function Lore() {
  let [lore, setLore] = useState('')

  useEffect(() => {
    let element = document.getElementById('preview')
    if (!element) return
    if (lore == '') return
    element.innerHTML = lore.replace('\n', '<br>')
    console.log('test')
  }, [lore])

  return (
    <Row className='grid-cols-1 lg:grid-cols-2'>
      <Side title='Lore'>
        <textarea
          onInput={(e) => setLore(e.currentTarget.value)}
          className={s.submit__textarea}
          placeholder='Write HTML lore here'
        ></textarea>
      </Side>
      <Side title='Preview'>
        <div id='preview'></div>
      </Side>
    </Row>
  )
}

interface ITestV2 extends ITest {
  id: number
}

function Tests() {
  let [tests, setTests] = useState<ITestV2[]>([])

  const createTest = (test: ITestV2) => {
    setTests((t) => [...tests, test])
  }

  const removeTest = (test: ITestV2) => {
    setTests(tests.filter((iterate) => test.id != iterate.id))
  }

  return (
    <Row className='grid-cols-1 lg:grid-cols-[1fr_2fr] '>
      <Side title='Create test'>test</Side>
      <Side title='Tests'>test</Side>
    </Row>
  )
}

function General() {
  return (
    <Row className='grid-cols-1 sm:grid-cols-2 md:grid-cols-3'>
      <Side title='Create problem'>
        <Form
          title='Problem title'
          input={<input className={s.form__item} type='text' placeholder='Problem title' />}
        ></Form>

        <Button text='Create problem' className={cn(s.form__button, s.create__button)}></Button>
      </Side>
      <Side title='Limits'>
        <Form title='Time limit' input={<input className={s.form__item} type='number' defaultValue={2000} />}></Form>
        <Form title='Memory limit' input={<input className={s.form__item} type='number' defaultValue={65000} />}></Form>
      </Side>
    </Row>
  )
}

function Side({ title, children, className }: { title: string; className?: string; children: any }) {
  return (
    <div className={cn(s.side, className == undefined ? '' : className)}>
      <div className={s.title}>{title}</div>
      <div className={s.side__content}>{children}</div>
    </div>
  )
}

function Row({ className, children }: { className?: string; children: any }) {
  return <div className={cn(s.row, className == undefined ? '' : className)}>{children}</div>
}

function Form({ className, title, input }: { title: string; input: any; className?: any }) {
  return (
    <div className={cn(s.form, className)}>
      <div className={s.form__title}>{title}</div>
      {input}
    </div>
  )
}

export default CreateProblem
