import {HomeIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const homepageHeroSlot = defineType({
  name: 'homepageHeroSlot',
  title: 'Homepage hero slot',
  type: 'object',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'slotType',
      type: 'string',
      initialValue: 'homepageHero',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', type: 'string'})],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'headline',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subheadline',
      type: 'text',
    }),
    defineField({
      name: 'cta',
      type: 'cta',
      validation: (rule) => rule.required(),
    }),
  ],
})
