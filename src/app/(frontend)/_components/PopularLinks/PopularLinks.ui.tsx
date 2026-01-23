'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { LinkWithIcon } from '@/components/elements/LinkWithIcon'
import { PopularLink } from './PopularLinks'

export type PopularLinksUIProps = {
  links: PopularLink[]
}

export const PopularLinksUI = ({ links }: PopularLinksUIProps) => {
  const pathname = usePathname()

  return (
    <div className="flex flex-col gap-y-6 max-sm:gap-y-5">
      {links.map((item, idx) => {
        if (!pathname.includes(item.href)) {
          return (
            <LinkWithIcon
              key={idx}
              // eslint-disable-next-line @typescript-eslint/no-require-imports
              icon={require('lucide-react')[item.icon]}
              href={item.href}
              prefetch
            >
              {item.title}
            </LinkWithIcon>
          )
        }

        return null
      })}
    </div>
  )
}
