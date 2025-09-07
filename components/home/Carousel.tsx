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
import { DotPattern } from '@/components/magicui/dot-pattern'
import { Tables } from '@/lib/database.types'
import { ExternalLink } from 'lucide-react'
import { Button } from '../ui/button'

export default function ImageCarousel({
  carousels,
}: {
  carousels: Omit<Tables<'carousels'>, 'id' | 'created_at' | 'updated_at'>[]
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
const MeshPattern = () => {
  return (
    <div>
      <div className="w-[240px] h-[250px] lg:w-[320px] lg:h-[320px] absolute left-[75%] top-[50%] -translate-x-1/2 -translate-y-1/2">
        <DotPattern width={12} height={12} />
      </div>
      <div className="scale-75 lg:scale-100 bg-overlay h-[280px] w-[280px] absolute left-[75%] top-[50%] -translate-x-1/2 -translate-y-1/2">
        <svg className="h-[320px]" viewBox="0 0 320 320">
          {new Array(6).fill(null).map((_, i) => (
            <line
              key={i}
              x1={40 + i * 40}
              y1={0}
              x2={40 + i * 40}
              y2={320}
              stroke="black"
              strokeWidth="4"
              strokeLinecap="round"
            />
          ))}
          {new Array(6).fill(null).map((_, i) => (
            <line
              key={i}
              y1={40 + i * 40}
              x1={0}
              y2={40 + i * 40}
              x2={320}
              stroke="black"
              strokeWidth="4"
              strokeLinecap="round"
            />
          ))}
        </svg>
      </div>
    </div>
  )
}
const GetStartedSVG = () => {
  return (
    <svg
      className="w-60 drop-shadow-[5px_5px_0px_black] lg:w-[24rem]  group-hover:drop-shadow-[0px_0px_0px_black] transition-all"
      viewBox="0 0 699 215"
    >
      <path
        id="Selection"
        className="fill-main scale-x-[1.20]"
        d="M 275.00,11.14
           C 275.00,11.14 313.00,11.14 313.00,11.14
             313.00,11.14 382.00,11.14 382.00,11.14
             382.00,11.14 398.00,12.00 398.00,12.00
             398.00,12.00 418.00,13.00 418.00,13.00
             418.00,13.00 427.00,13.00 427.00,13.00
             443.54,14.22 465.65,18.24 479.00,28.53
             522.73,62.22 513.91,147.37 466.00,173.69
             433.12,191.75 394.30,190.06 358.00,190.00
             358.00,190.00 341.00,189.00 341.00,189.00
             341.00,189.00 320.00,188.00 320.00,188.00
             320.00,188.00 288.00,186.00 288.00,186.00
             288.00,186.00 273.00,185.00 273.00,185.00
             273.00,185.00 234.00,183.00 234.00,183.00
             234.00,183.00 220.00,182.00 220.00,182.00
             220.00,182.00 208.00,182.96 208.00,182.96
             208.00,182.96 194.00,182.96 194.00,182.96
             194.00,182.96 184.00,183.91 184.00,183.91
             184.00,183.91 150.00,186.09 150.00,186.09
             150.00,186.09 138.00,187.00 138.00,187.00
             116.49,187.03 98.29,187.12 77.00,182.42
             64.54,179.68 54.18,177.21 43.00,170.55
             0.60,145.27 -5.86,76.40 25.30,40.00
             39.98,22.86 64.74,14.03 87.00,14.00
             87.00,14.00 146.00,14.00 146.00,14.00
             146.00,14.00 159.00,13.04 159.00,13.04
             159.00,13.04 223.00,13.04 223.00,13.04
             223.00,13.04 238.00,12.00 238.00,12.00
             238.00,12.00 275.00,11.14 275.00,11.14 Z"
      />
    </svg>
  )
}
