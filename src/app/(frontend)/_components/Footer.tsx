import { cn } from '@/lib/utils'

import Logo from '@/assets/logo.svg'
import { TextWithLabel } from '@/components/elements/TextWithLabel'
import { ContainerClass, InsideContainerClass } from '../layout'
import { Separator } from '@/components/elements/Separator'
import Link from 'next/link'
import { initPayload } from '@/lib/utils/initPayload'

export type FooterProps = {
  className?: string
}

type MenuCategoryLink = {
  label: string
  href: string
}

type MenuCategory = {
  title: string
  links: MenuCategoryLink[]
}

export const Footer = async ({ className }: FooterProps) => {
  const payload = await initPayload()

  const categories = await payload.find({
    collection: 'catalog-categories',
    sort: 'order',
    pagination: false,
    select: {
      title: true,
      slug: true,
    },
  })

  const menu: MenuCategory[] = [
    {
      title: 'Компания',
      links: [
        { label: 'О предприятии', href: '/about' },
        { label: 'Производство и цехи', href: '/facilities' },
        { label: 'Сертификаты', href: '/certificates' },
        { label: 'Доставка и оплата', href: '/shipping-and-payment' },
        { label: 'Контакты', href: '/contact-us' },
      ],
    },
    {
      title: 'Каталог',
      links: categories.docs.reduce<MenuCategoryLink[]>((acc, category) => {
        acc.push({ label: category.title, href: `/catalog/${category.slug}` })
        return acc
      }, []),
    },
  ]

  return (
    <footer className={cn(ContainerClass, 'pt-15 pb-10', className)}>
      <div className={cn(InsideContainerClass, 'flex flex-col gap-y-8')}>
        <div className="flex justify-between gap-x-18 gap-y-9 flex-wrap">
          <div className="flex flex-col gap-y-6">
            <div className="flex gap-x-4 items-center text-[1.125rem] font-medium">
              <Logo aria-label="Логотип АО «Опытно-технологический завод»" />
              АО «Опытно-технологический завод»
            </div>
            <div className="flex flex-col gap-y-5">
              <TextWithLabel
                label="Отдел продаж"
                text="+7 (916) 681-88-34"
                a={{ href: 'tel:+79166818834' }}
              />
              <TextWithLabel
                label="Приемная"
                text="+7 (4967) 74-59-55"
                a={{ href: 'tel:+74967445955' }}
              />
            </div>
            <TextWithLabel
              label="Email"
              text="otz-gaz@yandex.ru"
              a={{ href: 'mailto:otz-gaz@yandex.ru' }}
            />
          </div>
          <div className="pt-2 flex gap-10 max-w-[720px] flex-wrap">
            {menu.map((category, key) => (
              <div key={key} className="flex flex-col gap-y-4 flex-1 min-w-[200px]">
                <span className="font-semibold leading-[140%]">{category.title}</span>
                {category.links.map((link, key) => (
                  <Link
                    key={key}
                    href={link.href}
                    className="font-medium leading-[140%] text-muted-foreground hover:underline"
                    prefetch
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
        <Separator />
        <div className="flex justify-between text-muted-foreground text-[0.875rem] font-medium gap-y-3 max-sm:flex-col-reverse">
          <span>© 2000—{new Date().getFullYear()} АО «ОТЗ» Все права защищены.</span>
          <Link href="#" className="underline hover:no-underline" prefetch>
            Политика обработки персональных данных
          </Link>
        </div>
      </div>
    </footer>
  )
}
