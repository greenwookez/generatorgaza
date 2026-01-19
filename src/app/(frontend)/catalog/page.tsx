import { getPayload } from 'payload'
import config from '@/payload.config'
import { BreadCrumbsTrail } from '@/components/elements/BreadCrumbsTrail'
import { CatalogItem } from '@/components/elements/CatalogItem'
import { Media } from '@/payload-types'

export default async function CatalogPage() {
  const payload = await getPayload({ config })

  const categories = await payload.find({
    collection: 'catalog-categories',
    sort: 'createdAt',
    pagination: false,
    select: {
      title: true,
      description: true,
      image: true,
      slug: true,
    },
  })

  return (
    <div className="flex flex-col gap-y-7 pt-7.5 pb-22.5">
      <BreadCrumbsTrail items={[{ title: 'Каталог' }]} />
      <div className="flex gap-x-5 items-center">
        <h1 className="text-[1.875rem] font-medium leading-[110%]">Каталог</h1>
        <span className="text-muted-foreground text-[0.875rem] font-medium leading-[100%]">
          {categories.totalDocs} категории
        </span>
      </div>
      <div className="grid [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))] gap-6">
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
