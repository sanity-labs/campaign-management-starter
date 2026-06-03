import Link from 'next/link'
import {CampaignHero} from '@/components/CampaignHero'
import {ProductGrid} from '@/components/ProductGrid'
import {client} from '@/sanity/client'
import {ACTIVE_CAMPAIGN_QUERY, FEATURED_PRODUCTS_QUERY} from '@/sanity/queries'

interface ActiveCampaign {
  title?: string | null
  targetCollection?: {title?: string | null; slug?: string | null} | null
  promoPage?: {title?: string | null; slug?: string | null} | null
  homepageHero?: {
    headline?: string | null
    subheadline?: string | null
    cta?: {label?: string | null; url?: string | null} | null
    image?: {
      asset?: {_id: string; url?: string | null; metadata?: {lqip?: string | null} | null} | null
      alt?: string | null
    } | null
  } | null
}

export default async function HomePage() {
  const [products, activeCampaign] = await Promise.all([
    client.fetch(FEATURED_PRODUCTS_QUERY),
    client.fetch<ActiveCampaign | null>(ACTIVE_CAMPAIGN_QUERY, {}, {tag: 'campaign.active'}),
  ])

  return (
    <main>
      <CampaignHero initialCampaign={activeCampaign} />

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-400">
              Featured
            </p>
            <h2 className="mt-1 text-xl font-semibold tracking-tight">Wander picks</h2>
          </div>
          <Link
            href="/products"
            className="text-sm text-neutral-500 transition-colors hover:text-neutral-900"
          >
            View all
          </Link>
        </div>
        <ProductGrid products={products} />
      </section>
    </main>
  )
}
