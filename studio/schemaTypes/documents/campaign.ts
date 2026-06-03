import {CalendarIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

type CampaignContext = {
  document?: {
    _id?: string
    launchDate?: string
    endDate?: string
    surfaces?: Array<{slotType?: string}>
  }
  getClient: (opts: {apiVersion: string}) => {
    fetch: (query: string, params: Record<string, unknown>) => Promise<number>
  }
}

const overlapQuery = `
  count(*[
    _type == "campaign" &&
    !(_id in path("drafts.**")) &&
    _id != $selfId &&
    dateTime(launchDate) <= dateTime($endDate) &&
    dateTime(endDate) >= dateTime($launchDate) &&
    count(surfaces[slotType in $slotTypes]) > 0
  ])
`

export const campaign = defineType({
  name: 'campaign',
  title: 'Campaign',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'campaignType',
      type: 'string',
      options: {
        list: [
          {title: 'Product drop', value: 'productDrop'},
          {title: 'Seasonal', value: 'seasonal'},
          {title: 'Sale event', value: 'saleEvent'},
          {title: 'Collaboration', value: 'collab'},
        ],
        layout: 'radio',
      },
      initialValue: 'productDrop',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'launchDate',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'endDate',
      type: 'datetime',
      validation: (rule) =>
        rule.required().custom((value, context) => {
          const launchDate = context.document?.launchDate
          if (typeof value !== 'string' || typeof launchDate !== 'string') return true
          return new Date(value).getTime() > new Date(launchDate).getTime()
            ? true
            : 'End date must be after launch date'
        }),
    }),
    defineField({
      name: 'targetCollection',
      type: 'reference',
      to: [{type: 'category'}],
    }),
    defineField({
      name: 'surfaces',
      type: 'array',
      of: [
        defineArrayMember({type: 'homepageHeroSlot'}),
        defineArrayMember({type: 'categoryBadgeSlot'}),
        defineArrayMember({type: 'categoryEditorialZoneSlot'}),
        defineArrayMember({type: 'promoLandingPageSlot'}),
        defineArrayMember({type: 'emailSlot'}),
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'notes',
      type: 'text',
    }),
  ],
  validation: (rule) =>
    rule.custom(async (_, context) => {
      const typedContext = context as CampaignContext
      const doc = typedContext.document
      if (!doc?.launchDate || !doc?.endDate || !doc?.surfaces?.length) return true

      const slotTypes = doc.surfaces
        .map((surface) => surface?.slotType)
        .filter((value): value is string => Boolean(value))

      if (!slotTypes.length) return true

      const selfId = (doc._id ?? '').replace(/^drafts\./, '')
      const count = await typedContext
        .getClient({apiVersion: '2025-02-19'})
        .fetch(overlapQuery, {selfId, launchDate: doc.launchDate, endDate: doc.endDate, slotTypes})

      return count > 0
        ? 'Overlapping campaign exists for one or more selected slot types in this date range.'
        : true
    }),
  preview: {
    select: {
      title: 'title',
      launchDate: 'launchDate',
      endDate: 'endDate',
    },
    prepare({title, launchDate, endDate}) {
      return {
        title,
        subtitle: `${launchDate ?? 'No launch date'} -> ${endDate ?? 'No end date'}`,
      }
    },
  },
})
