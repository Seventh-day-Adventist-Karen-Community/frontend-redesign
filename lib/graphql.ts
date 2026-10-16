import { ApolloClient, InMemoryCache, HttpLink, from, ApolloLink } from '@apollo/client'
import { onError } from '@apollo/client/link/error'

// ============================================================
// Apollo Client — connects to Django Strawberry/Graphene API
// ============================================================

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:8000/graphql',
  credentials: 'include',
})

console.log(
  "Apollo URI:",
  process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://localhost:8000/graphql"
)

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    })
  }
  if (networkError) {
    console.error(`[Network error]: ${networkError}`)
  }
})

const loggerLink = new ApolloLink((operation, forward) => {
  console.log('🚀 GraphQL Request:', operation.operationName)

  return forward(operation).map((response) => {
    console.log('✅ GraphQL Response:', response)
    return response
  })
})

export const apolloClient = new ApolloClient({
  link: from([
    errorLink,
    loggerLink,
    httpLink,
  ]),
  cache: new InMemoryCache(),
})

// export const apolloClient = new ApolloClient({
//   link: from([errorLink, httpLink]),
//   cache: new InMemoryCache(),
//   defaultOptions: {
//     watchQuery: { fetchPolicy: 'cache-and-network' },
//     query: { fetchPolicy: 'network-only' },
//   },
// })

// ============================================================
// Django REST fallback (for non-GraphQL endpoints)
// Used for file uploads, bulk exports, etc.
// ============================================================

export const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

export async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    credentials: 'include',
    ...options,
  })
  if (!res.ok) throw new Error(`API error ${res.status}: ${res.statusText}`)
  return res.json()
}