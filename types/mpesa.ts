'use server'

import { gql } from "@apollo/client";
import { apolloClient as client } from "@lib/apollo/client";
import { NormifyB64 } from '@utils/normify-url';

export type MpesaLinestype = {
    code: string;
    amount: number | string;
}

export type InitiatedPaymentType = {
    id: string;
    externalReference: string;
    reference: string;
    state: 'INITIATED' | 'FAILED' | 'COMPLETED';
    ResultDescription: string;
}

// Type for fetched Church Unit Nodes
export type ChurchUnitType = {
    id: string;   // Relay global ID (base64 "TypeName:pk") — for React keys / refetching by id
    name: string;
    pk: number | undefined;   // Raw integer primary key — this is what the `unit: Int` mutation input wants
}

// Graphene's relay.Node encodes global IDs as base64("TypeName:pk"). The
// mutation's `unit` argument wants the raw integer pk, not that encoded
// string, so this pulls it back out. Only the part after the ':' matters,
// so it doesn't matter what the node's type name actually is.
const decodeGlobalIdToPk = (globalId: string): number | undefined => {
    try {
        const decoded = Buffer.from(globalId, 'base64').toString('utf-8') // e.g. "ChurchUnitNode:5"
        const [, pk] = decoded.split(':')
        return pk ? Number(pk) : undefined
    } catch {
        return undefined
    }
}

export type MpesaType = {
    name: string;
    name_error?: string;
    phone: string;
    phone_error?: string;
    district?: string;
    church?: string;
    email: string;
    email_error?: string;
    lines?: MpesaLinestype[];
    errored: boolean;
    total?: number;
    save: boolean;
    unit: string;          // Selected ChurchUnit ID (relay global ID, not the unit's name)
    unit_error?: string;   // Optional error field
}

export type PaidTransactionLineType = {
    code: string;
    amount: number;
    description: string;
    name: string;
}

export type PaidTransactionType = {
    no: string;
    name: string;
    phone: string;
    district?: string;
    church?: string;
    email: string;
    reference: string;
    externalReference: string;
    createdAt: Date;
    paymentMode: string;
    lines: PaidTransactionLineType[];
    amount: number;
}

export type PaymentType = {
    code: string;
    sequenceNo: number;
    description: string;
    name: string;
}

// Fetch all Church Units (Follows existing Apollo Query pattern)
export const FetchChurchUnits = async (): Promise<ChurchUnitType[]> => {
    const { data } = await client.query<{
        churchUnits: { edges: { node: { id: string; name: string } }[] }
    }>({
        query: gql`
            query ChurchUnits {
                churchUnits {
                    edges {
                        node {
                            id
                            name
                        }
                    }
                }
            }
        `,
        fetchPolicy: 'no-cache',
        context: {
            fetchOptions: {
                next: { revalidate: 0 },
            },
        },
    });

    const churchUnits: ChurchUnitType[] = data.churchUnits.edges.map((edge: any) => ({
        ...edge.node,
        pk: decodeGlobalIdToPk(edge.node.id),
    }));

    return churchUnits;
};

export const PostMpesa = async (MpesaData: MpesaType) => {
    let error_message = 'Oops! It looks like there are no contributions entered. Please check and try again.'

    let lines = MpesaData.lines?.filter(line => (
        line !== undefined &&
        line !== null &&
        line.amount !== undefined &&
        line.amount !== null &&
        line.amount !== '' &&
        line.amount !== 0 &&
        line.amount !== '0'
    )).map(line => ({
        code: line.code,
        amount: line.amount
    }))

    let payload = {
        phone: MpesaData.phone,
        email: MpesaData.email,
        name: MpesaData.name,
        district: MpesaData.district || '',
        church: MpesaData.church || '',
        // The GraphQL `unit` argument is an Int, so decode the selected
        // Relay global ID to its raw primary key.
        unit: MpesaData.unit ? decodeGlobalIdToPk(MpesaData.unit) ?? null : null,
        lines: lines
    }

    // DEBUG — confirm the exact payload/variables about to be sent.
    // Runs server-side (this is a 'use server' action), so check your
    // Next.js terminal output, not the browser console. Remove once
    // you've confirmed things look right.
    console.log('[PostMpesa] payload:', JSON.stringify(payload, null, 2))
    console.log('[PostMpesa] unit ->', payload.unit, '(typeof:', typeof payload.unit, ')')

    if (lines == undefined || lines.length == 0) {
        return { errors: [{ message: error_message }] }
    }

    try {
        const { data } = await client.mutate<{
            initiateMpesaExpressPayment: {
                initiateMpesaExpress: InitiatedPaymentType
            }
        }>({
            mutation: gql`
                mutation CreateMpesa($phone: String!, $email: String!, $name: String!, $lines: [InitiateLineType]!, $unit: Int) {
                    initiateMpesaExpressPayment(
                        input: { phone: $phone, email: $email, name: $name, lines: $lines, unit: $unit }
                    ) {
                        initiateMpesaExpress {
                            CheckoutRequestID
                            MerchantRequestID
                            ResultCode
                            externalReference
                            ResultDescription
                            mode
                            reference
                            id
                        }
                    }
                }                    
            `,
            variables: {
                ...payload
            },
            fetchPolicy: "no-cache",
            context: {
                fetchOptions: {
                    next: { revalidate: 0 },
                },
            }
        })

        if (!data) {
            return { errors: [{ message: 'Something went wrong while initiating your payment. Please try again.' }] }
        }
        const result: InitiatedPaymentType = data.initiateMpesaExpressPayment.initiateMpesaExpress
        return { result: result, errors: undefined }
    } catch (e: any) {
        // A network- or schema-level failure (e.g. a GraphQL 400 from a bad
        // variable) throws here rather than returning { errors } — without
        // this catch, that exception crashes the whole Server Action as an
        // unhandled 500 instead of surfacing a normal error to the form.
        console.log(e?.message || e)
        return {
            errors: [{ message: e?.message || 'Something went wrong while initiating your payment. Please try again.' }],
        }
    }
}

