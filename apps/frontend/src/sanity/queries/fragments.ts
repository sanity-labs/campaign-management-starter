export const imageFragment = /* groq */ `
  asset->{
    _id,
    url,
    metadata { lqip, dimensions }
  },
  alt
`

export const priceFragment = /* groq */ `
  amount,
  compareAtPrice
`

export const categoryFragment = /* groq */ `
  _id,
  title,
  "slug": slug.current
`

export const brandFragment = /* groq */ `
  _id,
  title,
  "slug": slug.current
`

export const variantFragment = /* groq */ `
  _key,
  sku,
  available,
  "color": color->{ _id, title, hexValue },
  "sizes": sizes[]->{ _id, title, code, sortOrder },
  "images": images[] { ${imageFragment} }
`
