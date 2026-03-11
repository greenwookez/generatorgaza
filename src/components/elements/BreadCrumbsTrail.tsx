import React from 'react'

import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { JsonLd } from '@/app/(frontend)/_components/Seo/JsonLd'
import { getAbsoluteUrl } from '@/lib/seo'

export type BreadCrumbsTrailItem = {
  title: string
  href: string
}

export type BreadCrumbsTrailProps = {
  items: BreadCrumbsTrailItem[]
}

export const BreadCrumbsTrail = ({ items }: BreadCrumbsTrailProps) => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ title: 'Главная', href: '/' }, ...items].map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.title,
      item: getAbsoluteUrl(item.href),
    })),
  }

  return (
    <>
      <JsonLd data={jsonLd} />
      <BreadcrumbList className="max-sm:hidden">
        <BreadcrumbItem>
          <BreadcrumbLink className="text-[1rem]" href="/">
            Главная
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {items.map((item, idx) => {
          if (idx < items.length - 1) {
            return (
              <React.Fragment key={idx}>
                <BreadcrumbItem>
                  <BreadcrumbLink className="text-[1rem]" href={item.href}>
                    {item.title}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </React.Fragment>
            )
          }

          return (
            <BreadcrumbItem key={idx}>
              <BreadcrumbPage className="text-[1rem]">{item.title}</BreadcrumbPage>
            </BreadcrumbItem>
          )
        })}
      </BreadcrumbList>
    </>
  )
}
