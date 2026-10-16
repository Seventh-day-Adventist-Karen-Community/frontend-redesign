import { getCookie } from 'cookies-next';
// export const Token = typeof window !== undefined ? localStorage.getItem('token'):'jkjh'

export const Token = getCookie('token')
export const CSRF = getCookie('csrftoken')
export const Authenticated = getCookie('authenticated')
export const secret_key = process.env.SECRET_KEY || 'fkalsdfjafdfadfadfadJKL$#(*UjFALKD(JFJA#@klmOnldf948fakjf'