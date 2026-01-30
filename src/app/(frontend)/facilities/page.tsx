import Image from 'next/image'
import { BreadCrumbsTrail } from '@/components/elements/BreadCrumbsTrail'
import { Separator } from '@/components/elements/Separator'
import { cn } from '@/lib/utils'
import { PopularLinks } from '../_components/PopularLinks/PopularLinks'
import { AskQuestionButton } from '../catalog/[category_slug]/[item_slug]/_components/AskQuestionButton'
import { ContentClass } from '../layout'
import QCAcetyleneImage from '@/assets/images/qc-acetylene.png'
import WorkshopAcetyleneImage from '@/assets/images/workshop-acetylene.png'
import WorkshopArgonImage from '@/assets/images/workshop-argon.png'
import WorkshopMetalworking1Image from '@/assets/images/workshop-metalworking1.png'
import WorkshopMetalworking2Image from '@/assets/images/workshop-metalworking2.png'
import WorkshopOxygenImage from '@/assets/images/workshop-oxygen.png'

export default async function FacilitiesPage() {
  return (
    <div className={cn(ContentClass)}>
      <div className="flex flex-col gap-y-7">
        <BreadCrumbsTrail items={[{ title: 'О предприятии' }]} />
        <h1 className="text-[1.875rem] font-medium leading-[110%]">О предприятии</h1>
      </div>
      <div className="flex gap-x-30 items-start max-xl:gap-x-20">
        <FacilitiesPageContent />
        <FacilitiesPageSidebar />
      </div>
      <Separator />
      <PopularLinks />
    </div>
  )
}

const FacilitiesPageContent = () => (
  <div className="max-w-[820px] grow flex flex-col gap-y-12">
    <div className="lg:hidden">
      <FacilitiesPageSidebarBody />
    </div>
    <div className="flex flex-col gap-y-6">
      <div className="flex flex-col gap-y-2">
        <h2 className="text-[1.5rem] leading-[160%]">Цех наполнения ацетилена</h2>
        <h3 className="text-[1.125rem] leading-[160%]">4 рампы на 72 баллона каждая</h3>
      </div>
      <Image
        alt={'Цех наполнения ацетилена'}
        src={WorkshopAcetyleneImage}
        className="shrink-0 object-cover max-h-[512px] rounded-[16px]"
      />
    </div>
    <div className="flex flex-col gap-y-6">
      <div className="flex flex-col gap-y-2">
        <h2 className="text-[1.5rem] leading-[160%]">Цех металлообработки</h2>
        <h3 className="text-[1.125rem] leading-[160%]">
          Площадь 5000 кв. метров. Малые азотные установки и моноблоки перед отгрузкой.
        </h3>
      </div>
      <Image
        alt={'Цех металлообработки (вид 1)'}
        src={WorkshopMetalworking1Image}
        className="shrink-0 object-cover max-h-[512px] rounded-[16px]"
      />
      <Image
        alt={'Цех металлообработки (вид 2)'}
        src={WorkshopMetalworking2Image}
        className="shrink-0 object-cover max-h-[512px] rounded-[16px]"
      />
    </div>
    <div className="flex flex-col gap-y-6">
      <div className="flex flex-col gap-y-2">
        <h2 className="text-[1.5rem] leading-[160%]">Наполнительные отделения</h2>
        <h3 className="text-[1.125rem] leading-[160%]">Аргона (ближнее) и углекислоты (дальнее)</h3>
      </div>
      <Image
        alt={'Наполнительное отделение Аргона'}
        src={WorkshopArgonImage}
        className="shrink-0 object-cover max-h-[512px] rounded-[16px]"
      />
    </div>
    <div className="flex flex-col gap-y-6">
      <div className="flex flex-col gap-y-2">
        <h2 className="text-[1.5rem] leading-[160%]">Цех наполнения кислорода</h2>
        <h3 className="text-[1.125rem] leading-[160%]">
          Производственная мощность – 80 000 баллонов в год
        </h3>
      </div>
      <Image
        alt={'Цех наполнения кислорода'}
        src={WorkshopOxygenImage}
        className="shrink-0 object-cover max-h-[512px] rounded-[16px]"
      />
    </div>
    <div className="flex flex-col gap-y-6">
      <div className="flex flex-col gap-y-2">
        <h2 className="text-[1.5rem] leading-[160%]">
          Участок контроля качества наполнения ацетилена
        </h2>
        <h3 className="text-[1.125rem] leading-[160%]">Электронные весы, разрядная рампа</h3>
      </div>
      <Image
        alt={'Участок контроля качества наполнения ацетилена'}
        src={QCAcetyleneImage}
        className="shrink-0 object-cover max-h-[512px] rounded-[16px]"
      />
    </div>
  </div>
)

const FacilitiesPageSidebar = () => (
  <div
    className={cn(
      'max-lg:hidden w-full max-w-[400px] sticky top-[94px] shadow-[0px_5px_20px_0px_rgba(0,31,84,0.08)]',
      FacilitiesPageSidebarBodyRoundedClass,
    )}
  >
    <FacilitiesPageSidebarBody />
  </div>
)

const FacilitiesPageSidebarBodyRoundedClass = 'rounded-[12px]'

const FacilitiesPageSidebarBody = () => (
  <div
    className={cn(
      'border p-6 flex flex-col gap-y-4.5 w-full max-lg:rounded-[8px] max-lg:border-border2',
      FacilitiesPageSidebarBodyRoundedClass,
    )}
  >
    <div className="flex flex-col gap-y-3">
      <div className="font-medium text-muted-foreground leading-[110%]">Есть вопросы?</div>
      <h3 className="font-medium text-[1.375rem] leading-[110%] max-sm:text-[1.5rem] max-sm:mb-5">
        Свяжитесь с нами!
      </h3>
    </div>
    <AskQuestionButton />
  </div>
)
