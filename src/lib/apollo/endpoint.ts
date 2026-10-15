// Turns NEXT_PUBLIC_GRAPHQL_URL into the exact GraphQL endpoint.
//
//   "https://admin.sdackc.org"          -> "https://admin.sdackc.org/graphql"
//   "http://127.0.0.1:8000/"            -> "http://127.0.0.1:8000/graphql"
//   "https://admin.sdackc.org/graphql"  -> used exactly as given
//   "https://admin.sdackc.org/graphql/" -> used exactly as given (some Django
//                                          setups require the trailing slash)
//
// "/graphql" is only added when the URL has no path at all.
export function graphqlEndpoint(base: string = process.env.NEXT_PUBLIC_GRAPHQL_URL ?? ""): string {
  const value = base.trim();
  if (!value) return "";
  try {
    const url = new URL(value);
    if (url.pathname === "" || url.pathname === "/") {
      url.pathname = "/graphql";
      return url.toString();
    }
    return value;
  } catch {
    return value; // not a valid absolute URL: let the request fail loudly
  }
}
