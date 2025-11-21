import { notFound } from 'next/navigation'
import { BreadCrumbsTrail } from '@/components/elements/BreadCrumbsTrail'
import { INDUSTRIAL_GASES, IndustrialGasVariation } from '../_items'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/elements/Separator'
import { PopularLinks } from '@/app/(frontend)/_components/PopularLinks'

export default async function IndustrialGasPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const gas = INDUSTRIAL_GASES.find((e) => e.uri === slug)
  if (!gas) {
    notFound()
  }

  return (
    <div className="flex flex-col gap-y-7 pt-7.5 pb-22.5">
      <BreadCrumbsTrail
        items={[
          { title: 'Каталог', href: '/catalog' },
          { title: 'Технические газы в баллонах', href: '/catalog/industrial-gases' },
          { title: gas.title },
        ]}
      />
      <h1 className="text-[1.875rem] font-medium leading-[110%]">{gas.title}</h1>

      <div className="flex flex-col gap-y-12">
        {gas.variations.length > 0 && (
          <div className="flex gap-y-8 gap-x-6 items-stretch flex-wrap">
            {gas.variations.map((data, idx) => (
              <IndustrialGasVariationCard key={idx} data={data} />
            ))}
          </div>
        )}
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

type IndustrialGasVariationCardProps = {
  data: IndustrialGasVariation
}

const IndustrialGasVariationCard = ({ data }: IndustrialGasVariationCardProps) => (
  <div className="w-full max-w-[440px] max-lg:max-w-full py-5 px-6 border border-border2 rounded-[12px] flex flex-col gap-y-5">
    <div className="flex gap-x-6">
      <h2 className="text-[1.5rem] font-semibold leading-[110%]">{data.title}</h2>
      <Button>Запросить цену</Button>
    </div>
    <div className="flex flex-col gap-y-3">
      <h3 className="text-[1.25rem] font-semibold leading-[160%]">Доступные объемы баллонов:</h3>
      <div className="flex gap-x-3">
        {data.volumes.map((volume, idx) => (
          <div
            key={idx}
            className="py-1 px-3 bg-accent rounded-[50px] text-accent-foreground text-[1.125rem] leading-[140%] font-semibold"
          >
            {volume} литров
          </div>
        ))}
      </div>
    </div>
    <div className="flex flex-col gap-y-1">
      <h3 className="text-[1.25rem] font-semibold leading-[160%]">Характеристики:</h3>
      <div className="text-[1.125rem] leading-[200%] whitespace-pre-line">{data.description}</div>
    </div>
  </div>
)
