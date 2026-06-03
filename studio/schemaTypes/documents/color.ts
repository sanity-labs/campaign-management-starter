import {TagIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const color = defineType({
  name: 'color',
  title: 'Colors',
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
      name: 'hexValue',
      title: 'Hex Value',
      type: 'string',
      validation: (rule) =>
        rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
          name: 'hex color',
          invert: false,
        }),
    }),
  ],
})
