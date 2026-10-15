import * as live from "./actions";
import * as mock from "./mock";
import type { GivingApi } from "./types";

// Live GraphQL when NEXT_PUBLIC_GRAPHQL_URL is set, otherwise the built-in
// sample data (so the draft still runs on its own).
export const LIVE = Boolean(process.env.NEXT_PUBLIC_GRAPHQL_URL);
export const giving: GivingApi = LIVE ? live : mock;
