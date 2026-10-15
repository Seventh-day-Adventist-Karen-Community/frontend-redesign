import { ApolloLink, HttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { Token } from './client-constants'

const GRAPHQL_URL =
  process.env.NEXT_PUBLIC_GRAPHQL_URL ??
  'http://127.0.0.1:8000'

const uri = `${GRAPHQL_URL}/graphql`
console.log ('uri: ', uri)

export const httpLink = new HttpLink({
    uri: uri,
    // No credentials: 'include' — we're not relying on cookies/session,
    // so this avoids needing Access-Control-Allow-Credentials on the server.
})

export const authLink = setContext(async (_, { headers }) => {
    const token = await Token

    return {
        headers: {
            ...headers,
            authorization: token ? `JWT ${token}` : '',
        },
    }
})

export const loggerLink = new ApolloLink((operation, forward) => {
    console.group(`🚀 ${operation.operationName}`)
    console.log('Variables:', operation.variables)

    return forward(operation).map((response) => {
        console.log('Response:', response)
        console.groupEnd()
        return response
    })
})