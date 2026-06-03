import {DocumentIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const promoLandingPageSlot = defineType({
  name: 'promoLandingPageSlot',
  title: 'Promo landing page slot',
  type: 'object',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'slotType',
      type: 'string',
      initialValue: 'promoLandingPage',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'page',
      type: 'reference',
      to: [{type: 'promoLandingPage'}],
      validation: (rule) => rule.required(),
    }),
  ],
})
