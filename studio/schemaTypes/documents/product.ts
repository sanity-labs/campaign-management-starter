import {BasketIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const product = defineType({
  name: 'product',
  title: 'Products',
  type: 'document',
  icon: BasketIcon,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'details', title: 'Details'},
    {name: 'inventory', title: 'Inventory'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'sku',
      title: 'SKU',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 2,
      group: 'content',
      validation: (rule) => rule.max(200),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [{title: 'Normal', value: 'normal'}],
          marks: {
            decorators: [
              {title: 'Bold', value: 'strong'},
              {title: 'Italic', value: 'em'},
            ],
          },
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Numbered', value: 'number'},
          ],
        }),
      ],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'category'}],
      group: 'details',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'brand',
      title: 'Brand',
      type: 'reference',
      to: [{type: 'brand'}],
      group: 'details',
    }),
    defineField({
      name: 'materials',
      title: 'Materials',
      type: 'array',
      group: 'details',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'material'}],
        }),
      ],
    }),
    defineField({
      name: 'careInstructions',
      title: 'Care Instructions',
      type: 'text',
      rows: 3,
      group: 'details',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      group: 'details',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      group: 'details',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'price',
      group: 'inventory',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'variants',
      title: 'Variants',
      type: 'array',
      group: 'inventory',
      of: [
        defineArrayMember({
          type: 'productVariant',
        }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      sku: 'sku',
      category: 'category.title',
      brand: 'brand.title',
      media: 'variants.0.images.0',
    },
    prepare({title, sku, category, brand, media}) {
      return {
        title,
        subtitle: `${brand || 'No brand'} | ${sku || 'No SKU'} | ${category || 'Uncategorized'}`,
        media,
      }
    },
  },
})
