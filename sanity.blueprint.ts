import {defineBlueprint, defineDocumentFunction} from '@sanity/blueprints'

export default defineBlueprint({
  resources: [
    defineDocumentFunction({
      name: 'on-campaign-published',
      src: './functions/on-campaign-published',
      memory: 256,
      timeout: 30,
      event: {
        on: ['publish'],
        filter: "_type == 'campaign'",
      },
    }),
  ],
})
