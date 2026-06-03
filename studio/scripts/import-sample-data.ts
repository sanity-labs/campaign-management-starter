#!/usr/bin/env tsx
import {createClient} from '@sanity/client'
import {readFileSync} from 'node:fs'
import {resolve} from 'node:path'

for (const dir of [resolve(import.meta.dirname, '..'), resolve(import.meta.dirname, '../..')]) {
  for (const suffix of ['.env.local', '.env']) {
    try {
      process.loadEnvFile(resolve(dir, suffix))
    } catch {}
  }
}

const projectId = process.env.SANITY_PROJECT_ID
const dataset = process.env.SANITY_DATASET
const token = process.env.SANITY_API_WRITE_TOKEN

if (!projectId || !dataset || !token) {
  throw new Error('Missing SANITY_PROJECT_ID, SANITY_DATASET, or SANITY_API_WRITE_TOKEN')
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: process.env.SANITY_API_VERSION ?? '2025-02-19',
  token,
  useCdn: false,
})

const dataPath = resolve(import.meta.dirname, '..', 'sample-data.ndjson')
const documents = readFileSync(dataPath, 'utf8')
  .trim()
  .split('\n')
  .map((line) => JSON.parse(line))

const tx = client.transaction()
for (const doc of documents) tx.createOrReplace(doc)
await tx.commit()

console.log(`Imported ${documents.length} documents`)
