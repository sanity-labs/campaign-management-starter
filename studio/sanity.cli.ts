import {defineCliConfig} from 'sanity/cli'

for (const dir of [import.meta.dirname, `${import.meta.dirname}/..`]) {
  for (const suffix of ['.env.local', '.env']) {
    try {
      process.loadEnvFile(`${dir}/${suffix}`)
    } catch {}
  }
}

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_PROJECT_ID!,
    dataset: process.env.SANITY_DATASET!,
  },
  reactCompiler: {target: '19'},
  reactStrictMode: true,
  vite: {
    envDir: '..',
    server: {
      open: process.env.SANITY_STUDIO_SERVER_OPEN === 'true',
    },
  },
  deployment: {
    autoUpdates: true,
    appId: 'v0w757tsl10oifenwd29g8v1',
  },
  typegen: {
    enabled: true,
    path: ['./**/*.{ts,tsx}', '../apps/*/src/**/*.{ts,tsx}', '../packages/*/**/*.{ts,tsx}'],
    generates: '../packages/sanity-types/sanity.types.ts',
  },
})
