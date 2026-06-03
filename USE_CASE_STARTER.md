# Use Case Starter: Campaign Management and Orchestration

## Problem

Retail campaign launches are often coordinated across spreadsheets, tickets, and manual publishes across homepage, category, landing pages, and email.

## Outcome

Author one `campaign` document, schedule launch, and let all participating surfaces auto-revert by query-time expiry.

## Primary Actor

Content operations lead ("campaign author")

## Secondary Actors

- Merchandising manager
- Marketing operations lead
- Developer/integration engineer

## Jobs to Be Done

- Launch all campaign surfaces at the same time.
- Avoid manual teardown when campaign ends.
- Prevent slot conflicts before launch.
- Give marketing a visibility view of active/upcoming campaigns.

## Canonical Product Capabilities

- Structured content modeling in Studio
- Content Releases for coordinated launch
- GROQ query-time slot resolution
- Sanity Functions for post-publish automation hooks

## Starter Architecture

- `studio/`: campaign orchestration schemas and authoring UX
- `apps/frontend/`: active campaign resolution with date-window GROQ filters
- `functions/on-campaign-published/`: cache-warm/event integration hook

## Core Schema Contracts

- Document: `campaign`
  - `launchDate`, `endDate`
  - `surfaces[]` typed by slot object
  - overlap validation by date range + slot type
- Objects:
  - `homepageHeroSlot`
  - `categoryBadgeSlot`
  - `categoryEditorialZoneSlot`
  - `promoLandingPageSlot`
  - `emailSlot`

## Frontend Resolution Contract

Use slot query fragments in page fetches:

```groq
*[
  _type == "campaign" &&
  "homepageHero" in surfaces[].slotType &&
  dateTime(launchDate) <= dateTime(now()) &&
  dateTime(endDate) >= dateTime(now())
][0]{
  surfaces[slotType == "homepageHero"][0]
}
```

Fallback to evergreen page defaults when no campaign matches.

## Delivery Plan for Teams

1. Configure schema + singleton pages in Studio.
2. Wire campaign slot fragments into existing frontend queries.
3. Add launch scheduling with Content Releases.
4. Add cache-warm integrations through Functions if needed.

## Starter Readiness Checklist

- [x] Campaign schema with slot objects
- [x] Date-window slot resolution example in frontend
- [x] Overlap validation in schema
- [x] Function hook scaffold
- [x] App SDK matrix shell
- [x] Sample data + bootstrap scripts
