import type {
  ChurchUnit,
  GivingRequest,
  InitiateResponse,
  PaymentType,
  StatusResponse,
} from "./types";

// Built-in sample data so /giving runs without a backend. Same shapes and
// behaviour as the live actions; no payment is ever made.

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const TYPES: PaymentType[] = [
  { code: "TITHE", sequenceNo: 1, description: "God's Tithe 10%", name: "Tithe" },
  { code: "LCB", sequenceNo: 2, description: "Local Church Budget", name: "Local Church Budget" },
  { code: "EVANGELISM", sequenceNo: 3, description: "Evangelism Fund", name: "Evangelism" },
  { code: "MISSION", sequenceNo: 4, description: "Mission Offering", name: "Mission" },
  { code: "BUILDING", sequenceNo: 5, description: "Church Building Fund", name: "Building" },
  { code: "COMMUNITY", sequenceNo: 6, description: "Community Services", name: "Community Services" },
];

const UNITS: ChurchUnit[] = [
  { id: btoa("ChurchUnitNode:1"), name: "cuksda", pk: 1 },
  { id: btoa("ChurchUnitNode:2"), name: "jkuat-karen", pk: 2 },
];

const polls = new Map<string, number>();

export async function getPaymentTypes() {
  await sleep(400);
  return TYPES;
}

export async function getChurchUnits() {
  await sleep(300);
  return UNITS;
}

export async function initiatePayment(request: GivingRequest): Promise<InitiateResponse> {
  await sleep(600);
  if (!request.lines.some((l) => l.amount > 0)) {
    return {
      errors: [{ message: "Oops! It looks like there are no contributions entered. Please check and try again." }],
    };
  }
  const id = btoa(`InitiateNode:${Date.now()}`);
  polls.set(id, 0);
  return {
    result: { id, reference: `DRAFT${polls.size}`, ResultCode: 0, state: "INITIATED", ResultDescription: "Success. Request accepted for processing" },
  };
}

export async function getPaymentStatus(id: string): Promise<StatusResponse> {
  await sleep(300);
  const n = (polls.get(id) ?? 0) + 1;
  polls.set(id, n);
  const reference = `DRAFT-${id.slice(-6)}`;
  if (n < 3) {
    return { result: { reference, ResultCode: 0, state: "INITIATED", ResultDescription: "The service request is being processed." } };
  }
  return {
    result: { reference, ResultCode: 0, state: "COMPLETED", ResultDescription: "The service request is processed successfully." },
  };
}
