import Image from 'next/image'
import Logo from '@/assets/logo.svg'
import NitrogenGeneratorImage from '@/assets/images/nitrogen-generator.png'
import { CatalogItem } from '@/components/elements/CatalogItem'
import { LinkWithIcon } from '@/components/elements/LinkWithIcon'
import { Separator } from '@/components/elements/Separator'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  ArrowRight,
  BadgeRussianRuble,
  Handshake,
  BriefcaseBusiness,
  Factory,
  ScrollText,
} from 'lucide-react'
import { TextWithLabel } from '@/components/elements/TextWithLabel'

export default async function HomePage() {
  return (
    <div className="flex flex-col gap-y-20 pt-5 pb-20 items-center w-full max-lg:pb-10 max-lg:gap-y-10 max-sm:pb-6 max-sm:gap-y-6">
      <HomePageHero />
      <HomePageCatalog />
      <HomePageAdvantages />
      <HomePageAbout />
      <HomePageExample />
      <HomePageContacts />
    </div>
  )
}

const HomePageHero = () => {
  const yearsInBusiness = Math.max(50, Math.floor((new Date().getFullYear() - 1976) / 5) * 5)

  return (
    <div className="py-12 px-7.5 rounded-[20px] border-4 border-accent flex flex-col gap-y-10 w-full">
      <div className="flex flex-col gap-y-3 items-center">
        <Logo aria-label="Логотип АО «Опытно-технологический завод»" className="w-17.5 h-16.5" />
        <h1 className="text-[3rem] font-medium leading-[140%] text-center max-md:text-[2rem]">
          Опытно-
          <wbr />
          технологический завод
        </h1>
        <h2 className="text-[1.5rem] font-medium leading-[140%] text-muted-foreground">
          {yearsInBusiness} лет на рынке!
        </h2>
      </div>
      <div className="flex gap-x-4 justify-center">
        <Button variant="outline">Задать вопрос</Button>
        <Button>Заказать звонок</Button>
      </div>
    </div>
  )
}

