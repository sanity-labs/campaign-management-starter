import {assist} from '@sanity/assist'
import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {presentationTool} from 'sanity/presentation'
import {structureTool} from 'sanity/structure'
import {campaignStructure, singletonDocumentActions} from './lib/structure'
import {resolve} from './presentation/resolve'
import {schemaTypes} from './schemaTypes'

function firstResolvedValue(values: Array<string | undefined>) {
  return values.find((value) => value != null && value !== '' && !value.includes('${'))
}

const projectId =
  firstResolvedValue([
    import.meta.env?.SANITY_STUDIO_PROJECT_ID,
    import.meta.env?.SANITY_PROJECT_ID,
    process.env.SANITY_STUDIO_PROJECT_ID,
    process.env.SANITY_PROJECT_ID,
  ]) ?? ''
const dataset =
  firstResolvedValue([
    import.meta.env?.SANITY_STUDIO_DATASET,
    import.meta.env?.SANITY_DATASET,
    process.env.SANITY_STUDIO_DATASET,
    process.env.SANITY_DATASET,
  ]) ?? ''
const previewUrl =
  import.meta.env?.SANITY_STUDIO_PREVIEW_URL ?? process.env.SANITY_STUDIO_PREVIEW_URL

export default defineConfig({
  name: 'default',
  title: 'Campaign Orchestration Starter',
  projectId,
  dataset,
  plugins: [
    structureTool({structure: campaignStructure}),
    presentationTool({
      resolve,
      previewUrl: {
        previewMode: {enable: '/api/draft-mode/enable'},
        origin: previewUrl ?? 'http://localhost:3000',
      },
    }),
    visionTool(),
    assist(),
  ],
  schema: {
    types: schemaTypes,
  },
  document: {
    actions: (prev, ctx) =>
      ctx.schemaType === 'homepagePage' || ctx.schemaType === 'categoryPage'
        ? singletonDocumentActions(prev)
        : prev,
  },
})
