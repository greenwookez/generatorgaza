import { BreadCrumbsTrail } from '@/components/elements/BreadCrumbsTrail'
import { ProductCard } from '@/components/elements/ProductCard'
import { INDUSTRIAL_GASES } from './_items'
import { Separator } from '@/components/elements/Separator'
import { PopularLinks } from '../../_components/PopularLinks'

export default async function IndustrialGasesPage() {
  return (
    <div className="flex flex-col gap-y-7 pt-7.5 pb-22.5">
      <BreadCrumbsTrail
        items={[{ title: 'Каталог', href: '/catalog' }, { title: 'Технические газы в баллонах' }]}
      />
      <div className="flex gap-x-5 items-center">
        <h1 className="text-[1.875rem] font-medium leading-[110%]">Технические газы в баллонах</h1>
        <span className="text-muted-foreground text-[0.875rem] font-medium leading-[100%]">
          {INDUSTRIAL_GASES.length} товаров
        </span>
      </div>
      <div className="flex flex-col gap-y-12">
        <div className="grid [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))] gap-y-8 gap-x-6">
          {INDUSTRIAL_GASES.map((data, idx) => (
            <ProductCard
              key={idx}
              title={data.title}
              image={{ src: data.image, alt: data.title }}
              link={{ href: `/catalog/industrial-gases/${data.uri}`, children: 'Подробнее' }}
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
