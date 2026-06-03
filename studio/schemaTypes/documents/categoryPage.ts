import {DocumentTextIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const categoryPage = defineType({
  name: 'categoryPage',
  title: 'Category Landing Page',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      initialValue: 'Category landing',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'defaultEditorialHeadline',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
})
