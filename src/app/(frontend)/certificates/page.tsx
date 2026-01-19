import Image from 'next/image'
import { BreadCrumbsTrail } from '@/components/elements/BreadCrumbsTrail'
import { PopularLinks } from '../_components/PopularLinks'
import { Separator } from '@/components/elements/Separator'
import { cn } from '@/lib/utils'
import { ContentClass } from '../layout'

export default async function FacilitiesPage() {
  return (
    <div className={cn(ContentClass)}>
      <div className="flex flex-col gap-y-7">
        <BreadCrumbsTrail items={[{ title: 'Сертификаты' }]} />
        <h1 className="text-[1.875rem] font-medium leading-[110%]">Сертификаты</h1>
        <div className="flex flex-col gap-y-6">
          <div className="flex flex-col gap-y-2">
            <h2 className="text-[1.5rem] leading-[160%]">Сертификат 1</h2>
            <h3 className="text-[1.25rem] leading-[160%]">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi voluptatibus nemo,
              unde velit fuga similique est magnam aut eveniet ipsum rerum iste quod reiciendis
              sequi, doloribus tempora consequatur ad quis?
            </h3>
          </div>
          <Image
            alt={'Сертификат 1'}
            src="https://placehold.co/900x512.png"
            className="shrink-0 object-cover max-h-[512px] rounded-[16px]"
            width={900}
            height={512}
          />
        </div>
      </div>
      <div className="flex flex-col gap-y-6">
        <div className="flex flex-col gap-y-2">
          <h2 className="text-[1.5rem] leading-[160%]">Сертификат 2</h2>
          <h3 className="text-[1.25rem] leading-[160%]">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis tenetur maxime
            dolore vitae! Maxime reprehenderit maiores, perferendis porro itaque iste minus tenetur
            officiis tempore dolorem architecto nisi ab neque totam?
          </h3>
        </div>
        <Image
          alt={'Сертификат 2'}
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
