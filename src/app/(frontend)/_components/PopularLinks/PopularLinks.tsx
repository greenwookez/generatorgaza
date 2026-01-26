import { initPayload } from '@/lib/initPayload'
import { PopularLinksUI } from './PopularLinks.ui'

export type PopularLink = {
  icon: string
  title: string
  href: string
}

export const PopularLinks = async () => {
  const payload = await initPayload()

  const categories = await payload.find({
    collection: 'catalog-categories',
    sort: 'order',
    pagination: false,
    select: {
      title: true,
      slug: true,
      navIcon: true,
    },
  })

  const links: PopularLink[] = [
    {
      icon: 'Route',
      title: 'Доставка и оплата',
      href: '/shipping-and-payment',
    },
    ...categories.docs.reduce<PopularLink[]>((acc, category) => {
      acc.push({
        icon: category.navIcon,
        title: category.title,
        href: `/catalog/${category.slug}`,
      })
      return acc
    }, []),
  ]

  return <PopularLinksUI links={links} />
}
