import {stegaClean} from 'next-sanity'
import {ProductGrid} from '@/components/ProductGrid'
import {sanityFetch} from '@/sanity/live'
import {
  ACTIVE_CAMPAIGN_QUERY,
  buildFilteredProductsQuery,
  FILTER_OPTIONS_QUERY,
} from '@/sanity/queries'

export const metadata = {
  title: 'All Products | Wander',
  description: 'Browse the Wander retail collection.',
}

interface ProductsPageProps {
  searchParams: Promise<{
    category?: string
    brand?: string
  }>
}

interface FilterItem {
  _id: string
  title: string | null
  slug: string | null
}

interface ActiveCampaign {
  title?: string | null
  targetCollection?: {title?: string | null; slug?: string | null} | null
  promoPage?: {title?: string | null; slug?: string | null} | null
  badgeSlots?: Array<{
    badgeText?: string | null
    badgeColor?: string | null
    category?: {title?: string | null; slug?: string | null} | null
  }> | null
  editorialSlots?: Array<{
    headline?: string | null
    category?: {title?: string | null; slug?: string | null} | null
    featuredProducts?: Array<{_id: string; title?: string | null; slug?: string | null}> | null
  }> | null
}

function makeFilterHref(
  current: {category?: string; brand?: string},
  key: 'category' | 'brand',
  value?: string,
) {
  const params = new URLSearchParams()
  const next = {...current, [key]: value}
  if (next.category) params.set('category', next.category)
  if (next.brand) params.set('brand', next.brand)
  const query = params.toString()
  return query ? `/products?${query}` : '/products'
}

export default async function ProductsPage({searchParams}: ProductsPageProps) {
  const params = await searchParams
  const category = params.category || undefined
  const brand = params.brand || undefined

  const [filtersResult, productsResult, campaignResult] = await Promise.all([
    sanityFetch({query: FILTER_OPTIONS_QUERY}),
    sanityFetch({query: buildFilteredProductsQuery({category, brand})}),
    sanityFetch({query: ACTIVE_CAMPAIGN_QUERY}),
  ])
  const filters = filtersResult.data as {categories: FilterItem[]; brands: FilterItem[]}
  const products = productsResult.data as Parameters<typeof ProductGrid>[0]['products']
  const activeCampaign = campaignResult.data as ActiveCampaign | null

  const effectiveCategorySlug =
    category || stegaClean(activeCampaign?.targetCollection?.slug) || undefined
  const badgeSlot =
    activeCampaign?.badgeSlots?.find(
      (slot) => stegaClean(slot.category?.slug) === effectiveCategorySlug,
    ) || activeCampaign?.badgeSlots?.[0]
  const editorialSlot =
    activeCampaign?.editorialSlots?.find(
      (slot) => stegaClean(slot.category?.slug) === effectiveCategorySlug,
    ) || activeCampaign?.editorialSlots?.[0]
  const badgeColor = stegaClean(badgeSlot?.badgeColor)

  return (
    <main className="mx-auto max-w-7xl px-6 py-10 md:py-14">
      <div className="mb-8">
        <h1 className="mb-1 text-2xl font-semibold tracking-tight">All Products</h1>
        <p className="text-sm text-neutral-400">
          {products.length} {products.length === 1 ? 'product' : 'products'}
        </p>
        {badgeSlot?.badgeText ? (
          <span
            className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
              badgeColor === 'yellow'
                ? 'bg-yellow-300 text-yellow-950'
                : badgeColor === 'white'
                  ? 'border border-neutral-300 bg-white text-neutral-900'
                  : 'bg-black text-white'
            }`}
          >
            {badgeSlot.badgeText}
          </span>
        ) : null}
      </div>

      {activeCampaign?.title ? (
        <div className="mb-6 rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-sm">
          <p className="font-semibold text-neutral-900">Campaign live: {activeCampaign.title}</p>
          <p className="mt-1 text-neutral-600">
            {activeCampaign.promoPage?.slug ? (
              <>
                Explore the campaign page:{' '}
                <a
                  className="underline"
                  href={`/promos/${stegaClean(activeCampaign.promoPage.slug)}`}
                >
                  {activeCampaign.promoPage.title || 'View promo'}
                </a>
              </>
            ) : (
              'Campaign overlays are active across storefront surfaces.'
            )}
          </p>
        </div>
      ) : null}

      {editorialSlot?.headline ? (
        <div className="mb-8 rounded-2xl border border-neutral-200 bg-white p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
            Campaign editorial
          </p>
          <h2 className="mt-2 text-xl font-semibold text-neutral-900">{editorialSlot.headline}</h2>
          {editorialSlot.featuredProducts?.length ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {editorialSlot.featuredProducts.map((product) => (
                <a
                  key={product._id}
                  href={product.slug ? `/products/${stegaClean(product.slug)}` : '/products'}
                  className="rounded-full border border-neutral-300 px-3 py-1 text-sm text-neutral-700 hover:border-neutral-500"
                >
                  {product.title || 'Featured product'}
                </a>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}

      <div className="mb-8 space-y-4">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-500">
            Category
          </p>
          <div className="flex flex-wrap gap-2">
            <a
              href={makeFilterHref({category, brand}, 'category', undefined)}
              className={`rounded-full border px-3 py-1 text-sm ${
                !category
                  ? 'border-black bg-black text-white'
                  : 'border-neutral-300 text-neutral-700'
              }`}
            >
              All
            </a>
            {filters.categories.map((item) => {
              const slug = stegaClean(item.slug)
              return (
                <a
                  key={item._id}
                  href={makeFilterHref({category, brand}, 'category', slug ?? undefined)}
                  className={`rounded-full border px-3 py-1 text-sm ${
                    category === slug
                      ? 'border-black bg-black text-white'
                      : 'border-neutral-300 text-neutral-700'
                  }`}
                >
                  {item.title}
                </a>
              )
            })}
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-500">
            Brand
          </p>
          <div className="flex flex-wrap gap-2">
            <a
              href={makeFilterHref({category, brand}, 'brand', undefined)}
              className={`rounded-full border px-3 py-1 text-sm ${
                !brand ? 'border-black bg-black text-white' : 'border-neutral-300 text-neutral-700'
              }`}
            >
              All
            </a>
            {filters.brands.map((item) => {
              const slug = stegaClean(item.slug)
              return (
                <a
                  key={item._id}
                  href={makeFilterHref({category, brand}, 'brand', slug ?? undefined)}
                  className={`rounded-full border px-3 py-1 text-sm ${
                    brand === slug
                      ? 'border-black bg-black text-white'
                      : 'border-neutral-300 text-neutral-700'
                  }`}
                >
                  {item.title}
                </a>
              )
            })}
          </div>
        </div>
      </div>

      <ProductGrid products={products} />
    </main>
  )
}
