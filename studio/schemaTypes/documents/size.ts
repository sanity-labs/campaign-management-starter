import {TagIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const size = defineType({
  name: 'size',
  title: 'Sizes',
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
      name: 'code',
      title: 'Code',
      type: 'string',
      validation: (rule) => rule.required().max(5),
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      validation: (rule) => rule.min(0),
    }),
  ],
  orderings: [
    {
      title: 'Sort Order',
      name: 'sortOrderAsc',
      by: [{field: 'sortOrder', direction: 'asc'}],
    },
  ],
})
