import {type Handler} from '@sanity/functions'

type CampaignPayload = {
  _id: string
  title?: string
  launchDate?: string
  endDate?: string
}

export const handler: Handler = async (event, context) => {
  if (event.document?._type !== 'campaign') return

  const campaign = event.document as CampaignPayload
  context.log.info(`campaign publish event received for ${campaign._id}`, {
    title: campaign.title,
    launchDate: campaign.launchDate,
    endDate: campaign.endDate,
  })

  // Placeholder for cache warming or downstream trigger.
  // Intentionally no side effect so starter is safe by default.
}
