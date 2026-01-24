'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem, useCarousel } from '@/components/ui/carousel'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type Image = {
  src: string
  alt: string
}

export const ImagesCarousel = ({ images }: { images: Image[] }) => {
  return (
    <Carousel className="w-full relative rounded-[8px] border border-border2 overflow-hidden">
      <ImagesCarouselBody images={images} />
    </Carousel>
  )
}

const ImagesCarouselBody = ({ images }: { images: Image[] }) => {
  const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } = useCarousel()

  return (
    <>
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="relative h-[450px]">
              <Image src={image.src} alt={image.alt} fill className="object-cover" />
            </div>
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
