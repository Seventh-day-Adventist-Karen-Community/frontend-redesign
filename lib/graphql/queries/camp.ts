import { gql } from '@apollo/client'

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
          gradient
          gradient
          eyebrow
          desc
          audience
          speaker {
            slug
          }
        }
      }
    }
    campSpeakers {
      edges {
        node {
          salutation
          image
          order
          message
          name
          slug
          title
        }
      }
    }
  }
`

export const GET_SCHEDULE_FOR_DAY = gql`
  query ScheduleForDay($day: Int!) {
    scheduleForDay(day: $day) {
      day
      date
      weekdayLabel
      dayType
      isHalfDay
      items {
        id
        time
        sortTime
        event
        facilitatorName
        facilitatorSpeaker { slug name image }
        participant
        isSectionHeader
        subItems {
          id
          time
          event
          facilitatorName
          facilitatorSpeaker { slug name image }
          participant
        }
      }
      dayInfo {
        elderMorning
        elderAfternoon
        pulpitManager
        deaconry
        choristers
        specialNote
        importantNotes
        closingNote
      }
    }
  }
`

export const GET_CAMP_SETTINGS = gql`
  query CampSettings {
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
  }
`

export const GET_COMMITTEE_PAGE = gql`
  query CommitteePage {
    campSettings {
      cream
      creamDark
      dateFull
      gold
      goldLight
      location
      maroon
      maroonDark
    }
    committeeMembers {
      edges {
        node {
          image
          message
          name
          order
          role
          slug
        }
      }
    }
  }
`