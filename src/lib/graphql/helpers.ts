// Flattens a Relay connection ({ edges: [{ node }] }) into a plain array.
export function extractNodes<T>(
  connection?: { edges?: ({ node?: T | null } | null)[] | null } | null
): T[] {
  return (connection?.edges ?? [])
    .map((edge) => edge?.node)
    .filter((node): node is T => node != null);
}

// Graphene encodes Relay global IDs as base64("TypeName:pk"). Some mutation
// inputs (like giving's `unit: Int`) want the raw integer pk, not that
// encoded string. Only the part after ":" matters, so the type name is free.
export function pkFromGlobalId(globalId: string): number | undefined {
  try {
    const [, pk] = Buffer.from(globalId, "base64").toString("utf-8").split(":");
    const n = Number.parseInt(pk, 10);
    return Number.isInteger(n) ? n : undefined;
  } catch {
    return undefined;
  }
}
