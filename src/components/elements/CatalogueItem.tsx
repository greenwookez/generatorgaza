import Image, { ImageProps } from 'next/image'
import { Button } from '../ui/button'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export type CatalogueItemProps = {
  title: string
  description: string
  image: ImageProps
  link: React.PropsWithChildren<React.ComponentProps<'a'>>
  horizontal?: boolean
  containerClassName?: string
}

export const CatalogueItem = ({
  title,
  description,
  image,
  link,
  horizontal,
  containerClassName,
}: CatalogueItemProps) => {
  const { className: imageClassName, ...imageProps } = image
  const { children: linkChildren, ...linkProps } = link

  return (
    <div className={cn('flex flex-col gap-y-4', containerClassName)}>
      <div className="overflow-hidden rounded-[8px] bg-[#ECECEC] flex justify-center relative max-h-[200px] shrink-0 grow-0 basis-[200px]">
        <Image {...imageProps} fill alt={title} className={cn('object-cover', imageClassName)} />
      </div>
      <div className="flex flex-col gap-y-1">
        <div className="text-[1.375rem] leading-[140%] font-semibold">{title}</div>
        <p className="text-[1rem] leading-[140%] text-[#333]">{description}</p>
      </div>
      <div>
        <Button variant="link" size="indent-none" asChild>
          <a {...linkProps}>
            {linkChildren}
            <ArrowRight />
          </a>
        </Button>
      </div>
    </div>
  )
}
