'use client'

import { useRouter } from 'next/navigation'
import Image, { ImageProps } from 'next/image'
import { Button } from '../ui/button'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { RequestCallbackButton } from '@/app/(frontend)/_components/Callback/RequestCallbackButton'

export type ProductCardProps = {
  title: string
  image: ImageProps
  link: React.PropsWithChildren<React.ComponentProps<typeof Link>>
  containerClassName?: string
}

export const ProductCard = ({
  title,
  image,
  link,

  containerClassName,
}: ProductCardProps) => {
  const router = useRouter()

  const { className: imageClassName, ...imageProps } = image
  const { children: linkChildren, ...linkProps } = link

  const onClick = () => {
    if (typeof link.href === 'string') {
      router.push(link.href)
    }
  }

  return (
    <div
      className={cn(
        'flex flex-col justify-between rounded-[8px] border border-border2 group cursor-pointer hover:border-border',
        containerClassName,
      )}
    >
      <div
        onClick={onClick}
        className="bg-accent2 rounded-[8px] overflow-hidden flex items-center justify-center grow relative min-h-[200px] md:min-h-[260px] xl:min-h-[205px] max-sm:min-h-[240px]"
      >
        <Image
          {...imageProps}
          alt={title}
          fill
          sizes="(max-width: 768px) 300px, 600px"
          className={cn('object-cover', imageClassName)}
        />
      </div>
      <div className="grow-1 flex flex-col justify-between">
        <h2
          className="px-4 pt-4 pb-2 text-[1.125rem] leading-[130%] font-semibold group-hover:text-secondary-foreground"
          onClick={onClick}
        >
          {title}
        </h2>
        <div className="px-4 pb-4 flex justify-between">
          <Button variant="link" size="indent-none" asChild>
            <Link {...linkProps} prefetch>
              {linkChildren}
              <ArrowRight />
            </Link>
          </Button>
          <RequestCallbackButton variant="outline" size="sm">
            Запросить цену
          </RequestCallbackButton>
        </div>
      </div>
    </div>
  )
}
