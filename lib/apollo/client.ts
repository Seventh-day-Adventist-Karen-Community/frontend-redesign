import { ApolloClient, from } from '@apollo/client'
import { cache } from './cache'
import { authLink, httpLink, loggerLink } from './links'
import { onError } from '@apollo/client/link/error'

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) graphQLErrors.forEach(e => console.error('[GraphQL error]', e.message))
  if (networkError) console.error('[Network error]', networkError)
})


export const apolloClient = new ApolloClient({
  link: from([errorLink, authLink, httpLink,]),
  cache,
  defaultOptions: {
    watchQuery: { fetchPolicy: 'cache-and-network' },
  },

})