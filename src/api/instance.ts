import Cookies from 'js-cookie'
import xior, { XiorRequestConfig } from 'xior'

export const defaultOptions: Record<string, any> = {
  'Content-Type': 'application/json'
}

export function withAuthorization(): Record<string, any> {
  let token = Cookies.get('token')

  return {
    ...defaultOptions,
    Authorization: `Bearer ${token}`
  }
}

export let baseUrl = '/api'

export const xiorInstance = xior.create({
  baseURL: baseUrl,
  headers: defaultOptions
})
