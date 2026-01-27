'use client'

import Link from 'next/link'
import { MenuItem } from '../Header'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { SubMenuLink } from './NavMenu'

export function MobileNavMenu({ menu }: { menu: MenuItem[] }) {
  return (
    <Accordion type="single" collapsible className="flex w-full flex-col gap-4">
      {menu.map((item) => renderMobileMenuItem(item))}
    </Accordion>
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
