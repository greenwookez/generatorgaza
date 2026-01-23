import Image from 'next/image'
import { BreadCrumbsTrail } from '@/components/elements/BreadCrumbsTrail'
import { PopularLinks } from '../_components/PopularLinks/PopularLinks'
import { Separator } from '@/components/elements/Separator'
import { cn } from '@/lib/utils'
import { ContentClass } from '../layout'

export default async function FacilitiesPage() {
  return (
    <div className={cn(ContentClass)}>
      <div className="flex flex-col gap-y-7">
        <BreadCrumbsTrail items={[{ title: 'Производство и цехи' }]} />
        <h1 className="text-[1.875rem] font-medium leading-[110%]">Производство и цехи</h1>
        <div className="flex flex-col gap-y-6">
          <div className="flex flex-col gap-y-2">
            <h2 className="text-[1.5rem] leading-[160%]">Цех наполнения ацетилена</h2>
            <h3 className="text-[1.25rem] leading-[160%]">4 рампы на 72 баллона каждая.</h3>
          </div>
          <Image
            alt={'Цех наполнения ацетилена'}
            src="https://placehold.co/900x512.png"
            className="shrink-0 object-cover max-h-[512px] rounded-[16px]"
            width={900}
            height={512}
          />
        </div>
      </div>
      <div className="flex flex-col gap-y-6">
        <div className="flex flex-col gap-y-2">
          <h2 className="text-[1.5rem] leading-[160%]">Цех металлообработки</h2>
          <h3 className="text-[1.25rem] leading-[160%]">
            Площадь 5000 кв. метров. Малые азотные установки и моноблоки перед отгрузкой.
          </h3>
        </div>
        <Image
          alt={'Цех металлообработки'}
          src="https://placehold.co/900x512.png"
          className="shrink-0 object-cover max-h-[512px] rounded-[16px]"
          width={900}
          height={512}
        />
        <Image
          alt={'Цех металлообработки'}
          src="https://placehold.co/900x512.png"
          className="shrink-0 object-cover max-h-[512px] rounded-[16px]"
          width={900}
          height={512}
        />
      </div>
      <Separator />
      <PopularLinks />
    </div>
  )
}
