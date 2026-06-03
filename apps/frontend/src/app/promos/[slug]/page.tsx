import Image from 'next/image'
import Link from 'next/link'
import {notFound} from 'next/navigation'
import {urlFor} from '@/sanity/image'
import {client} from '@/sanity/client'
import {PROMO_LANDING_PAGE_QUERY} from '@/sanity/queries'

interface PromoPageProps {
  params: Promise<{slug: string}>
}

interface PromoLandingPageResult {
  title?: string | null
  slug?: string | null
  heroHeadline?: string | null
  heroImage?: {
    asset?: {_id: string; url?: string | null; metadata?: {lqip?: string | null} | null} | null
    alt?: string | null
  } | null
}

export default async function PromoPage({params}: PromoPageProps) {
  const {slug} = await params
  const promo = await client.fetch<PromoLandingPageResult | null>(
    PROMO_LANDING_PAGE_QUERY,
    {slug},
    {tag: 'promo.page'},
  )

  if (!promo) notFound()

  return (
    <main className="mx-auto max-w-6xl px-6 py-10 md:py-14">
      <nav className="mb-6 text-sm text-neutral-400">
        <Link href="/products" className="transition-colors hover:text-neutral-900">
          Products
        </Link>
        <span className="mx-2">/</span>
        <span>Campaign</span>
      </nav>

      <section className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
        <div className="relative h-72 bg-neutral-100 md:h-96">
          {promo.heroImage?.asset?.url ? (
            <Image
              src={urlFor(promo.heroImage).width(1600).height(900).url()}
              alt={promo.heroImage.alt || promo.title || 'Promo image'}
              fill
              className="object-cover"
              placeholder={promo.heroImage.asset.metadata?.lqip ? 'blur' : 'empty'}
              blurDataURL={promo.heroImage.asset.metadata?.lqip || undefined}
            />
          ) : null}
        </div>
        <div className="p-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
            Campaign landing
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-900">
            {promo.heroHeadline || promo.title}
          </h1>
          <p className="mt-4 max-w-2xl text-neutral-600">
            This landing page is campaign-driven and linked from the active campaign slot model.
          </p>
          <div className="mt-6">
            <Link
              href="/products"
              className="inline-flex rounded-full bg-black px-6 py-3 text-sm font-medium text-white hover:bg-neutral-800"
            >
              Continue shopping
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
