'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import { SubMenuLink } from './SubMenuLink'
import { MenuItem } from '../Header'
import { ConnectBlock } from './Connect'
import { LogoLink } from './LogoLink'
import { RequestCallbackButton } from '../../Callback/RequestCallbackButton'

export function MobileNavMenu({ menu }: { menu: MenuItem[] }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
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
          <Accordion type="single" collapsible className="flex w-full flex-col gap-4">
            {menu.map((item) => renderMobileMenuItem(item, () => setIsOpen(false)))}
          </Accordion>
        </div>
        <div className="p-4">
          <RequestCallbackButton size="lg" className="w-full">
            Заказать звонок
          </RequestCallbackButton>
        </div>
        <div className="p-4">
          <ConnectBlock />
        </div>
      </SheetContent>
    </Sheet>
  )
}

const renderMobileMenuItem = (item: MenuItem, closeSheet: () => void) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {item.items.map((subItem) => (
            <SubMenuLink key={subItem.title} item={subItem} onClick={closeSheet} />
          ))}
        </AccordionContent>
      </AccordionItem>
    )
  }

  return (
    <Link
      key={item.title + item.url}
      href={item.url ?? '#'}
      className="text-md font-semibold"
      prefetch
      onClick={closeSheet}
    >
      {item.title}
    </Link>
  )
}
