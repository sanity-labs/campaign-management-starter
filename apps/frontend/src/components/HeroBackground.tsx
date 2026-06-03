'use client'

import Image from 'next/image'
import {useEffect, useRef, useState} from 'react'

interface HeroBackgroundProps {
  src: string
  alt: string
}

export function HeroBackground({src, alt}: HeroBackgroundProps) {
  const [currentSrc, setCurrentSrc] = useState(src)
  const [previousSrc, setPreviousSrc] = useState<string | null>(null)
  const [currentVisible, setCurrentVisible] = useState(true)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (src === currentSrc) return

    if (timeoutRef.current) clearTimeout(timeoutRef.current)

    setPreviousSrc(currentSrc)
    setCurrentSrc(src)
    setCurrentVisible(false)

    requestAnimationFrame(() => {
      setCurrentVisible(true)
    })

    timeoutRef.current = setTimeout(() => {
      setPreviousSrc(null)
      timeoutRef.current = null
    }, 700)

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [src, currentSrc])

  return (
    <>
      {previousSrc ? (
        <Image
          src={previousSrc}
          alt={alt}
          fill
          priority
          className="object-cover opacity-0 transition-opacity duration-700"
          sizes="100vw"
        />
      ) : null}
      <Image
        src={currentSrc}
        alt={alt}
        fill
        priority
        className={`object-cover transition-opacity duration-700 ${
          currentVisible ? 'opacity-95' : 'opacity-0'
        }`}
        sizes="100vw"
      />
    </>
  )
}
