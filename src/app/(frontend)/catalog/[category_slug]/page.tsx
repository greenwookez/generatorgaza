import { BreadCrumbsTrail } from '@/components/elements/BreadCrumbsTrail'
import { Separator } from '@/components/elements/Separator'
import { PopularLinks } from '../../_components/PopularLinks/PopularLinks'
import { ProductCard } from '@/components/elements/ProductCard'
import { notFound } from 'next/navigation'
import { Media } from '@/payload-types'
import { cn } from '@/lib/utils'
import { ContentClass } from '../../layout'
import { initPayload } from '@/lib/utils/initPayload'

export default async function CatalogCategoryPage({
  params,
}: {
  params: Promise<{ category_slug: string }>
}) {
  const payload = await initPayload()

  const { category_slug } = await params

  const categories = await payload.find({
    collection: 'catalog-categories',
    where: {
      slug: { equals: category_slug },
    },
    limit: 1,
    pagination: false,
    select: {
      title: true,
      slug: true,
    },
  })

  const category = categories.docs?.[0]
  if (!category) {
    notFound()
  }

  const items = await payload.find({
    collection: 'catalog-items',
    where: {
      category: { equals: category.id },
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
      <BreadCrumbsTrail
        items={[{ title: 'Каталог', href: '/catalog' }, { title: category.title }]}
      />
      <h1 className="text-[1.875rem] font-medium leading-[110%]">{category.title}</h1>
      <div className="flex flex-col gap-y-12">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-y-8 gap-x-6">
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
        <p className="text-[1.25rem] leading-[160%]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum temporibus veritatis
          excepturi accusamus aliquam error, cum obcaecati dolorum eius praesentium soluta debitis
          quas. Harum eligendi ea ad maxime consequatur est!
        </p>
        <Separator />
        <PopularLinks />
      </div>
    </div>
  )
}
