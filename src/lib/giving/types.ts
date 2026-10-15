export type PaymentType = {
  code: string;
  sequenceNo: number;
  description: string;
  name: string;
};

// `pk` is the raw integer id the backend's `unit: Int` input wants; `id` is
// the Relay global id.
export type ChurchUnit = {
  id: string;
  name: string;
  pk: number;
};

export type PaymentState = "INITIATED" | "FAILED" | "COMPLETED";

export type InitiatedPayment = {
  id?: string;
  reference: string;
  externalReference?: string | null;
  state: PaymentState;
  ResultDescription: string;
};

export type GivingLine = { code: string; amount: number };

export type GivingRequest = {
  name: string;
  phone: string;
  email: string; // "" when the giver leaves it blank — the backend requires the field
  unit?: string; // church unit pk as chosen in the <select>; converted to a number before sending
  lines: GivingLine[];
};

export type ApiError = { message: string };
export type InitiateResponse = { result?: InitiatedPayment; errors?: ApiError[] };
export type StatusResponse = { result?: InitiatedPayment; errors?: ApiError[] };

// Implemented twice: lib/giving/actions.ts (live GraphQL) and
// lib/giving/mock.ts (built-in sample data).
export interface GivingApi {
  getPaymentTypes(): Promise<PaymentType[]>;
  getChurchUnits(): Promise<ChurchUnit[]>;
  initiatePayment(request: GivingRequest): Promise<InitiateResponse>;
  getPaymentStatus(id: string): Promise<StatusResponse>;
}
