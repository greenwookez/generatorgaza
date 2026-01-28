import Image from 'next/image'
import { ArrowRight, Factory, LucideIcon, ScrollText } from 'lucide-react'
import { BreadCrumbsTrail } from '@/components/elements/BreadCrumbsTrail'
import { PopularLinks } from '../_components/PopularLinks/PopularLinks'
import { Separator } from '@/components/elements/Separator'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ContentClass } from '../layout'

export default async function AboutPage() {
  return (
    <div className={cn(ContentClass)}>
      <div className="flex flex-col gap-y-7">
        <BreadCrumbsTrail items={[{ title: 'О предприятии' }]} />
        <h1 className="text-[1.875rem] font-medium leading-[110%]">О предприятии</h1>
        <div className="flex gap-x-10">
          <p className="text-[1.25rem] leading-[160%]">
            Акционерное общество «Опытно-технологический завод» — предприятие с многолетней
            историей, являющееся правопреемником производства ацетилена треста «Моспромтехмонтаж»,
            входившего в Министерство атомной энергии Российской Федерации.
            <br />
            <br />
            Завод специализируется на производстве воздухоразделительных установок, растворённого
            ацетилена и подготовке технических газов (кислород, углекислота, аргон, азот, гелий,
            газовые смеси), осуществляет ремонт и техническое освидетельствование баллонов, а также
            производство известкового молока. Предприятие располагает филиалами в Москве, Протвино и
            Екатеринбурге.
            <br />
            <br />
            АО «Опытно-технологический завод» сотрудничает с надёжными партнёрами, обеспечивает
            гарантированные сроки поставок и сдачи установок.
          </p>
          <Image
            alt={'Скания'}
            src="https://placehold.co/500x512.png"
            className="shrink-0 object-cover max-h-[512px] rounded-[16px]"
            width={500}
            height={512}
          />
        </div>
      </div>
      <div className="flex gap-x-12">
        <AboutPageLinkingBlock title="Производство и цехи" href="/facilities" icon={Factory} />
        <AboutPageLinkingBlock title="Сертификаты" href="/certificates" icon={ScrollText} />
      </div>
      <p className="text-[1.25rem] leading-[160%]">
        ЗАО &quot;Промтехнология&quot; специализируется на производстве газовых генераторов и
        другого газового оборудования, а также на разработке и изготовлении изделий как
        промышленного, так и гражданского назначения (металлоконструкции строительные, железные и
        деревянные двери, ворота, заборы, решетки и т. д.) Кислородные и азотные генераторы наиболее
        наукоемкая продукция - разработка научно-промышленной инновационной компании
        &quot;Адген&quot;. Кислородные генераторы используются: на металлообрабатывающих заводах
        (резка металлов толщиной до 50 мм, сварка, пайка); в стекольной промышленности; окисление
        отходов; в медицине и т. д. Генератор полностью автоматизирован и нуждается только в
        источнике сжатого воздуха, причем особые требования к чистоте воздуха отсутствуют. Азотные
        генераторы используются: как средства тушения пожаров, особенно на взрыво-пожароопасных
        объектах; для долговременного хранения овощей и фруктов; для продувки азотом различных
        технологических и электротехнических установок и т.д.
        <br />
        <br />У нас надежные многолетние контакты с партнерами, гарантированные сроки поставок и
        сдачи объектов.
        <br />
        <br />
        АО «Опытно-технологический завод»
        <br />
        ИНН 5037004018
        <br />
        КПП 503701001
        <br />
        ОГРН 1025004860990
        <br />
        Юридический адрес: 142281, МО, г. Протвино, ул. Железнодорожная, д. 1
      </p>
      <Separator />
      <PopularLinks />
    </div>
  )
}

type AboutPageLinkingBlockProps = {
  title: string
  href: string
  icon: LucideIcon
}

const AboutPageLinkingBlock = ({ title, href, icon: Icon }: AboutPageLinkingBlockProps) => {
  return (
    <div className="w-full p-6 rounded-[12px] border border-border2 flex flex-col gap-y-5 items-start">
      <div className="size-16 flex justify-center items-center">
        <Icon className="size-8.5" />
      </div>
      <h2 className="text-[1.375rem] leading-[140%] font-semibold">{title}</h2>
      <Button asChild variant="outline">
        <Link href={href} prefetch>
          Подробнее <ArrowRight />
        </Link>
      </Button>
    </div>
  )
}
