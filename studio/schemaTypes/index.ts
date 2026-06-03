import {campaign} from './documents/campaign'
import {brand} from './documents/brand'
import {category} from './documents/category'
import {categoryPage} from './documents/categoryPage'
import {color} from './documents/color'
import {homepagePage} from './documents/homepagePage'
import {material} from './documents/material'
import {product} from './documents/product'
import {promoLandingPage} from './documents/promoLandingPage'
import {size} from './documents/size'
import {categoryBadgeSlot} from './objects/categoryBadgeSlot'
import {categoryEditorialZoneSlot} from './objects/categoryEditorialZoneSlot'
import {cta} from './objects/cta'
import {emailSlot} from './objects/emailSlot'
import {homepageHeroSlot} from './objects/homepageHeroSlot'
import {price} from './objects/price'
import {productVariant} from './objects/productVariant'
import {promoLandingPageSlot} from './objects/promoLandingPageSlot'
import {seo} from './objects/seo'

export const schemaTypes = [
  seo,
  price,
  productVariant,
  campaign,
  promoLandingPage,
  brand,
  color,
  size,
  category,
  material,
  product,
  homepagePage,
  categoryPage,
  cta,
  homepageHeroSlot,
  categoryBadgeSlot,
  categoryEditorialZoneSlot,
  promoLandingPageSlot,
  emailSlot,
]
