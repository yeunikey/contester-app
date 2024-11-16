import Cookies from 'js-cookie'
import { useEffect } from 'react'

import { withAuthorization, xiorInstance } from '@/api/instance'

import Loading from '../loading/loading'

import s from './auth.module.css'
import { IUser } from '@/core/entities'
import { useAuth } from '@/core/store/auth'

function AuthProvider({ children }: { children: any }) {
  let auth = useAuth()

  useEffect(() => {
    xiorInstance
      .get('/user/get', {
        headers: withAuthorization()
      })
      .then((response) => {
        let user: IUser = response.data.data
        auth.actions.setUser(user)
        auth.actions.setAuthentificated(true)
      })
      .catch((err) => {
        Cookies.remove('token')
        window.location.href = '/auth'
      })
  }, [])

  if (!auth.authentificated) {
    return <Loading className='min-h-[70vh]'></Loading>
  }

  return <>{children}</>
}

export default AuthProvider
