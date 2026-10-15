import { gql } from "@apollo/client/core";

export const PAYMENT_TYPES = gql`
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
`;

export const CHURCH_UNITS = gql`
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
`;

export const INITIATED_PAYMENT = gql`
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
`;
