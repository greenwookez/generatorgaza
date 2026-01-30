import Image from 'next/image'
import { BreadCrumbsTrail } from '@/components/elements/BreadCrumbsTrail'
import { Separator } from '@/components/elements/Separator'
import { cn } from '@/lib/utils'
import { PopularLinks } from '../_components/PopularLinks/PopularLinks'
import { AskQuestionButton } from '../catalog/[category_slug]/[item_slug]/_components/AskQuestionButton'
import { ContentClass } from '../layout'
import CertificateOxygenImage from '@/assets/images/certificate-oxygen.png'
import CertificateNitrogenImage from '@/assets/images/certificate-nitrogen.png'
import PermissionMonoblocksImage from '@/assets/images/permission-monoblocks.png'

export default async function CertificatesPage() {
  return (
    <div className={cn(ContentClass)}>
      <div className="flex flex-col gap-y-7">
        <BreadCrumbsTrail
          items={[{ title: 'О предприятии', href: '/about' }, { title: 'Сертификаты' }]}
        />
        <h1 className="text-[1.875rem] font-medium leading-[110%]">Сертификаты</h1>
      </div>
      <div className="flex gap-x-30 items-start max-xl:gap-x-20">
        <CertificatesPageContent />
        <CertificatesPageSidebar />
      </div>
      <Separator />
      <PopularLinks />
    </div>
  )
}

const CertificatesPageContent = () => (
  <div className="max-w-[820px] grow flex flex-col gap-y-12">
    <div className="lg:hidden">
      <CertificatesPageSidebarBody />
    </div>
    <div className="flex flex-col gap-y-6">
      <div className="flex flex-col gap-y-2">
        <h2 className="text-[1.5rem] leading-[120%] max-sm:text-[1.25rem]">
          Декларация соответствия - Азотная установка
        </h2>
      </div>
      <Image
        alt={'Декларация соответствия - Азотная установка'}
        src={CertificateNitrogenImage}
        className="border border-border2 shrink-0 object-cover rounded-[16px]"
      />
    </div>
    <div className="flex flex-col gap-y-6">
      <div className="flex flex-col gap-y-2">
        <h2 className="text-[1.5rem] leading-[120%] max-sm:text-[1.25rem]">
          Сертификат соответствия - Кислородная установка
        </h2>
      </div>
      <Image
        alt={'Сертификат соответствия - Кислородная установка'}
        src={CertificateOxygenImage}
        className="border border-border2 shrink-0 object-cover rounded-[16px]"
      />
    </div>
    <div className="flex flex-col gap-y-6">
      <div className="flex flex-col gap-y-2">
        <h2 className="text-[1.5rem] leading-[120%] max-sm:text-[1.25rem]">
          Разрешение - Моноблоки
        </h2>
      </div>
      <Image
        alt={'Разрешение - Моноблоки'}
        src={PermissionMonoblocksImage}
        className="border border-border2 shrink-0 object-cover rounded-[16px]"
      />
    </div>
  </div>
)

const CertificatesPageSidebar = () => (
  <div
    className={cn(
      'max-lg:hidden w-full max-w-[400px] sticky top-[94px] shadow-[0px_5px_20px_0px_rgba(0,31,84,0.08)]',
      CertificatesPageSidebarBodyRoundedClass,
    )}
  >
    <CertificatesPageSidebarBody />
  </div>
)

const CertificatesPageSidebarBodyRoundedClass = 'rounded-[12px]'

const CertificatesPageSidebarBody = () => (
  <div
    className={cn(
      'border p-6 max-sm:p-4 flex flex-col gap-y-4.5 w-full max-lg:rounded-[8px] max-lg:border-border2',
      CertificatesPageSidebarBodyRoundedClass,
    )}
  >
    <div className="flex flex-col gap-y-3">
      <div className="font-medium text-muted-foreground leading-[110%]">Есть вопросы?</div>
      <h3 className="font-medium text-[1.375rem] leading-[110%] max-sm:text-[1.5rem]">
        Свяжитесь с нами!
      </h3>
    </div>
    <AskQuestionButton />
  </div>
)
