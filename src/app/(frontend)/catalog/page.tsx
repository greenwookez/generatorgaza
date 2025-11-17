import { BreadCrumbsTrail } from '@/components/elements/BreadCrumbsTrail'
import { CatalogItem } from '@/components/elements/CatalogItem'

export default async function CatalogPage() {
  return (
    <div className="flex flex-col gap-y-7 pt-7.5 pb-22.5">
      <BreadCrumbsTrail items={[{ title: 'Каталог' }]} />
      <div className="flex gap-x-5 items-center">
        <h1 className="text-[1.875rem] font-medium leading-[110%]">Каталог</h1>
        <span className="text-muted-foreground text-[0.875rem] font-medium leading-[100%]">
          4 категории
        </span>
      </div>
      <div className="grid [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))] gap-6">
        <CatalogItem
          title="Технические газы"
          description="Технические, чистые и сжиженные газы, такие как азот, ацетилен, кислород и другие газы в баллонах"
          image={{
            src: 'https://placehold.co/1200x600.png',
            alt: 'Технические газы',
          }}
          link={{ href: '/catalog/industrial-gases', children: 'Все товары' }}
        />
        <CatalogItem
          title="Воздухоразделительные установки"
          description="Индивидуальный проект установок для производства азота или кислорода"
          image={{
            src: 'https://placehold.co/1200x600.png',
            alt: 'Воздухоразделительные установки',
          }}
          link={{ href: '#', children: 'Все товары' }}
        />
        <CatalogItem
          title="Моноблоки"
          description="Предназначены для наполнения различными газами, перевозки, хранения и использования в производственных целях"
          image={{
            src: 'https://placehold.co/1200x600.png',
            alt: 'Моноблоки',
          }}
          link={{ href: '#', children: 'Все товары' }}
        />
      </div>
    </div>
  )
}
