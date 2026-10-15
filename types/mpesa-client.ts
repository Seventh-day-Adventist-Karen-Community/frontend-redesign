
import React from 'react'
import { gql } from "@apollo/client";
import { apolloClient as client } from "../lib/apollo/client";
import { InitiatedPaymentType } from './mpesa';
import { NormifyB64 } from '@utils/normify-url';


export const ConfirmStatus = async (reference:string) => {
    let newRef = NormifyB64(reference)
    const {data, error} = await client.query<{ initiatedPayment: InitiatedPaymentType }>({
        query: gql`
            query initiatedPayment($transId:ID!){
                initiatedPayment(id: $transId) {
                    CheckoutRequestID
                    MerchantRequestID
                    ResultCode
                    externalReference
                    reference
                    state
                    ResultDescription
                }
            }                 
        `,
        variables:{ 
            transId: newRef
        },
        fetchPolicy: 'no-cache',
        context: {
            fetchOptions: {
                next: { revalidate: 0 },
            },
    },
    })
    if (!data) {
        throw error ?? new Error('No payment status was returned')
    }
    const result:InitiatedPaymentType = data.initiatedPayment
    return {result:result, errors:error}
}
