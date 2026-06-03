import type {StructureResolver} from 'sanity/structure'

const SINGLETON_ACTIONS = new Set(['publish', 'discardChanges', 'restore'])

export const campaignStructure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Campaigns')
        .schemaType('campaign')
        .child(S.documentTypeList('campaign').title('Campaigns')),
      S.listItem()
        .title('Promo Landing Pages')
        .schemaType('promoLandingPage')
        .child(S.documentTypeList('promoLandingPage').title('Promo Landing Pages')),
      S.listItem()
        .title('Categories')
        .schemaType('category')
        .child(S.documentTypeList('category').title('Categories')),
      S.listItem()
        .title('Products')
        .schemaType('product')
        .child(S.documentTypeList('product').title('Products')),
      S.divider(),
      S.listItem()
        .title('Homepage (singleton)')
        .child(S.document().schemaType('homepagePage').documentId('homepage')),
      S.listItem()
        .title('Category Landing (singleton)')
        .child(S.document().schemaType('categoryPage').documentId('category-landing')),
      ...S.documentTypeListItems().filter((item) => {
        const id = item.getId()
        return (
          id != null &&
          ![
            'campaign',
            'promoLandingPage',
            'category',
            'product',
            'homepagePage',
            'categoryPage',
          ].includes(id)
        )
      }),
    ])

export const singletonDocumentActions = (prev: any[]) =>
  prev.filter(({action}) => SINGLETON_ACTIONS.has(action))
