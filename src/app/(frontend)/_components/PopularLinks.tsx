'use client'

import { usePathname } from 'next/navigation'
import { LinkWithIcon } from '@/components/elements/LinkWithIcon'
import { Route, Cylinder, Factory, Container } from 'lucide-react'

export const PopularLinks = () => {
  const pathname = usePathname()

  const getLinks = () => {
    return [
      {
        icon: Route,
        title: 'Доставка и оплата',
        href: '/shipping-and-payment',
        hideRule: pathname.includes('shipping-and-payment'),
      },
      {
        icon: Cylinder,
        title: 'Технические газы в баллонах',
        href: '#',
        hideRule: pathname.includes('industrial-gases'),
      },
      {
        icon: Factory,
        title: 'Оборудование для производства азота и кислорода',
        href: '#',
        hideRule: false,
      },
      {
        icon: Container,
        title: 'Газовые моноблоки',
        href: '#',
        hideRule: false,
      },
    ]
  }

  return (
    <div className="flex flex-col gap-y-6 max-sm:gap-y-5">
      {getLinks().map((item, idx) => {
        if (!item.hideRule) {
          return (
            <LinkWithIcon key={idx} icon={item.icon} href={item.href}>
              {item.title}
            </LinkWithIcon>
          )
        }

        return null
      })}
    </div>
  )
}
