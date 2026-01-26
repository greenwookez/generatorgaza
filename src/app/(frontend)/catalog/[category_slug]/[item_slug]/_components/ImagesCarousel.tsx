'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem, useCarousel } from '@/components/ui/carousel'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Media } from '@/payload-types'

export const ImagesCarousel = ({ images }: { images: Media[] }) => {
  if (images.length === 1) {
    return (
      <ImageRenderer
        image={images[0]}
        className="w-full relative rounded-[8px] border border-border2 overflow-hidden"
      />
    )
  }
  return (
    <Carousel className="w-full relative rounded-[8px] border border-border2 overflow-hidden">
      <ImagesCarouselBody images={images} />
    </Carousel>
  )
}

const ImagesCarouselBody = ({ images }: { images: Media[] }) => {
  const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } = useCarousel()

  return (
    <>
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <ImageRenderer image={image} />
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
  <div className={cn(`relative h-[520px]`, className)}>
    <Image src={image.url!} alt={image.alt ?? ''} fill className="z-10 object-contain" />
    <Image
      src={image.url!}
      alt={image.alt ?? ''}
      width={image.width!}
      height={image.height!}
      className="absolute inset-0 w-full h-full object-cover filter blur-[20px] scale-[1.1] opacity-60"
    />
  </div>
)