const HomePageCatalog = () => (
  <div className="flex flex-col gap-y-10 w-full">
    <div className="flex gap-x-7 align-center">
      <h3 className="text-[2.25rem] font-medium leading-[110%]">Каталог</h3>
      <Button asChild variant="link" size="indent-none">
        <a href="/catalog">
          Вся продукция <ArrowRight />
        </a>
      </Button>
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

const HomePageAdvantages = () => (
  <div className="w-full">
    <Separator />
    <div className="py-12 flex flex-col gap-y-10">
      <h3 className="text-[2.25rem] font-medium leading-[110%]">Наши преимущества</h3>
      <div className="grid [grid-template-columns:repeat(auto-fit,minmax(350px,1fr))] gap-x-6 gap-y-4">
        <div className="flex gap-x-5 items-center w-full">
          <div className="size-16 rounded-full bg-accent flex items-center justify-center shrink-0">
            <BadgeRussianRuble className="size-8.5" />
          </div>
          <span className="text-[1.25rem] font-medium leading-[140%]">Гибкая система скидок</span>
        </div>
        <div className="flex gap-x-5 items-center w-full">
          <div className="size-16 rounded-full bg-accent flex items-center justify-center shrink-0">
            <Handshake className="size-8.5" />
          </div>
          <span className="text-[1.25rem] font-medium leading-[140%]">Индивидуальный подход</span>
        </div>
        <div className="flex gap-x-5 items-center w-full">
          <div className="size-16 rounded-full bg-accent flex items-center justify-center shrink-0">
            <BriefcaseBusiness className="size-8.5" />
          </div>
          <span className="text-[1.25rem] font-medium leading-[140%]">
            Работаем с физическими и юридическими лицами
          </span>
        </div>
      </div>
    </div>
    <Separator />
  </div>
)

const HomePageAbout = () => (
  <div className="flex flex-col gap-y-10">
    <h3 className="text-[2.25rem] font-medium leading-[110%]">О предприятии</h3>
    <div className="grid [grid-template-columns:repeat(auto-fit,minmax(400px,1fr))] gap-x-10 gap-y-5">
      <div className="">
        <p className="text-[1.25rem] leading-[160%] mb-5">
          Акционерное общество «Опытно-технологический завод» является правопреемником предприятия
          по производству ацетилена «Моспромтехмонтаж», которое входило в Министерство атомной
          энергии Российской Федерации.
          <br />
          <br />В АО входят следующие производства: подготовки технических газов; производство
          растворенного ацетилена.
        </p>
        <Button asChild variant="link" size="indent-none">
          <a href="#">
            Подробнее <ArrowRight />
          </a>
        </Button>
        <Separator hr={{ className: 'my-7' }} />
        <div className="flex flex-col gap-y-7">
          <LinkWithIcon icon={Factory} href="#">
            Производство и цехи
          </LinkWithIcon>
          <LinkWithIcon icon={ScrollText} href="#">
            Сертификаты
          </LinkWithIcon>
        </div>
      </div>
      <Image
        alt="Азотный генератор"
        className={cn('rounded-[16px] max-h-[500px] object-cover')}
        src={NitrogenGeneratorImage}
      />
    </div>
  </div>
)

const HomePageExample = () => {
  return (
    <div className="flex flex-col gap-y-10 w-full items-center">
      <h4 className="text-[1.75rem] font-medium leading-[110%]">
        Пример работы адсорбционного генератора кислорода
      </h4>
      <iframe
        className="max-w-[1000px] aspect-video"
        width="100%"
        src="https://www.youtube-nocookie.com/embed/_47kx7JEfFY?si=aB7w9CFxO1RESkdL"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  )
}

const HomePageContacts = () => (
  <div className="flex flex-col gap-y-10 w-full">
    <div className="flex gap-x-7 align-center">
      <h3 className="text-[2.25rem] font-medium leading-[110%]">Контакты</h3>
      <Button asChild variant="link" size="indent-none">
        <a href="#">
          Подробнее <ArrowRight />
        </a>
      </Button>
    </div>
    <div className="flex gap-x-10">
      <div className="w-full py-4 flex flex-col gap-y-4 justify-between">
        <div className="flex flex-col gap-y-4">
          <h4 className="text-[1.375rem] font-semibold leading-[140%]">Протвино</h4>
          <TextWithLabel
            label="Адрес газового производства"
            text="142280, Московская обл., г. Протвино, ул. Железнодорожная, д. 1"
            span={{ className: 'text-[1.125rem]' }}
          />
          <TextWithLabel
            label="Адрес производства оборудования"
            text="142280, Московская обл., г. Протвино, ул. Индустриальный проезд, д. 4 (проходная №2)"
            span={{ className: 'text-[1.125rem]' }}
          />
        </div>
        <div className="flex flex-col gap-y-4">
          <TextWithLabel
            label="Телефон"
            text="+7 (4967) 74-59-55"
            a={{ href: 'tel:+74967745955' }}
          />
          <TextWithLabel
            label="Режим работы"
            text={
              <>
                Пн-Пт: 08:00 - 17:00
                <br />
                Сб-Вс: Выходные
              </>
            }
            span={{ className: 'text-[1rem] leading-[140%] text-foreground' }}
          />
        </div>
      </div>
      <div className="w-[1px] bg-border2 shrink-0"></div>
      <div className="w-full py-4 flex flex-col gap-y-4 justify-between">
        <div className="flex flex-col gap-y-4">
          <h4 className="text-[1.375rem] font-semibold leading-[140%]">Москва</h4>
          <TextWithLabel
            label="Адрес"
            text="129337, г. Москва, ул. Красная сосна, д. 24, cтр. 1"
            span={{ className: 'text-[1.125rem]' }}
          />
        </div>
        <div className="flex flex-col gap-y-4">
          <TextWithLabel
            label="Телефон"
            text="+7 (499) 188-73-56"
            a={{ href: 'tel:+74991887356' }}
          />
          <TextWithLabel
            label="Режим работы"
            text={
              <>
                Пн-Пт: 08:00 - 17:00
                <br />
                Сб-Вс: Выходные
              </>
            }
            span={{ className: 'text-[1rem] leading-[140%] text-foreground' }}
          />
        </div>
      </div>
      <div className="w-[1px] bg-border2 shrink-0"></div>
      <div className="w-full py-4 flex flex-col gap-y-4 justify-between">
        <div className="flex flex-col gap-y-4">
          <h4 className="text-[1.375rem] font-semibold leading-[140%]">Калуга</h4>
          <TextWithLabel
            label="Адрес"
            text="24801, г. Калуга, ул. Московская, д. 292"
            span={{ className: 'text-[1.125rem]' }}
          />
        </div>
        <div className="flex flex-col gap-y-4">
          <TextWithLabel
            label="Телефон"
            text="+7 (4842) 55-93-11"
            a={{ href: 'tel:+74842559311' }}
          />
          <TextWithLabel
            label="Режим работы"
            text={
              <>
                Пн-Пт: 08:00 - 17:00
                <br />
                Сб-Вс: Выходные
              </>
            }
            span={{ className: 'text-[1rem] leading-[140%] text-foreground' }}
          />
        </div>
      </div>
    </div>
  </div>
)
