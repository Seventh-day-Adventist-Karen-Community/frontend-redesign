"use server";

import { apolloClient } from "@/lib/apollo/client";
import { extractNodes, pkFromGlobalId } from "@/lib/graphql/helpers";
import { CHURCH_UNITS, INITIATED_PAYMENT, PAYMENT_TYPES } from "@/lib/graphql/queries/giving";
import { INITIATE_MPESA } from "@/lib/graphql/mutations/giving";
import { promptWasSent } from "./status";
import type {
  ChurchUnit,
  GivingRequest,
  InitiateResponse,
  InitiatedPayment,
  PaymentType,
  StatusResponse,
} from "./types";

// Pulls the most useful message out of an Apollo failure. A GraphQL 400 puts
// the real reason (e.g. `Variable "$unit" got invalid value...`) inside the
// network error body, not in `error.message`.
function messageFrom(e: any): string {
  // No GraphQL body at all means the backend couldn't be reached (down,
  // wrong URL, network) — say that, rather than showing "fetch failed".
  if (e?.networkError && !e.networkError.result && !e.graphQLErrors?.length) {
    return "We couldn't reach the giving service. Please try again in a moment.";
  }
  return (
    e?.graphQLErrors?.[0]?.message ??
    e?.networkError?.result?.errors?.[0]?.message ??
    e?.message ??
    "Something went wrong. Please try again."
  );
}

// Server-side log that says what is wrong with the connection, so a bad
// NEXT_PUBLIC_GRAPHQL_URL is obvious in the terminal.
function logFailure(where: string, e: any) {
  const net = e?.networkError;
  let hint = "";
  if (net?.statusCode) {
    const isGraphql = typeof net.result === "object" && net.result?.errors;
    hint = ` (HTTP ${net.statusCode}${
      isGraphql ? "" : ": the server did not answer with GraphQL, so check NEXT_PUBLIC_GRAPHQL_URL"
    })`;
  } else if (net) {
    hint = " (could not connect: check NEXT_PUBLIC_GRAPHQL_URL and that the backend is running)";
  }
  console.error(`[giving] ${where} failed${hint}: ${messageFrom(e)}`);
}

export async function getPaymentTypes(): Promise<PaymentType[]> {
  try {
    const { data } = await apolloClient.query({ query: PAYMENT_TYPES });
    return extractNodes<PaymentType>(data?.paymentTypes);
  } catch (e) {
    logFailure("getPaymentTypes", e);
    throw e;
  }
}

export async function getChurchUnits(): Promise<ChurchUnit[]> {
  try {
    const { data } = await apolloClient.query({ query: CHURCH_UNITS });
    return extractNodes<{ id: string; name: string }>(data?.churchUnits).flatMap((node) => {
      const pk = pkFromGlobalId(node.id);
      return pk === undefined ? [] : [{ id: node.id, name: node.name, pk }];
    });
  } catch (e) {
    logFailure("getChurchUnits", e);
    throw e;
  }
}

export async function initiatePayment(request: GivingRequest): Promise<InitiateResponse> {
  // M-Pesa takes whole shillings, and the backend runs int() on each amount,
  // so anything else would crash there — keep only positive whole numbers.
  const lines = request.lines
    .filter((l) => Number.isInteger(l.amount) && l.amount > 0)
    .map((l) => ({ code: l.code, amount: String(l.amount) }));

  if (lines.length === 0) {
    return {
      errors: [{ message: "Oops! It looks like there are no contributions entered. Please check and try again." }],
    };
  }

  // `unit` is an Int in the schema: a real number, or null when none chosen.
  const unitPk = Number.parseInt(request.unit ?? "", 10);

  try {
    const { data } = await apolloClient.mutate({
      mutation: INITIATE_MPESA,
      variables: {
        phone: request.phone,
        email: request.email ?? "",
        name: request.name,
        unit: Number.isInteger(unitPk) && unitPk > 0 ? unitPk : null,
        lines,
      },
    });
    const result: InitiatedPayment | undefined =
      data?.initiateMpesaExpressPayment?.initiateMpesaExpress;
    if (!result) return { errors: [{ message: "The payment could not be started. Please try again." }] };
    // A non-zero code means M-Pesa did not accept the request: no PIN prompt
    // reached the phone, so there is nothing to wait for.
    if (!promptWasSent(result)) {
      return {
        errors: [{ message: result.ResultDescription || "M-Pesa could not send the payment prompt to your phone." }],
      };
    }
    return { result };
  } catch (e) {
    // Without this, a backend/GraphQL failure would crash the Server Action
    // as an unhandled 500 instead of reaching the form as a message.
    logFailure("initiatePayment", e);
    return { errors: [{ message: messageFrom(e) }] };
  }
}

export async function getPaymentStatus(id: string): Promise<StatusResponse> {
  try {
    const { data } = await apolloClient.query({
      query: INITIATED_PAYMENT,
      variables: { transId: id },
    });
    const result: InitiatedPayment | undefined = data?.initiatedPayment;
    if (!result) return { errors: [{ message: "A transaction with that reference was not found." }] };
    return { result };
  } catch (e) {
    logFailure("getPaymentStatus", e);
    return { errors: [{ message: messageFrom(e) }] };
  }
}
