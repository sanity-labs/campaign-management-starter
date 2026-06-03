import {draftMode} from 'next/headers'
import {NextResponse} from 'next/server'

export async function GET(request: Request) {
  const secret = new URL(request.url).searchParams.get('secret')
  if (process.env.SANITY_PREVIEW_SECRET && secret !== process.env.SANITY_PREVIEW_SECRET) {
    return new NextResponse('Invalid preview secret', {status: 401})
  }

  const draft = await draftMode()
  draft.enable()
  return NextResponse.redirect(new URL('/', request.url))
}
