import { BreadCrumbsTrail } from '@/components/elements/BreadCrumbsTrail'
import { CatalogItem } from '@/components/elements/CatalogItem'
import { Media } from '@/payload-types'
import { cn } from '@/lib/utils'
import { ContentClass } from '../layout'
import { initPayload } from '@/lib/utils/initPayload'

export default async function CatalogPage() {
  const payload = await initPayload()

  const categories = await payload.find({
    collection: 'catalog-categories',
    sort: 'order',
    pagination: false,
    where: {
      isHidden: { equals: false },
    },
    select: {
      title: true,
      description: true,
      image: true,
      slug: true,
    },
  })

  return (
    <div className={cn(ContentClass, 'gap-y-7')}>
      <BreadCrumbsTrail items={[{ title: 'Каталог' }]} />
      <h1 className="text-[1.875rem] font-medium leading-[110%]">Каталог</h1>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-6">
        {categories.docs.map((category) => (
          <CatalogItem
            key={category.id}
            title={category.title}
            description={category.description}
            image={{
              src: (category.image as Media)?.url || '',
              alt: (category.image as Media)?.alt || category.title,
            }}
            link={{ href: `/catalog/${category.slug}`, children: 'Все товары' }}
          />
        ))}
      </div>
    </div>
  )
}
