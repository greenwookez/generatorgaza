'use client'

import { ComponentProps, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { CallbackForm } from './CallbackForm'

export type RequestCallbackButtonProps = ComponentProps<typeof Button>

export const RequestCallbackButton = (props: RequestCallbackButtonProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button {...props}>{props.children}</Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto gap-0 max-sm:w-full">
        <SheetHeader>
          <SheetTitle>{props.children}</SheetTitle>
        </SheetHeader>
        <div className="px-4">
          Оставьте свои контактные данные, и мы перезвоним вам в ближайшее время.
        </div>
        <CallbackForm />
      </SheetContent>
    </Sheet>
  )
}
