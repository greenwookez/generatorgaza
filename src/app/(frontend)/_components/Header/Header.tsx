import { Button } from '@/components/ui/button'
import { initPayload } from '@/lib/utils/initPayload'
import { cn } from '@/lib/utils'
import { Book, ChevronDown, PhoneCall } from 'lucide-react'
import React from 'react'
import { ContainerClass, InsideContainerClass } from '../../layout'
import { ConnectHoverCard } from './_components/Connect'
import { MobileNavMenu } from './_components/MobileNavMenu'
import { NavMenu } from './_components/NavMenu'
import { LogoLink } from './_components/LogoLink'
import { RequestCallbackButton } from '../Callback/RequestCallbackButton'

export type MenuItem = {
  title: string
  url?: string
  description?: string
  icon?: React.ReactNode
  items?: MenuItem[]
}

export async function Header() {
  const payload = await initPayload()

  const catalogCategories = await payload.find({
    collection: 'catalog-categories',
    sort: 'order',
    pagination: false,
    where: {
      isHidden: { equals: false },
    },
    select: {
      title: true,
      slug: true,
      navDescription: true,
      navIcon: true,
    },
  })

  const catalogItems = catalogCategories.docs.map((category) => {
    return {
      title: category.title,
      url: `/catalog/${category.slug}`,
      description: category.navDescription,
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      icon: React.createElement(require('lucide-react')[category.navIcon], {
        className: 'size-5 shrink-0',
      }),
    }
  })

  const menu = [
    { title: 'Главная', url: '/' },
    {
      title: 'Каталог',
      items: [
        {
          title: 'Вся продукция',
          description: 'Полный ассортимент товаров и оборудования для заказа',
          icon: <Book className="size-5 shrink-0" />,
          url: '/catalog',
        },
        ...catalogItems,
      ],
    },
    {
      title: 'Доставка и оплата',
      url: '/shipping-and-payment',
    },
    {
      title: 'Контакты',
      url: '/contact-us',
    },
  ]

  return (
    <header className={cn(ContainerClass, 'sticky top-0 bg-background py-3 z-40')}>
      <div className={InsideContainerClass}>
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <LogoLink />
            <div className="flex items-center max-xl:hidden">
              <NavMenu menu={menu} />
            </div>
          </div>
          <div className="flex gap-x-4">
            <div className="flex gap-x-5 max-sm:gap-x-3">
              <ConnectHoverCard>
                <Button
                  variant="ghost"
                  className="max-sm:hidden [&[data-state=open]_.chevron-down]:rotate-180"
                >
                  <PhoneCall className="size-5" aria-hidden="true" />
                  Связаться
                  <ChevronDown
                    className="transition duration-300 chevron-down size-4"
                    aria-hidden="true"
                  />
                </Button>
              </ConnectHoverCard>
              <RequestCallbackButton />
            </div>
            <MobileNavMenu menu={menu} />
          </div>
        </nav>
      </div>
    </header>
  )
}
