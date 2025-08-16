"use client"
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { RelationTypes } from "@/lib/types";
import { DotPattern } from "@/components/magicui/dot-pattern";


export default function ImageCarousel({ carousels }: {
  carousels: RelationTypes["Carousel"][]
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

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
    return () => {
      clearInterval(handleAutoScroll)
    }
  }, [api])
  return (
    <div className="w-full min-h-[85vh] relative bg-background border-5 border-main-foreground pt-16 lg:pt-24 px-5 lg:pl-30">
      <div className="relative">
        <h1 className="absolute uppercase left-4 lg:left-2 font-black text-3xl lg:ml-8 lg:text-7xl text-main-foreground top-1/2 -translate-y-1/2 z-10">
          {carousels[current].title}
        </h1>
        <HeadingSVG text={carousels[current].title} />
      </div>
      <ul className="flex flex-col text-main-foreground text-2xl lg:text-5xl font-bold ml-5 mt-5">
        {carousels[current].points.map((point, index) => (
          <li key={index} className={cn("", index === 0 ? "mt-2" : "mt-1")}>
            - {point}
          </li>
        ))}
      </ul>
      <Link
        href={carousels[current].link}
        className="absolute right-0 lg:left-30 mt-5 lg:mt-10 group hover:translate-x-[5px] hover:translate-y-[5px]">
        <h2 className="absolute left-10 font-black text-3xl lg:text-6xl text-main-foreground top-1/2 -translate-y-1/2 z-10">
          Visit Page
        </h2>
        <GetStartedSVG />
      </Link>
      <Decoration />
      <MeshPattern />
      {/*<div className="absolute right-0 lg:right-[200px] top-[420px] lg:top-[350px] scale-75 lg:scale-100 bg-foreground h-[280px] w-[280px]">*/}
      <Carousel
        opts={{ loop: true, }}
        className="mt-20 lg:right-[0px] lg:mt-0 absolute lg:top-[150px]"
        setApi={setApi}>
        <CarouselContent className="h-[340px] w-screen lg:w-[800px] lg:h-[600px] ">
          {carousels.map((carousel, index) => (
            <CarouselItem
              key={index}
              className="relative">
              <Image
                src={carousel.image || "/dummy/notFoundL.png"}
                alt={`Carousel image ${index + 1}`}
                className="object-contain object-center lg:object-left scale-90"
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
    <>
      <div className="w-[240px] h-[250px] lg:w-[320px] lg:h-[320px] absolute right-0 lg:right-[160px] top-[460px] lg:top-[350px]">
        <DotPattern
          width={12}
          height={12}
        />
      </div>
      <div className="absolute right-0 lg:right-[200px] top-[420px] lg:top-[350px] scale-75 lg:scale-100 bg-overlay h-[280px] w-[280px]">
        <svg className="h-[320px] w-[320px] " viewBox="0 0 320 320">
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
    </>
  )
}
const GetStartedSVG = () => {
  return (
    <svg
      className="w-60 drop-shadow-[5px_5px_0px_black] lg:w-[24rem]  group-hover:drop-shadow-[0px_0px_0px_black] transition-all"
      viewBox="0 0 699 215">
      <path id="Selection"
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
const HeadingSVG = ({ text }: {
  text: string
}) => {
  return (
    <svg
      style={{ transform: `scaleX(${text.length < 8 ? text.length * 0.15 : text.length * 0.11})`, transformOrigin: 'left' }}
      className="w-50 lg:w-[28rem]"
      viewBox="0 0 699 215">
      <path id="Selection"
        className="fill-secondary-background"
        strokeWidth="1"
        d="M 314.72,5.88
           C 323.56,4.42 326.62,5.99 335.00,5.88
             335.00,5.88 363.00,5.89 363.00,5.89
             363.00,5.89 375.00,6.96 375.00,6.96
             375.00,6.96 386.00,6.96 386.00,6.96
             386.00,6.96 400.00,8.00 400.00,8.00
             400.00,8.00 438.00,10.83 438.00,10.83
             438.00,10.83 462.00,12.04 462.00,12.04
             462.00,12.04 473.00,13.00 473.00,13.00
             473.00,13.00 487.00,13.91 487.00,13.91
             487.00,13.91 510.00,15.00 510.00,15.00
             510.00,15.00 521.00,15.91 521.00,15.91
             521.00,15.91 544.00,17.00 544.00,17.00
             544.00,17.00 554.00,17.91 554.00,17.91
             554.00,17.91 579.00,19.83 579.00,19.83
             603.97,22.25 630.60,25.66 652.00,39.70
             683.70,60.48 688.16,107.81 682.41,142.00
             679.36,160.16 672.50,176.62 657.00,187.56
             639.53,199.89 612.23,205.97 591.00,206.00
             591.00,206.00 571.00,206.00 571.00,206.00
             571.00,206.00 539.00,206.00 539.00,206.00
             539.00,206.00 487.00,199.42 487.00,199.42
             461.97,195.54 440.48,192.71 415.00,193.00
             415.00,193.00 404.00,193.96 404.00,193.96
             404.00,193.96 354.00,198.28 354.00,198.28
             354.00,198.28 325.00,201.09 325.00,201.09
             325.00,201.09 315.00,202.00 315.00,202.00
             315.00,202.00 295.00,203.00 295.00,203.00
             295.00,203.00 239.00,203.00 239.00,203.00
             239.00,203.00 227.00,202.09 227.00,202.09
             227.00,202.09 203.00,201.00 203.00,201.00
             203.00,201.00 183.00,200.00 183.00,200.00
             183.00,200.00 143.00,200.00 143.00,200.00
             143.00,200.00 133.00,200.91 133.00,200.91
             133.00,200.91 110.00,202.17 110.00,202.17
             110.00,202.17 87.00,204.04 87.00,204.04
             87.00,204.04 75.00,204.04 75.00,204.04
             75.00,204.04 65.00,205.00 65.00,205.00
             54.39,205.12 51.55,205.15 41.00,203.00
             35.21,201.81 30.06,200.48 25.00,197.29
             20.87,194.69 17.82,192.11 15.11,188.00
             5.84,173.96 8.66,155.03 16.31,141.00
             21.04,132.33 29.29,121.97 32.45,113.00
             34.38,107.54 34.06,101.70 34.02,96.00
             33.73,73.35 18.14,56.41 34.02,34.00
             36.48,30.57 38.48,28.45 42.00,26.10
             53.20,18.63 67.08,18.08 80.00,16.83
             80.00,16.83 99.00,15.00 99.00,15.00
             99.00,15.00 115.00,14.00 115.00,14.00
             115.00,14.00 129.00,14.00 129.00,14.00
             129.00,14.00 148.00,13.00 148.00,13.00
             148.00,13.00 163.00,11.96 163.00,11.96
             163.00,11.96 178.00,11.96 178.00,11.96
             178.00,11.96 189.00,11.00 189.00,11.00
             189.00,11.00 207.00,11.00 207.00,11.00
             207.00,11.00 268.00,5.88 268.00,5.88
             268.00,5.88 314.72,5.88 314.72,5.88 Z" />
    </svg>
  )
}
const Decoration = () => {
  return (
    <div className="absolute left-0 top-0 w-full h-full pointer-events-none">
      {/* Star2 SVG */}
      <svg xmlns="http://www.w3.org/2000/svg"
        className="w-16 h-16 left-5 lg:left-[40%] lg:w-30 lg:h-40 -bottom-5 absolute"
        viewBox="0 0 115 115">
        <path id="Selection"
          className="fill-overlay stroke-0"
          d="M 55.00,3.00
           C 55.00,3.00 58.00,4.00 58.00,4.00
             58.00,4.00 60.84,30.00 60.84,30.00
             61.10,32.46 60.91,37.49 64.23,37.99
             66.29,38.29 69.33,36.09 71.00,35.00
             75.47,32.07 77.82,29.72 83.00,28.00
             84.81,35.92 76.36,43.71 74.00,52.00
             78.75,52.22 87.34,53.37 92.00,54.40
             93.74,54.79 97.38,55.35 97.20,57.81
             97.03,60.20 93.78,60.94 91.96,61.42
             91.96,61.42 74.00,65.00 74.00,65.00
             74.00,65.00 82.00,86.00 82.00,86.00
             82.00,86.00 63.00,76.00 63.00,76.00
             60.83,84.32 60.71,86.74 59.58,95.00
             59.31,96.96 58.89,102.47 58.26,103.85
             57.07,106.48 55.51,106.57 53.00,107.00
             53.00,107.00 51.97,100.96 51.97,100.96
             50.70,89.37 51.90,88.93 48.00,77.00
             40.17,80.49 36.94,84.19 28.00,85.00
             28.20,79.10 28.83,78.72 32.35,74.01
             33.69,72.22 36.36,69.41 35.43,66.98
             34.69,65.04 32.81,64.48 30.98,64.11
             27.16,63.33 19.38,62.92 16.15,61.30
             14.75,60.60 13.66,59.64 13.45,58.00
             12.95,54.16 18.37,53.81 21.00,53.21
             21.00,53.21 27.00,53.21 27.00,53.21
             27.00,53.21 36.00,52.00 36.00,52.00
             34.01,39.39 27.66,40.87 27.00,29.00
             27.00,29.00 47.00,40.00 47.00,40.00
             49.29,33.90 50.19,24.63 50.83,18.00
             51.45,11.63 50.36,8.25 55.00,3.00 Z
           M 63.00,45.00
           C 63.00,45.00 62.00,45.00 62.00,45.00
             62.00,45.00 63.00,46.00 63.00,46.00
             63.00,46.00 63.00,45.00 63.00,45.00 Z" />
      </svg>

      {/* Star SVG */}
      <svg xmlns="http://www.w3.org/2000/svg"
        className="w-16 h-16 lg:w-40 lg:h-40 right-5 top-10 absolute"
        viewBox="0 0 87 87">
        <path id="Selection #1"
          className="fill-secondary-background stroke-0"
          d="M 42.00,1.00
           C 47.42,8.07 47.10,29.51 54.13,35.58
             57.50,38.49 62.75,39.14 67.00,40.12
             69.31,40.65 77.83,41.61 75.83,45.66
             74.86,47.64 70.96,49.00 69.00,49.85
             64.63,51.74 55.42,54.75 52.70,58.21
             47.16,65.27 49.63,79.03 43.00,86.00
             43.00,86.00 39.91,78.00 39.91,78.00
             38.37,72.86 36.43,59.88 32.72,56.65
             30.15,54.41 19.02,51.14 15.00,49.38
             12.94,48.48 9.20,46.81 9.20,44.10
             9.20,41.42 13.06,40.95 15.00,40.59
             19.47,39.75 30.54,38.88 33.58,36.28
             36.04,34.18 36.89,30.04 37.58,27.00
             37.58,27.00 42.00,1.00 42.00,1.00 Z
           M 55.00,51.00
           C 55.00,51.00 54.00,51.00 54.00,51.00
             54.00,51.00 55.00,52.00 55.00,52.00
             55.00,52.00 55.00,51.00 55.00,51.00 Z" />
      </svg>
    </div>
  )
}

