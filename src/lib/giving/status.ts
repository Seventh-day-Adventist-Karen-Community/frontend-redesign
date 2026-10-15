import type { InitiatedPayment } from "./types";

export type PaymentOutcome = "success" | "failed" | "pending";

// Decides what an `initiatedPayment` answer means.
//
// The STK push being *sent* is not a payment. A gift counts as paid only when
// the backend reports COMPLETED, meaning M-Pesa answered after the giver
// entered their PIN, and the result code (if one is present) is 0.
//   COMPLETED + result code 0/none -> success
//   COMPLETED + any other code      -> failed (don't trust a mixed signal)
//   FAILED                          -> failed (cancelled, wrong PIN, timed out...)
//   INITIATED / anything else       -> pending: still waiting for the PIN response
export function interpretStatus(
  payment: Pick<InitiatedPayment, "state" | "ResultCode">
): PaymentOutcome {
  switch (payment.state) {
    case "COMPLETED":
      return payment.ResultCode == null || payment.ResultCode === 0 ? "success" : "failed";
    case "FAILED":
      return "failed";
    default:
      return "pending";
  }
}

// The response to starting the payment: a non-zero code means M-Pesa did not
// accept the request, so no prompt reached the phone.
export function promptWasSent(payment: Pick<InitiatedPayment, "ResultCode">): boolean {
  return payment.ResultCode == null || payment.ResultCode === 0;
}
