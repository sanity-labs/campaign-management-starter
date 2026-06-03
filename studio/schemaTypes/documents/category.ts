import {TagIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const category = defineType({
  name: 'category',
  title: 'Categories',
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
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'parent',
      title: 'Parent Category',
      type: 'reference',
      to: [{type: 'category'}],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      parentTitle: 'parent.title',
      grandparentTitle: 'parent.parent.title',
    },
    prepare({title, parentTitle, grandparentTitle}) {
      const path = [grandparentTitle, parentTitle, title].filter(Boolean).join(' > ')
      return {
        title,
        subtitle: parentTitle ? path : 'Top-level category',
      }
    },
  },
})
