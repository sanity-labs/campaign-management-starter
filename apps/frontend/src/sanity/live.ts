import {client} from './client'

export async function sanityFetch<T>(query: string, params?: Record<string, unknown>) {
  return params ? client.fetch<T>(query, params as any) : client.fetch<T>(query)
}
