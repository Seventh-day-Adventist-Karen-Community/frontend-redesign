import { ApolloClient, InMemoryCache, gql, HttpLink, from, ApolloLink } from '@apollo/client'
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

export const GET_CAMP_HOME = gql`
query CampHome {
  campSettings {
    cream
    creamDark
    dateFull
    endDate
    gold
    goldLight
    location
    maroon
    maroonDark
    startDate
    monthYear
  }
  tracks {
    edges {
      node {
        title
        tag
        sub
        slug
        order
        longDesc
        label
        image
        gradientCss
        gradient
        eyebrow
        desc
        audience
      }
    }
  }
}
`

// ============================================================
// GraphQL Queries — mirrors Django models
// ============================================================

export const GET_DASHBOARD_STATS = gql`
  query GetDashboardStats {
    dashboardStats {
      todayVisitors
      weekVisitors
      pendingPrayers
      pendingBaptisms
      pendingVisitations
      pendingMemberships
      totalThisMonth
      conversionRate
    }
    weeklyAttendance {
      day
      count
    }
  }
`

export const GET_VISITORS = gql`
  query GetVisitors($status: String, $visitType: String, $limit: Int, $offset: Int) {
    visitors(status: $status, visitType: $visitType, limit: $limit, offset: $offset) {
      id
      firstName
      lastName
      phone
      email
      area
      howHeard
      firstTimeEver
      visitType
      status
      createdAt
      followUpRequested
      service
    }
    visitorsCount(status: $status, visitType: $visitType)
  }
`

export const GET_PRAYER_REQUESTS = gql`
  query GetPrayerRequests($status: String, $limit: Int) {
    prayerRequests(status: $status, limit: $limit) {
      id
      visitorId
      visitorName
      isAnonymous
      category
      request
      urgency
      shareWithCongregation
      followUpRequested
      status
      createdAt
      prayedBy
    }
  }
`

export const GET_BAPTISM_INQUIRIES = gql`
  query GetBaptismInquiries($status: String) {
    baptismInquiries(status: $status) {
      id
      fullName
      phone
      email
      dob
      isSaved
      previousBaptism
      timeline
      notes
      status
      assignedPastor
      createdAt
    }
  }
`

export const GET_VISITATIONS = gql`
  query GetVisitations($status: String) {
    visitationRequests(status: $status) {
      id
      fullName
      phone
      address
      reason
      preferredDays
      notes
      assignedVisitor
      scheduledDate
      status
      createdAt
    }
  }
`

export const GET_MEMBERSHIPS = gql`
  query GetMemberships($status: String) {
    memberApplications(status: $status) {
      id
      firstName
      lastName
      phone
      email
      area
      maritalStatus
      previousChurch
      isBornAgain
      ministries
      status
      createdAt
    }
  }
`

// ============================================================
// GraphQL Mutations
// ============================================================

export const CREATE_VISITOR = gql`
  mutation CreateVisitor($input: VisitorInput!) {
    createVisitor(input: $input) {
      visitor {
        id
        firstName
        lastName
        visitType
        status
        createdAt
      }
      errors {
        field
        message
      }
    }
  }
`

export const CREATE_PRAYER_REQUEST = gql`
  mutation CreatePrayerRequest($input: PrayerRequestInput!) {
    createPrayerRequest(input: $input) {
      prayerRequest {
        id
        isAnonymous
        category
        urgency
        status
        createdAt
      }
      errors {
        field
        message
      }
    }
  }
`

export const CREATE_BAPTISM_INQUIRY = gql`
  mutation CreateBaptismInquiry($input: BaptismInquiryInput!) {
    createBaptismInquiry(input: $input) {
      inquiry {
        id
        fullName
        status
        createdAt
      }
      errors {
        field
        message
      }
    }
  }
`

export const CREATE_VISITATION_REQUEST = gql`
  mutation CreateVisitationRequest($input: VisitationInput!) {
    createVisitationRequest(input: $input) {
      request {
        id
        fullName
        status
        createdAt
      }
      errors {
        field
        message
      }
    }
  }
`

export const CREATE_MEMBERSHIP = gql`
  mutation CreateMemberApplication($input: MemberApplicationInput!) {
    createMemberApplication(input: $input) {
      application {
        id
        firstName
        lastName
        status
        createdAt
      }
      errors {
        field
        message
      }
    }
  }
`

export const UPDATE_STATUS = gql`
  mutation UpdateStatus($id: ID!, $model: String!, $status: String!) {
    updateStatus(id: $id, model: $model, status: $status) {
      success
      message
    }
  }
`

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