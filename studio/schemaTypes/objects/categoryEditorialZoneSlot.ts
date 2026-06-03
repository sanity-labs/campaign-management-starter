import {DocumentTextIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const categoryEditorialZoneSlot = defineType({
  name: 'categoryEditorialZoneSlot',
  title: 'Category editorial zone slot',
  type: 'object',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'slotType',
      type: 'string',
      initialValue: 'categoryEditorialZone',
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
      name: 'headline',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      type: 'array',
      of: [defineArrayMember({type: 'block'})],
    }),
    defineField({
      name: 'featuredProducts',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'product'}]})],
    }),
  ],
})
