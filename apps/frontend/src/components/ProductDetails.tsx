'use client'

import Image from 'next/image'
import {useMemo, useState} from 'react'
import {formatPrice} from '@/lib/utils'
import {urlFor} from '@/sanity/image'

interface Color {
  _id: string
  title: string | null
  hexValue?: string | null
}

interface Size {
  _id: string
  title: string | null
  code: string | null
  sortOrder?: number | null
}

interface VariantImage {
  asset?: {_id: string; url: string | null; metadata?: {lqip?: string | null} | null} | null
  alt?: string | null
}

interface Variant {
  _key: string | null
  sku?: string | null
  available?: boolean | null
  color?: Color | null
  sizes?: Size[] | null
  images?: VariantImage[] | null
}

interface ProductDetailsProps {
  title: string | null
  brand?: {_id: string; title: string | null; slug: string | null} | null
  category?: {_id: string; title: string | null; slug: string | null} | null
  shortDescription?: string | null
  price?: {amount?: number | null; compareAtPrice?: number | null} | null
  features?: string[] | null
  materials?: {_id: string; title: string | null}[] | null
  colors: Color[]
  sizes: Size[]
  variants?: Variant[] | null
}

export function ProductDetails({
  title,
  brand,
  category,
  shortDescription,
  price,
  features,
  materials,
  colors,
  sizes,
  variants,
}: ProductDetailsProps) {
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const hasDiscount = Boolean(price?.compareAtPrice && price.compareAtPrice > (price.amount ?? 0))

  const selectedVariant = selectedColor
    ? variants?.find((variant) => variant.color?._id === selectedColor)
    : variants?.[0]
  const currentImage = selectedVariant?.images?.[0]

  const availableSizeIds = useMemo(() => {
    if (!selectedColor) return new Set(sizes.map((size) => size._id))
    const variant = variants?.find((item) => item.color?._id === selectedColor)
    return new Set(variant?.sizes?.map((size) => size._id) ?? [])
  }, [selectedColor, sizes, variants])

  return (
    <div className="grid gap-8 md:grid-cols-2 md:gap-12">
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-neutral-100">
        {currentImage?.asset?.url ? (
          <Image
            src={urlFor(currentImage).width(800).height(1067).url()}
            alt={currentImage.alt || title || 'Product image'}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
            placeholder={currentImage.asset.metadata?.lqip ? 'blur' : 'empty'}
            blurDataURL={currentImage.asset.metadata?.lqip || undefined}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-neutral-400">No image</div>
        )}
      </div>

      <div className="flex flex-col">
        {(brand?.title || category?.title) && (
          <p className="text-sm tracking-wide text-neutral-400">
            {brand?.title}
            {brand?.title && category?.title && ' / '}
            {category?.title}
          </p>
        )}
        <h1 className="mt-1 text-2xl font-semibold tracking-tight md:text-3xl">{title}</h1>

        <div className="mt-4 flex items-center gap-3">
          <span className="text-xl font-medium">{formatPrice(price?.amount)}</span>
          {hasDiscount && (
            <span className="text-lg text-neutral-400 line-through">
              {formatPrice(price?.compareAtPrice)}
            </span>
          )}
        </div>

        {shortDescription && (
          <p className="mt-4 leading-relaxed text-neutral-600">{shortDescription}</p>
        )}

        {colors.length > 0 && (
          <div className="mt-6">
            <p className="text-sm font-medium">Color</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {colors.map((color) => (
                <button
                  key={color._id}
                  type="button"
                  onClick={() => setSelectedColor(color._id)}
                  className={`rounded-lg border px-3 py-1.5 text-sm transition-all ${
                    selectedColor === color._id
                      ? 'border-neutral-900 bg-neutral-900 text-white'
                      : 'border-neutral-200 hover:border-neutral-400'
                  }`}
                >
                  {color.title}
                </button>
              ))}
            </div>
          </div>
        )}

        {sizes.length > 0 && (
          <div className="mt-6">
            <p className="text-sm font-medium">Size</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {sizes.map((size) => {
                const isAvailable = availableSizeIds.has(size._id)
                return (
                  <button
                    key={size._id}
                    type="button"
                    onClick={() => isAvailable && setSelectedSize(size._id)}
                    disabled={!isAvailable}
                    className={`flex h-10 w-10 items-center justify-center rounded-lg border text-sm transition-all ${
                      selectedSize === size._id
                        ? 'border-neutral-900 bg-neutral-900 text-white'
                        : isAvailable
                          ? 'border-neutral-200 hover:border-neutral-400'
                          : 'cursor-not-allowed border-neutral-100 bg-neutral-50 text-neutral-300 line-through'
                    }`}
                  >
                    {size.code}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        <div className="mt-8">
          <button
            type="button"
            className="w-full rounded-full bg-black px-6 py-3 text-sm font-medium text-white hover:bg-neutral-800"
          >
            Add to cart
          </button>
        </div>

        {features && features.length > 0 && (
          <div className="mt-8 border-t border-neutral-200 pt-6">
            <p className="text-sm font-medium">Features</p>
            <ul className="mt-2 space-y-1 text-sm text-neutral-600">
              {features.map((feature) => (
                <li key={feature}>- {feature}</li>
              ))}
            </ul>
          </div>
        )}

        {materials && materials.length > 0 && (
          <div className="mt-6">
            <p className="text-sm font-medium">Materials</p>
            <p className="mt-1 text-sm text-neutral-600">
              {materials.map((m) => m.title).join(', ')}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
