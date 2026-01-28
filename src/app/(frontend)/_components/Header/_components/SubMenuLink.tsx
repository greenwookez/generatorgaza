'use client'

import Link from 'next/link'
import { MenuItem } from '../Header'

export const SubMenuLink = ({ item, onClick }: { item: MenuItem; onClick?: () => void }) => {
  return (
    <Link
      className="group hover:bg-muted hover:text-accent-foreground flex min-w-80 select-none flex-row gap-4 rounded-md p-3 leading-none no-underline outline-none transition-colors"
      href={item.url ?? '#'}
      onClick={onClick}
      prefetch
    >
      <div className="text-foreground group-hover:text-accent-foreground">{item.icon}</div>
      <div>
        <div className="text-sm font-semibold">{item.title}</div>
        {item.description && (
          <p className="text-muted-foreground text-sm leading-snug">{item.description}</p>
        )}
      </div>
    </Link>
  )
}
