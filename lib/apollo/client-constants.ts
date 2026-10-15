const getCookie = (name: string): string | undefined => {
	if (typeof document === 'undefined') return undefined

	const cookie = document.cookie
		.split(';')
		.map((value) => value.trim())
		.find((value) => value.startsWith(`${name}=`))

	return cookie ? decodeURIComponent(cookie.slice(name.length + 1)) : undefined
}
// export const Token = typeof window !== undefined ? localStorage.getItem('token'):'jkjh'

export const Token = getCookie('token')
export const CSRF = getCookie('csrftoken')
export const Authenticated = getCookie('authenticated')
export const secret_key = process.env.SECRET_KEY || 'fkalsdfjafdfadfadfadJKL$#(*UjFALKD(JFJA#@klmOnldf948fakjf'