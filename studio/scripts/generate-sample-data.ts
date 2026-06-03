#!/usr/bin/env tsx
import {writeFileSync} from 'node:fs'
import {resolve} from 'node:path'

const now = new Date()
const launch = new Date(now.getTime() - 1000 * 60 * 60 * 24).toISOString()
const end = new Date(now.getTime() + 1000 * 60 * 60 * 24 * 14).toISOString()

const docs = [
  {
    _id: 'category-summer',
    _type: 'category',
    title: 'Summer Collection',
    slug: {_type: 'slug', current: 'summer-collection'},
  },
  {
    _id: 'product-sneaker',
    _type: 'product',
    title: 'Trail Sneaker',
    slug: {_type: 'slug', current: 'trail-sneaker'},
  },
  {
    _id: 'promo-page-summer',
    _type: 'promoLandingPage',
    title: 'Summer Drop',
    slug: {_type: 'slug', current: 'summer-drop'},
    heroHeadline: 'Summer Drop Is Live',
  },
  {
    _id: 'homepage',
    _type: 'homepagePage',
    title: 'Homepage',
    defaultHeroHeadline: 'Evergreen Home',
    defaultHeroSubheadline: 'Default experience',
  },
  {
    _id: 'category-landing',
    _type: 'categoryPage',
    title: 'Category Landing',
    defaultEditorialHeadline: 'Browse all collections',
  },
  {
    _id: 'campaign-summer-drop',
    _type: 'campaign',
    title: 'Summer Drop 2026',
    slug: {_type: 'slug', current: 'summer-drop-2026'},
    campaignType: 'productDrop',
    launchDate: launch,
    endDate: end,
    targetCollection: {_type: 'reference', _ref: 'category-summer'},
    surfaces: [
      {
        _type: 'homepageHeroSlot',
        _key: 'hero1',
        slotType: 'homepageHero',
        headline: 'Summer Drop 2026',
        subheadline: 'Limited release now live',
        cta: {_type: 'cta', label: 'Shop now', url: '/summer-drop'},
      },
      {
        _type: 'categoryBadgeSlot',
        _key: 'badge1',
        slotType: 'categoryBadge',
        category: {_type: 'reference', _ref: 'category-summer'},
        badgeText: 'New',
        badgeColor: 'yellow',
      },
      {
        _type: 'promoLandingPageSlot',
        _key: 'landing1',
        slotType: 'promoLandingPage',
        page: {_type: 'reference', _ref: 'promo-page-summer'},
      },
    ],
  },
]

const outPath = resolve(import.meta.dirname, '..', 'sample-data.ndjson')
writeFileSync(outPath, `${docs.map((doc) => JSON.stringify(doc)).join('\n')}\n`)
console.log(`Generated ${docs.length} sample docs at ${outPath}`)
