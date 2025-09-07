'use client'
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Tables } from '@/lib/database.types'
import { ExternalLink } from 'lucide-react'
import { Button } from '../ui/button'

export default function ImageCarousel({
  carousels,
}: {
  carousels: Tables<'carousels'>[]
}) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const count = carousels.length

  useEffect(() => {
    if (!api) return

    setCurrent(api.selectedScrollSnap())

    const handleAutoScroll = setInterval(() => {
      if (api) {
        if (current < count - 1) {
          api.scrollNext()
        } else {
          api.scrollTo(0)
        }
        setCurrent(api.selectedScrollSnap())
      }
    }, 6000)

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap())
    })
    return () => {
      clearInterval(handleAutoScroll)
    }
  }, [api])
  return (
    <div className="bg-background border-t-5 border-b-5 lg:border-5 relative lg:pb-10 overflow-hidden">
      <p className="absolute hidden lg:block text-center leading-[15vw] top-1/2 -translate-y-1/2 opacity-30 text-secondary-background text-[20vw] pointer-events-none w-full">
        {carousels[current].title}
      </p>
      <div className="flex w-full flex-col items-center gap-3 mt-12 lg:mt-20 lg:my-5">
        <h1 className="text-3xl lg:text-7xl  text-secondary-background">
          {carousels[current].title}
        </h1>
        <Button
          className="py-5 px-10 flex items-center hover:bg-overlay hover:font-bold bg-background rounded-none z-10"
          asChild
        >
          <Link
            href={carousels[current].link}
            style={{ color: 'var(--secondary-background)' }}
            target="_blank"
          >
            VIEW PRODUCT <ExternalLink className="inline ml-2 mb-1" size={16} />
          </Link>
        </Button>
      </div>
      <Carousel opts={{ loop: true }} setApi={setApi}>
        <CarouselContent>
          {carousels.map((carousel, index) => (
            <CarouselItem
              key={index}
              className="relative min-h-[50vh] lg:min-h-[55vh]"
            >
              <Image
                src={carousel.image}
                alt={`Carousel image ${index + 1}`}
                className="object-contain"
                sizes="(max-width:1000px) 100vw, 40vw"
                fill
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
