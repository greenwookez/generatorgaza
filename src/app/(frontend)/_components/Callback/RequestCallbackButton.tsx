'use client'

import { ComponentProps, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { CallbackForm } from './CallbackForm'

export type RequestCallbackButtonProps = Omit<ComponentProps<typeof Button>, 'onClick' | 'children'>

export const RequestCallbackButton = (props: RequestCallbackButtonProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button {...props}>Заказать звонок</Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto gap-0 max-sm:w-full">
        <SheetHeader>
          <SheetTitle>Заказать звонок</SheetTitle>
        </SheetHeader>
        <div className="px-4">
          Оставьте свои контактные данные, и мы перезвоним вам в ближайшее время.
        </div>
        <CallbackForm />
      </SheetContent>
    </Sheet>
  )
}
