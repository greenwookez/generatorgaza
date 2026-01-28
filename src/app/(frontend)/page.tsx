import React from 'react'
import Link from 'next/link'
import { ArrowRight, BadgeRussianRuble, Handshake, BriefcaseBusiness } from 'lucide-react'
import { initPayload } from '@/lib/utils/initPayload'
import { CatalogItem } from '@/components/elements/CatalogItem'
import { LinkWithIcon } from '@/components/elements/LinkWithIcon'
import { Separator } from '@/components/elements/Separator'
import { Button } from '@/components/ui/button'
import { TextWithLabel } from '@/components/elements/TextWithLabel'
import { AskQuestionButton } from './_components/AskQuestionButton'
import Logo from '@/assets/logo.svg'
import { Media } from '@/payload-types'
import { ImagesCarousel } from '@/components/elements/ImagesCarousel'

const h3ClassName = 'text-[2rem] font-medium leading-[110%] max-md:text-[1.5rem]'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  return (
    <div className="flex flex-col gap-y-20 pt-5 pb-20 items-center w-full max-sm:gap-y-16">
      <HomePageHero />
      <HomePageCatalog />
      <HomePageAbout />
      <HomePageAdvantages />
      <HomePageExample />
      <HomePageContacts />
    </div>
  )
}

const HomePageHero = () => {
  const yearsInBusiness = Math.max(50, Math.floor((new Date().getFullYear() - 1976) / 5) * 5)

  return (
    <div className="py-12 px-7.5 rounded-[20px] border-4 border-accent flex flex-col gap-y-10 w-full max-sm:py-9 max-sm:px-4">
      <div className="flex flex-col gap-y-3 items-center">
        <Logo aria-label="Логотип АО «Опытно-технологический завод»" className="w-17.5 h-16.5" />
        <h1 className="text-[3rem] font-medium leading-[120%] text-center max-xl:text-[2.5rem] max-md:text-[2rem] max-sm:text-[1.625rem]">
          Опытно-
          <wbr />
          технологический завод
        </h1>
        <h2 className="text-[1.5rem] font-medium leading-[140%] text-muted-foreground max-sm:text-[1.125rem]">
          {' '}
          {yearsInBusiness} лет на рынке!
        </h2>
      </div>
      <div className="flex gap-x-4 gap-y-3 justify-center max-sm:flex-col">
        <AskQuestionButton />
        <Button size="lg">Заказать звонок</Button>
      </div>
    </div>
  )
}

const HomePageCatalog = async () => {
  const payload = await initPayload()

  const categories = await payload.find({
    collection: 'catalog-categories',
    sort: 'order',
    pagination: false,
    select: {
      title: true,
      description: true,
      image: true,
      slug: true,
    },
  })

  return (
    <div className="flex flex-col gap-y-10 w-full">
      <div className="flex gap-x-7 align-center">
        <h3 className={h3ClassName}>Каталог</h3>
        <Button asChild variant="link" size="indent-none">
          <Link href="/catalog" prefetch>
            Вся продукция <ArrowRight />
          </Link>
        </Button>
      </div>
      <div className="grid [grid-template-columns:repeat(auto-fit,minmax(270px,1fr))] gap-x-9 gap-y-12">
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

const HomePageAdvantages = () => (
  <div className="w-full">
    <Separator />
    <div className="py-12 flex flex-col gap-y-10">
      <h3 className={h3ClassName}>Наши преимущества</h3>
      <div className="grid [grid-template-columns:repeat(auto-fit,minmax(350px,1fr))] gap-6">
        <div className="flex gap-x-5 items-center w-full">
          <div className="size-16 rounded-full bg-accent flex items-center justify-center shrink-0">
            <BadgeRussianRuble className="size-8.5 max-sm:size-7.5" />
          </div>
          <span className="text-[1.125rem] font-medium leading-[140%]">Гибкая система скидок</span>
        </div>
        <div className="flex gap-x-5 items-center w-full">
          <div className="size-16 rounded-full bg-accent flex items-center justify-center shrink-0">
            <Handshake className="size-8.5 max-sm:size-7.5" />
          </div>
          <span className="text-[1.125rem] font-medium leading-[140%]">Индивидуальный подход</span>
        </div>
        <div className="flex gap-x-5 items-center w-full">
          <div className="size-16 rounded-full bg-accent flex items-center justify-center shrink-0">
            <BriefcaseBusiness className="size-8.5 max-sm:size-7.5" />
          </div>
          <span className="text-[1.125rem] font-medium leading-[140%]">
            Работаем с физическими и юридическими лицами
          </span>
        </div>
      </div>
    </div>
    <Separator />
  </div>
)

const HomePageAbout = async () => {
  const payload = await initPayload()
  const data = await payload.findGlobal({
    slug: 'about',
  })

  return (
    <div className="flex flex-col gap-y-10 max-sm:gap-y-7">
      <h3 className={h3ClassName}>О предприятии</h3>
      <div className="flex gap-x-10 gap-y-7 max-lg:flex-col items-start">
        {data.images && data.images.length > 0 && (
          <ImagesCarousel
            images={data.images as Media[]}
            containerClassName="w-full max-w-[600px] rounded-[16px] max-lg:min-w-full"
            imageClassName="h-[400px] max-sm:h-[267px]"
          />
        )}
        <div className="w-full">
          <p className="text-[1.125rem] leading-[160%] mb-5 max-sm:text-[1rem] whitespace-pre-wrap">
            {data.landing_text}
          </p>
          <Button asChild variant="link" size="indent-none">
            <Link href="/about" prefetch>
              Подробнее <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>
      {data.links && data.links.length > 0 && (
        <div className="flex flex-col gap-y-6 max-sm:gap-y-5">
          {data.links.map((link, key) => (
            <LinkWithIcon
              key={key}
              // eslint-disable-next-line @typescript-eslint/no-require-imports
              icon={require('lucide-react')[link.icon]}
              href={link.href}
              prefetch
            >
              {link.title}
            </LinkWithIcon>
          ))}
        </div>
      )}
    </div>
  )
}

const HomePageExample = () => {
  return (
    <div className="flex flex-col gap-y-10 w-full items-center">
      <h4 className="text-[1.75rem] font-medium leading-[110%] max-sm:text-[1.5rem]">
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
      <h3 className={h3ClassName}>Контакты</h3>
      <Button asChild variant="link" size="indent-none">
        <Link href="/contact-us" prefetch>
          Подробнее <ArrowRight />
        </Link>
      </Button>
    </div>
    <div className="flex gap-x-10 gap-y-8 max-xl:flex-col">
      <div className="w-full py-4 flex flex-col gap-y-4 justify-between max-xl:p-0">
        <div className="flex flex-col gap-y-4">
          <h4 className="text-[1.375rem] font-semibold leading-[140%]">Протвино</h4>
          <TextWithLabel
            label="Адрес производства технических газов"
            text="142280, Московская обл., г. Протвино, ул. Железнодорожная, д. 1"
            span={{ className: 'text-[1.125rem]' }}
          />
          <TextWithLabel
            label="Адрес производства установок"
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
      <div className="w-[1px] bg-border2 shrink-0 max-xl:h-[1px] max-xl:w-full"></div>
      <div className="w-full py-4 flex flex-col gap-y-4 justify-between max-xl:p-0">
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
    </div>
  </div>
)
