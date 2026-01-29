'use client'
import { useRouter } from 'next/navigation'
import Image, { ImageProps } from 'next/image'
import { Button } from '../ui/button'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export type ProductCardProps = {
  title: string
  image: ImageProps
  link: React.PropsWithChildren<React.ComponentProps<typeof Link>>
  onRequestClick?: () => void
  containerClassName?: string
}

export const ProductCard = ({
  title,
  image,
  link,
  onRequestClick,
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
        'flex flex-col gap-y-4 p-4 rounded-[8px] border border-border2 group cursor-pointer hover:border-border',
        containerClassName,
      )}
      onClick={onClick}
    >
      <div className="bg-accent2 rounded-[4px] overflow-hidden flex items-center justify-center grow relative min-h-[200px]">
        <Image
          {...imageProps}
          alt={title}
          fill
          sizes="(max-width: 768px) 300px, 600px"
          className={cn('object-cover', imageClassName)}
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <div className="text-[1.125rem] leading-[130%] font-semibold group-hover:text-secondary-foreground">
          {title}
        </div>
        <div className="flex justify-between">
          <Button variant="link" size="indent-none" asChild>
            <Link {...linkProps} prefetch>
              {linkChildren}
              <ArrowRight />
            </Link>
          </Button>
          <Button variant="outline" size="sm" onClick={onRequestClick}>
            Запросить цену
          </Button>
        </div>
      </div>
    </div>
  )
}
