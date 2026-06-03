import {TagIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const material = defineType({
  name: 'material',
  title: 'Materials',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'composition',
      title: 'Composition',
      type: 'text',
      rows: 4,
    }),
  ],
})
