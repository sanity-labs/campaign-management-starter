import {DocumentIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const emailSlot = defineType({
  name: 'emailSlot',
  title: 'Email slot',
  type: 'object',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'slotType',
      type: 'string',
      initialValue: 'email',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'promotionReference',
      title: 'Promotion reference',
      description: 'Reference ID from your ESP brief/promotion system.',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
})
