import Image, { ImageProps } from 'next/image'
import { Button } from '../ui/button'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export type CatalogItemProps = {
  title: string
  description: string
  image: ImageProps
  link: React.PropsWithChildren<React.ComponentProps<typeof Link>>
  containerClassName?: string
}

export const CatalogItem = ({
  title,
  description,
  image,
  link,
  containerClassName,
}: CatalogItemProps) => {
  const { className: imageClassName, ...imageProps } = image
  const { children: linkChildren, ...linkProps } = link

  return (
    <div className={cn('flex flex-col gap-y-4', containerClassName)}>
      <div className="overflow-hidden rounded-[8px] bg-[#ECECEC] flex justify-center relative max-h-[200px] shrink-0 grow-0 basis-[200px]">
        <Image
          {...imageProps}
          fill
          sizes="(max-width: 768px) 300px, 600px"
          alt={title}
          className={cn('object-cover', imageClassName)}
        />
      </div>
      <div className="flex flex-col gap-y-1">
        <div className="text-[1.375rem] leading-[140%] font-semibold max-sm:text-[1.25rem]">
          {title}
        </div>
        <p className="text-[1rem] leading-[140%] text-[#333]">{description}</p>
      </div>
      <div>
        <Button variant="link" size="indent-none" asChild>
          <Link {...linkProps}>
            {linkChildren}
            <ArrowRight />
          </Link>
        </Button>
      </div>
    </div>
  )
}
