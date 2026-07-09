import './globals.css'
import type {ReactNode} from 'react'
import {draftMode} from 'next/headers'
import {VisualEditing} from 'next-sanity/visual-editing'
import {Header} from '@/components/Header'
import {DisableDraftMode} from '@/components/DisableDraftMode'
import {SanityLive} from '@/sanity/live'

export default async function RootLayout({children}: {children: ReactNode}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Header />
        {children}
        <SanityLive />
        {(await draftMode()).isEnabled && (
          <>
            <VisualEditing />
            <DisableDraftMode />
          </>
        )}
      </body>
    </html>
  )
}
