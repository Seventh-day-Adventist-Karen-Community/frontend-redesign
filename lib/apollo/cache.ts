import { InMemoryCache } from '@apollo/client'

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        tracks: {
          merge(_, incoming) {
            return incoming
          },
        },
        visitors: {
          merge(_, incoming) {
            return incoming
          },
        },
        prayerRequests: {
          merge(_, incoming) {
            return incoming
          },
        },
      },
    },
  },
})