import { ApolloClient, HttpLink, InMemoryCache, from } from "@apollo/client/core";
import { onError } from "@apollo/client/link/error";
import { graphqlEndpoint } from "./endpoint";

const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
  graphQLErrors?.forEach((e) => console.error(`[GraphQL] ${operation.operationName}: ${e.message}`));
  if (networkError) console.error(`[Network] ${operation.operationName}: ${networkError.message}`);
});

// Giving data is live (payment status changes by the second), so nothing is
// cached: every query and mutation goes to the backend. Without this,
// client.query defaults to cache-first and a status poll could keep
// returning the first "INITIATED" answer forever.
export const apolloClient = new ApolloClient({
  link: from([
    errorLink,
    new HttpLink({ uri: graphqlEndpoint(), fetchOptions: { cache: "no-store" } }),
  ]),
  cache: new InMemoryCache(),
  defaultOptions: {
    query: { fetchPolicy: "no-cache" },
    mutate: { fetchPolicy: "no-cache" },
  },
});
