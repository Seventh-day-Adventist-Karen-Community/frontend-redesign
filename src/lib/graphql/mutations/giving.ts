import { gql } from "@apollo/client/core";

// `$unit` is an Int — the church unit's raw primary key (see pkFromGlobalId),
// sent as a real number or null. A string here is rejected with HTTP 400.
export const INITIATE_MPESA = gql`
  mutation CreateMpesa(
    $phone: String!
    $email: String!
    $name: String!
    $lines: [InitiateLineType]!
    $unit: Int
  ) {
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
`;
