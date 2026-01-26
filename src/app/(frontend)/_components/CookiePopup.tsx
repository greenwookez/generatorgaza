'use client'

import { Button } from '@/components/ui/button'
import IsLocalStorageAvailable from '@/lib/isLocalStorageAvailable'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export const CookiePopup = () => {
  const [show, setShow] = useState(false)

  const onAcceptClick = () => {
    if (IsLocalStorageAvailable()) {
      localStorage.setItem('cookie-consent', 'agreed')
      setShow(false)
    }
  }

  useEffect(() => {
    if (IsLocalStorageAvailable()) {
      setShow(localStorage.getItem('cookie-consent') !== 'agreed')
    }
  }, [])

  if (!show) return null

  return (
    <div className="z-50 fixed bottom-4 left-3 max-sm:right-3 max-sm:flex-col max-sm:items-start sm:w-[480px] bg-background py-4 px-5  shadow-[0px_5px_20px_0px_rgba(0,31,84,0.08)] rounded-[16px] flex gap-3 items-center text-muted-foreground text-[0.75rem] leading-[1.125rem] max-sm:animate-cookie-appear-bottom sm:animate-cookie-appear-left">
      <span>
        Мы используем Cookie, чтобы сделать наш сайт удобнее и персонализированее для вас.
        Подробнее:{' '}
        <Link href="#" className="underline" prefetch>
          Политика обработки персональных данных
        </Link>
        .
      </span>
      <Button onClick={onAcceptClick}>Принять</Button>
    </div>
  )
}
