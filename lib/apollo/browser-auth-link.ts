'use client'
import { setContext } from '@apollo/client/link/context'
import { getCookie } from 'cookies-next'

export const authLink = setContext(async (_, { headers }) => {
    const csrfToken = getCookie('csrftoken')
    return {
        headers: {
            ...headers,
            'X-CSRFToken': typeof csrfToken === 'string' ? csrfToken : '',
        },
    }
})