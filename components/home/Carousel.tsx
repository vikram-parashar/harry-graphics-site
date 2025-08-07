"use client"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";


export default function ImageCarousel({ carousels }: {
  carousels: { image: string, link: string, msg: string }[]
}) {

  return (
    <Carousel opts={{ loop: true }}>
      <CarouselContent className="">
        {carousels.map((carousel, index) => (
          <CarouselItem key={index} className="pl-0 relative">
            <Card className="p-0 border-l-0 border-r-0 rounded-none overflow-hidden" style={{ boxShadow: 'none' }}>
              <CardContent className="p-0">
                <Image
                  src={carousel.image || "/dummy/notFoundL.png"}
                  alt={`Carousel image ${index + 1}`}
                  width={800}
                  height={400}
                  className="object-cover object-center w-full aspect-[6/3] transition-all duration-500 ease-in-out hover:scale-105"
                />
                <Link href={`${carousel.link}`} className="cursor-pointer">
                  <Button className="absolute bottom-5 right-10 z-10">
                    {carousel.msg}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-5 bottom-10 top-auto" />
      <CarouselNext className="absolute left-5 right-auto bottom-0 top-auto" />
    </Carousel>
  );
}
