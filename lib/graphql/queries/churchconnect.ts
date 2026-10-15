import { gql } from '@apollo/client'

export const GET_VISITORS = gql`
query ChurchVisitors {
  visitors {
    edges {
      node {
        area
        createdAt
        email
        firstName
        firstTimeEver
        followUp
        followUpRequested
        howHeard
        id
        lastName
        notes
        phone
        prayerNote
        service
        status
        updatedAt
        visitType
        prayerRequests {
          edges {
            node {
              visitorName
              urgency
              updatedAt
              status
              shareWithCongregation
              request
              prayedBy
              phone
              isAnonymous
              id
              followUpRequested
              createdAt
              category
            }
          }
        }
      }
    }
  }
}
`