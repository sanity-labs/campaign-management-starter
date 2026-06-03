import {TagIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const categoryBadgeSlot = defineType({
  name: 'categoryBadgeSlot',
  title: 'Category badge slot',
  type: 'object',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'slotType',
      type: 'string',
      initialValue: 'categoryBadge',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'category',
      type: 'reference',
      to: [{type: 'category'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'badgeText',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'badgeColor',
      type: 'string',
      options: {
        list: [
          {title: 'Black', value: 'black'},
          {title: 'White', value: 'white'},
          {title: 'Yellow', value: 'yellow'},
        ],
      },
      initialValue: 'black',
    }),
  ],
})
