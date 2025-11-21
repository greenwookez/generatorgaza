import { cn } from '@/lib/utils'

import Logo from '@/assets/logo.svg'
import { TextWithLabel } from '@/components/elements/TextWithLabel'
import { ContainerClass, InsideContainerClass } from '../layout'
import { Separator } from '@/components/elements/Separator'

export type FooterProps = {
  className?: string
}

type MenuCategory = {
  title: string
  links: { label: string; href: string }[]
}

const menu: MenuCategory[] = [
  {
    title: 'Компания',
    links: [
      { label: 'О предприятии', href: '#' },
      { label: 'Доставка и оплата', href: '/shipping-and-payment' },
      { label: 'Контакты', href: '#' },
      { label: 'Отзывы', href: '#' },
      { label: 'Новости', href: '#' },
    ],
  },
  {
    title: 'Каталог',
    links: [
      { label: 'Технические газы', href: '#' },
      { label: 'Воздухоразделительные установки', href: '#' },
      { label: 'Моноблоки', href: '#' },
      { label: 'Оборудование для сварки', href: '#' },
    ],
  },
  {
    title: 'Услуги',
    links: [
      { label: 'Аренда', href: '#' },
      { label: 'Освидетельствование балонов', href: '#' },
    ],
  },
]

export const Footer = ({ className }: FooterProps) => {
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
                  <a
                    key={key}
                    href={link.href}
                    className="font-medium leading-[140%] text-muted-foreground hover:underline"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
        <Separator />
        <div className="flex justify-between text-muted-foreground text-[0.875rem] font-medium">
          <span>© 2000—{new Date().getFullYear()} АО «ОТЗ» Все права защищены.</span>
          <a href="#" className="underline">
            Политика обработки персональных данных
          </a>
        </div>
      </div>
    </footer>
  )
}
