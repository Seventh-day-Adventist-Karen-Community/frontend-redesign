'use server'

import React from 'react'
import { gql } from "@apollo/client";
import { apolloClient as apolloServerClient  } from "@/lib/apollo/client" ;  // ← was '@/lib/apollo/client'
import { AuthResponse } from '@/types/auth';

export const LoginUser = async ({username, password}:{username:string, password:string}) => {
    const {data, errors} = await apolloServerClient.mutate({
        mutation: gql`
        mutation Login( $username: String!, $password: String!) {
            tokenAuth(input:{username: $username, password: $password}) {
              success
              errors
              token
              refreshExpiresIn
            }
          }                   
        `,
        variables:{ 
            username:username,
            password:password,
        },
        fetchPolicy: "no-cache",
        context: {
            fetchOptions: {
                next: { revalidate: 0 },
            },
        }
    })
    const auth:AuthResponse = data.tokenAuth
  return auth
}

export const SignUpUser = async ({username, password1,password2, email}:{username:string, password1:string, password2?:string, email?:string}) => {
    const {data, errors} = await apolloServerClient.mutate({
        mutation: gql`
            mutation Register($username:String!,$password1:String!,$password2:String!, $email:String!){
                register(input:{username:$username, password1:$password1, password2:$password2,email: $email}){
                    success
                    errors    
                }
            }                    
        `,
        variables:{ 
            username:username,
            password1:password1,
            password2: password2, 
            email: email
        },
    })
    // console.log(data)
    const auth:{success:boolean,errors:object} = data.register
  return auth
}


export const ResendActivationEmail = async ({email}:{email:string}) => {
    const {data, errors} = await apolloServerClient.mutate({
        mutation: gql`
            mutation ResendActivationEmail($email:String!){
                resendActivationEmail(input:{email:$email}){
                    success
                    errors
                }
            }               
        `,
        variables:{ 
            email:email
        },
        fetchPolicy: "no-cache",
        context: {
            fetchOptions: {
                next: { revalidate: 0 },
            },
        }
    })
    const auth:{success:boolean,errors:object} = data.resendActivationEmail
  return auth
}

export const VerifyAccount = async ({token}:{token:string}) => {
    let formatedToken = token.replaceAll('%3A', ':');
    formatedToken = formatedToken.replaceAll('%3D', '=');
    // console.log(formatedToken)
    const {data, errors} = await apolloServerClient.mutate({
        mutation: gql`
            mutation verifyAccount($token:String!){
                verifyAccount(input:{token:$token}){
                    success
                    errors
                }
            }                 
        `,
        variables:{ 
            token:formatedToken
        },
    })
    const auth:{success:boolean,errors:object} = data.verifyAccount
  return auth
}
export const VerifyToken = async (token:string) => {
    let formatedToken = token.replaceAll('%3A', ':');
    formatedToken = formatedToken.replaceAll('%3D', '=');
    // console.log(formatedToken)
    const {data, errors} = await apolloServerClient.mutate({
        mutation: gql`
            mutation verifyToken($token:String!){
                verifyToken(input:{token:$token}){
                    success
                    errors
                }
            }                 
        `,
        variables:{ 
            token:formatedToken
        },
    })
    const auth:{success:boolean,errors:object} = data.verifyToken
    // console.log(auth)
  return auth
}

export const SendPasswordResetEmail = async ({email}:{email:string}) => {
    const {data, errors} = await apolloServerClient.mutate({
        mutation: gql`            
            mutation sendPasswordResetEmail($email:String!){
                sendPasswordResetEmail(input:{email:$email}){
                    success
                    errors
                }
            }                        
        `,
        variables:{ 
            email:email
        },
        fetchPolicy: "no-cache",
        context: {
            fetchOptions: {
                next: { revalidate: 0 },
            },
        }
    })
    const auth:{success:boolean,errors:object} = data.sendPasswordResetEmail
  return auth
}

export const PasswordReset = async ({token, newPassword1, newPassword2}:{token:string, newPassword1:string, newPassword2:string}) => {
    let formatedToken = token.replaceAll('%3A', ':');
    formatedToken = formatedToken.replaceAll('%3D', '=');
    const {data, errors} = await apolloServerClient.mutate({
        mutation: gql`            
            mutation passwordReset($token:String!, $newPassword1:String!, $newPassword2:String!){
                passwordReset(input:{token:$token, newPassword1:$newPassword1, newPassword2:$newPassword2}){
                    success
                    errors
                }
            }                                 
        `,
        variables:{ 
            token:formatedToken,
            newPassword1: newPassword1,
            newPassword2: newPassword2
        },
        fetchPolicy: "no-cache",
        context: {
            fetchOptions: {
                next: { revalidate: 0 },
            },
        }
    })
    const auth:{success:boolean,errors:object} = data.passwordReset
  return auth
}

export const PasswordChange = async ({oldPassword, newPassword1, newPassword2}:{oldPassword:string, newPassword1:string, newPassword2:string}) => {
    const {data, errors} = await apolloServerClient.mutate({
        mutation: gql`            
            mutation passwordChange($oldPassword:String!, $newPassword1:String!, $newPassword2:String!){
                passwordChange(input:{oldPassword:$oldPassword, newPassword1:$newPassword1, newPassword2:$newPassword2}){
                    success
                    errors
                    token
                }
            }                             
        `,
        variables:{ 
            oldPassword:oldPassword,
            newPassword1: newPassword1,
            newPassword2: newPassword2
        },
        fetchPolicy: "no-cache",
        context: {
            fetchOptions: {
                next: { revalidate: 0 },
            },
        }
    })
    const auth:{success:boolean,errors:object, token:string} = data.passwordChange
  return auth
}

export const UpdateAccount = async ({firstName, lastName, phoneNumber, address, avatar}:{firstName:string, lastName:string, phoneNumber: string, address: string, avatar: any}) => {
    const {data, errors} = await apolloServerClient.mutate({
        mutation: gql`            
            mutation updateAccount($firstName: String, $lastName: String, $phoneNumber: String!, $address: String, $avatar: Upload) {
                updateAccount(input: {firstName: $firstName, lastName: $lastName}) {
                    success
                    errors
                }
                updateUserSetup(input:{phoneNumber:$phoneNumber, address: $address, avatar: $avatar}){
                    success
                }
            }                           
        `,
        variables:{ 
            firstName:firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            avatar: avatar,
            address: address
        },
        fetchPolicy: "no-cache",
        context: {
            fetchOptions: {
                next: { revalidate: 0 },
            },
        }
    })
    const auth:{success:boolean,errors:object} = data.updateAccount
  return auth
}

