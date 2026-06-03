import {defineArrayMember, defineField, defineType} from 'sanity'

export const productVariant = defineType({
  name: 'productVariant',
  title: 'Product Variant',
  type: 'object',
  fields: [
    defineField({
      name: 'color',
      title: 'Color',
      type: 'reference',
      to: [{type: 'color'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'sizes',
      title: 'Available Sizes',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'size'}],
        }),
      ],
    }),
    defineField({
      name: 'sku',
      title: 'SKU',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Variant Images',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'available',
      title: 'Available for Sale',
      type: 'boolean',
      initialValue: true,
    }),
  ],
})
