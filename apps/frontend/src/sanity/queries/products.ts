import {
  brandFragment,
  categoryFragment,
  imageFragment,
  priceFragment,
  variantFragment,
} from './fragments'

const productCardFragment = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  shortDescription,
  "category": category->{ ${categoryFragment} },
  "brand": brand->{ ${brandFragment} },
  "image": variants[0].images[0] { ${imageFragment} },
  price { ${priceFragment} }
`

const availabilityCondition = 'count(variants[available == true]) > 0'
const categoryHasAnyCampaignCondition = `
  count(*[
    _type == "campaign" &&
    targetCollection._ref == ^.category._ref
  ]) > 0
`
const categoryHasActiveCampaignCondition = `
  count(*[
    _type == "campaign" &&
    dateTime(launchDate) <= dateTime(now()) &&
    dateTime(endDate) >= dateTime(now()) &&
    targetCollection._ref == ^.category._ref
  ]) > 0
`
const storefrontVisibilityCondition = `
  (${availabilityCondition}) &&
  (!(${categoryHasAnyCampaignCondition}) || (${categoryHasActiveCampaignCondition}))
`

export const PRODUCTS_QUERY = /* groq */ `
  *[_type == "product" && defined(slug.current) && ${storefrontVisibilityCondition}] | order(_createdAt desc) {
    ${productCardFragment}
  }
`

export const FEATURED_PRODUCTS_QUERY = /* groq */ `
  *[_type == "product" && defined(slug.current) && ${storefrontVisibilityCondition}] | order(_createdAt desc) [0...12] {
    ${productCardFragment}
  }
`

export const PRODUCT_QUERY = /* groq */ `
  *[_type == "product" && slug.current == $slug && ${storefrontVisibilityCondition}][0] {
    _id,
    title,
    "slug": slug.current,
    sku,
    shortDescription,
    description,
    features,
    careInstructions,
    "category": category->{ ${categoryFragment} },
    "brand": brand->{ ${brandFragment} },
    price { ${priceFragment} },
    "materials": materials[]->{ _id, title },
    "variants": variants[] { ${variantFragment} }
  }
`

export const PRODUCT_SLUGS_QUERY = /* groq */ `
  *[_type == "product" && defined(slug.current) && ${storefrontVisibilityCondition}] {
    "slug": slug.current
  }
`

export const FILTER_OPTIONS_QUERY = /* groq */ `{
  "categories": *[_type == "category" && defined(slug.current)] | order(title asc) {
    _id,
    title,
    "slug": slug.current
  },
  "brands": *[_type == "brand" && defined(slug.current)] | order(title asc) {
    _id,
    title,
    "slug": slug.current
  }
}`

export interface ProductFiltersInput {
  category?: string
  brand?: string
}

export function buildFilteredProductsQuery(filters: ProductFiltersInput): string {
  const conditions = [
    '_type == "product"',
    'defined(slug.current)',
    storefrontVisibilityCondition,
  ]

  if (filters.category) {
    conditions.push(`category->slug.current == "${filters.category}"`)
  }

  if (filters.brand) {
    conditions.push(`brand->slug.current == "${filters.brand}"`)
  }

  return /* groq */ `
    *[${conditions.join(' && ')}] | order(_createdAt desc) {
      ${productCardFragment}
    }
  `
}

export const ACTIVE_CAMPAIGN_QUERY = /* groq */ `
  *[
    _type == "campaign" &&
    dateTime(launchDate) <= dateTime(now()) &&
    dateTime(endDate) >= dateTime(now())
  ][0]{
    _id,
    title,
    launchDate,
    endDate,
    "targetCollection": targetCollection->{_id, title, "slug": slug.current},
    "homepageHero": surfaces[slotType == "homepageHero"][0]{
      headline,
      subheadline,
      cta,
      image{
        asset->{
          _id,
          url,
          metadata { lqip, dimensions }
        },
        alt
      }
    },
    "promoPage": surfaces[slotType == "promoLandingPage"][0].page->{
      _id,
      title,
      "slug": slug.current
    },
    "badgeSlots": surfaces[slotType == "categoryBadge"]{
      badgeText,
      badgeColor,
      "category": category->{_id, title, "slug": slug.current}
    },
    "editorialSlots": surfaces[slotType == "categoryEditorialZone"]{
      headline,
      body,
      "category": category->{_id, title, "slug": slug.current},
      "featuredProducts": featuredProducts[]->{
        _id,
        title,
        "slug": slug.current
      }
    }
  }
`

export const PROMO_LANDING_PAGE_QUERY = /* groq */ `
  *[_type == "promoLandingPage" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    heroHeadline,
    heroImage{
      asset->{
        _id,
        url,
        metadata { lqip, dimensions }
      },
      alt
    },
    body
  }
`
