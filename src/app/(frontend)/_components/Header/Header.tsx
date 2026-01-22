import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import Link from 'next/link'
import { Book, Menu, Search, PhoneCall, ChevronDown } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import Logo from '@/assets/logo.svg'
import { cn } from '@/lib/utils'
import { ContainerClass, InsideContainerClass } from '../../layout'
import { ConnectBlock, ConnectHoverCard } from './Connect'

type MenuItem = {
  title: string
  url?: string
  description?: string
  icon?: React.ReactNode
  items?: MenuItem[]
}

export async function Header() {
  const payload = await getPayload({ config })

  const now = Date.now()
  const catalogCategories = await payload.find({
    collection: 'catalog-categories',
    sort: 'createdAt',
    pagination: false,
    select: {
      title: true,
      slug: true,
      navDescription: true,
      navIcon: true,
    },
  })
  console.log('Catalog categories fetched in header:', Date.now() - now, 'ms')

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
    <header className={cn(ContainerClass, 'sticky top-0 bg-background py-3 z-10')}>
      <div className={InsideContainerClass}>
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <LogoLink />
            <div className="flex items-center max-xl:hidden">
              <NavigationMenu delayDuration={0}>
                <NavigationMenuList>{menu.map((item) => renderMenuItem(item))}</NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex gap-x-4">
            <div className="flex gap-x-5 max-sm:gap-x-3">
              <Button variant="ghost">
                <Search className="size-5" aria-hidden="true" />
                <span className="max-sm:hidden">Поиск</span>
              </Button>
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
              <SheetContent className="overflow-y-auto gap-0">
                <SheetHeader className="sticky top-0">
                  <SheetTitle>
                    <LogoLink />
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-4">
                  <Accordion type="single" collapsible className="flex w-full flex-col gap-4">
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>
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

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent className="bg-popover text-popover-foreground">
          {item.items.map((subItem) => (
            <NavigationMenuLink asChild key={subItem.title} className="w-80">
              <SubMenuLink item={subItem} />
            </NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    )
  }

  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        href={item.url}
        className="bg-background hover:bg-muted hover:text-accent-foreground group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors"
      >
        {item.title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  )
}

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {item.items.map((subItem) => (
            <SubMenuLink key={subItem.title} item={subItem} />
          ))}
        </AccordionContent>
      </AccordionItem>
    )
  }

  return (
    <Link key={item.title} href={item.url ?? '#'} className="text-md font-semibold" prefetch>
      {item.title}
    </Link>
  )
}

const SubMenuLink = ({ item }: { item: MenuItem }) => {
  return (
    <Link
      className="hover:bg-muted hover:text-accent-foreground flex min-w-80 select-none flex-row gap-4 rounded-md p-3 leading-none no-underline outline-none transition-colors"
      href={item.url ?? '#'}
    >
      <div className="text-foreground">{item.icon}</div>
      <div>
        <div className="text-sm font-semibold">{item.title}</div>
        {item.description && (
          <p className="text-muted-foreground text-sm leading-snug">{item.description}</p>
        )}
      </div>
    </Link>
  )
}

const LogoLink = () => (
  <Link href="/" prefetch>
    <Logo aria-label="Логотип АО «Опытно-технологический завод»" />
  </Link>
)
