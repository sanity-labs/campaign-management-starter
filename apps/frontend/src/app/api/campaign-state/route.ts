import {NextResponse} from 'next/server'
import {client} from '@/sanity/client'
import {ACTIVE_CAMPAIGN_QUERY} from '@/sanity/queries'

export const dynamic = 'force-dynamic'

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

export async function GET() {
  const activeCampaign = await client.fetch<ActiveCampaign | null>(
    ACTIVE_CAMPAIGN_QUERY,
    {},
    {tag: 'campaign.active.api'},
  )

  return NextResponse.json(
    {
      activeCampaign,
      serverTime: new Date().toISOString(),
    },
    {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      },
    },
  )
}
