import {createClient} from 'next-sanity'

const token = process.env.SANITY_API_READ_TOKEN

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2025-02-19',
  perspective: 'published',
  useCdn: !token,
  token,
})
