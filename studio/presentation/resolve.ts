import {defineLocations, type PresentationPluginOptions} from 'sanity/presentation'

export const resolve: PresentationPluginOptions['resolve'] = {
  locations: {
    homepagePage: defineLocations({
      select: {title: 'title'},
      resolve: (doc) => ({
        locations: [{title: doc?.title || 'Homepage', href: '/'}],
      }),
    }),
    product: defineLocations({
      select: {title: 'title', slug: 'slug.current'},
      resolve: (doc) => ({
        locations: [
          {title: doc?.title || 'Untitled product', href: `/products/${doc?.slug}`},
          {title: 'All products', href: '/products'},
        ],
      }),
    }),
    promoLandingPage: defineLocations({
      select: {title: 'title', slug: 'slug.current'},
      resolve: (doc) => ({
        locations: [
          {title: doc?.title || 'Untitled promo', href: `/promos/${doc?.slug}`},
          {title: 'All products', href: '/products'},
        ],
      }),
    }),
    category: defineLocations({
      select: {title: 'title', slug: 'slug.current'},
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || 'Untitled category',
            href: doc?.slug ? `/products?category=${doc.slug}` : '/products',
          },
          {title: 'All products', href: '/products'},
        ],
      }),
    }),
    campaign: defineLocations({
      select: {
        title: 'title',
        categorySlug: 'targetCollection.slug.current',
      },
      resolve: (doc) => ({
        locations: [
          {title: 'Homepage', href: '/'},
          ...(doc?.categorySlug
            ? [
                {
                  title: doc?.title || 'Campaign category',
                  href: `/products?category=${doc.categorySlug}`,
                },
              ]
            : [{title: 'All products', href: '/products'}]),
        ],
      }),
    }),
  },
}
