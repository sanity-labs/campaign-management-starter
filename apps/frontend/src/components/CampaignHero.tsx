'use client'

import Link from 'next/link'
import {stegaClean} from 'next-sanity'
import {useEffect, useMemo, useState} from 'react'
import {HeroBackground} from './HeroBackground'

interface ActiveCampaign {
  title?: string | null
  targetCollection?: {title?: string | null; slug?: string | null} | null
  promoPage?: {title?: string | null; slug?: string | null} | null
  homepageHero?: {
    headline?: string | null
    subheadline?: string | null
    cta?: {label?: string | null; url?: string | null} | null
  } | null
}

interface CampaignHeroProps {
  initialCampaign: ActiveCampaign | null
}

export function CampaignHero({initialCampaign}: CampaignHeroProps) {
  const [activeCampaign, setActiveCampaign] = useState<ActiveCampaign | null>(initialCampaign)

  useEffect(() => {
    let cancelled = false

    async function refreshCampaignState() {
      try {
        const response = await fetch('/api/campaign-state', {cache: 'no-store'})
        if (!response.ok) return
        const payload = (await response.json()) as {activeCampaign: ActiveCampaign | null}
        if (!cancelled) {
          setActiveCampaign(payload.activeCampaign ?? null)
        }
      } catch {}
    }

    const interval = setInterval(refreshCampaignState, 4000)
    return () => {
      cancelled = true
      clearInterval(interval)
    }
  }, [])

  const hero = activeCampaign?.homepageHero
  const heroHeadline = hero?.headline || 'Dress for your next adventure'
  const heroSubheadline =
    hero?.subheadline || 'Premium outdoor and lifestyle gear designed for everyday explorers.'
  const heroCtaLabel =
    hero?.cta?.label || (activeCampaign?.promoPage ? 'Explore campaign' : 'Shop all')
  const promoSlug = stegaClean(activeCampaign?.promoPage?.slug)
  const categorySlug = stegaClean(activeCampaign?.targetCollection?.slug)
  const heroCtaHref =
    stegaClean(hero?.cta?.url) ||
    (promoSlug
      ? `/promos/${promoSlug}`
      : categorySlug
        ? `/products?category=${categorySlug}`
        : '/products')

  const heroImageSrc = useMemo(
    () => (activeCampaign ? '/images/wander-hero-campaign.png' : '/images/wander-hero-default.png'),
    [activeCampaign],
  )

  return (
    <section className="relative overflow-hidden border-b border-neutral-200/60 bg-gradient-to-b from-neutral-50 to-white px-6 py-20 text-center md:py-32">
      <HeroBackground src={heroImageSrc} alt="Wander hero image" />
      <div className="absolute inset-0 bg-black/35" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(74,222,128,0.04),transparent_50%)]" />
      <div className="relative">
        <p className="mx-auto mb-4 text-xs font-medium uppercase tracking-[0.2em] text-white/85">
          {activeCampaign ? 'Campaign Live' : 'Wander 2026 Collection'}
        </p>
        <h1 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight text-white drop-shadow-sm md:text-5xl">
          {heroHeadline}
        </h1>
        <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-white/90">{heroSubheadline}</p>
        {activeCampaign?.title ? (
          <p className="mx-auto mt-3 text-sm text-white/85">Now featuring: {activeCampaign.title}</p>
        ) : null}
        <div className="mt-10">
          <Link
            href={heroCtaHref}
            className="inline-flex rounded-full bg-black px-8 py-3 text-sm font-medium text-white hover:bg-neutral-800"
          >
            {heroCtaLabel}
          </Link>
        </div>
      </div>
    </section>
  )
}
