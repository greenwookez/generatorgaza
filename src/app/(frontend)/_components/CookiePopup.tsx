'use client'

import { Button } from '@/components/ui/button'
import IsLocalStorageAvailable from '@/lib/isLocalStorageAvailable'
import { useEffect, useState } from 'react'

export const CookiePopup = () => {
  const [shouldShowCookies, setShouldShowCookies] = useState(
    IsLocalStorageAvailable() ? localStorage.getItem('cookie-consent') !== 'agreed' : true,
  )

  const onAcceptClick = () => {
    console.log('onAcceptClick')
    if (IsLocalStorageAvailable()) {
      console.log('Accepted')
      localStorage.setItem('cookie-consent', 'agreed')
      setShouldShowCookies(false)
    }
  }

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      console.log('click', e.target)
    }

    window.addEventListener('click', listener)
    return () => {
      window.removeEventListener('click', listener)
    }
  }, [])

  if (!shouldShowCookies) {
    return null
  }

  return (
    <div className="absolute bottom-4 left-3 bg-background py-4 px-5 w-[480px] shadow-[0px_5px_20px_0px_rgba(0,31,84,0.08)] rounded-[16px] flex gap-x-3 items-center text-muted-foreground text-[0.75rem] leading-[1.125rem]">
      <span>
        Мы обрабатываем cookies, чтобы сделать наш сайт удобнее и персонализированее для вас.
        Подробнее: политика использования cookies и защита данных.
      </span>
      <Button onClick={onAcceptClick}>Принять</Button>
    </div>
  )
}
