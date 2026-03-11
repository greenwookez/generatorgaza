import type { MetadataRoute } from 'next'
import { initPayload } from '@/lib/utils/initPayload'
import type { CatalogCategory } from '@/payload-types'
import { getAbsoluteUrl } from '@/lib/seo'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await initPayload()
  const buildLastModified = process.env.BUILD_TIMESTAMP
    ? new Date(process.env.BUILD_TIMESTAMP)
    : new Date()

  const staticPages: MetadataRoute.Sitemap = [
    '/',
    '/about',
    '/catalog',
    '/contact-us',
    '/shipping-and-payment',
    '/certificates',
    '/facilities',
    '/legal/privacy.pdf',
    '/legal/agreement.pdf',
  ].map((path) => ({
    url: getAbsoluteUrl(path),
    lastModified: buildLastModified,
  }))

  const categories = await payload.find({
    collection: 'catalog-categories',
    where: {
      isHidden: { equals: false },
    },
    pagination: false,
    select: {
      slug: true,
      updatedAt: true,
    },
  })

  const categoryPages: MetadataRoute.Sitemap = categories.docs.map((category) => ({
    url: getAbsoluteUrl(`/catalog/${category.slug}`),
    lastModified: category.updatedAt ? new Date(category.updatedAt) : new Date(),
  }))

  const visibleCategoryIds = categories.docs.map((category) => category.id)
  if (visibleCategoryIds.length === 0) {
    return [...staticPages, ...categoryPages]
  }

  const items = await payload.find({
    collection: 'catalog-items',
    where: {
      isHidden: { equals: false },
      category: { in: visibleCategoryIds },
    },
    pagination: false,
    depth: 1,
    select: {
      slug: true,
      category: true,
      updatedAt: true,
    },
  })

  const itemPages: MetadataRoute.Sitemap = items.docs
    .map((item) => {
      const category = item.category as CatalogCategory
      if (!category?.slug) {
        return null
      }

      return {
        url: getAbsoluteUrl(`/catalog/${category.slug}/${item.slug}`),
        lastModified: item.updatedAt ? new Date(item.updatedAt) : new Date(),
      }
    })
    .filter((entry): entry is NonNullable<typeof entry> => entry !== null)

  return [...staticPages, ...categoryPages, ...itemPages]
}
