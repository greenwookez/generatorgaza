'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem, useCarousel } from '@/components/ui/carousel'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Media } from '@/payload-types'

export type ImagesCarouselProps = {
  images: Media[]
  containerClassName?: string
  imageClassName?: string
}

export const ImagesCarousel = ({
  images,
  containerClassName,
  imageClassName,
}: ImagesCarouselProps) => {
  if (images.length === 0) {
    return null
  }

  if (images.length === 1) {
    return (
      <ImageRenderer
        image={images[0]}
        className={cn('w-full relative overflow-hidden', containerClassName, imageClassName)}
      />
    )
  }

  return (
    <Carousel className={cn('w-full relative overflow-hidden', containerClassName)}>
      <ImagesCarouselBody images={images} imagesClassName={imageClassName} />
    </Carousel>
  )
}

type ImagesCarouselBodyProps = {
  images: Media[]
  imagesClassName?: string
}

const ImagesCarouselBody = ({ images, imagesClassName }: ImagesCarouselBodyProps) => {
  const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } = useCarousel()

  return (
    <>
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <ImageRenderer image={image} className={imagesClassName} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <Button
        variant="outline"
        size="icon-sm"
        className="rounded-[50%] absolute top-1/2 -translate-y-1/2 translate-x-1/2 opacity-75 disabled:opacity-20"
        disabled={!canScrollPrev}
        onClick={scrollPrev}
        aria-label="Предыдущая картинка"
      >
        <ChevronLeft />
      </Button>
      <Button
        variant="outline"
        size="icon-sm"
        className="rounded-[50%] absolute top-1/2 right-0 -translate-y-1/2 -translate-x-1/2 opacity-75 disabled:opacity-20"
        disabled={!canScrollNext}
        onClick={scrollNext}
        aria-label="Следующая картинка"
      >
        <ChevronRight />
      </Button>
    </>
  )
}

const ImageRenderer = ({ image, className }: { image: Media; className?: string }) => (
  <div className={cn(`relative`, className)}>
    <Image
      src={image.url!}
      alt={image.alt ?? ''}
      fill
      sizes="(max-width: 768px) 300px, 600px"
      className="z-10 object-contain"
    />
    <Image
      src={image.url!}
      alt={image.alt ?? ''}
      width={image.width!}
      height={image.height!}
      className="absolute inset-0 w-full h-full object-cover filter blur-[20px] scale-[1.1] opacity-60"
    />
  </div>
)
