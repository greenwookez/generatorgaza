'use client'

import { useState, useEffect, useRef } from 'react'
export default function useMaxWidth(width: number): boolean {
  const [isPassed, setIsPassed] = useState(false)
  const mql = useRef<MediaQueryList | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    mql.current = window.matchMedia(`(max-width: ${width}px)`)
    setIsPassed(mql.current.matches)

    const onChange = (e: MediaQueryListEvent) => {
      setIsPassed(e.matches)
    }

    mql.current.addEventListener('change', onChange)

    return () => {
      mql.current?.removeEventListener('change', onChange)
    }
  }, [width])

  return isPassed
}
