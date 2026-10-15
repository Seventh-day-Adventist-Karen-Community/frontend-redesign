import { gql } from '@apollo/client'

export const CREATE_VISITOR = gql`
  mutation CreateVisitor(
    $firstName: String!, $lastName: String!, $phone: String, $email: String,
    $area: String, $howHeard: String, $visitType: String, $service: String,
    $prayerNote: String, $followUp: String
  ) {
    createVisitor(
      firstName: $firstName, lastName: $lastName, phone: $phone, email: $email,
      area: $area, howHeard: $howHeard, visitType: $visitType, service: $service,
      prayerNote: $prayerNote, followUp: $followUp
    ) {
      ok
      visitor { id firstName lastName }
    }
  }
`

// export const CREATE_PRAYER_REQUEST = gql`
//   mutation SubmitPrayerRequest(
//     $message: String!, $name: String, $phone: String, $category: String,
//     $urgency: String, $followUpRequested: Boolean, $shareWithCongregation: Boolean
//   ) {
//     submitPrayerRequest(
//       message: $message, name: $name, phone: $phone, category: $category,
//       urgency: $urgency, followUpRequested: $followUpRequested,
//       shareWithCongregation: $shareWithCongregation
//     ) {
//       ok
//       prayerRequest { id }
//     }
//   }
// `

// export const CREATE_ANONYMOUS_PRAYER_REQUEST = gql`
//   mutation CreateAnonymousPrayerRequest($message: String!, $category: String) {
//     createAnonymousPrayerRequest(message: $message, category: $category) {
//       ok
//       prayerRequest { id }
//     }
//   }
// `

export const CREATE_PRAYER_REQUEST = gql`
  mutation SubmitPrayerRequest(
    $message: String!, $isAnonymous: Boolean, $name: String, $phone: String,
    $category: String, $urgency: String, $followUpRequested: Boolean,
    $shareWithCongregation: Boolean
  ) {
    submitPrayerRequest(
      message: $message, isAnonymous: $isAnonymous, name: $name, phone: $phone,
      category: $category, urgency: $urgency, followUpRequested: $followUpRequested,
      shareWithCongregation: $shareWithCongregation
    ) {
      ok
      prayerRequest { id }
    }
  }
`

export const CREATE_BAPTISM_INQUIRY = gql`
  mutation CreateBaptismInquiry(
    $fullName: String!, $phone: String!, $dob: Date, $email: String,
    $isSaved: String, $previousBaptism: String, $timeline: String, $notes: String
  ) {
    createBaptismInquiry(
      fullName: $fullName, phone: $phone, dob: $dob, email: $email,
      isSaved: $isSaved, previousBaptism: $previousBaptism, timeline: $timeline, notes: $notes
    ) {
      ok
      baptismInquiry { id }
    }
  }
`

export const CREATE_VISITATION_REQUEST = gql`
  mutation CreateVisitationRequest(
    $fullName: String!, $phone: String!, $address: String, $reason: String,
    $preferredDays: [String], $notes: String
  ) {
    createVisitationRequest(
      fullName: $fullName, phone: $phone, address: $address, reason: $reason,
      preferredDays: $preferredDays, notes: $notes
    ) {
      ok
      visitationRequest { id }
    }
  }
`

export const CREATE_MEMBER_APPLICATION = gql`
  mutation CreateMemberApplication(
    $firstName: String!, $lastName: String!, $phone: String!, $email: String,
    $dob: Date, $area: String, $maritalStatus: String, $previousChurch: String,
    $ministries: [String]
  ) {
    createMemberApplication(
      firstName: $firstName, lastName: $lastName, phone: $phone, email: $email,
      dob: $dob, area: $area, maritalStatus: $maritalStatus, previousChurch: $previousChurch,
      ministries: $ministries
    ) {
      ok
      memberApplication { id }
    }
  }
`