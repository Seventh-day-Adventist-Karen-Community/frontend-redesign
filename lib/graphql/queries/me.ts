import { gql } from "@apollo/client"
// import client from "../apollo-client"
import {apolloClient } from "@/lib/apollo/client";
import { MeType } from "@/types/me"

const FetchMe = async () => {
  // console.log('Fetching')
    const {data, errors} = await apolloClient .query({
        query: gql`            
        query Me {
          me {
            username
            firstName
            lastName
            email
            lastLogin
            dateJoined
            isStaff
            setup{
              isAnalyticAdmin
              isActivityAdmin
              memberNumber
              phoneNumber
              address
              avatar
              memberNumber
              intergrationId
            }
            leader {
              id
              no
              firstName
              lastName
              middleName
              email
              avatar
              title
              position {
                atomic
                description
                code
                name
              }
            }
            verified
          }
        }                         
        `,
    })
    let meData:MeType = data.me
  return meData
}

export default FetchMe
