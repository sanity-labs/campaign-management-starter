import {HomeIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const homepagePage = defineType({
  name: 'homepagePage',
  title: 'Homepage Page',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      initialValue: 'Homepage',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'defaultHeroHeadline',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'defaultHeroSubheadline',
      type: 'text',
    }),
  ],
})
