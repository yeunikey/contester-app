import { useState } from 'react'

import BurgerIcon from '../../../_assets/icons/burger.svg'
import Sidebar from '../sidebar/sidebar'

import s from './burger.module.css'

function Burger() {
  let [show, setShow] = useState(false)

  const toggle = () => {
    setShow(!show)
  }

  return (
    <>
      <div className={s.burger}>
        <div className={s.button} onClick={toggle}>
          <BurgerIcon className={s.icon} />
        </div>
      </div>

      {show && <Sidebar toggle={toggle} />}
    </>
  )
}

export default Burger
