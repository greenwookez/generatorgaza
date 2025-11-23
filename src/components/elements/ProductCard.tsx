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
  const { className: imageClassName, ...imageProps } = image
  const { children: linkChildren, ...linkProps } = link

  return (
    <div
      className={cn(
        'flex flex-col gap-y-4 p-4 rounded-[8px] border border-border2',
        containerClassName,
      )}
    >
      <div className="bg-accent2 rounded-[4px] flex items-center justify-center py-7.5">
        <Image
          {...imageProps}
          alt={title}
          className={cn('object-cover max-h-[108px]', imageClassName)}
        />
      </div>
      <div className="text-[1.125rem] leading-[130%] font-semibold">{title}</div>
      <div className="flex flex-col gap-y-2">
        <Button variant="default" onClick={onRequestClick}>
          Запросить цену
        </Button>
        <Button variant="outline" asChild>
          <Link {...linkProps}>
            {linkChildren}
            <ArrowRight />
          </Link>
        </Button>
      </div>
    </div>
  )
}
