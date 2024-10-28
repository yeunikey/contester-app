import xior, { XiorRequestConfig } from 'xior';
import Cookies from 'js-cookie';

export const defaultOptions: Record<string, any> =  {
    'Content-Type': 'application/json'
}

export function withAuthorization(): Record<string, any> {
    
    let token = Cookies.get('token');

    return {
        ...defaultOptions,
        'Authorization': `Bearer ${token}`
    }
}

export let baseUrl = 'http://localhost:1010/v1'

export const xiorInstance = xior.create({
  baseURL: baseUrl,
  headers: defaultOptions
});