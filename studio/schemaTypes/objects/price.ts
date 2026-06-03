import {defineField, defineType} from 'sanity'

export const price = defineType({
  name: 'price',
  title: 'Price',
  type: 'object',
  fields: [
    defineField({
      name: 'amount',
      title: 'Amount',
      type: 'number',
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'compareAtPrice',
      title: 'Compare at Price',
      type: 'number',
      validation: (rule) => rule.min(0),
    }),
  ],
})
