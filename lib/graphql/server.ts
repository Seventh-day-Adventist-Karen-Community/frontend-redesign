import { print } from 'graphql'
import type { DocumentNode } from 'graphql'

const GRAPHQL_URL =
  process.env.NEXT_PUBLIC_GRAPHQL_URL ??
  'http://127.0.0.1:8000'

const uri = `${GRAPHQL_URL}/graphql`

interface FetchGraphQLOptions {
  revalidate?: number | false
  tags?: string[]
}

export async function fetchGraphQL<T = any>(
  query: DocumentNode,
  variables?: Record<string, any>,
  options: FetchGraphQLOptions = {}
): Promise<T> {
  // Public content — no auth needed, so no cookies() call here.
  // cookies() requires a real request context and breaks generateStaticParams,
  // which runs at build time before any request exists.
  const res = await fetch(uri, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: print(query), variables }),
    next: {
      revalidate: options.revalidate ?? 3600,
      tags: options.tags,
    },
  })

  if (!res.ok) {
    throw new Error(`GraphQL request failed: ${res.status} ${res.statusText}`)
  }

  const json = await res.json()

  if (json.errors?.length) {
    console.error('[GraphQL]', json.errors.map((e: any) => e.message).join('\n'))
    throw new Error(json.errors.map((e: any) => e.message).join('\n'))
  }

  return json.data as T
}