export const ConfirmStatus = async (reference: string) => {
    const { data, error } = await client.query<{ initiatedPayment: InitiatedPaymentType }>({
        query: gql`
            query initiatedPayment($transId: ID!) {
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
        variables: {
            transId: reference
        },
        fetchPolicy: 'no-cache',
        context: {
            fetchOptions: {
                next: { revalidate: 0 },
            },
        },
    })
    const result: InitiatedPaymentType = data.initiatedPayment
    return { result: result, errors: error }
}

export const FetchPaymentTypes = async () => {
    const { data } = await client.query<{
        paymentTypes: { edges: { node: PaymentType }[] }
    }>({
        variables: {
            active: true,
        },
        query: gql`
            query PaymentTypes {
                paymentTypes(active: true) {
                    edges {
                        node {
                            code
                            id
                            description
                            priority
                            sequenceNo
                            name
                        }
                    }
                }
            }          
        `,
        fetchPolicy: 'no-cache',
        context: {
            fetchOptions: {
                next: { revalidate: 0 },
            }
        }
    })
    const payTypes: PaymentType[] = data.paymentTypes.edges.map((type: any) => ({
        ...type.node
    }))
    return payTypes
}

export const FetchPaymentType = async (code: string) => {
    const { data } = await client.query<{
        paymentTypes: { edges: { node: PaymentType }[] }
    }>({
        variables: {
            code: code
        },
        query: gql`
            query PaymentTypes($code: String) {
                paymentTypes(code: $code) {
                    edges {
                        node {
                            code
                            id
                            description
                            priority
                            sequenceNo
                            name
                        }
                    }
                }
            }          
        `,
        fetchPolicy: 'no-cache',
        context: {
            fetchOptions: {
                next: { revalidate: 0 },
            }
        }
    })
    const payTypes: PaymentType[] = data.paymentTypes.edges.map((type: any) => ({
        ...type.node
    }))
    return payTypes
}

export const FetchTransactionReceipt = async (reference: string) => {
    reference = NormifyB64(reference)
    const { data, error } = await client.query<{
        transactions: {
            edges: {
                node: PaidTransactionType & {
                    transactionLines: {
                        edges: { node: { amount: number; paymentType: PaymentType } }[]
                    }
                }
            }[]
        }
    }>({
        query: gql`
            query TranSactions($reference: String) {
                transactions(reference: $reference) {
                    edges {
                        node {
                            id
                            no
                            notified
                            reference
                            phone
                            paymentMode
                            createdAt
                            confirmationCode
                            amount
                            church
                            district
                            email
                            name
                            transactionLines {
                                edges {
                                    node {
                                        amount
                                        createdAt
                                        id
                                        paymentType {
                                            code
                                            description
                                            name
                                            sequenceNo
                                        }
                                    }
                                }
                            }
                            status
                        }
                    }
                }
            }          
        `,
        variables: {
            reference: reference
        }
    })
    const result: PaidTransactionType = data.transactions.edges.map((transaction: any) => ({
        ...transaction.node,
        lines: transaction.node.transactionLines.edges.map((line: any) => ({
            ...line.node,
            ...line.node.paymentType
        }))
    }))[0]

    return { result: result, errors: error }
}