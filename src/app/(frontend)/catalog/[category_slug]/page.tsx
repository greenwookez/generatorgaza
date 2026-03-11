import type { Metadata } from 'next'
import { BreadCrumbsTrail } from '@/components/elements/BreadCrumbsTrail'
import { Separator } from '@/components/elements/Separator'
import { PopularLinks } from '../../_components/PopularLinks/PopularLinks'
import { ProductCard } from '@/components/elements/ProductCard'
import { notFound } from 'next/navigation'
import { Media } from '@/payload-types'
import { cn } from '@/lib/utils'
import { ContentClass } from '../../layout'
import { initPayload } from '@/lib/utils/initPayload'
import { JsonLd } from '../../_components/Seo/JsonLd'
import {
  buildPageMetadata,
  getAbsoluteUrl,
} from '@/lib/seo'

type Params = { category_slug: string }

const getCategoryBySlug = async (categorySlug: string) => {
  const payload = await initPayload()

  const categories = await payload.find({
    collection: 'catalog-categories',
    where: {
      isHidden: { equals: false },
      slug: { equals: categorySlug },
    },
    limit: 1,
    pagination: false,
    select: {
      title: true,
      slug: true,
      pageDescription: true,
    },
  })

  return categories.docs?.[0] ?? null
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { category_slug } = await params
  const category = await getCategoryBySlug(category_slug)

  if (!category) {
    return buildPageMetadata({
      title: 'Категория не найдена',
      description: 'Запрошенная категория каталога не найдена.',
      path: `/catalog/${category_slug}`,
      noIndex: true,
    })
  }

  return buildPageMetadata({
    title: category.title,
    description: category.pageDescription,
    path: `/catalog/${category.slug}`,
  })
}

export default async function CatalogCategoryPage({
  params,
}: {
  params: Promise<Params>
}) {
  const { category_slug } = await params
  const category = await getCategoryBySlug(category_slug)
  if (!category) {
    notFound()
  }

  const payload = await initPayload()
  const items = await payload.find({
    collection: 'catalog-items',
    where: {
      category: { equals: category.id },
      isHidden: { equals: false },
    },
    sort: 'order',
    pagination: false,
    select: {
      title: true,
      cardImage: true,
      slug: true,
    },
  })

  return (
    <div className={cn(ContentClass, 'gap-y-7')}>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: category.title,
          description: category.pageDescription,
          url: getAbsoluteUrl(`/catalog/${category.slug}`),
          mainEntity: {
            '@type': 'ItemList',
            numberOfItems: items.docs.length,
            itemListElement: items.docs.map((item, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              url: getAbsoluteUrl(`/catalog/${category.slug}/${item.slug}`),
              name: item.title,
            })),
          },
        }}
      />
      <BreadCrumbsTrail
        items={[
          { title: 'Каталог', href: '/catalog' },
          { title: category.title, href: `/catalog/${category.slug}` },
        ]}
      />
      <h1 className="text-[1.875rem] font-medium leading-[110%]">{category.title}</h1>
      <div className="flex flex-col gap-y-12">
        <div
          className={cn(
            'grid gap-y-6 gap-x-6 grid-cols-[repeat(auto-fit,minmax(280px,1fr))]',
            items.docs.length < 4 && 'md:grid-cols-[repeat(auto-fit,minmax(280px,317px))]',
          )}
        >
          {items.docs.map((item, idx) => (
            <ProductCard
              key={idx}
              title={item.title}
              image={{
                src: (item.cardImage as Media)?.url ?? '',
                alt: (item.cardImage as Media)?.alt ?? item.title,
              }}
              link={{ href: `/catalog/${category.slug}/${item.slug}`, children: 'Подробнее' }}
            />
          ))}
        </div>
        <Separator />
        <p className="text-[1.125rem] max-sm:text-[1rem] leading-[170%] whitespace-pre-wrap max-w-[900px]">
          {category.pageDescription}
        </p>
        <Separator />
        <PopularLinks />
      </div>
    </div>
  )
}
