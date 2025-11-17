import React from 'react'

import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

export type BreadCrumbsTrailItem = {
  title: string
  href?: string
}

export type BreadCrumbsTrailProps = {
  items: BreadCrumbsTrailItem[]
}

export const BreadCrumbsTrail = ({ items }: BreadCrumbsTrailProps) => {
  return (
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">Главная</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      {items.map((item, idx) => {
        if (idx < items.length - 1) {
          return (
            <React.Fragment key={idx}>
              <BreadcrumbItem>
                <BreadcrumbLink href={item.href}>{item.title}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </React.Fragment>
          )
        }

        return (
          <BreadcrumbItem key={idx}>
            <BreadcrumbPage>{item.title}</BreadcrumbPage>
          </BreadcrumbItem>
        )
      })}
    </BreadcrumbList>
  )
}
