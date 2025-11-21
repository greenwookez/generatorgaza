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
  )
}
