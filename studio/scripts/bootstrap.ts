#!/usr/bin/env tsx
import {execFileSync} from 'node:child_process'
import {existsSync, readFileSync, writeFileSync} from 'node:fs'
import {resolve} from 'node:path'

const root = resolve(import.meta.dirname, '../..')
const rootEnv = resolve(root, '.env')
const appEnv = resolve(root, 'apps/frontend/.env.local')

function run(cmd: string, args: string[]) {
  execFileSync(cmd, args, {stdio: 'inherit'})
}

function parseEnv(path: string): Record<string, string> {
  if (!existsSync(path)) return {}
  return Object.fromEntries(
    readFileSync(path, 'utf8')
      .split('\n')
      .map((line) => line.match(/^([^#=]+)=(.*)$/))
      .filter(Boolean)
      .map((match) => [match![1].trim(), match![2].trim()]),
  )
}

const env = parseEnv(rootEnv)
if (env.SANITY_PROJECT_ID && env.SANITY_DATASET) {
  const appEnvContent = [
    `NEXT_PUBLIC_SANITY_PROJECT_ID=${env.SANITY_PROJECT_ID}`,
    `NEXT_PUBLIC_SANITY_DATASET=${env.SANITY_DATASET}`,
    `NEXT_PUBLIC_SANITY_API_VERSION=${env.SANITY_API_VERSION ?? '2025-02-19'}`,
  ].join('\n')
  writeFileSync(appEnv, `${appEnvContent}\n`)
  console.log('Wrote apps/frontend/.env.local')
}

run('pnpm', ['run', 'typegen'])
run('pnpm', ['--filter', 'studio', 'run', 'generate-sample-data'])
if (env.SANITY_API_WRITE_TOKEN) {
  run('pnpm', ['--filter', 'studio', 'run', 'import-sample-data'])
} else {
  console.log('Skipping import-sample-data (missing SANITY_API_WRITE_TOKEN)')
}

console.log('Bootstrap complete')
