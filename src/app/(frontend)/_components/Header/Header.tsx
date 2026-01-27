import Logo from '@/assets/logo.svg'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { initPayload } from '@/lib/initPayload'
import { cn } from '@/lib/utils'
import { Book, ChevronDown, Menu, PhoneCall } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { ContainerClass, InsideContainerClass } from '../../layout'
import { ConnectBlock, ConnectHoverCard } from './_components/Connect'
import { MobileNavMenu } from './_components/MobileNavMenu'
import { NavMenu } from './_components/NavMenu'

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
      icon: <Book className="size-5 shrink-0" />,
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
    <header className={cn(ContainerClass, 'sticky top-0 bg-background py-3 z-100')}>
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
              <Button>Заказать звонок</Button>
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button className="xl:hidden" variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto gap-0 max-sm:w-full">
                <SheetHeader>
                  <SheetTitle>
                    <LogoLink />
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-4">
                  <MobileNavMenu menu={menu} />
                </div>
                <div className="p-4">
                  <Button size="lg" className="w-full">
                    Заказать звонок
                  </Button>
                </div>
                <div className="p-4">
                  <ConnectBlock />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  )
}

const LogoLink = () => (
  <Link href="/" prefetch>
    <Logo aria-label="Логотип АО «Опытно-технологический завод»" />
  </Link>
)
